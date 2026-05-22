import { Player, RawMessage } from "@minecraft/server";

/**
 * Title command utility functions.
 */
export class TitleUtils {
	/**
	 * Sends a title message to the player.
	 * @param player Target player.
	 * @param title The title text.
	 * @param subtitle Optional subtitle.
	 */
	static title(player: Player, title: string, subtitle?: string) {
		if (subtitle) {
			player.runCommand(`title @s title ${title} subtitle ${subtitle}`);
		} else {
			player.runCommand(`title @s title ${title}`);
		}
	}

	/**
	 * Sends a raw title message to the player.
	 * @param player Target player.
	 * @param title The title text.
	 * @param subtitle Optional subtitle.
	 */
	static titleRaw(player: Player, title: RawMessage, subtitle?: RawMessage) {
		if (subtitle) {
			player.runCommand(`titleraw @s title ${JSON.stringify(title)} subtitle ${JSON.stringify(subtitle)}`);
		} else {
			player.runCommand(`titleraw @s title ${JSON.stringify(title)}`);
		}
	}

	/**
	 * Sends an actionbar message to the player.
	 * @param player
	 * @param message
	 */
	static actionbar(player: Player, message: string) {
		player.runCommand(`title @s actionbar ${message}`);
	}

	/**
	 * Sends a raw actionbar message to the player.
	 * @param player
	 * @param message
	 */
	static actionbarRaw(player: Player, message: RawMessage) {
		player.runCommand(`titleraw @s actionbar ${JSON.stringify(message)}`);
	}
}
