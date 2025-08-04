import { Readable } from "node:stream";
import _ from 'lodash'
import config from 'config'


function getParam(configPath: string, fallback: number): number {
    const numberFromConfig = config.has(configPath) ? Number(config.get(configPath)): Number.NaN;
    return numberFromConfig ?? fallback;
}

export default class RandomNumberStream extends Readable {
    private static DEFAULT_MIN = 1;
    private static DEFAULT_MAX = 49;
    private static DEFAULT_LENGTH = 7;
 
    private static DEFAULT_VALUES = [
        getParam('min', this.DEFAULT_MIN),
        getParam('max', this.DEFAULT_MAX),
        getParam('length', this.DEFAULT_LENGTH),
    ];
 
    constructor(private amount: number = RandomNumberStream.DEFAULT_VALUES[2],
                private min: number = RandomNumberStream.DEFAULT_VALUES[0],
                private max: number = RandomNumberStream.DEFAULT_VALUES[1], private isUnique: boolean = false, options?: any) {
        super(options);
        getArgsValid(this.min, this.max, this.amount, this.isUnique)
    }
    private numberArray: number[] = [];

    _read(): void {
        if (this.amount <= 0) {
            this.push(null);
        } else {
            let number: number;
            if (!this.isUnique) {
                number = _.random(this.min, this.max);
            }
            else {
                do {
                    number = _.random(this.min, this.max);
                } while (this.numberArray.includes(number));
            }
            this.numberArray.push(number);
            this.amount--;
            this.push(number + "; ");
        }
    }
}
 
function getArgsValid(min: number, max: number, length: number, isUnique: boolean) {
    const nonIntegerIndex = [min, max, length].findIndex(i=>!Number.isInteger(i));
    if (nonIntegerIndex > -1 ) {
        throw new Error(`${['min','max','length'][nonIntegerIndex]} is not integer value`);
    }
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
}