import { system } from "@minecraft/server";

/**
 * System utility functions.
 */
export class SystemUtils {
	/**
	 * Executes the callback once, then per interval.
	 * @param callback
	 * @param tickInterval
	 */
	static runThenInterval(callback: () => void, tickInterval: number): number {
		callback();
		return system.runInterval(callback, tickInterval);
	}

	/**
	 * Clears the given run id safely.
	 * @param runId
	 * @returns
	 */
	static clearRunSafely(runId: number | undefined) {
		if (runId === undefined || runId < 0 || runId > 4294967295.0) return;
		try {
			system.clearRun(runId);
		} catch (e) {
			console.warn(String(e));
		}
	}
	
	/**
	 * Clears the given runs safely.
	 * @param runIds 
	 */
	static clearRunsSafely(...runIds: (number | undefined)[]) {
		for (const runId of runIds) {
			this.clearRunSafely(runId);
		}
	}
}
