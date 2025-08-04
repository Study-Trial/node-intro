import config from 'config'
import { outputRandomNumbersPipeline } from './Output_Random_Numbers_Pipeline.ts'

function getArgsValid(min: number, max: number, length: number): [number, number, number] {
    if (length < 1) {
        throw new Error(`length is less than 1: ${length}`);
    }
    if (min > max) {
        throw new Error(`min is greater than max: ${min} > ${max}`);
    }
    if (min === max) {
        throw new Error(`min and max are the same: ${min} = ${max}`);
    }
    return [min, max, length];
}

function getArgNumber(arg: number): number {
    if (!Number.isInteger(+arg)) {
        throw new Error(`Argument is not a valid integer: ${arg}`);
    }
    return arg;
}
function validateAndSetDefaults(min: number, max: number, length: number, defaultValues: number[]) {
    const args = [min, max, length];
    const [validatedMin, validatedMax, validatedLength] = args.map((arg, i) => arg || arg === 0 ? getArgNumber(arg) : defaultValues[i]);
    return getArgsValid(validatedMin, validatedMax, validatedLength);
}

async function displayRandomNumbers(length: number, min?: number, max?: number, separator?: string): Promise<void> {

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
    const possibleRange = validatedMax - validatedMin + 1;
    if (validatedLength > possibleRange) {
        throw new Error(`length is greater than the range between min and max: ${validatedLength} > ${possibleRange}`);
    }
    try {
        await outputRandomNumbersPipeline(validatedLength, validatedMin, validatedMax, SEPARATOR);
    } catch (error) {
        console.log(error.message);
    }
}

// Test 1: Basic functionality
setTimeout(() => {
    console.log("Basic functionality");
    displayRandomNumbers(5, 1, 10, "|").catch(err => console.log(err.message));
}, 1000);

// Test 2: Edge case - length = 0
setTimeout(() => {
    console.log("Length = 0");
    displayRandomNumbers(0, 1, 10).catch(err => console.log(err.message));
}, 1000);

// Test 3: Edge case - negative length
setTimeout(() => {
    console.log("Negative length");
    displayRandomNumbers(-1, 1, 10).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 4: Edge case - min > max
    console.log("Min > Max");
    displayRandomNumbers(5, 10, 1).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 5: Edge case - min = max
    console.log("Min = Max");
    displayRandomNumbers(5, 5, 5).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 6: Edge case - length > range
    console.log("Length > range");
    displayRandomNumbers(15, 1, 10).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 7: Edge case - using defaults
    console.log("Using defaults");
    displayRandomNumbers(5).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 8: Edge case - large range
    console.log("Large range");
    displayRandomNumbers(10, 1, 1000).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 9: Edge case - single number
    console.log("Single number");
    displayRandomNumbers(1, 1, 10).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 10: Edge case - zero range
    console.log("Zero range");
    displayRandomNumbers(1, 0, 0).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 11: Edge case - floating point numbers
    console.log("Floating point numbers");
    displayRandomNumbers(5, 1.5, 10.7).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 12: Edge case - exact range
    console.log("Exact range");
    displayRandomNumbers(10, 1, 10).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 13: Edge case - undefined parameters
    console.log("Undefined parameters");
    displayRandomNumbers(5, undefined, undefined).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 14: Edge case - null parameters
    console.log("Null parameters");
    displayRandomNumbers(5, null as any, null as any).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 15: Edge case - string parameters
    console.log("String parameters");
    displayRandomNumbers(5, "1" as any, "10" as any).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 16: Edge case - boolean parameters
    console.log("Boolean parameters");
    displayRandomNumbers(true as any, 1, 10).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => { // Test 17: Edge case - array parameters
    console.log("Array parameters");
    displayRandomNumbers([5] as any, 1, 10).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 18: Edge case - object parameters
    console.log("Object parameters");
    displayRandomNumbers({} as any, 1, 10).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 19: Edge case - NaN parameters
    console.log("NaN parameters");
    displayRandomNumbers(NaN, 1, 10).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 20: Edge case - Infinity parameters
    console.log("Infinity parameters");
    displayRandomNumbers(Infinity, 1, 10).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 21: Edge case - negative range
    console.log("Negative range");
    displayRandomNumbers(5, -10, -1).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 22: Edge case - mixed positive/negative
    console.log("Mixed positive/negative");
    displayRandomNumbers(5, -5, 5).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 23: Edge case - very large numbers
    console.log("Very large numbers");
    displayRandomNumbers(5, Number.MAX_SAFE_INTEGER - 10, Number.MAX_SAFE_INTEGER).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {// Test 24: Edge case - very small numbers
    console.log("Very small numbers");
    displayRandomNumbers(5, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER + 10).catch(err => console.log(err.message));
}, 1000);

setTimeout(() => {
    // Test 25: Edge case - decimal length
    console.log("Decimal length");
    displayRandomNumbers(5.5, 1, 10).catch(err => console.log(err.message));
}, 1000);
