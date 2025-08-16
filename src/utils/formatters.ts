/**
 * Formats a date string into a human-readable format
 */
export const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'Never';

  try {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInHours / 24;

    // Show relative time for recent dates
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      if (diffInMinutes < 1) return 'Just now';
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInDays < 7) {
      return `${Math.floor(diffInDays)}d ago`;
    }

    // For older dates, show formatted date
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  } catch (error) {
    console.warn('Error formatting date:', error);
    return 'Unknown';
  }
};

/**
 * Formats a welcome message based on first launch status
 */
export const formatWelcomeMessage = (isFirstLaunch: boolean): string => {
  return isFirstLaunch ? 'Welcome! 👋' : 'Returning User ⭐';
};
