import _ from 'lodash'

function checkArgsValid(min: number, max: number, length: number) {
    if (length < 1) {
        throw new Error(`length is less than 1: ${length}`);
    }
    if (min > max) {
        throw new Error(`min is greater than max: ${min} > ${max}`);
    }
    const diff = max - min;
    const minDiff = length - 1;
    if (diff < minDiff) {
        throw new Error(`length is greater than the difference between min and max: ${length} > ${diff}`);
    }
    return [min, max, length];
}

function checkArgsNumber(arg: string) {
    const num = +arg;
    if (!_.isInteger(num)) {
        throw new Error(`Argument is not a valid number: ${arg}`);
    }
    return num;
}

const {argv} = process;
const DEFAULT_LENGTH = 7;
const DEFAULT_MIN = 1;
const DEFAULT_MAX = 49;
const defaultValues = [DEFAULT_LENGTH, DEFAULT_MIN, DEFAULT_MAX];
const args: string[] = [argv[2], argv[3], argv[4]];
try{
const [length, min, max] = args.map((arg, i) => {
    if (arg) {
        return checkArgsNumber(arg);
    }
    else {
        return defaultValues[i];
    }
});
const [checkedMin, checkedMax, checkedLength] = checkArgsValid(min, max, length)
const a: number[] = _.sampleSize(_.range(checkedMin, checkedMax + 1), checkedLength);
console.log("random numbers are", a);
}
catch (error) {
    console.log(error.message);
}