import RandomNumberStream from './RandomNumberStream.ts';

// Test 1: Basic functionality
console.log("=== Test 1: Basic functionality ===");
try {
    const randomNumberStream = new RandomNumberStream(5, 1, 10, false);
    randomNumberStream.pipe(process.stdout);
    randomNumberStream.on('end', () => process.stdout.write("\n"));
} catch (error) {
    console.log("Error:", error.message);
}

// Test 2: Unique numbers
setTimeout(() => {console.log("=== Test 2: Unique numbers ===");
try {
    const uniqueStream = new RandomNumberStream(5, 1, 10, true);
    uniqueStream.pipe(process.stdout);
    uniqueStream.on('end', () => process.stdout.write("\n"));
} catch (error) {
    console.log("Error:", error.message);
}}, 1000);

// Test 3: Edge case - length = 0
setTimeout(() => {console.log("=== Test 3: Length = 0 ===");
try {
    const zeroLengthStream = new RandomNumberStream(0, 1, 10, false);
    zeroLengthStream.pipe(process.stdout);
    zeroLengthStream.on('end', () => process.stdout.write("\n"));
} catch (error) {
    console.log("Error:", error.message);
}}, 1000);

// Test 4: Edge case - negative length
setTimeout(() => {console.log("=== Test 4: Negative length ===");
try {
    const negativeLengthStream = new RandomNumberStream(-1, 1, 10, false);
    negativeLengthStream.pipe(process.stdout);
    negativeLengthStream.on('end', () => process.stdout.write("\n"));
} catch (error) {
    console.log("Error:", error.message);
}}, 1000);

// Test 5: Edge case - min > max
setTimeout(() => {console.log("=== Test 5: Min > Max ===");
try {
    const invalidRangeStream = new RandomNumberStream(5, 10, 1, false);
    invalidRangeStream.pipe(process.stdout);
    invalidRangeStream.on('end', () => process.stdout.write("\n"));
} catch (error) {
    console.log("Error:", error.message);
}}, 1000);

// Test 6: Edge case - length > (max - min + 1) for unique
setTimeout(() => {console.log("=== Test 6: Length too large for unique ===");
try {
    const tooLargeStream = new RandomNumberStream(15, 1, 10, true);
    tooLargeStream.pipe(process.stdout);
    tooLargeStream.on('end', () => process.stdout.write("\n"));
} catch (error) {
    console.log("Error:", error.message);
}}, 1000);

// Test 7: Edge case - length > (max - min + 1) for non-unique
setTimeout(() => {console.log("=== Test 7: Length too large for non-unique ===");
    try {
        const tooLargeStream = new RandomNumberStream(15, 1, 10, false);
        tooLargeStream.pipe(process.stdout);
        tooLargeStream.on('end', () => process.stdout.write("\n"));
    } catch (error) {
        console.log("Error:", error.message);
    }}, 1000);

// Test 8: Edge case - same min and max
setTimeout(() => {console.log("=== Test 8: Same min and max ===");
try {
    const sameMinMaxStream = new RandomNumberStream(5, 5, 5, false);
    sameMinMaxStream.pipe(process.stdout);
    sameMinMaxStream.on('end', () => process.stdout.write("\n"));
} catch (error) {
    console.log("Error:", error.message);
}}, 1000);

// Test 9: Edge case - using defaults
setTimeout(() => {console.log("=== Test 9: Using defaults ===");
try {
    const defaultStream = new RandomNumberStream(5);
    defaultStream.pipe(process.stdout);
    defaultStream.on('end', () => process.stdout.write("\n"));
} catch (error) {
    console.log("Error:", error.message);
}}, 1000);

// Test 10: Edge case - large range
setTimeout(() => {console.log("=== Test 10: Large range ===");
try {
    const largeRangeStream = new RandomNumberStream(10, 1, 1000, false);
    largeRangeStream.pipe(process.stdout);
    largeRangeStream.on('end', () => process.stdout.write("\n"));
} catch (error) {
    console.log("Error:", error.message);
}}, 1000);

// Test 11: Edge case - single number with unique
setTimeout(() => {console.log("=== Test 11: Single number with unique ===");
try {
    const singleNumberStream = new RandomNumberStream(1, 1, 10, true);
    singleNumberStream.pipe(process.stdout);
    singleNumberStream.on('end', () => process.stdout.write("\n"));
} catch (error) {
    console.log("Error:", error.message);
}}, 1000);

// Test 12: Edge case - invalid number types
setTimeout(() => {console.log("=== Test 12: Invalid number types ===");
try {
    // @ts-ignore - Testing invalid input
    const invalidTypeStream = new RandomNumberStream("abc", 1, 10, false);
    invalidTypeStream.pipe(process.stdout);
    invalidTypeStream.on('end', () => process.stdout.write("\n"));
} catch (error) {
    console.log("Error:", error.message);
}}, 1000);

// Test 13: Edge case - floating point numbers
setTimeout(() => {console.log("=== Test 13: Floating point numbers ===");
try {   
    const floatStream = new RandomNumberStream(5, 1.5, 10.7, false);
    floatStream.pipe(process.stdout);
    floatStream.on('end', () => process.stdout.write("\n"));
} catch (error) {
    console.log("Error:", error.message);
}}, 1000);

// Test 14: Edge case - zero range
setTimeout(() => {console.log("=== Test 14: Zero range ===");
try {
    const zeroRangeStream = new RandomNumberStream(1, 0, 0, false);
    zeroRangeStream.pipe(process.stdout);
    zeroRangeStream.on('end', () => process.stdout.write("\n"));
} catch (error) {
    console.log("Error:", error.message);
}}, 1000);

// Test 15: Edge case - undefined amount
setTimeout(() => {console.log("=== Test 15: Undefined amount ===");
    try {
        const undefinedAmountStream = new RandomNumberStream(undefined);
        undefinedAmountStream.pipe(process.stdout);
        undefinedAmountStream.on('end', () => process.stdout.write("\n"));
    } catch (error) {
        console.log("Error:", error.message);
    }}, 1000);