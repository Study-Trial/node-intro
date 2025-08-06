

const compute = <Record<string, (op1: number, op2: number) => number>> {
      "+": (op1, op2) => op1 + op2,
      "-": (op1, op2) => op1 - op2,
      "*": (op1, op2) => op1 * op2,
      "/": (op1, op2) => op1 / op2
   }

export function calculate(operation: string, op1: number, op2: number) {
      if (!compute[operation]) {
         throw new Error(`Invalid operation: ${operation}`);
      }
      if (operation === "/" && op2 === 0) {
         throw new Error("Division by zero");
      }
      return compute[operation](op1, op2);
   }