import { RawMessage, RawMessageScore } from "@minecraft/server";

export enum ColorCode {
	Black = "§0",
	DarkBlue = "§1",
	DarkGreen = "§2",
	DarkAqua = "§3",
	DarkRed = "§4",
	DarkPurple = "§5",
	Gold = "§6",
	Gray = "§7",
	DarkGray = "§8",
	Blue = "§9",
	Green = "§a",
	Aqua = "§b",
	Red = "§c",
	LightPurple = "§d",
	Yellow = "§e",
	White = "§f",
	MinecoinGold = "§g",
	MaterialQuartz = "§h",
	MaterialIron = "§i",
	MaterialNetherite = "§j",
	RandomSymbols = "§k",
	Bold = "§l",
	MaterialRedstone = "§m",
	MaterialCopper = "§n",
	Italic = "§o",
	MaterialGold = "§p",
	MaterialEmerald = "§q",
	Reset = "§r",
	MaterialDiamond = "§s",
	MaterialLapis = "§t",
	MaterialAmethyst = "§u",
}

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
