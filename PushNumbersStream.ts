import { Transform, TransformCallback } from "node:stream";

export class PushNumbersStream extends Transform {
    constructor(private limit: number, private isUnique: boolean) {
        super({ objectMode: true })
        if (this.limit < 1) throw new Error(`length is less than 1: ${this.limit}`);
    }
    private _numberArray: number[] = [];

    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
        if (this._numberArray.length < this.limit) {
            const number = typeof chunk === 'object' ? JSON.stringify(chunk) : chunk.toString();
            if (this.isUnique) {
                if (!this._numberArray.includes(number)) {
                    this._numberArray.push(number);
                    this.push(chunk);
                    callback();
                }
                else {
                    callback();
                }
            }
            else {
                this._numberArray.push(number);
                this.push(chunk);
                callback();
            }
        }
        else {
            this.push(null);
        }
    }
}