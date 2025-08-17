import type { MultipleChoiceQuestion } from '../src/engine/quizEngine';

export const questionsData: MultipleChoiceQuestion[] = [
  {
    id: "mc_basic_add_1",
    topic: "addition",
    level: 0,
    type: "multipleChoice",
    prompt: "What is 2 + 3?",
    explanation: "When you add 2 and 3, you get 5. You can think of it as counting: 3, 4, 5.",
    options: [
      { id: "a", text: "4" },
      { id: "b", text: "5" },
      { id: "c", text: "6" },
      { id: "d", text: "7" }
    ],
    correctOptionId: "b"
  },
  {
    id: "mc_basic_sub_1",
    topic: "subtraction",
    level: 1,
    type: "multipleChoice",
    prompt: "What is 8 - 3?",
    explanation: "When you subtract 3 from 8, you get 5. You can think of it as counting backwards: 8, 7, 6, 5.",
    options: [
      { id: "a", text: "4" },
      { id: "b", text: "5" },
      { id: "c", text: "6" },
      { id: "d", text: "11" }
    ],
    correctOptionId: "b"
  },
  {
    id: "mc_multiplication_1",
    topic: "multiplication",
    level: 2,
    type: "multipleChoice",
    prompt: "What is 6 × 7?",
    explanation: "6 times 7 equals 42. You can think of it as adding 6 seven times: 6+6+6+6+6+6+6 = 42.",
    options: [
      { id: "a", text: "35" },
      { id: "b", text: "42" },
      { id: "c", text: "48" },
      { id: "d", text: "49" }
    ],
    correctOptionId: "b"
  },
  {
    id: "mc_fractions_1",
    topic: "fractions",
    level: 3,
    type: "multipleChoice",
    prompt: "Which fraction is equivalent to 1/2?",
    explanation: "2/4 is equivalent to 1/2 because if you divide both the numerator and denominator by 2, you get 1/2.",
    options: [
      { id: "a", text: "1/3" },
      { id: "b", text: "2/4" },
      { id: "c", text: "3/5" },
      { id: "d", text: "1/4" }
    ],
    correctOptionId: "b"
  },
  {
    id: "mc_operations_1",
    topic: "operations",
    level: 4,
    type: "multipleChoice",
    prompt: "What is 5 + 3?",
    explanation: "5 plus 3 equals 8. This is basic addition.",
    options: [
      { id: "a", text: "6" },
      { id: "b", text: "8" },
      { id: "c", text: "7" },
      { id: "d", text: "9" }
    ],
    correctOptionId: "b"
  },
  {
    id: "mc_algebra_1",
    topic: "algebra",
    level: 5,
    type: "multipleChoice",
    prompt: "If x + 5 = 12, what is x?",
    explanation: "To solve x + 5 = 12, subtract 5 from both sides: x = 12 - 5 = 7.",
    options: [
      { id: "a", text: "5" },
      { id: "b", text: "6" },
      { id: "c", text: "7" },
      { id: "d", text: "17" }
    ],
    correctOptionId: "c"
  },
  {
    id: "mc_geometry_1",
    topic: "geometry",
    level: 6,
    type: "multipleChoice",
    prompt: "A triangle has angles of 60°, 60°, and how many degrees?",
    explanation: "The sum of angles in any triangle is always 180°. So 60° + 60° + 60° = 180°.",
    options: [
      { id: "a", text: "30°" },
      { id: "b", text: "45°" },
      { id: "c", text: "60°" },
      { id: "d", text: "90°" }
    ],
    correctOptionId: "c"
  },
  {
    id: "mc_decimals_1",
    topic: "decimals",
    level: 7,
    type: "multipleChoice",
    prompt: "What is 0.5 + 0.3?",
    explanation: "When adding decimals, align the decimal points: 0.5 + 0.3 = 0.8.",
    options: [
      { id: "a", text: "0.2" },
      { id: "b", text: "0.8" },
      { id: "c", text: "0.53" },
      { id: "d", text: "8.0" }
    ],
    correctOptionId: "b"
  },
  {
    id: "mc_percentages_1",
    topic: "percentages",
    level: 8,
    type: "multipleChoice",
    prompt: "What is 25% of 80?",
    explanation: "25% means 25/100 or 1/4. So 25% of 80 = 80 ÷ 4 = 20.",
    options: [
      { id: "a", text: "15" },
      { id: "b", text: "20" },
      { id: "c", text: "25" },
      { id: "d", text: "32" }
    ],
    correctOptionId: "b"
  },
  {
    id: "mc_advanced_algebra_1",
    topic: "algebra",
    level: 10,
    type: "multipleChoice",
    prompt: "If 2x - 3 = 7, then x = ?",
    explanation: "Solve: 2x - 3 = 7. Add 3 to both sides: 2x = 10. Divide by 2: x = 5.",
    options: [
      { id: "a", text: "3" },
      { id: "b", text: "4" },
      { id: "c", text: "5" },
      { id: "d", text: "7" }
    ],
    correctOptionId: "c"
  },
  {
    id: "mc_quadratics_1",
    topic: "quadratics",
    level: 12,
    type: "multipleChoice",
    prompt: "What are the roots of x² - 5x + 6 = 0?",
    explanation: "Factor: x² - 5x + 6 = (x-2)(x-3) = 0. So x = 2 or x = 3.",
    options: [
      { id: "a", text: "x = 1, 6" },
      { id: "b", text: "x = 2, 3" },
      { id: "c", text: "x = -2, -3" },
      { id: "d", text: "x = 5, 6" }
    ],
    correctOptionId: "b"
  },
  {
    id: "mc_trigonometry_1",
    topic: "trigonometry",
    level: 15,
    type: "multipleChoice",
    prompt: "What is sin(30°)?",
    explanation: "sin(30°) = 1/2. This is one of the standard trigonometric values.",
    options: [
      { id: "a", text: "1/2" },
      { id: "b", text: "√3/2" },
      { id: "c", text: "1" },
      { id: "d", text: "0" }
    ],
    correctOptionId: "a"
  },
  {
    id: "mc_calculus_1",
    topic: "calculus",
    level: 18,
    type: "multipleChoice",
    prompt: "What is the derivative of x³?",
    explanation: "Using the power rule: d/dx(x³) = 3x². The power comes down and the exponent decreases by 1.",
    options: [
      { id: "a", text: "x²" },
      { id: "b", text: "3x²" },
      { id: "c", text: "x³" },
      { id: "d", text: "3x" }
    ],
    correctOptionId: "b"
  },
  {
    id: "mc_statistics_1",
    topic: "statistics",
    level: 9,
    type: "multipleChoice",
    prompt: "What is the mean of 4, 6, 8, 10?",
    explanation: "Mean = (4 + 6 + 8 + 10) ÷ 4 = 28 ÷ 4 = 7.",
    options: [
      { id: "a", text: "6" },
      { id: "b", text: "7" },
      { id: "c", text: "8" },
      { id: "d", text: "9" }
    ],
    correctOptionId: "b"
  },
  {
    id: "mc_probability_1",
    topic: "probability",
    level: 11,
    type: "multipleChoice",
    prompt: "What is the probability of rolling a 6 on a fair six-sided die?",
    explanation: "There is 1 favorable outcome (rolling a 6) out of 6 possible outcomes, so P = 1/6.",
    options: [
      { id: "a", text: "1/6" },
      { id: "b", text: "1/3" },
      { id: "c", text: "1/2" },
      { id: "d", text: "5/6" }
    ],
    correctOptionId: "a"
  }
];
