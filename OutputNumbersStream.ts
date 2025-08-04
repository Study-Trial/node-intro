import { TransformCallback, Writable } from "node:stream";

export class OutputNumbersStream extends Writable {
    constructor() {
        super({ objectMode: true })
    }
    _write(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
        process.stdout.write(chunk + "; ");
        callback();
    }
    _final(): void {
        process.stdout.write("\n");
    }
}