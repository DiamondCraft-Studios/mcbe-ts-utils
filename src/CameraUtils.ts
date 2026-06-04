import { Ease, EaseType } from "./Ease";
import { Entity, Player, Vector2, Vector3 } from "@minecraft/server";

import { Vector3n } from "./Vector3n";

export interface CameraDollyOptions {
	/**
	 * Camera start position.
	 */
	startPos: Vector3;
	/**
	 * Camera end position.
	 */
	endPos: Vector3;
	/**
	 * Default is 1.0 if unspecified.
	 */
	easeTime?: number;
	/**
	 * Default is linear if unspecified.
	 */
	easeType?: EaseType;
	/**
	 * Entity or position to face at the start of the animation.
	 */
	startFacing?: Entity | Vector3;
	/**
	 * Entity or position to face at the end of the animation.
	 */
	endFacing?: Entity | Vector3;
	/**
	 * Added to the start facing position.
	 */
	startFacingOffset?: Vector3;
	/**
	 * Added to the end facing position.
	 */
	endFacingOffset?: Vector3;
}

export interface CameraPanOptions {
	/**
	 * Camera initial position to pan from.
	 */
	initialPos: Vector3;
	/**
	 * Entity or position to pan from at the start of the animation.
	 */
	startFacing: Entity | Vector3;
	/**
	 * Entity or position to pan to at the end of the animation.
	 */
	endFacing: Entity | Vector3;
	/**
	 * Added to the start facing position.
	 */
	startFacingOffset?: Vector3;
	/**
	 * Added to the end facing position.
	 */
	endFacingOffset?: Vector3;
	/**
	 * Default is 1.0 if unspecified.
	 */
	easeTime?: number;
	/**
	 * Default is linear if unspecified.
	 */
	easeType?: EaseType;
}

export interface CameraStaticOptions {
	pos?: Vector3;
	rot?: Vector2;
	/**
	 * Entity or position to face.
	 */
	facing?: Entity | Vector3;
	/**
	 * Added to the facing position.
	 */
	facingOffset?: Vector3;
}

/**
 * Functions for doing simple camera animations.
 */
export class CameraUtils {
	/**
	 * Sets the player's camera to "minecraft:free".
	 * @param player
	 */
	static setFree(player: Player) {
		player.camera.setCamera("minecraft:free");
	}

	/**
	 * Clears the player's current camera preset.
	 * @param player
	 */
	static clear(player: Player) {
		player.camera.clear();
	}

	/**
	 * Fades the camera to the given color.
	 * @param player
	 * @param fadeInSeconds
	 * @param holdSeconds
	 * @param fadeOutSeconds
	 * @param color
	 */
	static fade(player: Player, fadeInSeconds: number, holdSeconds: number, fadeOutSeconds: number, color?: Vector3) {
		var c = Vector3n.clamp(color ?? { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 });
		player.camera.fade({
			fadeTime: {
				fadeInTime: fadeInSeconds,
				holdTime: holdSeconds,
				fadeOutTime: fadeOutSeconds,
			},
			fadeColor: { red: c.x, green: c.y, blue: c.z },
		});
	}

	/**
	 * Sets the player's camera to "minecraft:free" with the specified position and rotation.
	 * @param player
	 * @param options
	 */
	static setStatic(player: Player, options: CameraStaticOptions) {
		let command = `camera @s set minecraft:free`;

		if (options.pos) {
			command += ` pos ${options.pos.x} ${options.pos.y} ${options.pos.z}`;
		}

		if (options.rot && options.facing) {
			throw new Error("Cannot specify both rot and facing in mincraft:free camera options.");
		}

		if (options.facing) {
			let facing = options.facing instanceof Entity ? options.facing.location : options.facing;
			if (options.facingOffset) {
				facing = Vector3n.add(facing, options.facingOffset);
			}
			command += ` facing ${facing.x} ${facing.y} ${facing.z}`;
		} else if (options.rot) {
			command += ` rot ${options.rot.x} ${options.rot.y}`;
		}

		player.runCommand(command);
	}

	/**
	 * Moves the camera from a start position to an end position, with an optional tracking target.
	 * @param player
	 * @param options
	 */
	static dolly(player: Player, options: CameraDollyOptions) {
		let command1 =
			`camera @s set minecraft:free` + ` pos ${options.startPos.x} ${options.startPos.y} ${options.startPos.z}`;

		if (options.startFacing) {
			let facing = options.startFacing instanceof Entity ? options.startFacing.location : options.startFacing;
			if (options.startFacingOffset) {
				facing = Vector3n.add(facing, options.startFacingOffset);
			}
			command1 += ` facing ${facing.x} ${facing.y} ${facing.z}`;
		}

		player.runCommand(command1);

		let command2 =
			`camera @s set minecraft:free` +
			` ease ${options.easeTime ?? 1.0} ${Ease.toCommandString(options.easeType ?? EaseType.Linear)} ` +
			` pos ${options.endPos.x} ${options.endPos.y} ${options.endPos.z}`;

		if (options.endFacing) {
			let facing = options.endFacing instanceof Entity ? options.endFacing.location : options.endFacing;
			if (options.endFacingOffset) {
				facing = Vector3n.add(facing, options.endFacingOffset);
			}
			command2 += ` facing ${facing.x} ${facing.y} ${facing.z}`;
		}

		player.runCommand(command2);
	}

	/**
	 * Pans the camera by changing only the facing direction.
	 * @param player
	 * @param options
	 */
	static pan(player: Player, options: CameraPanOptions) {
		let startFace = options.startFacing instanceof Entity ? options.startFacing.location : options.startFacing;
		if (options.startFacingOffset) {
			startFace = Vector3n.add(startFace, options.startFacingOffset);
		}

		let command1 =
			`camera @s set minecraft:free` +
			` pos ${options.initialPos.x} ${options.initialPos.y} ${options.initialPos.z}` +
			` facing ${startFace.x} ${startFace.y} ${startFace.z}`;

		player.runCommand(command1);

		let endFace = options.endFacing instanceof Entity ? options.endFacing.location : options.endFacing;
		if (options.endFacingOffset) {
			endFace = Vector3n.add(endFace, options.endFacingOffset);
		}

		let command2 =
			`camera @s set minecraft:free` +
			` ease ${options.easeTime ?? 1.0} ${Ease.toCommandString(options.easeType ?? EaseType.Linear)} ` +
			` facing ${endFace.x} ${endFace.y} ${endFace.z}`;

		player.runCommand(command2);
	}
}
