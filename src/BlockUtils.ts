import { Block, Direction, Vector3 } from "@minecraft/server";

/**
 * Block utility functions.
 */
export class BlockUtils {
	static readonly directionToOffset = new Map<Direction, Vector3>([
		[Direction.North, { x: 0, y: 0, z: -1 }],
		[Direction.South, { x: 0, y: 0, z: 1 }],
		[Direction.East, { x: 1, y: 0, z: 0 }],
		[Direction.West, { x: -1, y: 0, z: 0 }],
		[Direction.Up, { x: 0, y: 1, z: 0 }],
		[Direction.Down, { x: 0, y: -1, z: 0 }],
	]);
	/**
	 * Gets the offset of the given cardinal direction.
	 * @param direction 
	 * @returns 
	 */
	static getDirectionOffset(direction: Direction): Vector3 {
		return this.directionToOffset.get(direction) ?? { x: 0, y: 0, z: 0 };
	}
	/**
	 * Gets the location of the given block relative to the given direction.
	 * @param block 
	 * @param direction 
	 * @returns 
	 */
	static getRelativeLocation(block: Block, direction: Direction): Vector3 {
		const offset = this.getDirectionOffset(direction);
		return {
			x: block.location.x + offset.x,
			y: block.location.y + offset.y,
			z: block.location.z + offset.z,
		};
	}
	/**
	 * Checks if the given block is within the given coordinate bounds.
	 * @param minInclusive 
	 * @param maxInclusive 
	 * @param block 
	 * @returns 
	 */
	static isWithinBounds(minInclusive: Vector3, maxInclusive: Vector3, block: Block): boolean {
		const { x, y, z } = block.location;

		const minX = Math.min(minInclusive.x, maxInclusive.x);
		const maxX = Math.max(minInclusive.x, maxInclusive.x);

		const minY = Math.min(minInclusive.y, maxInclusive.y);
		const maxY = Math.max(minInclusive.y, maxInclusive.y);

		const minZ = Math.min(minInclusive.z, maxInclusive.z);
		const maxZ = Math.max(minInclusive.z, maxInclusive.z);

		return x >= minX && x <= maxX && y >= minY && y <= maxY && z >= minZ && z <= maxZ;
	}
}
