/**
 * Utilities for working with TypeScript maps.
 */
export class MapUtils {
	/**
	 * Gets the value for the given key, or returns the default value if it doesn't exist.
	 * @param map 
	 * @param key 
	 * @param defaultValue 
	 * @returns 
	 */
	static getOrDefault<K, V>(map: Map<K, V>, key: K, defaultValue: V): V {
		return map.get(key) ?? defaultValue;
	}

	/**
	 * Computes the value for the given key, or computes it if it doesn't exist.
	 * @param map 
	 * @param key 
	 * @param fn 
	 * @returns 
	 */
	static computeIfUndefined<K, V>(map: Map<K, V>, key: K, fn: () => V): V {
		let value = map.get(key);
		if (value === undefined) {
			value = fn();
			map.set(key, value);
		}
		return value;
	}
}
