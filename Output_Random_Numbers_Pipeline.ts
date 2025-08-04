import { pipeline } from "node:stream/promises";
import { RandomNumbersStream } from "./RandomNumbersStream.ts";
import { UniqueNumbersStream } from "./UniqueNumbersStream.ts";
import { OutputStream } from "./OutputStream.ts";

export async function outputRandomNumbersPipeline(length: number, min?: number, max?: number, separator?: string): Promise<void> {

    await pipeline(
        new RandomNumbersStream(min, max),
        new UniqueNumbersStream(length),
        new OutputStream(separator)
    )
}
