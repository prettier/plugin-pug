/** Log levels. */
export enum LogLevel {
  DEBUG = 'debug',
  LOG = 'log',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  OFF = 'off',
}

/** Interface definition for the logger. */
export type ILogger = Pick<
  typeof console,
  'debug' | 'log' | 'info' | 'warn' | 'error'
>;

/** The logger class. */
export class Logger implements ILogger {
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
   * Checks if the given value is a supported log level.
   *
   * @param value The value to check.
   * @returns `true` if the given value is a supported log level, otherwise `false`.
   */
  public static isSupportedLogLevel(value: any): value is LogLevel {
    return (
      typeof value === 'string' &&
      (value === 'debug' ||
        value === 'log' ||
        value === 'info' ||
        value === 'warn' ||
        value === 'error' ||
        value === 'off')
    );
  }

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

/**
 * Logger for @prettier/plugin-pug.
 */
export const logger: Logger = createLogger(console);

// Configure the logger based on the environment.
if (process.env.NODE_ENV === 'test') {
  logger.setLogLevel(LogLevel.DEBUG);
}

let logLevel: string | undefined = process.env.PRETTIER_PLUGIN_PUG_LOG_LEVEL;
if (logLevel) {
  logLevel = logLevel.toLowerCase();
  if (Logger.isSupportedLogLevel(logLevel)) {
    logger.setLogLevel(logLevel);
  }
}
