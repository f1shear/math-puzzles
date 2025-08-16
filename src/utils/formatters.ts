import type { TFunction } from '../i18n/types';

/**
 * Formats a date string into a human-readable format
 */
export const formatDate = (dateString: string | null, t: TFunction): string => {
  if (!dateString) return t('time.never');

  try {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return t('time.invalid');
    }

    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInHours / 24;

    // Show relative time for recent dates
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      if (diffInMinutes < 1) return t('time.justNow');
      return t('time.minutesAgo', { count: diffInMinutes });
    } else if (diffInHours < 24) {
      return t('time.hoursAgo', { count: Math.floor(diffInHours) });
    } else if (diffInDays < 7) {
      return t('time.daysAgo', { count: Math.floor(diffInDays) });
    }

    // For older dates, show formatted date
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  } catch (error) {
    console.warn('Error formatting date:', error);
    return t('time.unknown');
  }
};

/**
 * Formats a welcome message based on first launch status
 */
export const formatWelcomeMessage = (isFirstLaunch: boolean, t: TFunction): string => {
  return isFirstLaunch ? t('home.welcome.new') : t('home.welcome.returning');
};
