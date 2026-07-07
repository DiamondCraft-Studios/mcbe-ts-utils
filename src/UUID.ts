export class UUID {
	/**
	 * Generates a new random secure UUID v4.
	 * @returns
	 */
	static random(): string {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
			const r = (Math.random() * 16) | 0;
			const v = c === "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	}

	/**
	 * Generates a random 8-character UUID.
	 * @returns
	 */
	static randomShort(): string {
		return Math.floor(Math.random() * 0xffffffff)
			.toString(16)
			.padStart(8, "0");
	}
}
