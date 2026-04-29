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
	static clearRunSafely(runId: number | undefined | (number | undefined)[]) {
		if (Array.isArray(runId)) {
			for (const id of runId) {
				this.clearRunSafely(id);
			}
			return;
		}
		if (runId === undefined || runId < 0 || runId > 4294967295.0) return;
		system.clearRun(runId);
	}
}
