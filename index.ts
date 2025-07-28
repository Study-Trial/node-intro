import CounterStream from './CounterStream.ts'
const counterStream = new CounterStream(100);
counterStream.pipe(process.stdout);
counterStream.on('end', () => process.stdout.write("\n"))