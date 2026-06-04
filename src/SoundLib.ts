import { Dimension, Player, PlayerSoundOptions, Vector3, WorldSoundOptions, world } from "@minecraft/server";

const DEFAULT_SOUND_OPTIONS: PlaySoundOptions = {
	volume: 1,
	pitch: 1,
};

export interface PlaySoundOptions extends PlayerSoundOptions {}

export interface PlayPersonalSoundOptions extends PlaySoundOptions {
	non3dSoundName: string;
	actualSoundName: string;
}

/**
 * A utility class for playing sounds in various ways.
 */
export class SoundLib {
	/**
	 * Plays the sound to the target player.
	 * @param player
	 * @param soundName
	 * @param options
	 */
	static playTo(player: Player, soundName: string, options: PlaySoundOptions = DEFAULT_SOUND_OPTIONS) {
		player.playSound(soundName, options);
	}

	/**
	 * Plays the sound to all players except the specified ones.
	 * @param players
	 * @param soundName
	 * @param options
	 */
	static playToExcept(players: Player[], soundName: string, options: PlaySoundOptions = DEFAULT_SOUND_OPTIONS) {
		for (const player of world.getPlayers()) {
			if (!players.includes(player)) {
				this.playTo(player, soundName, options);
			}
		}
	}

	/**
	 * Plays the sound in specified dimension, at the specified location.
	 * @param dimension
	 * @param atLocation
	 * @param soundName
	 * @param options
	 */
	static playIn(
		dimension: Dimension,
		atLocation: Vector3,
		soundName: string,
		options: WorldSoundOptions = DEFAULT_SOUND_OPTIONS
	) {
		dimension.playSound(soundName, atLocation, options);
	}

	/**
	 * Plays the sound non-3D to the target player, but 3D to everyone else.
	 * @param player Player to play the non-3D sound to.
	 * @param options
	 */
	static playPersonalTo(player: Player, options: PlayPersonalSoundOptions) {
		this.playTo(player, options.non3dSoundName, options);
		this.playToExcept([player], options.actualSoundName, options);
	}
}
