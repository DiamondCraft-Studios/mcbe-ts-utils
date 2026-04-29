import { Container, ItemStack } from "@minecraft/server";

import { Mathn } from "./Mathn";

/**
 * Container utility functions.
 */
export class ContainerUtils {
	/**
	 * Tries to put an item stack into a container, returns excess items if the container is full.
	 * @param itemStack
	 * @param container
	 * @param maxSlotIndex Optional slot index to stop at.
	 * @returns
	 */
	static tryStore(itemStack: ItemStack, container: Container, maxSlotIndex?: number): ItemStack | undefined {
		if (itemStack.amount <= 0) return;
		const maxIndex = maxSlotIndex ?? container.size;

		// Fill existing stacks
		for (let i = 0; i < maxIndex; i++) {
			const containerItem = container.getItem(i);
			if (!containerItem) {
				container.setItem(i, itemStack.clone());
				continue;
			}
			if (!containerItem.isStackableWith(itemStack)) continue;

			const space = containerItem.maxAmount - containerItem.amount;
			if (space <= 0) continue;

			const toTransfer = Math.min(space, itemStack.amount);
			const newStack = containerItem.clone();

			newStack.amount += toTransfer;
			container.setItem(i, newStack);
			itemStack.amount -= toTransfer;

			if (itemStack.amount <= 0) return;
		}

		// Fill empty slots
		for (let i = 0; i < maxIndex; i++) {
			const containerItem = container.getItem(i);
			if (containerItem) continue;

			const toTransfer = Math.min(itemStack.amount, itemStack.maxAmount);
			const newStack = itemStack.clone();

			newStack.amount = toTransfer;
			container.setItem(i, newStack);
			itemStack.amount -= toTransfer;

			if (itemStack.amount <= 0) return;
		}

		return itemStack.amount > 0 ? itemStack : undefined;
	}
	/**
	 * Takes all items from the given container.
	 * @param container
	 * @param maxSlotIndex Optional slot index to stop at.
	 * @returns
	 */
	static takeAll(container: Container, maxSlotIndex?: number): ItemStack[] {
		const items = [];
		const maxIndex = maxSlotIndex ?? container.size;

		for (let i = 0; i < maxIndex; i++) {
			const item = container.getItem(i);
			if (!item) continue;

			items.push(item.clone());
			container.setItem(i, undefined);
		}

		return items;
	}
	/**
	 * Tries to take a given amount of the specified item type from the container.
	 * @param itemTypeId
	 * @param amountToTake
	 * @param container
	 * @param maxSlotIndex
	 * @returns
	 */
	static tryTake(itemTypeId: string, amountToTake: number, container: Container, maxSlotIndex?: number): ItemStack[] {
		if (amountToTake <= 0) return [];

		amountToTake = Mathn.clamp(amountToTake, 1, 255);
		let tookAmount = 0;
		const items = [];
		const maxIndex = maxSlotIndex ?? container.size;
		const indices = this.getItemIndices(itemTypeId, container, maxIndex);

		let i = 0;
		while (amountToTake > 0 && i < indices.length) {
			const index = indices[i];
			const containerItem = container.getItem(index);
			if (!containerItem) {
				i++;
				continue;
			}

			if (containerItem.amount <= amountToTake) {
				items.push(containerItem.clone());
				amountToTake -= containerItem.amount;
				tookAmount += containerItem.amount;
				container.setItem(index, undefined);
			} else if (containerItem.amount > amountToTake) {
				tookAmount += amountToTake;
				const amountLeft = containerItem.amount - amountToTake;
				container.setItem(index, new ItemStack(containerItem.typeId, amountLeft));
				items.push(new ItemStack(containerItem.typeId, amountToTake));
				break;
			}

			i++;
		}

		return items;
	}
	/**
	 *
	 * @param itemTypeId
	 * @param container
	 * @param maxSlotIndex
	 * @returns
	 */
	static tryTakeAllOf(itemTypeId: string, container: Container, maxSlotIndex?: number): ItemStack[] {
		const items: ItemStack[] = [];
		const maxIndex = maxSlotIndex ?? container.size;

		const indices = this.getItemIndices(itemTypeId, container, maxIndex);

		let i = 0;
		while (i < indices.length) {
			const index = indices[i];
			const containerItem = container.getItem(index);

			if (!containerItem) {
				i++;
				continue;
			}

			// Take the whole stack
			items.push(containerItem.clone());
			container.setItem(index, undefined);
			i++;
		}

		return items;
	}
	/**
	 * Returns the indices of all slots the given item type is in.
	 * @param container
	 * @param itemTypeId
	 * @param maxSlotIndex Optional slot index to stop at.
	 * @returns
	 */
	static getItemIndices(itemTypeId: string, container: Container, maxSlotIndex?: number): number[] {
		const indices: number[] = [];
		const maxIndex = maxSlotIndex ?? container.size;

		for (let i = 0; i < maxIndex; i++) {
			const item = container.getItem(i);
			if (!item) continue;

			if (itemTypeId.includes(item.typeId)) {
				indices.push(i);
			}
		}

		return indices;
	}
}
