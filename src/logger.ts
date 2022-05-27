/** Log levels. */
export const enum LogLevel {
  DEBUG = 'debug',
  LOG = 'log',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  OFF = 'off',
}

/** Interface definition for the logger. */
export interface ILogger {
  debug: typeof console.debug;
  log: typeof console.log;
  info: typeof console.info;
  warn: typeof console.warn;
  error: typeof console.error;
}

/** The logger class. */
export class Logger implements ILogger {
  private static readonly LOG_LEVELS: [
    'debug',
    'log',
    'info',
    'warn',
    'error',
  ] = ['debug', 'log', 'info', 'warn', 'error'];

  /**
   * Constructs a new logger.
   *
   * @param logger The wrapped logger that will be used for printing messages. Default: `console`.
   * @param level The log level. Default: `'info'`.
   */
  public constructor(
    private readonly logger: ILogger = console,
    private level: LogLevel = LogLevel.INFO,
  ) {}

  /**
   * Set the log level to the given level.
   *
   * @param level The new log level.
   */
  public setLogLevel(level: LogLevel): void {
    this.level = level;
  }

  /**
   * Whether debugging is enabled or not.
   *
   * @returns `true` if debug level is enabled, otherwise `false`.
   */
  public isDebugEnabled(): boolean {
    return this.level <= LogLevel.DEBUG;
  }

  /**
   * Prints the given message as a debug log entry.
   *
   * @param message The message to print.
   * @param optionalParams Optional arguments.
   */
  public debug(message?: unknown, ...optionalParams: any[]): void {
    this.message(LogLevel.DEBUG, message, ...optionalParams);
  }

  /**
   * Prints the given message as a log entry.
   *
   * @param message The message to print.
   * @param optionalParams Optional arguments.
   */
  public log(message?: unknown, ...optionalParams: any[]): void {
    this.message(LogLevel.LOG, message, ...optionalParams);
  }

  /**
   * Prints the given message as a info log entry.
   *
   * @param message The message to print.
   * @param optionalParams Optional arguments.
   */
  public info(message?: unknown, ...optionalParams: any[]): void {
    this.message(LogLevel.INFO, message, ...optionalParams);
  }

  /**
   * Prints the given message as a warn log entry.
   *
   * @param message The message to print.
   * @param optionalParams Optional arguments.
   */
  public warn(message?: unknown, ...optionalParams: any[]): void {
    this.message(LogLevel.WARN, message, ...optionalParams);
  }

  /**
   * Prints the given message as a error log entry.
   *
   * @param message The message to print.
   * @param optionalParams Optional arguments.
   */
  public error(message?: unknown, ...optionalParams: any[]): void {
    this.message(LogLevel.ERROR, message, ...optionalParams);
  }

  private message(
    level: LogLevel,
    message?: any,
    ...optionalParams: any[]
  ): void {
    if (this.level !== LogLevel.OFF && this.level <= level) {
      if (level !== LogLevel.OFF) {
        this.logger[level](message, ...optionalParams);
      }
    }
  }
}

/**
 * Constructs a new logger.
 *
 * @param logger The wrapped logger that will be used for printing messages. Default: console.
 * @returns A newly constructed logger.
 */
export function createLogger(logger: ILogger = console): Logger {
  return new Logger(logger);
}
