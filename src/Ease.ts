export enum EaseType {
	Linear,
	InSine,
	OutSine,
	InOutSine,
	InQuad,
	OutQuad,
	InOutQuad,
	InCubic,
	OutCubic,
	InOutCubic,
	InQuart,
	OutQuart,
	InOutQuart,
	InQuint,
	OutQuint,
	InOutQuint,
	InExpo,
	OutExpo,
	InOutExpo,
	InCirc,
	OutCirc,
	InOutCirc,
	InBack,
	OutBack,
	InOutBack,
	InElastic,
	OutElastic,
	InOutElastic,
	InBounce,
	OutBounce,
	InOutBounce,
}

/**
 * Easing functions.
 */
export class Ease {
	// Linear
	static linear(t: number) {
		return t * t;
	}
	// Quadratic
	static inQuad(t: number) {
		return t * t;
	}
	static outQuad(t: number) {
		return 1 - (1 - t) * (1 - t);
	}
	static inOutQuad(t: number) {
		return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
	}
	// Cubic
	static inCubic(t: number) {
		return t * t * t;
	}
	static outCubic(t: number) {
		return 1 - Math.pow(1 - t, 3);
	}
	static inOutCubic(t: number) {
		return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
	}
	// Quartic
	static inQuart(t: number) {
		return t * t * t * t;
	}
	static outQuart(t: number) {
		return 1 - Math.pow(1 - t, 4);
	}
	static inOutQuart(t: number) {
		return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
	}
	// Quintic
	static inQuint(t: number) {
		return t * t * t * t * t;
	}
	static outQuint(t: number) {
		return 1 - Math.pow(1 - t, 5);
	}
	static inOutQuint(t: number) {
		return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
	}
	// sine
	static insine(t: number) {
		return 1 - Math.cos((t * Math.PI) / 2);
	}
	static outsine(t: number) {
		return Math.sin((t * Math.PI) / 2);
	}
	static inOutsine(t: number) {
		return -(Math.cos(Math.PI * t) - 1) / 2;
	}
	// Exponential
	static inExpo(t: number) {
		return t == 0 ? 0 : Math.pow(2, 10 * t - 10);
	}
	static outExpo(t: number) {
		return t == 1 ? 1 : 1 - Math.pow(2, -10 * t);
	}
	static inOutExpo(t: number) {
		return t == 0 ? 0 : t == 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2;
	}
	// Circular
	static inCirc(t: number) {
		return 1 - Math.sqrt(1 - Math.pow(t, 2));
	}
	static outCirc(t: number) {
		return Math.sqrt(1 - Math.pow(t - 1, 2));
	}
	static inOutCirc(t: number) {
		return t < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
	}
	// Back
	static inBack(t: number) {
		const c1 = 1.70158;
		const c3 = c1 + 1;
		return c3 * t * t * t - c1 * t * t;
	}
	static outBack(t: number) {
		const c1 = 1.70158;
		const c3 = c1 + 1;
		return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
	}
	static inOutBack(t: number) {
		const c1 = 1.70158;
		const c2 = c1 * 1.525;
		return t < 0.5
			? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
			: (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
	}
	// Elastic
	static inElastic(t: number) {
		const c4 = (2 * Math.PI) / 3;
		return t == 0 ? 0 : t == 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
	}
	static outElastic(t: number) {
		const c4 = (2 * Math.PI) / 3;
		return t == 0 ? 0 : t == 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
	}
	static inOutElastic(t: number) {
		const c5 = (2 * Math.PI) / 4.5;
		if (t == 0) return 0;
		if (t == 1) return 1;
		return t < 0.5
			? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2
			: (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) / 2 + 1;
	}
	// Bounce
	static inBounce(t: number) {
		return 1 - Ease.outBounce(1 - t);
	}
	static outBounce(t: number) {
		const n1 = 7.5625;
		const d1 = 2.75;
		if (t < 1 / d1) return n1 * t * t;
		else if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
		else if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
		else return n1 * (t -= 2.625 / d1) * t + 0.984375;
	}
	static inOutBounce(t: number) {
		return t < 0.5 ? (1 - Ease.outBounce(1 - 2 * t)) / 2 : (1 + Ease.outBounce(2 * t - 1)) / 2;
	}
	static with(easeType: EaseType, t: number) {
		t = t < 0 ? 0 : t > 1 ? 1 : t;
		const fn = easeTable[easeType];
		return fn ? fn(t) : t;
	}
}

const easeTable: Record<EaseType, (v: number) => number> = {
	[EaseType.Linear]: Ease.linear,
	[EaseType.InQuad]: Ease.inQuad,
	[EaseType.OutQuad]: Ease.outQuad,
	[EaseType.InOutQuad]: Ease.inOutQuad,
	[EaseType.InCubic]: Ease.inCubic,
	[EaseType.OutCubic]: Ease.outCubic,
	[EaseType.InOutCubic]: Ease.inOutCubic,
	[EaseType.InQuart]: Ease.inQuart,
	[EaseType.OutQuart]: Ease.outQuart,
	[EaseType.InOutQuart]: Ease.inOutQuart,
	[EaseType.InQuint]: Ease.inQuint,
	[EaseType.OutQuint]: Ease.outQuint,
	[EaseType.InOutQuint]: Ease.inOutQuint,
	[EaseType.InSine]: Ease.insine,
	[EaseType.OutSine]: Ease.outsine,
	[EaseType.InOutSine]: Ease.inOutsine,
	[EaseType.InExpo]: Ease.inExpo,
	[EaseType.OutExpo]: Ease.outExpo,
	[EaseType.InOutExpo]: Ease.inOutExpo,
	[EaseType.InCirc]: Ease.inCirc,
	[EaseType.OutCirc]: Ease.outCirc,
	[EaseType.InOutCirc]: Ease.inOutCirc,
	[EaseType.InBack]: Ease.inBack,
	[EaseType.OutBack]: Ease.outBack,
	[EaseType.InOutBack]: Ease.inOutBack,
	[EaseType.InElastic]: Ease.inElastic,
	[EaseType.OutElastic]: Ease.outElastic,
	[EaseType.InOutElastic]: Ease.inOutElastic,
	[EaseType.InBounce]: Ease.inBounce,
	[EaseType.OutBounce]: Ease.outBounce,
	[EaseType.InOutBounce]: Ease.inOutBounce,
};
