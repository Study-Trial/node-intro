import { Transform, TransformCallback } from "node:stream";

export class UniqueNumbersStream extends Transform {
    constructor(private limit?: number) {
        super({ objectMode: true })
    }
    private _numberArray: number[] = [];

    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
        if (this._numberArray.length < this.limit) {
            const number = typeof chunk === 'object' ? JSON.stringify(chunk) : chunk.toString();
            if (!this._numberArray.includes(number)) {
                this._numberArray.push(number);
                this.push(chunk);
            }
            callback();
        }
        else {
            this.push(null);
        }
    }
}