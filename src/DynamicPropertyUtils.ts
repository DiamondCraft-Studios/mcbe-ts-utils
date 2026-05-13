import { Entity, ItemStack, Vector3 } from "@minecraft/server";

/**
 * A collection of helper functions for working with Entity dynamic properties.
 * Do not mix with property, which are data-driven properties defined in the json files.
 */
export class DynamicPropertyUtils {
	/**
	 * A safe wrapper function for getting a dynamic property.
	 * Returns the value of the given entity's dynamic property.
	 * If the property is not set (undefined), it will return the default value.
	 * @param target The target to get the property from.
	 * @param property The name of the dynamic property.
	 * @param defaultValue The default value to return if the property is undefined.
	 * @param setDefault Whether to set the default value if the property is undefined.
	 * @returns The value of the property, or the default value if the property is undefined.
	 */
	static getOrDefault<T extends string | number | boolean | Vector3 | undefined>(
		target: Entity | ItemStack,
		property: string,
		defaultValue: T,
		setDefault = true
	): T {
		if (target === undefined || (target instanceof Entity && !target.isValid)) {
			return defaultValue;
		}
		const value = target.getDynamicProperty(property);
		if (value === undefined) {
			if (setDefault) target.setDynamicProperty(property, defaultValue);
			return defaultValue;
		}
		return value as T;
	}

	/**
	 * A safe wrapper function for setting a dynamic property.
	 * Sets the given entity's dynamic property to the given value.
	 * @param target The target to get the property from.
	 * @param property The name of the dynamic property.
	 * @param value The value to set the property to.
	 * @returns
	 */
	static set(target: Entity | ItemStack, property: string, value: string | number | boolean | Vector3 | undefined) {
		if (target === undefined || (target instanceof Entity && !target.isValid)) {
			return;
		}
		target.setDynamicProperty(property, value);
	}

	/**
	 * Gets the dynamic property if it's not undefined, otherwise computes it, sets it, and returns it.
	 * @param target The target to get the property from.
	 * @param property The name of the dynamic property.
	 * @param fn The function to compute the value of the property.
	 * @returns
	 */
	static computeIfUndefined<T extends string | number | boolean | Vector3>(
		target: Entity | ItemStack,
		property: string,
		fn: () => T
	): T {
		if (target === undefined || (target instanceof Entity && !target.isValid)) {
			return fn();
		}
		let value = target.getDynamicProperty(property);
		if (value === undefined) {
			const computed = fn();
			target.setDynamicProperty(property, computed);
			return computed;
		}
		return value as T;
	}
}
