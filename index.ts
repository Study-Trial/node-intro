import config from 'config'
import { outputRandomNumbersPipeline } from './Output_Random_Numbers_Pipeline.ts'

function getArgNumber(arg: number): number {
    if (!Number.isInteger(+arg)) {
        throw new Error(`Argument is not a valid integer: ${arg}`);
    }
    return arg;
}
function validateAndSetDefaults(min: number, max: number, length: number, defaultValues: number[]) {
    const args = [min, max, length];
    const validatedArgs = args.map((arg, i) => arg || arg === 0 ? getArgNumber(arg) : defaultValues[i]);
    return validatedArgs
}

async function displayRandomNumbers(length: number, min?: number, max?: number, separator?: string, isUnique?: boolean): Promise<void> {

    const IS_UNIQUE = isUnique === undefined ? false : isUnique;
    const SEPARATOR = separator ?? "; ";
    const DEFAULT_MIN = 1;
    const DEFAULT_MAX = 49;
    const DEFAULT_LENGTH = 7;
    const DEFAULT_VALUES = [
        config.has('min') ? Number(config.get<number>('min')) : DEFAULT_MIN,
        config.has('max') ? Number(config.get<number>('max')) : DEFAULT_MAX,
        config.has('amount') ? Number(config.get<number>('amount')) : DEFAULT_LENGTH
    ];
    const [validatedMin, validatedMax, validatedLength] = validateAndSetDefaults(min, max, length, DEFAULT_VALUES);
    try {
        await outputRandomNumbersPipeline(validatedLength, validatedMin, validatedMax, SEPARATOR, IS_UNIQUE);
    } catch (error) {
        console.log(error.message);
    }
}

// Test 1: Basic functionality - unique numbers
setTimeout(() => {
    console.log("Basic functionality - unique");
    displayRandomNumbers(5, 1, 10, ";", true).catch(err => console.log(err.message));
}, 1000);

// Test 2: Basic functionality - non-unique numbers
setTimeout(() => {
    console.log("Basic functionality - non-unique");
    displayRandomNumbers(5, 1, 10, ";", false).catch(err => console.log(err.message));
}, 1000);

// Test 3: Edge case - length = 0
setTimeout(() => {
    console.log("Length = 0");
    displayRandomNumbers(0, 1, 10, ";", true).catch(err => console.log(err.message));
}, 1000);

// Test 4: Edge case - negative length
setTimeout(() => {
    console.log("Negative length");
    displayRandomNumbers(-1, 1, 10, ";", true).catch(err => console.log(err.message));
}, 1000);

// Test 5: Edge case - min > max
setTimeout(() => {
    console.log("Min > Max");
    displayRandomNumbers(5, 10, 1, ";", true).catch(err => console.log(err.message));
}, 1000);

// Test 6: Edge case - min = max
setTimeout(() => {
    console.log("Min = Max");
    displayRandomNumbers(5, 5, 5, ";", true).catch(err => console.log(err.message));
}, 1000);

// Test 7: Edge case - length > range for unique
setTimeout(() => {
    console.log("Length > range for unique");
    displayRandomNumbers(15, 1, 10, ";", true).catch(err => console.log(err.message));
}, 1000);

// Test 8: Edge case - length > range for non-unique
setTimeout(() => {
    console.log("Length > range for non-unique");
    displayRandomNumbers(15, 1, 10, ";", false).catch(err => console.log(err.message));
}, 1000);

// Test 9: Edge case - using defaults
setTimeout(() => {
    console.log("Using defaults");
    displayRandomNumbers(5, undefined, undefined, ";", true).catch(err => console.log(err.message));
}, 1000);

// Test 10: Edge case - large range
setTimeout(() => {
    console.log("Large range");
    displayRandomNumbers(10, 1, 1000, ";", true).catch(err => console.log(err.message));
}, 1000);

// Test 11: Edge case - single number with unique
setTimeout(() => {
    console.log("Single number with unique");
    displayRandomNumbers(1, 1, 10, ";", true).catch(err => console.log(err.message));
}, 1000);

// Test 12: Edge case - single number with non-unique
setTimeout(() => {
    console.log("Single number with non-unique");
    displayRandomNumbers(1, 1, 10, ";", false).catch(err => console.log(err.message));
}, 1000);

// Test 13: Edge case - exact range for unique
setTimeout(() => {
    console.log("Exact range for unique");
    displayRandomNumbers(10, 1, 10, ";", true).catch(err => console.log(err.message));
}, 1000);

// Test 14: Edge case - exact range for non-unique
setTimeout(() => {
    console.log("Exact range for non-unique");
    displayRandomNumbers(10, 1, 10, ";", false).catch(err => console.log(err.message));
}, 1000);

// Test 15: Edge case - undefined parameters
setTimeout(() => {
    console.log("Undefined parameters");
    displayRandomNumbers(5, undefined, undefined, ";", true).catch(err => console.log(err.message));
}, 1000);

// Test 16: Edge case - null parameters
setTimeout(() => {
    console.log("Null parameters");
    displayRandomNumbers(5, null as any, null as any, ";", true).catch(err => console.log(err.message));
}, 1000);

// Test 17: Edge case - string parameters
setTimeout(() => {
    console.log("String parameters");
    displayRandomNumbers(5, "1" as any, "10" as any, ";", true).catch(err => console.log(err.message));
}, 1000);

// Test 18: Edge case - boolean parameters
setTimeout(() => {
    console.log("Boolean parameters");
    displayRandomNumbers(true as any, 1, 10, ";", true).catch(err => console.log(err.message));
}, 1000);

// Test 19: Edge case - array parameters
setTimeout(() => {
    console.log("Array parameters");
    displayRandomNumbers([5] as any, 1, 10, ";", true).catch(err => console.log(err.message));
}, 1000);

// Test 20: Edge case - object parameters
setTimeout(() => {
    console.log("Object parameters");
    displayRandomNumbers({} as any, 1, 10, ";", true).catch(err => console.log(err.message));
}, 1000);

// Test 21: Edge case - NaN parameters
setTimeout(() => {
    console.log("NaN parameters");
    displayRandomNumbers(NaN, 1, 10, ";", true).catch(err => console.log(err.message));
}, 1000);

// Test 22: Edge case - Infinity parameters
setTimeout(() => {
    console.log("Infinity parameters");
    displayRandomNumbers(Infinity, 1, 10, ";", true).catch(err => console.log(err.message));
}, 1000);

// Test 23: Edge case - negative range
setTimeout(() => {
    console.log("Negative range");
    displayRandomNumbers(5, -10, -1, ";", true).catch(err => console.log(err.message));
}, 1000);

// Test 24: Edge case - mixed positive/negative
setTimeout(() => {
    console.log("Mixed positive/negative");
    displayRandomNumbers(5, -5, 5, ";", true).catch(err => console.log(err.message));
}, 1000);

// Test 25: Edge case - very large numbers
setTimeout(() => {
    console.log("Very large numbers");
    displayRandomNumbers(5, Number.MAX_SAFE_INTEGER - 10, Number.MAX_SAFE_INTEGER, ";", true).catch(err => console.log(err.message));
}, 1000);

// Test 26: Edge case - very small numbers
setTimeout(() => {
    console.log("Very small numbers");
    displayRandomNumbers(5, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER + 10, ";", true).catch(err => console.log(err.message));
}, 1000);

// Test 27: Edge case - decimal length
setTimeout(() => {
    console.log("Decimal length");
    displayRandomNumbers(5.5, 1, 10, ";", true).catch(err => console.log(err.message));
}, 1000);

// Test 28: Edge case - zero range
setTimeout(() => {
    console.log("Zero range");
    displayRandomNumbers(1, 0, 0, ";", true).catch(err => console.log(err.message));
}, 1000);

// Test 29: Edge case - floating point numbers
setTimeout(() => {
    console.log("Floating point numbers");
    displayRandomNumbers(5, 1.5, 10.7, ";",     true).catch(err => console.log(err.message));
}, 1000);

// Test 30: Edge case - very small range
setTimeout(() => {
    console.log("Very small range");
    displayRandomNumbers(3, 1, 2, ";",  true).catch(err => console.log(err.message));
}, 1000);

// Test 31: Edge case - very small range non-unique
setTimeout(() => {
    console.log("Very small range non-unique");
    displayRandomNumbers(3, 1, 2, ";", false).catch(err => console.log(err.message));
}, 1000);