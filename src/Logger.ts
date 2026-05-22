import { Entity, Player, PlayerPermissionLevel, world } from "@minecraft/server";

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

	private _logLevel: LogLevel;

	get logLevel(): LogLevel {
		return this._logLevel;
	}

	get atDebug(): Logger {
		this._logLevel = LogLevel.DEBUG;
		return this;
	}

	get atInfo(): Logger {
		this._logLevel = LogLevel.INFO;
		return this;
	}

	get atWarn(): Logger {
		this._logLevel = LogLevel.WARN;
		return this;
	}

	get atError(): Logger {
		this._logLevel = LogLevel.ERROR;
		return this;
	}

	private constructor(private name: string) {
		this._logLevel = Logger._globalLevel;
	}

	static setGlobalLevel(level: LogLevel) {
		this._globalLevel = level;
	}

	static get(name: string): Logger {
		return MapUtils.computeIfUndefined(this.loggers, name, () => new Logger(name));
	}

	at(level: LogLevel) {
		return {
			0: this.atDebug,
			1: this.atInfo,
			2: this.atWarn,
			3: this.atError,
			4: this,
		}[level];
	}

	//#region Log methods

	/**
	 * Logs a normal log message to the console.
	 * @param message
	 * @param params
	 */
	log(message: any, ...params: any[]) {
		this._log(console.log, message, ...params);
	}

	/**
	 * Logs an info message to the console.
	 * @param message
	 * @param params
	 */
	info(message: any, ...params: any[]) {
		this._log(console.info, message, ...params);
	}

	/**
	 * Logs a debug message to the console.
	 * @param message
	 * @param params
	 */
	warn(message: any, ...params: any[]) {
		this._log(console.warn, message, ...params);
	}

	/**
	 * Logs an error message to the console.
	 * @param message
	 * @param params
	 */
	error(message: any, ...params: any[]) {
		this._log(console.error, message, ...params);
	}

	/**
	 * Sends a log message to the world visible to all players.
	 * @param message
	 * @param params
	 */
	toWorld(message: any, ...params: any[]) {
		this._log(
			(message?: any, ...optionalParams: any[]) => {
				world.sendMessage(message);
			},
			message,
			...params
		);
	}

	/**
	 * Logs a message to the given player.
	 * @param player
	 * @param message
	 * @param params
	 */
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
	 * Logs a message to all operators.
	 * @param message
	 * @param params
	 */
	toOperators(message: any, ...params: any[]) {
		this._log(
			(message?: any, ...optionalParams: any[]) => {
				for (const player of world.getPlayers()) {
					if (player.playerPermissionLevel >= PlayerPermissionLevel.Operator) {
						player.sendMessage(message);
					}
				}
			},
			message,
			...params
		);
	}

	/**
	 * Logs a message to the given player's actionbar.
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
			(formattedMessage?: any, ...optionalParams: any[]) => {
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
