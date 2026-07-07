export class UUID {
	/**
	 * Generates a new random secure UUID v4.
	 * @returns
	 */
	static generateRandom(): string {
		return crypto.randomUUID();
	}

	/**
	 * Generates a random 8-character UUID.
	 * @returns
	 */
	static generateRandomShort(): string {
		const bytes = crypto.getRandomValues(new Uint8Array(4));
		return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
	}
}
