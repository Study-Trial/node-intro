import {Readable, Writable, Transform} from "node:stream";
import {pipeline} from "node:stream/promises"
import { TransformCallback } from "stream";
import _ from 'lodash'
import config from 'config'

class NumbersStream extends Readable {
   private _counter = 0;
    constructor() {
        super({objectMode: true})
    }
    _read(): void {
        this.push(this._counter++)
    }
}

class Limit extends Transform {
    private _counter = 0;
    constructor(private _amount: number) {
        super({objectMode: true})
    }
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
        if(this._counter >= this._amount) {
            this.push(null)
        } else {
            this.push(chunk);
            this._counter++;
            callback(); 
        }
    }
}

class UniqueNumbers extends Transform {
    constructor(private _isUnique?: boolean, private _validatedMin?: number, private _validatedMax?: number) {
        super({objectMode: true})
    }
    private _numberArray: number[] = [];
    
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
        let number: number;
        if (!this._isUnique) {
            number = _.random(this._validatedMin, this._validatedMax);
            this.push(number + "; ");
        }
        else {
            do {
                number = _.random(this._validatedMin, this._validatedMax);
            } while (this._numberArray.includes(number));
            this._numberArray.push(number);
            this.push(number + "; ");
        }
        callback();
    }
}

class OutputNumbers extends Writable {
    constructor() {
        super({objectMode: true})
    }
    _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void): void {
        process.stdout.write(chunk + "");
        callback();
    }
    _final(): void {
        process.stdout.write("\n");
    }
}

function getArgsValid(min: number, max: number, length: number, isUnique: boolean) : [number, number, number] {
    if (length < 1) {
        throw new Error(`length is less than 1: ${length}`);
    }
    if (min > max) {
        throw new Error(`min is greater than max: ${min} > ${max}`);
    }
    if (min === max) {
        throw new Error(`min and max are the same: ${min} = ${max}`);
    }
    const possibleRange = max - min + 1;
    if (possibleRange < length && isUnique) {
        throw new Error(`length is greater than the range between min and max: ${length} > ${possibleRange}`);
    }
    return [min, max, length];
}

function getArgNumber(arg: number) : number {
    if (!_.isInteger(+arg)) {
        throw new Error(`Argument is not a valid integer: ${arg}`);
    }
    return arg;
}
function validateAndSetDefaults(min: number, max: number, length: number, isUnique: boolean, defaultValues: number[]) {
    const args = [min, max, length];
    const [validatedMin, validatedMax, validatedLength] = args.map((arg, i) => arg || arg === 0 ? getArgNumber(arg) : defaultValues[i]);
    return getArgsValid(validatedMin, validatedMax, validatedLength, isUnique);

}

async function displayRandomNumbers(length: number, min?: number, max?: number, isUnique?: boolean): Promise<void> {
    
    const DEFAULT_MIN = 1;
    const DEFAULT_MAX = 49;
    const DEFAULT_LENGTH = 7;
    const DEFAULT_VALUES = [
        config.has('default_min') ? config.get<number>('default_min') : DEFAULT_MIN, 
        config.has('default_max') ? config.get<number>('default_max') : DEFAULT_MAX, 
        config.has('default_length') ? config.get<number>('default_length') : DEFAULT_LENGTH
    ];
    const [validatedMin, validatedMax, validatedLength] = validateAndSetDefaults(min, max, length, isUnique, DEFAULT_VALUES);
    const validatedIsUnique = isUnique ?? false;

    await pipeline(
        new NumbersStream(),
        new Limit(validatedLength),
        new UniqueNumbers(validatedIsUnique, validatedMin, validatedMax),
        new OutputNumbers()
    )
}

// Test 1: Basic functionality
setTimeout(() => {
    console.log("Basic functionality");
    displayRandomNumbers(5, 1, 10, false).catch(err => console.log(err.message)); 
}, 1000);

// Test 2: Unique numbers
setTimeout(() => {
    console.log("Unique numbers");
    displayRandomNumbers(5, 1, 10, true).catch(err => console.log(err.message));
}, 1000);

// Test 3: Edge case - length = 0
setTimeout(() => {
    console.log("Length = 0");
    displayRandomNumbers(0, 1, 10, false).catch(err => console.log(err.message));
}, 1000);

// Test 4: Edge case - negative length
setTimeout(() => {
    console.log("Negative length");
    displayRandomNumbers(-1, 1, 10, false).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 5: Edge case - min > max
    console.log("Min > Max");
    displayRandomNumbers(5, 10, 1, false).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 6: Edge case - min = max
    console.log("Min = Max");
    displayRandomNumbers(5, 5, 5, false).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 7: Edge case - length > range for unique
    console.log("Length > range for unique");
    displayRandomNumbers(15, 1, 10, true).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 8: Edge case - using defaults
    console.log("Using defaults");
    displayRandomNumbers(5).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 9: Edge case - large range
    console.log("Large range");
    displayRandomNumbers(10, 1, 1000, false).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 10: Edge case - single number with unique
    console.log("Single number with unique");
    displayRandomNumbers(1, 1, 10, true).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 11: Edge case - zero range
    console.log("Zero range");
    displayRandomNumbers(1, 0, 0, false).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 12: Edge case - floating point numbers
    console.log("Floating point numbers");
    displayRandomNumbers(5, 1.5, 10.7, false).catch(err => console.log(err.message));
}, 1000);


setTimeout(() => {// Test 14: Edge case - very small range
    console.log("Very small range");
    displayRandomNumbers(3, 1, 2, false).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 15: Edge case - exact range for unique
    console.log("Exact range for unique");
    displayRandomNumbers(10, 1, 10, true).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 16: Edge case - undefined parameters
    console.log("Undefined parameters");
    displayRandomNumbers(5, undefined, undefined, undefined).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 17: Edge case - null parameters
    console.log("Null parameters");
    displayRandomNumbers(5, null as any, null as any, null as any).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 18: Edge case - string parameters
    console.log("String parameters");
    displayRandomNumbers(5, "1" as any, "10" as any, "false" as any).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 19: Edge case - boolean parameters
    console.log("Boolean parameters");
    displayRandomNumbers(true as any, 1, 10, false).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => { // Test 20: Edge case - array parameters
    console.log("Array parameters");
    displayRandomNumbers([5] as any, 1, 10, false).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 21: Edge case - object parameters
    console.log("Object parameters");
    displayRandomNumbers({} as any, 1, 10, false).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 23: Edge case - NaN parameters
    console.log("NaN parameters");
    displayRandomNumbers(NaN, 1, 10, false).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 24: Edge case - Infinity parameters
    console.log("Infinity parameters");
    displayRandomNumbers(Infinity, 1, 10, false).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 25: Edge case - negative range
    console.log("Negative range");
    displayRandomNumbers(5, -10, -1, false).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 26: Edge case - mixed positive/negative
    console.log("Mixed positive/negative");
    displayRandomNumbers(5, -5, 5, false).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 27: Edge case - very large numbers
    console.log("Very large numbers");
    displayRandomNumbers(5, Number.MAX_SAFE_INTEGER - 10, Number.MAX_SAFE_INTEGER, false).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 28: Edge case - very small numbers
    console.log("Very small numbers");
    displayRandomNumbers(5, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER + 10, false).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {
    // Test 29: Edge case - decimal length
    console.log("Decimal length");
    displayRandomNumbers(5.5, 1, 10, false).catch(err => console.log(err.message));
}, 1000);
