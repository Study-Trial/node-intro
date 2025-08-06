import { pipeline } from "node:stream/promises";
import { RandomNumbersStream } from "./RandomNumbersStream.ts";
import { PushNumbersStream } from "./PushNumbersStream.ts";
import { OutputStream } from "./OutputStream.ts";

export async function outputRandomNumbersPipeline(length: number, min?: number, max?: number, separator?: string, isUnique?: boolean): Promise<void> {

    const possibleRange = max - min + 1;
    if (isUnique && length > possibleRange) {
        throw new Error(`length is greater than the range between min and max: ${length} > ${possibleRange}`);
    }

    await pipeline(
        new RandomNumbersStream(min, max),
        new PushNumbersStream(length, isUnique),
        new OutputStream(separator)
    )
}
