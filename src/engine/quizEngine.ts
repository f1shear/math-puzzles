// quiz-engine.ts

/** -------------------- Types -------------------- **/

// Levels are 0..25 at runtime; we keep number for ergonomics and validate.
export type Level = number;

export type Topic = string;

export type QuestionType = 'multipleChoice' | 'fillInBlank' | 'match';

interface BaseQuestion {
  id: string;
  topic: Topic;
  level: Level;            // expected 0..25; validated by the engine
  type: QuestionType;
  prompt: string;
  explanation: string;
}

/** Optional richer payloads (the engine doesn't depend on these) */
export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multipleChoice';
  options: Array<{ id: string; text: string }>;
  correctOptionId: string;
}

export interface FillInBlankQuestion extends BaseQuestion {
  type: 'fillInBlank';
  acceptableAnswers: string[]; // normalized answers
}

export interface MatchQuestion extends BaseQuestion {
  type: 'match';
  left: string[];
  right: string[];
  correctPairs: Record<string, string>; // map left -> right
}

export type Question =
  | MultipleChoiceQuestion
  | FillInBlankQuestion
  | MatchQuestion;

/** Input question bank */
export type QuestionBank = ReadonlyArray<Question>;

/** Output of generateQuiz */
export interface GeneratedQuiz {
  questions: Question[];                   // length up to 10
  topicsInQuiz: Topic[];                   // deduped (order by first appearance)
  usedQuestionIds: string[];               // convenience
}

/** Result of a single answered question */
export interface AnswerResult {
  questionId: string;
  correct: boolean;
  topic: Topic;
  level: Level; // include the asked level for progression logic
}

/** Input to addProgress */
export interface QuizResult {
  answers: ReadonlyArray<AnswerResult>;
}

/** Output of addProgress */
export interface ProgressUpdate {
  newLevel: Level;                  // clamped 0..25
  topicsCovered: ReadonlyArray<Topic>;
  // Optional telemetry if you want it:
  stats: {
    total: number;
    correct: number;
    avgQuestionLevel: number | null;
    levelDelta: number;
  };
}

/** -------------------- Public API -------------------- **/

export interface QuizEngineConfig {
  /** Maximum questions to return per quiz. Default: 10 */
  quizSize?: number;
  /** Soft cap per topic to improve diversity. Default: 4 */
  perTopicSoftCap?: number;
  /** How much to reward unseen topics in selection. Default: 0.25 */
  unseenTopicBoost?: number;
  /** How quickly difficulty proximity decays. Default: 0.9 */
  difficultyDecay?: number; // in (0,1); smaller = steeper penalty
  /** If true, shuffle final selection order. Default: true */
  shuffleFinal?: boolean;
}

export class QuizEngine {
  private readonly bank: Question[];
  private readonly cfg: Required<QuizEngineConfig>;

  constructor(bank: QuestionBank, config?: QuizEngineConfig) {
    this.bank = bank.slice().filter(this.isValidQuestion);
    this.cfg = {
      quizSize: config?.quizSize ?? 10,
      perTopicSoftCap: config?.perTopicSoftCap ?? 4,
      unseenTopicBoost: config?.unseenTopicBoost ?? 0.25,
      difficultyDecay: config?.difficultyDecay ?? 0.9,
      shuffleFinal: config?.shuffleFinal ?? true,
    };
  }

  /** Generate up to `quizSize` questions */
  generateQuiz(
    currentLevel: Level,
    topicsCovered: ReadonlyArray<Topic>,
    excludeQuestionIds: ReadonlyArray<string>
  ): GeneratedQuiz {
    const level = this.clampLevel(currentLevel);
    const exclude = new Set(excludeQuestionIds);
    const covered = new Set(topicsCovered);

    // 1) Filter out excluded + validate
    const candidates = this.bank.filter(q => !exclude.has(q.id));
    if (candidates.length === 0) {
      return { questions: [], topicsInQuiz: [], usedQuestionIds: [] };
    }

    // 2) Score candidates by difficulty proximity + unseen-topic boost
    type Scored = { q: Question; score: number };
    const scored: Scored[] = candidates.map(q => {
      const d = Math.abs(q.level - level);
      const proximity = Math.pow(this.cfg.difficultyDecay, d); // 1, 0.9, 0.81, ...
      const unseenBoost = covered.has(q.topic) ? 0 : this.cfg.unseenTopicBoost;
      // Light bonus for underrepresented types to diversify question modalities later.
      const typeBias = this.typeBias(q.type);
      return { q, score: proximity + unseenBoost + typeBias };
    });

    // 3) Sort by score desc, then stable by lower absolute diff, then random tie-break
    this.stableSort(scored, (a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const da = Math.abs(a.q.level - level);
      const db = Math.abs(b.q.level - level);
      if (da !== db) return da - db;
      return Math.random() - 0.5;
    });

    // 4) Greedy pick with soft per-topic cap, then relax if needed
    const perTopicCount = new Map<Topic, number>();
    const selected: Question[] = [];
    const softCap = this.cfg.perTopicSoftCap;

    for (const { q } of scored) {
      if (selected.length >= this.cfg.quizSize) break;
      const count = perTopicCount.get(q.topic) ?? 0;
      if (count < softCap) {
        selected.push(q);
        perTopicCount.set(q.topic, count + 1);
      }
    }

    // If we still need more, fill ignoring soft cap
    if (selected.length < this.cfg.quizSize) {
      for (const { q } of scored) {
        if (selected.length >= this.cfg.quizSize) break;
        if (!selected.some(s => s.id === q.id)) selected.push(q);
      }
    }

    // 5) If requested, shuffle final order so the quiz feels mixed
    const final = this.cfg.shuffleFinal ? this.shuffle(selected) : selected;

    const topicsInQuiz = this.orderedUnique(final.map(q => q.topic));
    const usedQuestionIds = final.map(q => q.id);

    return { questions: final, topicsInQuiz, usedQuestionIds };
  }

  /** Update level and topic coverage based on a quiz attempt */
  addProgress(
    currentLevel: Level,
    topicsCovered: ReadonlyArray<Topic>,
    quizResult: QuizResult
  ): ProgressUpdate {
    const level = this.clampLevel(currentLevel);
    const total = quizResult.answers.length;
    const correct = quizResult.answers.filter(a => a.correct).length;

    const avgQuestionLevel =
      total > 0
        ? Number(
            (
              quizResult.answers.reduce((s, a) => s + this.clampLevel(a.level), 0) /
              total
            ).toFixed(2)
          )
        : null;

    // Simple, transparent level delta rule:
    // 0-3 correct: +0 | 4-6: +1 | 7-8: +2 | 9-10: +3
    let delta = 0;
    if (correct >= 4 && correct <= 6) delta = 1;
    else if (correct >= 7 && correct <= 8) delta = 2;
    else if (correct >= 9) delta = 3;

    // Small bonus if the player succeeded on a noticeably higher average difficulty
    if (avgQuestionLevel !== null && avgQuestionLevel >= level + 3 && correct >= 7) {
      delta += 1;
    }

    const newLevel = this.clampLevel(level + delta);

    // Topics covered are the union of previous + seen in this quiz (attempted = learned exposure)
    const updatedTopics = this.orderedUnique([
      ...topicsCovered,
      ...quizResult.answers.map(a => a.topic),
    ]);

    return {
      newLevel,
      topicsCovered: updatedTopics,
      stats: { total, correct, avgQuestionLevel, levelDelta: delta },
    };
  }

  /** -------------------- Internals -------------------- **/

  private clampLevel(x: number): Level {
    if (Number.isNaN(x)) return 0;
    return Math.min(25, Math.max(0, Math.floor(x)));
  }

  private isValidQuestion = (q: Question): q is Question => {
    const levelOk =
      Number.isFinite(q.level) && q.level >= 0 && q.level <= 25 && Math.floor(q.level) === q.level;
    const baseOk =
      !!q.id &&
      typeof q.id === 'string' &&
      !!q.topic &&
      typeof q.topic === 'string' &&
      !!q.prompt &&
      typeof q.prompt === 'string' &&
      !!q.explanation &&
      typeof q.explanation === 'string';
    const typeOk = q.type === 'multipleChoice' || q.type === 'fillInBlank' || q.type === 'match';
    return levelOk && baseOk && typeOk;
  };

  /** Tiny bias to diversify types in selection scoring */
  private typeBias(t: QuestionType): number {
    switch (t) {
      case 'multipleChoice':
        return 0.0; // baseline
      case 'fillInBlank':
        return 0.05;
      case 'match':
        return 0.05;
      default:
        return 0;
    }
  }

  private orderedUnique<T>(arr: ReadonlyArray<T>): T[] {
    const seen = new Set<T>();
    const out: T[] = [];
    for (const x of arr) {
      if (!seen.has(x)) {
        seen.add(x);
        out.push(x);
      }
    }
    return out;
    }

  private shuffle<T>(arr: ReadonlyArray<T>): T[] {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  private stableSort<T>(arr: T[], cmp: (a: T, b: T) => number): void {
    // Decorate -> sort -> undecorate for stability
    const decorated = arr.map((v, i) => ({ v, i }));
    decorated.sort((a, b) => {
      const d = cmp(a.v, b.v);
      return d !== 0 ? d : a.i - b.i;
    });
    for (let i = 0; i < arr.length; i++) arr[i] = decorated[i].v;
  }
}
