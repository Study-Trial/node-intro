import { Readable } from "node:stream";

export class RandomNumbersStream extends Readable {
    constructor(private _validatedMin: number, private _validatedMax: number) {
        super({ objectMode: true })
    }
    _read(): void {
        if (this._validatedMin > this._validatedMax) {
            throw new Error(`min is greater than max: ${this._validatedMin} > ${this._validatedMax}`);
        } else if (this._validatedMin === this._validatedMax) {
            throw new Error(`min and max are the same: ${this._validatedMin} = ${this._validatedMax}`);
        }
        const number = Math.floor(Math.random() * (this._validatedMax - this._validatedMin + 1)) + this._validatedMin;
        this.push(number)
    }
}