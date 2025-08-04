

export function compute(operation: string, op1: number, op2: number) {
    switch (operation) {
       case "+":
          return op1 + op2;
       case "-":
          return op1 - op2;
       case "*":
          return op1 * op2;
       case "/":
          if (op2 === 0) {
             throw new Error("Division by zero");
          }
          return op1 / op2;
    }
 }