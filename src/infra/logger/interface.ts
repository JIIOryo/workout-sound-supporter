/**
 * logger interface
 */
export interface ILogger {
  /**
   * debug log
   * @param args Arguments to log
   */
  debug(...args: any[]): void
  /**
   * info log
   * @param args Arguments to log
   */
  info(...args: any[]): void
  /**
   * warn log
   * @param args Arguments to log
   */
  warn(...args: any[]): void
  /**
   * error log
   * @param args Arguments to log
   */
  error(...args: any[]): void
}
