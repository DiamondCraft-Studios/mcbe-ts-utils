import { Entity, EntityComponentTypes, EquipmentSlot, GameMode, ItemStack, Player } from "@minecraft/server";

/**
 * Player utility functions.
 */
export class PlayerUtils {
	static isInSurvivalMode(player: Player): boolean {
		return player.getGameMode() === GameMode.Survival;
	}
	static isInAdventureMode(player: Player): boolean {
		return player.getGameMode() === GameMode.Adventure;
	}
	static isInCreativeMode(player: Player): boolean {
		return player.getGameMode() === GameMode.Creative;
	}
	static isInSpectatorMode(player: Player): boolean {
		return player.getGameMode() === GameMode.Spectator;
	}
	/**
	 * Gets the item in the main hand of the player.
	 * @param player
	 * @returns The item in the main hand of the player.
	 */
	static getItemMainhand(player: Player): ItemStack | undefined {
		return player.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand);
	}
	/**
	 * Sets the item in the main hand of the player.
	 * @param itemStack
	 * @param player
	 */
	static setItemMainhand(itemStack: ItemStack, player: Player) {
		player.getComponent(EntityComponentTypes.Equippable)?.setEquipment(EquipmentSlot.Mainhand, itemStack);
	}
	/**
	 * Gets the item in the off hand of the player.
	 * @param player
	 * @returns
	 */
	static getItemOffhand(player: Player): ItemStack | undefined {
		return player.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Offhand);
	}
	/**
	 * Sets the item in the off hand of the player.
	 * @param itemStack
	 * @param player
	 */
	static setItemOffhand(itemStack: ItemStack, player: Player) {
		player.getComponent(EntityComponentTypes.Equippable)?.setEquipment(EquipmentSlot.Offhand, itemStack);
	}
	/**
	 * Gets the entity the player is riding on if it matches the given typeId.
	 * @param typeId The rideable entity to check.
	 * @returns The entity if the player is riding on it.
	 */
	static getRiddenEntity(player: Player): Entity | undefined {
		return player.getComponent(EntityComponentTypes.Riding)?.entityRidingOn;
	}
}
