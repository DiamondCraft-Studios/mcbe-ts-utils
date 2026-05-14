import { RawMessage, RawMessageScore } from "@minecraft/server";

/**
 * A builder for raw messages.
 */
export class RawMessageBuilder {
	private readonly parts: (string | RawMessage)[] = [];

	constructor(text?: string) {
		if (text) this.parts.push(text);
	}
	append(text: string): RawMessageBuilder {
		this.parts.push(text);
		return this;
	}
	join(...parts: (string | RawMessage)[]): RawMessageBuilder {
		this.parts.push(...parts);
		return this;
	}
	translate(key: string): RawMessageBuilder {
		this.parts.push(TextUtils.translate(key));
		return this;
	}
	translatef(key: string, args: RawMessage | string[]): RawMessageBuilder {
		this.parts.push(TextUtils.translatef(key, args));
		return this;
	}
	build(): RawMessage {
		return TextUtils.join(...this.parts);
	}
}

/**
 * Text utility functions.
 */
export class TextUtils {
	/**
	 * Creates a raw message from the given string.
	 * @param text 
	 * @returns 
	 */
	static raw(text: string): RawMessage {
		return { rawtext: [{ text: text }] };
	}

	/**
	 * Joins the given parts into one raw message.
	 * @param parts
	 * @returns
	 */
	static join(...parts: (string | RawMessage)[]): RawMessage {
		return {
			rawtext: parts.map((part) => (typeof part === "string" ? { text: part } : part)),
		};
	}

	/**
	 * Resolves the given translation key to a raw message.
	 * @param parts
	 * @returns
	 */
	static translate(key: string): RawMessage {
		return { rawtext: [{ translate: key }] };
	}

	/**
	 * Resolves the given formatted translation key to a raw message.
	 * @param parts
	 * @returns
	 */
	static translatef(key: string, args: RawMessage | string[]): RawMessage {
		return { rawtext: [{ translate: key, with: args }] };
	}
	
	/**
	 * Creates a raw message with score.
	 * @param score 
	 * @returns 
	 */
	static score(score: RawMessageScore): RawMessage {
		return { score: score };
	}
}
