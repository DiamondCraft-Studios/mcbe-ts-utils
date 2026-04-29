/**
 * Wrapper class for common math functions.
 */
export class Mathn {
	static readonly Epsilon = Number.EPSILON;
	static readonly Deg2Rad = 0.017453292;
	static readonly Rad2Deg = 57.29578;

	private static readonly ApproxEpsilon = Mathn.Epsilon * 8;

	static sin(value: number): number {
		return Math.sin(value);
	}

	static cos(value: number): number {
		return Math.cos(value);
	}
	
	static tan(value: number): number {
		return Math.tan(value);
	}

	static asin(value: number): number {
		return Math.asin(value);
	}

	static acos(value: number): number {
		return Math.acos(value);
	}

	static atan(value: number): number {
		return Math.atan(value);
	}

	static atan2(y: number, x: number): number {
		return Math.atan2(y, x);
	}

	static sqrt(value: number): number {
		return Math.sqrt(value);
	}

	static abs(value: number): number {
		return Math.abs(value);
	}

	static min(...values: number[]): number {
		return Math.min(...values);
	}

	static max(...values: number[]): number {
		return Math.max(...values);
	}

	static exp(value: number): number {
		return Math.exp(value);
	}

	static log(value: number): number {
		return Math.log(value);
	}

	static log10(value: number): number {
		return Math.log10(value);
	}

	static ceil(value: number): number {
		return Math.ceil(value);
	}

	static floor(value: number): number {
		return Math.floor(value);
	}

	static round(value: number): number {
		return Math.round(value);
	}

	static sign(value: number): number {
		return Math.sign(value);
	}
	
	static clamp(value: number, min: number, max: number): number {
		return Math.min(Math.max(value, min), max);
	}

	static clamp01(value: number): number {
		if (value < 0) return 0;
		if (value > 1) return 1;
		return value;
	}

	static lerp(a: number, b: number, t: number): number {
		return a + (b - a) * Mathn.clamp01(t);
	}

	static lerpUnclamped(a: number, b: number, t: number): number {
		return a + (b - a) * t;
	}

	static lerpAngle(a: number, b: number, t: number) {
		let num = Mathn.repeat(b - a, 360);
		if (num > 180) {
			num -= 360;
		}
		return a + num * Mathn.clamp01(t);
	}

	static sum(...values: number[]): number {
		let sum = 0;
		for (const value of values) {
			sum += value;
		}
		return sum;
	}

	static average(...values: number[]): number {
		return Mathn.sum(...values) / values.length;
	}

	static smoothStep(from: number, to: number, t: number): number {
		t = Mathn.clamp01(t);
		t = -2 * t * t * t + 3 * t * t;
		return to * t + from * (1 - t);
	}

	static approximately(a: number, b: number): boolean {
		return Math.abs(b - a) < Mathn.max(1e-6 * Mathn.max(Math.abs(a), Math.abs(b)), Mathn.ApproxEpsilon);
	}

	static repeat(t: number, length: number): number {
		return Mathn.clamp(t - Math.floor(t / length) * length, 0, length);
	}

	static pingPong(t: number, length: number): number {
		t = Mathn.repeat(t, length * 2);
		return length - Math.abs(t - length);
	}

	static inverseLerp(a: number, b: number, value: number): number {
		if (a !== b) {
			return Mathn.clamp01((value - a) / (b - a));
		} else {
			return 0;
		}
	}

	static deltaAngle(current: number, target: number): number {
		let num = Mathn.repeat(target - current, 360);
		if (num > 180) {
			num -= 360;
		}
		return num;
	}

	static nextPowerOfTwo(value: number): number {
		const num = value - 1;
		const num2 = num | num >> 16;
		const num3 = num2 | num2 >> 8;
		const num4 = num3 | num3 >> 4;
		const num5 = num4 | num4 >> 2;
		return (num5 | num5 >> 1) + 1;
	}

	static closestPowerOfTwo(value: number): number {
		const num = Mathn.nextPowerOfTwo(value);
		const num2 = num >> 1;
		if (value - num2 < num - value)
		{
			return num2;
		}
		return num;
	}

	static isPowerOfTwo(value: number): boolean {
		return (value & (value - 1)) == 0;
	}
}
