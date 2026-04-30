import { Player, RawMessage } from "@minecraft/server";

/**
 * Title command utility functions.
 */
export class TitleUtils {
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
