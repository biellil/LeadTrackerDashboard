// Utility functions for styled-components
// Can be used for string manipulation, data formatting, etc.

/**
 * Simple utility for classnames - replaces the cn utility from shadcn
 * This is a temporary polyfill until we refactor all shadcn components to styled-components
 */
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Formats currency values
 * @param value number to format as currency
 * @returns Formatted currency string
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Formats date strings
 * @param dateString Date string to format
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR');
}

/**
 * Calculates percentage change between two values
 * @param newValue New value
 * @param oldValue Old value
 * @returns Percentage change
 */
export function calculatePercentageChange(newValue: number, oldValue: number): number {
  if (oldValue === 0) return 0;
  return ((newValue - oldValue) / oldValue) * 100;
}

/**
 * Truncates text to specified length with ellipsis
 * @param text Text to truncate
 * @param length Maximum length
 * @returns Truncated text
 */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}
