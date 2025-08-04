import { TransformCallback, Writable } from "node:stream";

export class OutputStream extends Writable {
    constructor(private separator?: string) {
        super({ objectMode: true })
    }
    _write(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
        process.stdout.write(chunk + (this.separator ?? "; "));
        callback();
    }
    _final(): void {
        process.stdout.write("\n");
    }
}