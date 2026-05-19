import { Player, world } from "@minecraft/server";

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

export class Logger {
	private static globalLevel: LogLevel = LogLevel.DEBUG;
	private static readonly loggers: Map<string, Logger> = new Map();
	private constructor(private name: string) {}

	static setGlobalLevel(level: LogLevel) {
		this.globalLevel = level;
	}

	static get(name: string): Logger {
		return MapUtils.computeIfUndefined(this.loggers, name, () => new Logger(name));
	}

	debug(message: any, ...params: any[]) {
		this.log(LogLevel.DEBUG, "DEBUG", console.warn, message, ...params);
	}

	info(message: any, ...params: any[]) {
		this.log(LogLevel.INFO, "INFO", console.warn, message, ...params);
	}

	warn(message: any, ...params: any[]) {
		this.log(LogLevel.WARN, "WARN", console.warn, message, ...params);
	}

	error(message: any, ...params: any[]) {
		this.log(LogLevel.ERROR, "ERROR", console.error, message, ...params);
	}

	toWorld(message: any, ...params: any[]) {
		this.log(LogLevel.DEBUG, "LOGGER", world.sendMessage, message, ...params);
	}

	toPlayer(player: Player, message: any, ...params: any[]) {
		this.log(
			LogLevel.DEBUG,
			"LOGGER",
			(message?: any, ...optionalParams: any[]) => {
				player.sendMessage(message);
			},
			message,
			...params
		);
	}

	actionbar(player: Player, message: any, ...params: any[]) {
		this.log(
			LogLevel.DEBUG,
			"INFO",
			(message?: any, ...optionalParams: any[]) => {
				TitleUtils.actionbar(player, message);
			},
			message,
			...params
		);
	}

	private shouldLog(level: LogLevel): boolean {
		return level >= Logger.globalLevel;
	}

	private format(level: string, message: any): string {
		return `[${level}] [${this.name}] ${message}`;
	}

	private log(level: LogLevel, levelName: string, method: LogMethod, message: any, ...params: any[]) {
		if (!this.shouldLog(level)) return;

		method(this.format(levelName, message), ...params);
	}
}
