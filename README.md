# HW#6 Calculator on HTTP server
## Protocol
### JSON inside request containing
- operation like "*", "-", "+", "/" <br>
- first operand as a number <br>
- second operand as a number
## Controller (index.js)
### controller reponsibility
- receive the data as JSON inside a request <br>
- validate the data structure (operation as a string, first and second operands as the strings) <br>
- in the case of invalid data structure, send reponse with status 400 with an appropriate message <br>
- in the case of valid data structure, call the method of the service "compute" receiving data as an object {operation: string, op1: number, op2: number} and returning result or throwing exception saying about missing operation<br>
- send back appropriate response
### service responsibility
- implementation of method "compute" explained above
