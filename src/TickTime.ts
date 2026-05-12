import { TicksPerSecond } from "@minecraft/server";

/**
 * Tick conversion utilities.
 */
export class TickTime {
	/**
	 * Get ticks from given seconds.
	 * @param seconds 
	 * @returns 
	 */
	public static seconds(seconds: number): number {
		return seconds * TicksPerSecond;
	}

	/**
	 * Get ticks from given minutes.
	 * @param minutes 
	 * @returns 
	 */
	public static minutes(minutes: number): number {
		return minutes * 60 * TicksPerSecond;
	}

	/**
	 * Get ticks from given hours.
	 * @param hours 
	 * @returns 
	 */
	public static hours(hours: number): number {
		return hours * 60 * 60 * TicksPerSecond;
	}

	/**
	 * Convert seconds -> ticks
	 * @param seconds 
	 * @returns 
	 */
	public static fromSeconds(seconds: number): number {
		return seconds * TicksPerSecond;
	}

	/**
	 * Convert hours -> ticks
	 * @param minutes 
	 * @returns 
	 */
	public static fromMinutes(minutes: number): number {
		return minutes * 60 * TicksPerSecond;
	}

	/**
	 * Convert hours -> ticks
	 * @param hours 
	 * @returns 
	 */
	public static fromHours(hours: number): number {
		return hours * 60 * 60 * TicksPerSecond;
	}

	/**
	 * Format ticks into HH:MM:SS separated by the given delimiter.
	 *
	 * Example:
	 * Ticks.format(2400) => "00:02:00"
	 */
	public static format(ticks: number, delimiter = ":"): string {
		const totalSeconds = Math.floor(this.seconds(ticks));

		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		return [
			hours.toString().padStart(2, "0"),
			minutes.toString().padStart(2, "0"),
			seconds.toString().padStart(2, "0"),
		].join(delimiter);
	}
}