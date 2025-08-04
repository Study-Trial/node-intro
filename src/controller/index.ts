import http from 'node:http';
import { compute } from '../service/compute.ts';

function validateArgs(args: any) {
   if (!args.operation || (!args.op1 && args.op1 !== 0) || (!args.op2 && args.op2 !== 0)) {
      throw new Error(`Invalid arguments: argument 1 is ${args.operation}, argument 2 is ${args.op1}, argument 3 is ${args.op2}`);
   }
}

function validateOperation(operation: string) {
   if (operation !== "+" && operation !== "-" && operation !== "*" && operation !== "/") {
      throw new Error("Invalid operation");
   }
}

function validateOperands(op1: number, op2: number) {
   if (typeof op1 !== "number" || typeof op2 !== "number") {
      throw new Error(`Operands are not numbers : operand 1 is ${typeof op1}, operand 2 is ${typeof op2}`);
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
      const { operation, op1, op2 } = args || {};
      validateArgs(args);
      validateOperation(operation);
      validateOperands(op1, op2);
      const result = compute(operation, op1, op2);
      res.statusCode = 200;
      res.end(result.toString());
   } catch (error) {
      res.statusCode = 400;
      res.end(error.message);
   }
})


