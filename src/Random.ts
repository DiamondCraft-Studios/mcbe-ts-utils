import { Vector2, Vector3 } from "@minecraft/server";

/**
 * Common randomizer functions.
 */
export class Random {
	/**
	 * Returns a random number between the given min and max.
	 * @param minInclusive
	 * @param maxExclusive
	 * @returns
	 */
	static range(minInclusive: number, maxExclusive: number): number {
		return Math.floor(Math.random() * (maxExclusive - minInclusive)) + minInclusive;
	}
	/**
	 * Returns a random boolean.
	 * @returns
	 */
	static boolean(): boolean {
		return Math.random() < 0.5;
	}
	/**
	 * Gets a random element from the given array.
	 * @param array
	 * @returns
	 */
	static fromArray<T>(array: T[]): T | undefined {
		if (array.length === 0) return undefined;
		return array[Math.floor(Math.random() * array.length)];
	}
	/**
	 * Gets a random point inside a unit circle.
	 * @returns
	 */
	static insideUnitCircle(): Vector2 {
		const angle = Math.random() * Math.PI * 2;
		const radius = Math.sqrt(Math.random()); // important!

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
