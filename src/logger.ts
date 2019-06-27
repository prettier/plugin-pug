export enum LogLevel {
	DEBUG,
	LOG,
	INFO,
	WARN,
	ERROR,
	OFF
}

export interface ILogger {
	debug(message?: any, ...optionalParams: any[]): void;
	log(message?: any, ...optionalParams: any[]): void;
	info(message?: any, ...optionalParams: any[]): void;
	warn(message?: any, ...optionalParams: any[]): void;
	error(message?: any, ...optionalParams: any[]): void;
}

export class Logger implements ILogger {
	private static readonly LOG_LEVELS: ['debug', 'log', 'info', 'warn', 'error'] = [
		'debug',
		'log',
		'info',
		'warn',
		'error'
	];

	public constructor(private readonly logger: ILogger = console, private level: LogLevel = LogLevel.INFO) {}

	public setLogLevel(level: LogLevel): void {
		this.level = level;
	}

	public debug(message?: any, ...optionalParams: any[]): void {
		this.message(LogLevel.DEBUG, message, ...optionalParams);
	}

	public log(message?: any, ...optionalParams: any[]): void {
		this.message(LogLevel.LOG, message, ...optionalParams);
	}

	public info(message?: any, ...optionalParams: any[]): void {
		this.message(LogLevel.INFO, message, ...optionalParams);
	}

	public warn(message?: any, ...optionalParams: any[]): void {
		this.message(LogLevel.WARN, message, ...optionalParams);
	}

	public error(message?: any, ...optionalParams: any[]): void {
		this.message(LogLevel.ERROR, message, ...optionalParams);
	}

	private message(level: LogLevel, message?: any, ...optionalParams: any[]): void {
		if (this.level !== LogLevel.OFF && this.level <= level) {
			this.logger[Logger.LOG_LEVELS[level as number]](message, ...optionalParams);
		}
	}
}

export function createLogger(logger: ILogger = console): Logger {
	return new Logger(logger);
}
