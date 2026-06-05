import { Vector2, Vector3 } from "@minecraft/server";
import { ColorCode, ColorCodeSet } from "./Colors";

/**
 * Common randomizer functions.
 */
export class Random {
	/**
	 * Returns a pseudorandom number between 0 and 1.
	 * @returns
	 */
	static value(): number {
		return Math.random();
	}

	/**
	 * Returns a random float between the given min and max.
	 * @param minInclusive
	 * @param maxExclusive
	 * @returns
	 */
	static range(minInclusive: number, maxInclusive: number): number {
		return Math.random() * (maxInclusive - minInclusive) + minInclusive;
	}

	/**
	 * Returns a random integer between the given min and max.
	 * @param minInclusive
	 * @param maxExclusive
	 * @returns
	 */
	static rangeInt(minInclusive: number, maxInclusive: number): number {
		return Math.floor(Math.random() * (maxInclusive - minInclusive) + minInclusive);
	}

	/**
	 * Returns a random boolean.
	 * @returns
	 */
	static boolean(): boolean {
		return Math.random() < 0.5;
	}

	/**
	 * Gets a random number sign.
	 * @returns
	 */
	static sign(): number {
		return Math.random() < 0.5 ? -1 : 1;
	}

	/**
	 * Returns a boolean with a probability of the given value.
	 * @param probability01
	 * @returns
	 */
	static chance(probability01: number): boolean {
		return Math.random() < probability01;
	}

	/**
	 * Gets a random element from the given array.
	 * @param array
	 * @returns
	 */
	static fromArray<T>(array: T[]): T | undefined {
		if (array.length === 0) return undefined;
		return array[Random.range(0, array.length)];
	}

	/**
	 * Gets a random element from the given set.
	 * @param set
	 * @returns
	 */
	static fromSet<T>(set: Set<T>): T | undefined {
		const size = set.size;
		if (size === 0) return undefined;

		const index = Random.range(0, size);

		let i = 0;
		for (const value of set) {
			if (i++ === index) return value;
		}
	}

	/**
	 * Gets a random color code from the Bedrock available color codes.
	 * @returns
	 */
	static colorCode(): string | undefined {
		return Random.fromSet(ColorCodeSet);
	}

	/**
	 * Returns a copy of the shuffled array.
	 * @param array
	 * @returns
	 */
	static shuffle<T>(array: T[]): T[] {
		const result = [...array];
		for (let i = result.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[result[i], result[j]] = [result[j], result[i]];
		}
		return result;
	}

	/**
	 * Gets a random point inside a unit circle.
	 * @returns
	 */
	static insideUnitCircle(): Vector2 {
		const angle = Math.random() * Math.PI * 2;
		const radius = Math.sqrt(Math.random());

		return {
			x: Math.cos(angle) * radius,
			y: Math.sin(angle) * radius,
		};
	}

	/**
	 * Gets a random point inside a unit sphere.
	 * @returns
	 */
	static insideUnitSphere(): Vector3 {
		const u = Math.random();
		const v = Math.random();
		const w = Math.random();

		const theta = u * 2 * Math.PI;
		const phi = Math.acos(2 * v - 1);
		const r = Math.cbrt(w);

		const sinPhi = Math.sin(phi);

		return {
			x: r * sinPhi * Math.cos(theta),
			y: r * sinPhi * Math.sin(theta),
			z: r * Math.cos(phi),
		};
	}

	/**
	 * Gets a random point on the circumference of a unit circle.
	 * @returns
	 */
	static onUnitCircle(): Vector2 {
		const angle = Math.random() * Math.PI * 2;

		return {
			x: Math.cos(angle),
			y: Math.sin(angle),
		};
	}

	/**
	 * Gets a random point on the surface of a unit sphere.
	 * @returns
	 */
	static onUnitSphere(): Vector3 {
		const u = Math.random();
		const v = Math.random();

		const theta = u * 2 * Math.PI;
		const phi = Math.acos(2 * v - 1);

		const sinPhi = Math.sin(phi);

		return {
			x: sinPhi * Math.cos(theta),
			y: sinPhi * Math.sin(theta),
			z: Math.cos(phi),
		};
	}
}
