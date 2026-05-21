import { Entity, Player, world } from "@minecraft/server";

import { MapUtils } from "./MapUtils";
import { TitleUtils } from "./TitleUtils";

type LogMethod = (message?: any, ...optionalParams: any[]) => void;

export enum LogLevel {
	DEBUG = 0,
	INFO = 1,
	WARN = 2,
	ERROR = 3,
	NONE = 4,
}

const LogLevelNames: string[] = ["DEBUG", "INFO", "WARN", "ERROR", "NONE"];

export class Logger {
	private static _globalLevel: LogLevel = LogLevel.DEBUG;
	private static readonly loggers: Map<string, Logger> = new Map();

	static get globalLevel(): LogLevel {
		return this._globalLevel;
	}

	private _debug: Logger;
	private _info: Logger;
	private _warn: Logger;
	private _error: Logger;

	get atDebug(): Logger {
		return this._debug;
	}

	get atInfo(): Logger {
		return this._info;
	}

	get atWarn(): Logger {
		return this._warn;
	}

	get atError(): Logger {
		return this._error;
	}

	private _logLevel: LogLevel;

	get logLevel(): LogLevel {
		return this._logLevel;
	}

	private constructor(
		private name: string,
		logLevel?: LogLevel
	) {
		this._logLevel = logLevel ?? Logger._globalLevel;
		this._debug = new Logger(`${this.name}.debug`, LogLevel.DEBUG);
		this._info = new Logger(`${this.name}.info`, LogLevel.INFO);
		this._warn = new Logger(`${this.name}.warn`, LogLevel.WARN);
		this._error = new Logger(`${this.name}.error`, LogLevel.ERROR);
	}

	static setGlobalLevel(level: LogLevel) {
		this._globalLevel = level;
	}

	static get(name: string): Logger {
		return MapUtils.computeIfUndefined(this.loggers, name, () => new Logger(name));
	}

	at(level: LogLevel) {
		return {
			0: this._debug,
			1: this._info,
			2: this._warn,
			3: this._error,
			4: this,
		}[level];
	}

	log(message: any, ...params: any[]) {
		this._log(console.log, message, ...params);
	}

	info(message: any, ...params: any[]) {
		this._log(console.info, message, ...params);
	}

	warn(message: any, ...params: any[]) {
		this._log(console.warn, message, ...params);
	}

	error(message: any, ...params: any[]) {
		this._log(console.error, message, ...params);
	}

	//#region Log methods

	toWorld(message: any, ...params: any[]) {
		this._log(world.sendMessage, message, ...params);
	}

	toPlayer(player: Player, message: any, ...params: any[]) {
		this._log(
			(message?: any, ...optionalParams: any[]) => {
				player.sendMessage(message);
			},
			message,
			...params
		);
	}

	/**
	 * Logs a message to the player's actionbar.
	 * @param player
	 * @param message
	 * @param params
	 */
	actionbar(player: Player, message: any, ...params: any[]) {
		this._log(
			(message?: any, ...optionalParams: any[]) => {
				TitleUtils.actionbar(player, message);
			},
			message,
			...params
		);
	}

	/**
	 * Logs a message on behalf of an entity using the `/say` command.
	 * @param entity
	 * @param message
	 * @param params
	 */
	asEntity(entity: Entity, message: any, ...params: any[]) {
		this._log(
			(message?: any, ...optionalParams: any[]) => {
				entity.runCommand(`say ${message}`);
			},
			message,
			...params
		);
	}

	//#endregion

	private _shouldLog(level: LogLevel): boolean {
		return level >= Logger._globalLevel;
	}

	private _format(level: string, message: any): string {
		return `[${level}] [${this.name}] ${message}`;
	}

	private _log(method: LogMethod, message: any, ...params: any[]) {
		if (!this._shouldLog(this._logLevel)) return;

		method(this._format(LogLevelNames[this._logLevel], message), ...params);
	}
}
