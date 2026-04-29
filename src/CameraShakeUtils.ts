import { Mathn } from "./Mathn";
import { Player } from "@minecraft/server";

export enum CameraShakeType {
	Positional,
	Rotational
}

export interface CameraShakeOptions {
	intensity?: number;
	seconds?: number;
	type?: CameraShakeType;
}

/**
 * Camera shake utility functions.
 */
export class CameraShakeUtils {
	static applyTo(player: Player, options: CameraShakeOptions) {
		const intensity = Mathn.clamp(options.intensity ?? 0.5, 0, 4);
		const seconds = Mathn.clamp(options.seconds ?? 1, 0.01, Number.MAX_SAFE_INTEGER);
		player.runCommand(`camerashake @s ${intensity} ${seconds} ${options.type ?? CameraShakeType.Positional}`);
	}
}