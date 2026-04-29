import { ItemStack } from "@minecraft/server";

/**
 * Item stack utility functions.
 */
export class ItemStackUtils {
	/**
	 * Removes one item from the given item stack.
	 * @param itemStack
	 * @returns The item stack with one less item.
	 */
	static removeOne(itemStack: ItemStack): ItemStack {
		if (itemStack.amount <= 1) {
			return new ItemStack("minecraft:air");
		}
		itemStack.amount--;
		return itemStack;
	}
}