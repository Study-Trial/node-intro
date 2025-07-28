import RandomNumberStream from './RandomNumberStream.ts';

// Test 1: Basic functionality
console.log("=== Test 1: Basic functionality ===");
try {
    const randomNumberStream = new RandomNumberStream(5, false, 1, 10);
    randomNumberStream.pipe(process.stdout);
    randomNumberStream.on('end', () => process.stdout.write("\n"));
} catch (error) {
    console.log("Error:", error.message);
}

// Test 2: Unique numbers
setTimeout(() => {console.log("=== Test 2: Unique numbers ===");
try {
    const uniqueStream = new RandomNumberStream(5, true, 1, 10);
    uniqueStream.pipe(process.stdout);
    uniqueStream.on('end', () => process.stdout.write("\n"));
} catch (error) {
    console.log("Error:", error.message);
}}, 1000);

// Test 3: Edge case - length = 0
setTimeout(() => {console.log("=== Test 3: Length = 0 ===");
try {
    const zeroLengthStream = new RandomNumberStream(0, false, 1, 10);
    zeroLengthStream.pipe(process.stdout);
    zeroLengthStream.on('end', () => process.stdout.write("\n"));
} catch (error) {
    console.log("Error:", error.message);
}}, 1000);

// Test 4: Edge case - negative length
setTimeout(() => {console.log("=== Test 4: Negative length ===");
try {
    const negativeLengthStream = new RandomNumberStream(-1, false, 1, 10);
    negativeLengthStream.pipe(process.stdout);
    negativeLengthStream.on('end', () => process.stdout.write("\n"));
} catch (error) {
    console.log("Error:", error.message);
}}, 1000);

// Test 5: Edge case - min > max
setTimeout(() => {console.log("=== Test 5: Min > Max ===");
try {
    const invalidRangeStream = new RandomNumberStream(5, false, 10, 1);
    invalidRangeStream.pipe(process.stdout);
    invalidRangeStream.on('end', () => process.stdout.write("\n"));
} catch (error) {
    console.log("Error:", error.message);
}}, 1000);

// Test 6: Edge case - length > (max - min + 1) for unique
setTimeout(() => {console.log("=== Test 6: Length too large for unique ===");
try {
    const tooLargeStream = new RandomNumberStream(15, true, 1, 10);
    tooLargeStream.pipe(process.stdout);
    tooLargeStream.on('end', () => process.stdout.write("\n"));
} catch (error) {
    console.log("Error:", error.message);
}}, 1000);

// Test 6.1: Edge case - length > (max - min + 1) for non-unique
setTimeout(() => {console.log("=== Test 6.1: Length too large for non-unique ===");
    try {
        const tooLargeStream = new RandomNumberStream(15, false, 1, 10);
        tooLargeStream.pipe(process.stdout);
        tooLargeStream.on('end', () => process.stdout.write("\n"));
    } catch (error) {
        console.log("Error:", error.message);
    }}, 1000);

// Test 7: Edge case - same min and max
setTimeout(() => {console.log("=== Test 7: Same min and max ===");
try {
    const sameMinMaxStream = new RandomNumberStream(5, false, 5, 5);
    sameMinMaxStream.pipe(process.stdout);
    sameMinMaxStream.on('end', () => process.stdout.write("\n"));
} catch (error) {
    console.log("Error:", error.message);
}}, 1000);

// Test 8: Edge case - using defaults
setTimeout(() => {console.log("=== Test 8: Using defaults ===");
try {
    const defaultStream = new RandomNumberStream(5);
    defaultStream.pipe(process.stdout);
    defaultStream.on('end', () => process.stdout.write("\n"));
} catch (error) {
    console.log("Error:", error.message);
}}, 1000);

// Test 9: Edge case - large range
setTimeout(() => {console.log("=== Test 9: Large range ===");
try {
    const largeRangeStream = new RandomNumberStream(10, false, 1, 1000);
    largeRangeStream.pipe(process.stdout);
    largeRangeStream.on('end', () => process.stdout.write("\n"));
} catch (error) {
    console.log("Error:", error.message);
}}, 1000);

// Test 10: Edge case - single number with unique
setTimeout(() => {console.log("=== Test 10: Single number with unique ===");
try {
    const singleNumberStream = new RandomNumberStream(1, true, 1, 10);
    singleNumberStream.pipe(process.stdout);
    singleNumberStream.on('end', () => process.stdout.write("\n"));
} catch (error) {
    console.log("Error:", error.message);
}}, 1000);

// Test 11: Edge case - invalid number types
setTimeout(() => {console.log("=== Test 11: Invalid number types ===");
try {
    // @ts-ignore - Testing invalid input
    const invalidTypeStream = new RandomNumberStream("abc", false, 1, 10);
    invalidTypeStream.pipe(process.stdout);
    invalidTypeStream.on('end', () => process.stdout.write("\n"));
} catch (error) {
    console.log("Error:", error.message);
}}, 1000);

// Test 12: Edge case - floating point numbers
setTimeout(() => {console.log("=== Test 12: Floating point numbers ===");
try {   
    const floatStream = new RandomNumberStream(5, false, 1.5, 10.7);
    floatStream.pipe(process.stdout);
    floatStream.on('end', () => process.stdout.write("\n"));
} catch (error) {
    console.log("Error:", error.message);
}}, 1000);

// Test 13: Edge case - zero range
setTimeout(() => {console.log("=== Test 13: Zero range ===");
try {
    const zeroRangeStream = new RandomNumberStream(1, false, 0, 0);
    zeroRangeStream.pipe(process.stdout);
    zeroRangeStream.on('end', () => process.stdout.write("\n"));
} catch (error) {
    console.log("Error:", error.message);
}}, 1000);