import {Readable, Writable, Transform} from "node:stream";
import {pipeline} from "node:stream/promises"
import { TransformCallback } from "stream";
class NumbersStream extends Readable {
   private _counter = 0;
    constructor() {
        super({objectMode: true})
    }
    _read(): void {
        this.push(this._counter++)
    }
}
class EvenNumbers extends Transform {
    constructor() {
        super({objectMode: true})
    }
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
        if (chunk % 2 == 0) {
            this.push(chunk);
           
        }
        callback()
    }
}
class Limit extends Transform {
    private _counter = 0;
    constructor(private _limit: number) {
        super({objectMode: true})
    }
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
        if(this._counter >= this._limit) {
            this.push(null)
        } else {
            this.push(chunk);
            this._counter++;
            callback(); 
        }
        
       

    }
}
class OutputNumbers extends Writable {
    constructor() {
        super({objectMode: true})
    }
    _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void): void {
        process.stdout.write(chunk + "; ");
        callback();
    }
    _final(): void {
        process.stdout.write("\n");
    }
}
async function displayEvenNumbers(count: number): Promise<void> {
    await pipeline(
        new NumbersStream(),
        new EvenNumbers(),
        new Limit(count),
        new OutputNumbers()
    )
}
displayEvenNumbers(100).catch(err => console.log(err));

