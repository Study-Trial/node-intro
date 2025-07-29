import { Readable } from "node:stream";
import _ from 'lodash'
import config from 'config'

export default class RandomNumberStream extends Readable {

    constructor(private amount: number, private min?: number, private max?: number, private isUnique?: boolean, options?: any) {
        super(options);
        this.validateAndSetDefaults();
    }

    private DEFAULT_VALUES = [
        config.has('default_min') ? config.get<number>('default_min') : 1, 
        config.has('default_max') ? config.get<number>('default_max') : 49, 
        config.has('default_length') ? config.get<number>('default_length') : 7
    ];
    private IS_UNIQUE = this.isUnique ?? false;

    private numberArray: number[] = [];
    private validatedLength: number;
    private validatedMin: number;
    private validatedMax: number;

    private validateAndSetDefaults(): void {
        const [min, max, length] = [this.min, this.max, this.amount].map((value, i) => {
            if (value || value === 0) {
                return checkArgsNumber(value);
            } else {
                return this.DEFAULT_VALUES[i];
            }
        });
        const [checkedMin, checkedMax, checkedLength] = checkArgsValid(min, max, length, this.isUnique);
        this.validatedMin = checkedMin;
        this.validatedMax = checkedMax;
        this.validatedLength = checkedLength;
    }

    _read(): void {
        if (this.validatedLength <= 0) {
            this.push(null);
        } else {
            let number: number;
            if (!this.IS_UNIQUE) {
                number = _.random(this.validatedMin, this.validatedMax);
            }
            else {
                do {
                    number = _.random(this.validatedMin, this.validatedMax);
                } while (this.numberArray.includes(number));
            }
            this.numberArray.push(number);
            this.validatedLength--;
            this.push(number + "; ");
        }
    }
}

function checkArgsValid(min: number, max: number, length: number, isUnique: boolean) : [number, number, number] {
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

function checkArgsNumber(arg: number) : number {
    if (!_.isInteger(arg)) {
        throw new Error(`Argument is not a valid integer: ${arg}`);
    }
    return arg;
}

