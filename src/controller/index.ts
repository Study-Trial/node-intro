import http from 'node:http';
import { calculate } from '../service/compute.ts';

function validateArgs(args: any) {
   if (args.operation === undefined || args.op1 === undefined || args.op2 === undefined) {
      throw new Error(`Undefined argument found: argument 1 is ${args.operation}, argument 2 is ${args.op1}, argument 3 is ${args.op2}`);
   }
}

function validateOperation(operation: string) {
   if (typeof operation !== "string") {
      throw new Error(`Operation is not a string: ${typeof operation}`);
   }
}

function validateOperands(op1: number, op2: number) {
   if (typeof op1 !== "number" || typeof op2 !== "number") {
      throw new Error(`Operands are not both numbers: operand 1 is ${typeof op1}, operand 2 is ${typeof op2}`);
   }
}

const server = http.createServer();
const port = 3500;
server.listen(port, () => console.log('listening on port ' + port));
server.on("request", async (req, res) => {
   let data = "";
   for await (let chunk of req) {
      data += chunk;
   }
   try {
      const args = JSON.parse(data);
      validateArgs(args);
      const { operation, op1, op2 } = args;
      validateOperation(operation);
      validateOperands(op1, op2);
      const result = calculate(operation, op1, op2);
      res.statusCode = 200;
      res.end(result.toString());
   } catch (error) {
      res.statusCode = 400;
      res.end(error.message);
   }
})


