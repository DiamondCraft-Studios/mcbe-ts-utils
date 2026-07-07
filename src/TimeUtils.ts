import { TicksPerDay } from "@minecraft/server";

export interface MinecraftTime {
	hours: number;
	minutes: number;
	ticks: number;
}

/**
 * Time conversion utilities.
 */
export class TimeUtils {
	static readonly TICKS_PER_HOUR = TicksPerDay / 24;
	static readonly TICKS_PER_MINUTE = TimeUtils.TICKS_PER_HOUR / 60;

	/**
	 * Converts Minecraft ticks into a 24-hour clock time.
	 * Example:
	 * 		0 ticks -> 06:00
	 * 		6000 ticks -> 12:00
	 *		18000 ticks -> 00:00
	 * @param ticks
	 * @returns
	 */
	static fromTicks(ticks: number): MinecraftTime {
		const normalized = this.normalizeTicks(ticks);

		// Minecraft day starts at 6:00 AM
		const totalMinutes = Math.floor(normalized / this.TICKS_PER_MINUTE);

		const hours = Math.floor(totalMinutes / 60 + 6) % 24;
		const minutes = totalMinutes % 60;

		return {
			hours,
			minutes,
			ticks: normalized,
		};
	}

	/**
	 * Converts a 24-hour clock time into Minecraft ticks.
	 * Example:
	 * 06:00 -> 0
	 * 12:00 -> 6000
	 * 00:00 -> 18000
	 * @param hours
	 * @param minutes
	 */
	static toTicks(hours: number, minutes = 0): number {
		const totalMinutes = ((hours - 6 + 24) % 24) * 60 + minutes;

		return Math.floor(totalMinutes * this.TICKS_PER_MINUTE);
	}

	/**
	 * Returns whether the current tick time falls within the given range.
	 * Supports ranges that cross midnight.
	 * @param currentTicks
	 * @param startHour
	 * @param startMinute
	 * @param endHour
	 * @param endMinute
	 * @returns
	 */
	static isBetween(
		currentTicks: number,
		startHour: number,
		startMinute: number,
		endHour: number,
		endMinute: number
	): boolean {
		const current = this.normalizeTicks(currentTicks);
		const start = this.toTicks(startHour, startMinute);
		const end = this.toTicks(endHour, endMinute);

		// Normal range
		if (start <= end) {
			return current >= start && current <= end;
		}

		// Overnight range
		return current >= start || current <= end;
	}

	/**
	 * Formats ticks into a readable HH:mm string.
	 * @param ticks
	 * @returns
	 */
	static format(ticks: number): string {
		const time = this.fromTicks(ticks);

		return `${time.hours.toString().padStart(2, "0")}:${time.minutes.toString().padStart(2, "0")}`;
	}

	/**
	 * Normalizes ticks into the 0-23999 range.
	 * @param ticks
	 * @returns
	 */
	static normalizeTicks(ticks: number): number {
		return ((ticks % TicksPerDay) + TicksPerDay) % TicksPerDay;
	}
}
