import { Container, EntityComponentTypes, ItemStack, Player } from "@minecraft/server";

export class InventoryUtils {
	/**
	 * Gets the container of the given player.
	 * @param player
	 * @returns
	 */
	static getContainer(player: Player): Container | undefined {
		return player.getComponent(EntityComponentTypes.Inventory)?.container;
	}

	/**
	 * Gives the given item stack to the given player or container.
	 * @param itemStack
	 * @param player
	 * @returns
	 */
	static giveItem(itemStack: ItemStack, player: Player | Container) {
		const container = player instanceof Player ? this.getContainer(player) : player;
		if (!container) return;

		container.addItem(itemStack);
	}

	/**
	 * Sets the item stack in the given slot index of the given container or player.
	 * @param slotIndex
	 * @param itemStack
	 * @param from
	 * @returns
	 */
	static setItem(slotIndex: number, itemStack: ItemStack, from: Player | Container) {
		const container = from instanceof Player ? this.getContainer(from) : from;
		if (!container) return;

		container.setItem(slotIndex, itemStack);
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
	 * @param itemTypeId
	 * @param from
	 * @returns
	 */
	static removeOneOf(itemTypeId: string, from: Player | Container): boolean {
		const container = from instanceof Player ? this.getContainer(from) : from;
		if (!container) return false;

		let hadRemoved = false;

		for (let i = 0; i < container.size; i++) {
			const containerItem = container.getItem(i);
			if (!containerItem) continue;

			if (containerItem.typeId === itemTypeId) {
				containerItem.amount = Math.max(containerItem.amount - 1, 0);
				container.setItem(i, containerItem);
				hadRemoved = true;
			}
		}

		return hadRemoved;
	}

	/**
	 * Finds the first matching item in the given container or player.
	 * @param itemId
	 * @param from
	 * @returns
	 */
	static findFirst(itemId: string, from: Player | Container): ItemStack | undefined {
		const container = from instanceof Player ? this.getContainer(from) : from;
		if (!container) return;

		for (let i = 0; i < container.size; i++) {
			const itemStack = container.getItem(i);
			if (itemStack && itemStack.typeId === itemId) {
				return itemStack;
			}
		}
	}

	/**
	 * Gets the index of the first found matching item in the given container or player.
	 * @param itemId
	 * @param from
	 * @returns
	 */
	static indexOf(itemId: string, from: Player | Container, startIndex = 0): number {
		let index = -1;

		const container = from instanceof Player ? this.getContainer(from) : from;
		if (!container) return index;

		for (let i = startIndex; i < container.size; i++) {
			const itemStack = container.getItem(i);
			if (itemStack && itemStack.typeId === itemId) {
				index = i;
				break;
			}
		}

		return index;
	}
}
