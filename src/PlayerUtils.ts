import {
	Entity,
	EntityComponentTypes,
	EquipmentSlot,
	GameMode,
	ItemStack,
	Player,
	Vector3,
	world,
} from "@minecraft/server";
import { Mathn } from "./Mathn";
import { InventoryUtils } from "./InventoryUtils";
import { ItemStackUtils } from "./ItemStackUtils";

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
	 * Gets a player by their name.
	 * @param name
	 * @returns
	 */
	static getByName(name: string): Player | undefined {
		for (const player of world.getPlayers()) {
			if (player.name === name) {
				return player;
			}
		}
		return undefined;
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
	static setItemMainhand(itemStack: ItemStack | undefined, player: Player) {
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
	static setItemOffhand(itemStack: ItemStack | undefined, player: Player) {
		player.getComponent(EntityComponentTypes.Equippable)?.setEquipment(EquipmentSlot.Offhand, itemStack);
	}

	/**
	 * Gets the item in the specified slot of the player.
	 * @param player
	 * @param slot
	 * @returns
	 */
	static getEquipment(player: Player, slot: EquipmentSlot): ItemStack | undefined {
		return player.getComponent(EntityComponentTypes.Equippable)?.getEquipment(slot);
	}

	/**
	 * Sets the item in the specified slot of the player.
	 * @param player
	 * @param slot
	 * @param itemStack
	 */
	static setEquipment(player: Player, slot: EquipmentSlot, itemStack: ItemStack | undefined) {
		player.getComponent(EntityComponentTypes.Equippable)?.setEquipment(slot, itemStack);
	}

	static getEquipmentHead(player: Player): ItemStack | undefined {
		return this.getEquipment(player, EquipmentSlot.Head);
	}

	static setEquipmentHead(player: Player, itemStack: ItemStack | undefined) {
		this.setEquipment(player, EquipmentSlot.Head, itemStack);
	}

	static getEquipmentChest(player: Player): ItemStack | undefined {
		return this.getEquipment(player, EquipmentSlot.Chest);
	}

	static setEquipmentChest(player: Player, itemStack: ItemStack | undefined) {
		this.setEquipment(player, EquipmentSlot.Chest, itemStack);
	}

	static getEquipmentLegs(player: Player): ItemStack | undefined {
		return this.getEquipment(player, EquipmentSlot.Legs);
	}

	static setEquipmentLegs(player: Player, itemStack: ItemStack | undefined) {
		this.setEquipment(player, EquipmentSlot.Legs, itemStack);
	}

	static getEquipmentFeet(player: Player): ItemStack | undefined {
		return this.getEquipment(player, EquipmentSlot.Feet);
	}

	static setEquipmentFeet(player: Player, itemStack: ItemStack | undefined) {
		this.setEquipment(player, EquipmentSlot.Feet, itemStack);
	}

	/**
	 * Removes one count of the item in the mainhand of the player.
	 * @param player
	 * @returns
	 */
	static removeOneInMainHand(player: Player): boolean {
		const itemStack = this.getItemMainhand(player);
		if (!itemStack) return false;

		const newItem = ItemStackUtils.removeOne(itemStack);
		this.setItemMainhand(newItem, player);
		return true;
	}

	/**
	 * Removes one count of the item in the offhand of the player.
	 * @param player
	 * @returns
	 */
	static removeOneInOffHand(player: Player): boolean {
		const itemStack = this.getItemOffhand(player);
		if (!itemStack) return false;

		const newItem = ItemStackUtils.removeOne(itemStack);
		this.setItemOffhand(newItem, player);
		return true;
	}

	/**
	 * Gets the current health of the player.
	 * @param player
	 * @returns
	 */
	static getHealth(player: Player): number {
		return player.getComponent(EntityComponentTypes.Health)?.currentValue ?? 0;
	}

	/**
	 * Sets the health of the player.
	 * @param amount
	 * @param player
	 */
	static setHealth(player: Player, amount: number) {
		const health = player.getComponent(EntityComponentTypes.Health);
		if (health) {
			amount = Mathn.clamp(amount, 0, health.effectiveMax);
			health.setCurrentValue(amount);
		}
	}

	/**
	 * Gets the entity the player is riding on if it matches the given typeId.
	 * @param typeId The rideable entity to check.
	 * @returns The entity if the player is riding on it.
	 */
	static getRiddenEntity(player: Player): Entity | undefined {
		return player.getComponent(EntityComponentTypes.Riding)?.entityRidingOn;
	}

	/**
	 * Sets the item in the player's inventory at the specified slot index.
	 * @param player
	 * @param slot
	 * @param itemStack
	 */
	static setInventoryItem(player: Player, slot: number, itemStack: ItemStack): void {
		player.getComponent(EntityComponentTypes.Inventory)?.container?.setItem(slot, itemStack);
	}

	/**
	 * Adds the item to the player's inventory, but if full, drops it in the world.
	 * @param player
	 * @param itemStack
	 * @returns
	 */
	static addInventoryItem(player: Player, itemStack: ItemStack): void {
		const container = player.getComponent(EntityComponentTypes.Inventory)?.container;
		if (container) {
			if (container.emptySlotsCount !== 0) {
				container.addItem(itemStack);
			} else {
				player.dimension.spawnItem(itemStack, player.location);
			}
		}
	}

	/**
	 * Checks if the player is within the given area box.
	 * @param player
	 * @param corner1
	 * @param corner2
	 * @returns
	 */
	static isWithinAreaBox(player: Player, corner1: Vector3, corner2: Vector3): boolean {
		if (!player) return false;

		const { x, y, z } = player.location;

		const minX = Math.min(corner1.x, corner2.x);
		const maxX = Math.max(corner1.x, corner2.x);

		const minY = Math.min(corner1.y, corner2.y);
		const maxY = Math.max(corner1.y, corner2.y);

		const minZ = Math.min(corner1.z, corner2.z);
		const maxZ = Math.max(corner1.z, corner2.z);

		return x >= minX && x <= maxX && y >= minY && y <= maxY && z >= minZ && z <= maxZ;
	}
}
