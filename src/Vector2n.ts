import { Mathn } from "./Mathn";
import { Vector2 } from "@minecraft/server";

/**
 * Common functions for Vector2 with TypeScript numbers.
 */
export class Vector2n {
	static readonly zero: Vector2 = { x: 0, y: 0 };
	static readonly one: Vector2 = { x: 1, y: 1 };
	static readonly onehalf: Vector2 = { x: 0.5, y: 0.5 };
	static readonly up: Vector2 = { x: 0, y: 1 };
	static readonly down: Vector2 = { x: 0, y: -1 };
	static readonly left: Vector2 = { x: -1, y: 0 };
	static readonly right: Vector2 = { x: 1, y: 0 };
	static readonly positiveInfinity: Vector2 = { x: Infinity, y: Infinity };
	static readonly negativeInfinity: Vector2 = { x: -Infinity, y: -Infinity };

	static distance(a: Vector2, b: Vector2): number {
		const dx = a.x - b.x;
		const dy = a.y - b.y;
		return Math.sqrt(dx * dx + dy * dy);
	}

	static distanceSqr(a: Vector2, b: Vector2): number {
		const dx = a.x - b.x;
		const dy = a.y - b.y;
		return dx * dx + dy * dy;
	}

	static magnitude(v: Vector2): number {
		return Math.sqrt(v.x * v.x + v.y * v.y);
	}

	static sqrMagnitude(vec: Vector2): number {
		return vec.x * vec.x + vec.y * vec.y;
	}

	static normalize(v: Vector2): Vector2 {
		const magnitude = Vector2n.magnitude(v);
		return {
			x: v.x / magnitude,
			y: v.y / magnitude,
		};
	}

	static normalizeThis(v: Vector2): void {
		const magnitude = Vector2n.magnitude(v);
		v.x /= magnitude;
		v.y /= magnitude;
	}

	/**
	 * Halfs the vector.
	 * @param v
	 * @returns
	 */
	static half(v: Vector2): Vector2 {
		return {
			x: v.x * 0.5,
			y: v.y * 0.5,
		};
	}

	static lerp(a: Vector2, b: Vector2, t: number): Vector2 {
		t = Mathn.clamp01(t);
		return {
			x: a.x + (b.x - a.x) * t,
			y: a.y + (b.y - a.y) * t,
		};
	}

	static lerpUnclamped(a: Vector2, b: Vector2, t: number): Vector2 {
		return {
			x: a.x + (b.x - a.x) * t,
			y: a.y + (b.y - a.y) * t,
		};
	}

	static inverseLerp(a: Vector2, b: Vector2, value: Vector2): Vector2 {
		return {
			x: Mathn.inverseLerp(a.x, b.x, value.x),
			y: Mathn.inverseLerp(a.y, b.y, value.y),
		};
	}

	static sum(...vecs: Vector2[]): Vector2 {
		let x = 0,
			y = 0;

		for (let i = 0; i < vecs.length; i++) {
			const v = vecs[i];
			x += v.x;
			y += v.y;
		}

		return { x, y };
	}

	static average(...vecs: Vector2[]): Vector2 {
		if (vecs.length === 0) return { x: 0, y: 0 };
		const sum = this.sum(...vecs);
		return {
			x: sum.x / vecs.length,
			y: sum.y / vecs.length,
		};
	}

	/**
	 * Adds two vectors component-wise.
	 * @param a
	 * @param b
	 * @returns
	 */
	static add(a: Vector2, b: Vector2): Vector2 {
		return {
			x: a.x + b.x,
			y: a.y + b.y,
		};
	}

	/**
	 * Adds the scalar value to each component of the vector.
	 */
	static addScalar(v: Vector2, s: number): Vector2 {
		return {
			x: v.x + s,
			y: v.y + s,
		};
	}

	/**
	 * Subtracts two vectors component-wise.
	 * @param a
	 * @param b
	 * @returns
	 */
	static subtract(a: Vector2, b: Vector2): Vector2 {
		return {
			x: a.x - b.x,
			y: a.y - b.y,
		};
	}

	/**
	 * Subtracts the scalar value from each component of the vector.
	 * @param v
	 * @param s
	 * @returns
	 */
	static subtractScalar(v: Vector2, s: number): Vector2 {
		return {
			x: v.x - s,
			y: v.y - s,
		};
	}

	/**
	 * Multiplies each component of the vector by the scalar value.
	 * @param a
	 * @param s
	 * @returns
	 */
	static multiply(a: Vector2, s: number): Vector2 {
		return {
			x: a.x * s,
			y: a.y * s,
		};
	}

	/**
	 * Multiplies two vectors component-wise.
	 * @param v
	 * @param s
	 * @returns
	 */
	static multiplyVectors(a: Vector2, b: Vector2): Vector2 {
		return {
			x: a.x * b.x,
			y: a.y * b.y,
		};
	}

	/**
	 * Divides each component of the vector by the scalar value.
	 * @param a
	 * @param b
	 * @returns
	 */
	static divide(a: Vector2, s: number): Vector2 {
		return {
			x: a.x / s,
			y: a.y / s,
		};
	}

	/**
	 * Divides two vectors component-wise.
	 * @param a
	 * @param b
	 * @returns
	 */
	static divideVectors(a: Vector2, b: Vector2): Vector2 {
		return {
			x: a.x / b.x,
			y: a.y / b.y,
		};
	}

	static dot(a: Vector2, b: Vector2): number {
		return a.x * b.x + a.y * b.y;
	}
	/**
	 * Returns a copy of the vector with its magnitude clamped to the minimum and maximum values.
	 * @param v 
	 * @param min 
	 * @param max 
	 * @returns 
	 */
	static clamp(v: Vector2, min: Vector2, max: Vector2): Vector2 {
		return {
			x: Mathn.clamp(v.x, min.x, max.x),
			y: Mathn.clamp(v.y, min.y, max.y),
		};
	}
	/**
	 * Returns a copy of the vector with its magnitude clamped to the maximum length.
	 * @param v 
	 * @param maxLength 
	 * @returns 
	 */
	static clampMagnitude(v: Vector2, maxLength: number): Vector2 {
		const sqrMagnitude = Vector2n.sqrMagnitude(v);
		const flag = sqrMagnitude > maxLength * maxLength;
		if (flag)
		{
			const num = Math.sqrt(sqrMagnitude);
			const num2 = v.x / num;
			const num3 = v.y / num;
			return {
				x: num2 * maxLength,
				y: num3 * maxLength,
			};
		}
		else
		{
			return v;
		}
	}

	static ceil(v: Vector2): Vector2 {
		return {
			x: Math.ceil(v.x),
			y: Math.ceil(v.y),
		};
	}

	static floor(v: Vector2): Vector2 {
		return {
			x: Math.floor(v.x),
			y: Math.floor(v.y),
		};
	}

	static equals(a: Vector2, b: Vector2): boolean {
		return a.x === b.x && a.y === b.y;
	}

	static approximately(a: Vector2, b: Vector2): boolean {
		return Math.abs(b.x - a.x) < Mathn.Epsilon && Math.abs(b.y - a.y) < Mathn.Epsilon;
	}

	static isGreater(left: Vector2, right: Vector2): boolean {
		return left.x > right.x && left.y > right.y;
	}

	static isLess(left: Vector2, right: Vector2): boolean {
		return left.x < right.x && left.y < right.y;
	}

	static reflect(inDirection: Vector2, inNormal: Vector2): Vector2 {
		const num = -2 * Vector2n.dot(inNormal, inDirection);
		return {
			x: num * inNormal.x + inDirection.x,
			y: num * inNormal.y + inDirection.y,
		};
	}

	static perpendicular(inDirection: Vector2): Vector2 {
		return {
			x: -inDirection.y,
			y: inDirection.x,
		};
	}

	static project(vector: Vector2, onNormal: Vector2): Vector2 {
		const num = Vector2n.dot(onNormal, onNormal);
		const flag = num < Mathn.Epsilon;
		let result;
		if (flag) {
			result = Vector2n.zero;
		} else {
			const num2 = Vector2n.dot(vector, onNormal) / num;
			result = {
				x: onNormal.x * num2,
				y: onNormal.y * num2,
			};
		}
		return result;
	}

	static angle(from: Vector2, to: Vector2): number {
		let num = Vector2n.sqrMagnitude(from) * Vector2n.sqrMagnitude(to);
		const flag = num < 1E-30;
		if (flag)
		{
			return 0;
		}
		else
		{
			num = Math.sqrt(num);
			const num2 = Mathn.clamp(Vector2n.dot(from, to) / num, -1, 1);
			return Math.acos(num2) * Mathn.Rad2Deg;
		}
	}

	static signedAngle(from: Vector2, to: Vector2)
	{
		const num = Vector2n.angle(from, to);
		const num2 = Math.sign(from.x * to.y - from.y * to.x);
		return num * num2;
	}

	static min(lhs: Vector2, rhs: Vector2): Vector2 {
		return {
			x: Math.min(lhs.x, rhs.x),
			y: Math.min(lhs.y, rhs.y),
		};
	}

	static mins(...vecs: Vector2[]): Vector2 {
		let result: Vector2 = { x: Infinity, y: Infinity };
		for (const vector of vecs) {
			result = Vector2n.min(result, vector);
		}
		return result;
	}

	static max(a: Vector2, b: Vector2): Vector2 {
		return {
			x: Math.max(a.x, b.x),
			y: Math.max(a.y, b.y),
		};
	}

	static maxs(...vectors: Vector2[]): Vector2 {
		let result: Vector2 = { x: -Infinity, y: -Infinity };
		for (const vector of vectors) {
			result = Vector2n.max(result, vector);
		}
		return result;
	}

	static toId(vec: Vector2, delimiter = ","): string {
		return `${vec.x}${delimiter}${vec.y}`;
	}

	static fromId(id: string, delimiter = ","): Vector2 {
		const [x, y] = id.split(delimiter).map(Number);
		return { x, y };
	}

	static toString(vec: Vector2): string {
		return `(${vec.x}, ${vec.y})`;
	}

	static fromString(val: string, delimiter = " "): Vector2 {
		const [x, y] = val.trim().split(delimiter).map(Number);
		return { x, y };
	}

	/**
	 * Converts Vector2 to a string usable in commands.
	 * e.g., /setblock `1 2 3` stone
	 * @param vec
	 * @returns
	 */
	static toCommandString(vec: Vector2): string {
		return `${vec.x} ${vec.y}`;
	}

	/**
	 * Converts Vector2 to a string usable in command selector arguments.
	 * e.g., /execute as \@p[`x=1,y=2`] stone
	 * @param vec
	 * @returns
	 */
	static toSelectorArgs(vec: Vector2): string {
		return `x=${vec.x},y=${vec.y}`;
	}

	/**
	 * Converts Vector2 to a string usable in command selector arguments as delta.
	 * e.g., /execute as \@p[`dx=1,dy=2`] stone
	 * @param vec
	 * @returns
	 */
	static toSelectorArgsDelta(vec: Vector2): string {
		return `dx=${vec.x},dy=${vec.y}`;
	}

	static toFixedString(vec: Vector2, precision: number = 0): string {
		return `(${vec.x.toFixed(precision)}, ${vec.y.toFixed(precision)})`;
	}

	static isNaN(vec: Vector2): boolean {
		return isNaN(vec.x) || isNaN(vec.y);
	}

	static isFinite(vec: Vector2): boolean {
		return isFinite(vec.x) && isFinite(vec.y);
	}

	static isValid(vec: Vector2): boolean {
		return !this.isNaN(vec) && this.isFinite(vec);
	}
}
