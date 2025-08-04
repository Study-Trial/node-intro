import { pipeline } from "node:stream/promises";
import { RandomNumbersStream } from "./RandomNumbersStream.ts";
import { UniqueNumbersStream } from "./UniqueNumbersStream.ts";
import { OutputNumbersStream } from "./OutputNumbersStream.ts";

export async function outputRandomNumbersPipeline(length: number, min?: number, max?: number): Promise<void> {

    await pipeline(
        new RandomNumbersStream(min, max),
        new UniqueNumbersStream(length),
        new OutputNumbersStream()
    )
}
