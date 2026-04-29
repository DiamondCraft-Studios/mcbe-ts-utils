import { Mathn } from "./Mathn";
import { Vector3 } from "@minecraft/server";

/**
 * Common functions for Vector3 with TypeScript numbers.
 */
export class Vector3n {
	static readonly zero: Vector3 = { x: 0, y: 0, z: 0 };
	static readonly one: Vector3 = { x: 1, y: 1, z: 1 };
	static readonly onehalf: Vector3 = { x: 0.5, y: 0.5, z: 0.5 };
	static readonly up: Vector3 = { x: 0, y: 1, z: 0 };
	static readonly down: Vector3 = { x: 0, y: -1, z: 0 };
	static readonly left: Vector3 = { x: -1, y: 0, z: 0 };
	static readonly right: Vector3 = { x: 1, y: 0, z: 0 };
	static readonly forward: Vector3 = { x: 0, y: 0, z: 1 };
	static readonly back: Vector3 = { x: 0, y: 0, z: -1 };
	static readonly positiveInfinity: Vector3 = { x: Infinity, y: Infinity, z: Infinity };
	static readonly negativeInfinity: Vector3 = { x: -Infinity, y: -Infinity, z: -Infinity };

	static distance(a: Vector3, b: Vector3): number {
		const dx = a.x - b.x;
		const dy = a.y - b.y;
		const dz = a.z - b.z;
		return Math.sqrt(dx * dx + dy * dy + dz * dz);
	}

	static distanceSqr(a: Vector3, b: Vector3): number {
		const dx = a.x - b.x;
		const dy = a.y - b.y;
		const dz = a.z - b.z;
		return dx * dx + dy * dy + dz * dz;
	}

	static magnitude(v: Vector3): number {
		return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
	}

	static sqrMagnitude(vec: Vector3): number {
		return vec.x * vec.x + vec.y * vec.y + vec.z * vec.z;
	}

	static normalize(v: Vector3): Vector3 {
		const magnitude = Vector3n.magnitude(v);
		return {
			x: v.x / magnitude,
			y: v.y / magnitude,
			z: v.z / magnitude,
		};
	}

	static normalizeThis(v: Vector3): void {
		const magnitude = Vector3n.magnitude(v);
		v.x /= magnitude;
		v.y /= magnitude;
		v.z /= magnitude;
	}

	/**
	 * Halfs the vector.
	 * @param v
	 * @returns
	 */
	static half(v: Vector3): Vector3 {
		return {
			x: v.x * 0.5,
			y: v.y * 0.5,
			z: v.z * 0.5,
		};
	}

	static lerp(a: Vector3, b: Vector3, t: number): Vector3 {
		t = Mathn.clamp01(t);
		return {
			x: a.x + (b.x - a.x) * t,
			y: a.y + (b.y - a.y) * t,
			z: a.z + (b.z - a.z) * t,
		};
	}

	static lerpUnclamped(a: Vector3, b: Vector3, t: number): Vector3 {
		return {
			x: a.x + (b.x - a.x) * t,
			y: a.y + (b.y - a.y) * t,
			z: a.z + (b.z - a.z) * t,
		};
	}

	static inverseLerp(a: Vector3, b: Vector3, value: Vector3): Vector3 {
		return {
			x: Mathn.inverseLerp(a.x, b.x, value.x),
			y: Mathn.inverseLerp(a.y, b.y, value.y),
			z: Mathn.inverseLerp(a.z, b.z, value.z),
		};
	}

	static sum(...vecs: Vector3[]): Vector3 {
		let x = 0,
			y = 0,
			z = 0;

		for (let i = 0; i < vecs.length; i++) {
			const v = vecs[i];
			x += v.x;
			y += v.y;
			z += v.z;
		}

		return { x, y, z };
	}

	static average(...vecs: Vector3[]): Vector3 {
		if (vecs.length === 0) return { x: 0, y: 0, z: 0 };
		const sum = this.sum(...vecs);
		return {
			x: sum.x / vecs.length,
			y: sum.y / vecs.length,
			z: sum.z / vecs.length,
		};
	}

	/**
	 * Adds two vectors component-wise.
	 * @param a
	 * @param b
	 * @returns
	 */
	static add(a: Vector3, b: Vector3): Vector3 {
		return {
			x: a.x + b.x,
			y: a.y + b.y,
			z: a.z + b.z,
		};
	}

	/**
	 * Adds the scalar value to each component of the vector.
	 */
	static addScalar(v: Vector3, s: number): Vector3 {
		return {
			x: v.x + s,
			y: v.y + s,
			z: v.z + s,
		};
	}

	/**
	 * Subtracts two vectors component-wise.
	 * @param a
	 * @param b
	 * @returns
	 */
	static subtract(a: Vector3, b: Vector3): Vector3 {
		return {
			x: a.x - b.x,
			y: a.y - b.y,
			z: a.z - b.z,
		};
	}

	/**
	 * Subtracts the scalar value from each component of the vector.
	 * @param v
	 * @param s
	 * @returns
	 */
	static subtractScalar(v: Vector3, s: number): Vector3 {
		return {
			x: v.x - s,
			y: v.y - s,
			z: v.z - s,
		};
	}

	/**
	 * Multiplies each component of the vector by the scalar value.
	 * @param a
	 * @param s
	 * @returns
	 */
	static multiply(a: Vector3, s: number): Vector3 {
		return {
			x: a.x * s,
			y: a.y * s,
			z: a.z * s,
		};
	}

	/**
	 * Multiplies each component of the vector by the scalar value.
	 * @param v
	 * @param s
	 * @returns
	 */
	static scale(v: Vector3, s: number): Vector3 {
		return {
			x: v.x * s,
			y: v.y * s,
			z: v.z * s,
		};
	}

	/**
	 * Divides two vectors component-wise.
	 * @param a
	 * @param b
	 * @returns
	 */
	static divide(a: Vector3, b: Vector3): Vector3 {
		return {
			x: a.x / b.x,
			y: a.y / b.y,
			z: a.z / b.z,
		};
	}

	/**
	 * Divides each component of the vector by the scalar value.
	 * @param a
	 * @param b
	 * @returns
	 */
	static divideScalar(v: Vector3, s: number): Vector3 {
		return {
			x: v.x / s,
			y: v.y / s,
			z: v.z / s,
		};
	}

	static dot(a: Vector3, b: Vector3): number {
		return a.x * b.x + a.y * b.y + a.z * b.z;
	}

	static cross(a: Vector3, b: Vector3): Vector3 {
		return {
			x: a.y * b.z - a.z * b.y,
			y: a.z * b.x - a.x * b.z,
			z: a.x * b.y - a.y * b.x,
		};
	}

	/**
	 * Multiplies two vectors component-wise.
	 * @param v
	 * @param s
	 * @returns
	 */
	static hadamard(a: Vector3, b: Vector3): Vector3 {
		return {
			x: a.x * b.x,
			y: a.y * b.y,
			z: a.z * b.z,
		};
	}

	static clamp(v: Vector3, min: Vector3, max: Vector3): Vector3 {
		return {
			x: Mathn.clamp(v.x, min.x, max.x),
			y: Mathn.clamp(v.y, min.y, max.y),
			z: Mathn.clamp(v.z, min.z, max.z),
		};
	}

	static ceil(v: Vector3): Vector3 {
		return {
			x: Math.ceil(v.x),
			y: Math.ceil(v.y),
			z: Math.ceil(v.z),
		};
	}

	static floor(v: Vector3): Vector3 {
		return {
			x: Math.floor(v.x),
			y: Math.floor(v.y),
			z: Math.floor(v.z),
		};
	}

	static equals(a: Vector3, b: Vector3): boolean {
		return a.x === b.x && a.y === b.y && a.z === b.z;
	}

	static approximately(a: Vector3, b: Vector3): boolean {
		return (
			Math.abs(b.x - a.x) < Mathn.Epsilon &&
			Math.abs(b.y - a.y) < Mathn.Epsilon &&
			Math.abs(b.z - a.z) < Mathn.Epsilon
		);
	}

	static isGreater(left: Vector3, right: Vector3): boolean {
		return left.x > right.x && left.y > right.y && left.z > right.z;
	}

	static isLess(left: Vector3, right: Vector3): boolean {
		return left.x < right.x && left.y < right.y && left.z < right.z;
	}

	static reflect(inDirection: Vector3, inNormal: Vector3): Vector3 {
		const num = -2 * Vector3n.dot(inNormal, inDirection);
		return {
			x: num * inNormal.x + inDirection.x,
			y: num * inNormal.y + inDirection.y,
			z: num * inNormal.z + inDirection.z,
		};
	}

	static project(vector: Vector3, onNormal: Vector3): Vector3 {
		const num = Vector3n.dot(onNormal, onNormal);
		const flag = num < Mathn.Epsilon;
		let result;
		if (flag) {
			result = Vector3n.zero;
		} else {
			const num2 = Vector3n.dot(vector, onNormal) / num;
			result = {
				x: onNormal.x * num2,
				y: onNormal.y * num2,
				z: onNormal.z * num2,
			};
		}
		return result;
	}

	static angle(a: Vector3, b: Vector3): number {
		const dot = Vector3n.dot(Vector3n.normalize(a), Vector3n.normalize(b));
		return Math.acos(Mathn.clamp(dot, -1, 1)) * Mathn.Rad2Deg;
	}

	static min(lhs: Vector3, rhs: Vector3): Vector3 {
		return {
			x: Math.min(lhs.x, rhs.x),
			y: Math.min(lhs.y, rhs.y),
			z: Math.min(lhs.z, rhs.z),
		};
	}

	static mins(...vecs: Vector3[]): Vector3 {
		let result: Vector3 = { x: Infinity, y: Infinity, z: Infinity };
		for (const vector of vecs) {
			result = Vector3n.min(result, vector);
		}
		return result;
	}

	static max(a: Vector3, b: Vector3): Vector3 {
		return {
			x: Math.max(a.x, b.x),
			y: Math.max(a.y, b.y),
			z: Math.max(a.z, b.z),
		};
	}

	static maxs(...vectors: Vector3[]): Vector3 {
		let result: Vector3 = { x: -Infinity, y: -Infinity, z: -Infinity };
		for (const vector of vectors) {
			result = Vector3n.max(result, vector);
		}
		return result;
	}

	static toId(vec: Vector3, delimiter = ","): string {
		return `${vec.x}${delimiter}${vec.y}${delimiter}${vec.z}`;
	}

	static fromId(id: string, delimiter = ","): Vector3 {
		const [x, y, z] = id.split(delimiter).map(Number);
		return { x, y, z };
	}

	static toString(vec: Vector3): string {
		return `(${vec.x}, ${vec.y}, ${vec.z})`;
	}

	static fromString(val: string, delimiter = " "): Vector3 {
		const [x, y, z] = val.trim().split(delimiter).map(Number);
		return { x, y, z };
	}

	/**
	 * Converts Vector3 to a string usable in commands.
	 * e.g., /setblock `1 2 3` stone
	 * @param vec
	 * @returns
	 */
	static toCommandString(vec: Vector3): string {
		return `${vec.x} ${vec.y} ${vec.z}`;
	}

	/**
	 * Converts Vector3 to a string usable in command selector arguments.
	 * e.g., /execute as \@p[`x=1,y=2,z=3`] stone
	 * @param vec
	 * @returns
	 */
	static toSelectorArgs(vec: Vector3): string {
		return `x=${vec.x},y=${vec.y},z=${vec.z}`;
	}

	/**
	 * Converts Vector3 to a string usable in command selector arguments as delta.
	 * e.g., /execute as \@p[`dx=1,dy=2,dz=3`] stone
	 * @param vec
	 * @returns
	 */
	static toSelectorArgsDelta(vec: Vector3): string {
		return `dx=${vec.x},dy=${vec.y},dz=${vec.z}`;
	}

	static toFixedString(vec: Vector3, precision: number = 0): string {
		return `(${vec.x.toFixed(precision)}, ${vec.y.toFixed(precision)}, ${vec.z.toFixed(precision)})`;
	}

	static isNaN(vec: Vector3): boolean {
		return isNaN(vec.x) || isNaN(vec.y) || isNaN(vec.z);
	}

	static isFinite(vec: Vector3): boolean {
		return isFinite(vec.x) && isFinite(vec.y) && isFinite(vec.z);
	}

	static isValid(vec: Vector3): boolean {
		return !this.isNaN(vec) && this.isFinite(vec);
	}
}
