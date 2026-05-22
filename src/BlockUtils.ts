import { Block, Direction, Vector3 } from "@minecraft/server";

/**
 * Block utility functions.
 */
export class BlockUtils {
	static readonly directionToVector = new Map<Direction, Vector3>([
		[Direction.North, { x: 0, y: 0, z: -1 }],
		[Direction.South, { x: 0, y: 0, z: 1 }],
		[Direction.East, { x: 1, y: 0, z: 0 }],
		[Direction.West, { x: -1, y: 0, z: 0 }],
		[Direction.Up, { x: 0, y: 1, z: 0 }],
		[Direction.Down, { x: 0, y: -1, z: 0 }],
	]);

	/**
	 * Gets the vector offset of the given direction from the block.
	 * @obsolete Use `getDirectionVector` instead.
	 * @param direction
	 * @returns
	 */
	static getDirectionOffset(direction: Direction): Vector3 {
		return this.getDirectionVector(direction);
	}

	/**
	 * Gets the vector offset of the given direction from the block.
	 * @param direction
	 * @returns
	 */
	static getDirectionVector(direction: Direction): Vector3 {
		return this.directionToVector.get(direction) ?? { x: 0, y: 0, z: 0 };
	}

	/**
	 * Gets the location of the given block relative to the given direction.
	 * @obsolete Use `getLocationOnFace` instead.
	 * @param block
	 * @param direction
	 * @returns
	 */
	static getRelativeLocation(block: Block, direction: Direction): Vector3 {
		return this.getLocationOnFace(block, direction);
	}

	/**
	 * Gets the location of the given block relative to the given direction.
	 * @param block
	 * @param direction
	 * @returns
	 */
	static getLocationOnFace(block: Block, direction: Direction): Vector3 {
		const offset = this.getDirectionOffset(direction);
		return {
			x: block.location.x + offset.x,
			y: block.location.y + offset.y,
			z: block.location.z + offset.z,
		};
	}

	/**
	 * Gets the block beside this block given a direction.
	 * @param block
	 * @param direction
	 * @returns
	 */
	static getBlockOnFace(block: Block, direction: Direction): Block | undefined {
		const location = this.getRelativeLocation(block, direction);
		return block.dimension.getBlock(location);
	}

	/**
	 * Gets the block beside this block given it's cardinal direction property.
	 * @param block
	 * @returns
	 */
	static getBlockOnCardinal(block: Block): Block | undefined {
		const cardinal = block.permutation.getState("minecraft:cardinal_direction");
		if (cardinal && typeof cardinal === "string") {
			return (
				{
					north: block.north(),
					south: block.south(),
					east: block.east(),
					west: block.west(),
				}[cardinal] ?? undefined
			);
		}
		return undefined;
	}

	/**
	 * Gets the block's bottom-center position.
	 * @param block
	 * @returns
	 */
	static getBottomCenter(block: Block): Vector3 {
		return { ...block.center(), y: block.location.y };
	}

	/**
	 * Checks if the given block is within the given coordinate bounds.
	 * @obsolete Use `isWithinAreaBox` instead.
	 * @param minInclusive
	 * @param maxInclusive
	 * @param block
	 * @returns
	 */
	static isWithinBounds(minInclusive: Vector3, maxInclusive: Vector3, block: Block): boolean {
		return this.isWithinAreaBox(block, minInclusive, maxInclusive);
	}

	/**
	 * Checks if the given block is within the given coordinate bounds.
	 * @param minInclusive
	 * @param maxInclusive
	 * @param block
	 * @returns
	 */
	static isWithinAreaBox(block: Block, minInclusive: Vector3, maxInclusive: Vector3): boolean {
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
