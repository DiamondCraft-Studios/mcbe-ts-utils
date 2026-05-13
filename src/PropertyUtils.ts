import { Entity } from "@minecraft/server";

/**
 * A collection of helper functions for working with Entity data-driven properties.
 * Do not mix with dynamic properties, which are handled in scripts.
 */
export class PropertyUtils {
	/**
	 * A safe wrapper function for getting a property.
	 * Returns the value of the given entity's data-driven property.
	 * If the property is not set (undefined), it will return the default value.
	 * @param entity The entity to get the property from.
	 * @param property The name of the property.
	 * @param defaultValue The default value to return if the property is undefined.
	 * @returns 
	 */
	static getOrDefault<T extends string | number | boolean | undefined>(entity: Entity, property: string, defaultValue: T): T {
		if (entity === undefined || !entity.isValid) {
			return defaultValue;
		}
		const value = entity.getProperty(property);
		if (value === undefined) {
			return defaultValue;
		}
		return value as T;
	}

	/**
	 * A safe wrapper function for getting a property.
	 * Sets the given entity's data-driven property to the given value.
	 * @param entity Target entity.
	 * @param property The name of the property.
	 * @param value The value to set the property to.
	 * @returns 
	 */
	static set(entity: Entity, property: string, value: string | number | boolean) {
		if (entity === undefined || !entity.isValid) {
			return undefined;
		}
		entity.setProperty(property, value);
	}

	/**
	 * Gets the property if it's not undefined, otherwise computes it, sets it, and returns it.
	 * @param entity The entity to get the property from.
	 * @param property The name of the dynamic property.
	 * @param fn The function to compute the value of the property.
	 * @returns 
	 */
	static computeIfUndefined<T extends string | number | boolean>(entity: Entity, property: string, fn: () => T): T {
		if (entity === undefined || !entity.isValid) {
			return fn();
		}
		let value = entity.getProperty(property);
		if (value === undefined) {
			const computed = fn();
			entity.setProperty(property, computed);
			return computed;
		}
		return value as T;
	}
	
	/**
	 * Checks if the given entity has the given enum property set to the given string value.
	 * @param entity The entity to check.
	 * @param property The name of the property.
	 * @param value The value of the property to check.
	 * @returns 
	 */
	static enumMatches(entity: Entity, property: string, value: string): boolean {
		if (entity === undefined || !entity.isValid) {
			return false;
		}
		return String(entity.getProperty(property)) === value;
	}
}
