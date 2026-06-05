import { Dimension, EntityQueryOptions, Vector3, system, world } from "@minecraft/server";

/**
 * Dimension utility functions.
 */
export class DimensionUtils {
	/**
	 * Gets the overworld dimension.
	 * @returns
	 */
	static getOverworld() {
		return world.getDimension("overworld");
	}

	/**
	 * Gets the Nether dimension.
	 * @returns
	 */
	static getNether() {
		return world.getDimension("nether");
	}

	/**
	 * Gets the End dimension.
	 * @returns
	 */
	static getEnd() {
		return world.getDimension("the_end");
	}

	/**
	 * Removes all entities in the given dimension matching the given query options.
	 * @param dimension
	 * @param options
	 */
	static removeEntities(dimension: Dimension, options: EntityQueryOptions) {
		dimension.getEntities(options).forEach((entity) => entity?.remove());
	}

	/**
	 * Runs the given commands in the given dimension.
	 * @obsolete Use `runCommandsIn` instead.
	 * @param dimension
	 * @param commands
	 */
	static runCommands(dimension: Dimension, commands: string[]) {
		this.runCommandsIn(dimension, ...commands);
	}

	/**
	 * Runs the given commands in the given dimension.
	 * @param dimension
	 * @param commands
	 */
	static runCommandsIn(dimension: Dimension, ...commands: string[]) {
		commands.forEach((command) => {
			try {
				dimension.runCommand(command);
			} catch (e) {
				console.error(e);
			}
		});
	}

	/**
	 * Ensures that the chunk is loaded before running the given function.
	 * @param dimension
	 * @param location
	 * @param fn
	 */
	static async ensureChunkLoadedAsync(dimension: Dimension, location: Vector3, fn: Function) {
		while (true) {
			if (dimension.isChunkLoaded(location)) {
				system.run(() => fn());
				break;
			}
		}
	}

	/**
	 * Synchronous version of `ensureChunkLoadedAsync`.
	 * @param dimension
	 * @param location
	 * @param fn
	 */
	static ensureChunkLoaded(dimension: Dimension, location: Vector3, fn: Function) {
		while (true) {
			if (dimension.isChunkLoaded(location)) {
				system.run(() => fn());
				break;
			}
		}
	}
}
