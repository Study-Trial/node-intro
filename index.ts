import _ from 'lodash'

function checkArgs(min: number, max: number, length: number) {
    if (min > max) {
        min = max - length + 1;
    }
    const diff = max - min;
    const minDiff = length - 1;
    if (diff < minDiff) {
        min = max - minDiff;
    }
    return [min, max]
}

const {argv} = process;

const length: number = +argv[2] >= 1 ? +argv[2] : 7;
const min: number = +argv[4] && typeof +argv[3] === 'number' ? +argv[3] : 1;
const max: number = +argv[4] && typeof +argv[4] === 'number' ? +argv[4] : 49;
const [checkedMin, checkedMax] = checkArgs(min, max, length)
const a: number[] = _.sampleSize(_.range(checkedMin, checkedMax + 1), length);

console.log("random numbers are", a);