import { Readable } from "node:stream";

//Custom Readable stream
export default class CounterStream extends Readable {
    counter: number = 0;
    constructor(private _max: number, options: any = {encoding: 'utf8'}) {
        super(options);

    }
    _read(): void {
        if(this.counter >= this._max) {
            this.push(null);
        } else {
            this.push(this.counter + "; ")
            this.counter++
        }
    }
}
