import { Container, EntityComponentTypes, ItemStack, Player } from "@minecraft/server";

/**
 * Inventory or container utility functions.
 */
export class InventoryUtils {
	/**
	 * Gets the inventory container of the given player.
	 * @param player
	 * @returns
	 */
	static getContainer(player: Player): Container | undefined {
		return player.getComponent(EntityComponentTypes.Inventory)?.container;
	}

	/**
	 * Adds the given item stack to the given player or container.
	 * @param itemStack
	 * @param player
	 * @returns
	 */
	static addItem(itemStack: ItemStack, player: Player | Container) {
		const container = player instanceof Player ? this.getContainer(player) : player;
		if (!container) return;

		container.addItem(itemStack);
	}

	/**
	 * Gives the given item stack to the given player or container.
	 * @param itemStack
	 * @param player
	 * @returns
	 */
	static giveItem(itemStack: ItemStack, player: Player | Container) {
		this.addItem(itemStack, player);
	}

	/**
	 * Gets the item stack in the given slot index of the given container or player.
	 * @obsolete Use getItemAt instead.
	 * @param slotIndex
	 * @param itemStack
	 * @param from
	 * @returns
	 */
	static getItemAt(slotIndex: number, from: Player | Container): ItemStack | undefined {
		const container = from instanceof Player ? this.getContainer(from) : from;
		if (!container) return;

		return container.getItem(slotIndex);
	}

	/**
	 * Sets the item stack in the given slot index of the given container or player.
	 * @param slotIndex
	 * @param itemStack
	 * @param from
	 * @returns If the item stack was set.
	 */
	static setItemAt(slotIndex: number, itemStack: ItemStack | undefined, from: Player | Container): boolean {
		const container = from instanceof Player ? this.getContainer(from) : from;
		if (!container) return false;

		container.setItem(slotIndex, itemStack);
		return true;
	}

	/**
	 * Removes all items from the given player's inventory.
	 * @param player
	 * @param itemTypeId Optional item type id to remove only items of that type.
	 * @returns
	 */
	static clear(player: Player, itemTypeId?: string[]) {
		const container = this.getContainer(player);
		if (!container) return;

		for (let i = 0; i < container.size; i++) {
			const containerItem = container.getItem(i);
			if (!containerItem) continue;

			if (!itemTypeId) {
				container.setItem(i, undefined);
				continue;
			}

			if (itemTypeId && itemTypeId.includes(containerItem.typeId)) {
				container.setItem(i, undefined);
			}
		}
	}

	static removeAllOf(itemTypeId: string, player: Player): boolean {
		this.clear(player, [itemTypeId]);
		return true;
	}

	/**
	 * Removes one of the given item type from the given player's inventory.
	 * @param item Item type id or item stack to remove one of.
	 * @param from Player or container to remove the item from.
	 * @returns
	 */
	static removeOneOf(item: string | ItemStack, from: Player | Container): boolean {
		const container = from instanceof Player ? this.getContainer(from) : from;
		if (!container) return false;

		let hadRemoved = false;
		const typeIdToRemove = typeof item === "string" ? item : item.typeId;

		for (let i = 0; i < container.size; i++) {
			const containerItem = container.getItem(i);
			if (!containerItem) continue;

			if (containerItem.typeId === typeIdToRemove) {
				containerItem.amount = Math.max(containerItem.amount - 1, 0);
				if (containerItem.amount === 0) {
					container.setItem(i, undefined);
				} else {
					container.setItem(i, containerItem);
				}
				hadRemoved = true;
			}
		}

		return hadRemoved;
	}

	/**
	 * Finds the first matching item in the given container or player.
	 * @param item Item type id or item stack to find.
	 * @param from Player or container to find the item in.
	 * @returns
	 */
	static findFirst(item: string | ItemStack, from: Player | Container): ItemStack | undefined {
		const container = from instanceof Player ? this.getContainer(from) : from;
		if (!container) return;

		const typeIdToFind = typeof item === "string" ? item : item.typeId;

		for (let i = 0; i < container.size; i++) {
			const itemStack = container.getItem(i);
			if (itemStack && itemStack.typeId === typeIdToFind) {
				return itemStack;
			}
		}
	}

	/**
	 * Gets the index of the first found matching item in the given container or player.
	 * @param item Item type id or item stack to get the index of.
	 * @param from Player or container to find the item in.
	 * @returns The index of the first found matching item, or -1 if not found.
	 */
	static indexOf(item: string | ItemStack, from: Player | Container, startIndex = 0): number {
		let index = -1;

		const container = from instanceof Player ? this.getContainer(from) : from;
		if (!container) return index;

		const typeIdToFind = typeof item === "string" ? item : item.typeId;

		for (let i = startIndex; i < container.size; i++) {
			const itemStack = container.getItem(i);
			if (itemStack && itemStack.typeId === typeIdToFind) {
				index = i;
				break;
			}
		}

		return index;
	}
}
