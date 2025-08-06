
import { validation } from '../middleware/validation.ts';
import CalculationData from '../model/CalculationData.ts';
import { appendTime, RequestWithTime } from '../middleware/requestTime.ts';
import calculator, { WrongOperationError } from '../service/calculator.ts'
import express, {Response, Request} from 'express'
import { limitRequests } from '../middleware/limitRequests.ts';

const port = 3500;

const app = express();
app.listen(port);
app.use(express.json());
app.use(validation)
app.use(appendTime)
app.post("/api/greet", limitRequests, (req: RequestWithTime & {error: Error}, res: Response) => {
    req.body = {}
    const greeting = "Hello";
    req.body.message = greeting;
    req.body.requestedAt = req.requestTime;
    res.send(req.body)
})
app.get("/api/status", (req: RequestWithTime & {error: Error}, res: Response) => {
    const status = "Up and Running";
    req.body.status = status;
    req.body.requestedAt = req.requestTime;
    res.send(req.body)
})
app.post("/api/calculator", (req: Request & {error: Error}, res: Response) => {
 try {
   if(!req.body) {
      throw req.error
   }
    const result = calculator.calculate(req.body as CalculationData)
    sendResponse(res, 200, result);
 } catch (error) {
   const status = error instanceof WrongOperationError ? 404 : 400;
   sendResponse(res, status, error.message)
 }
})
app.get("/api/calculator/:operation/:op1/:op2", validation, (req: Request & {error: Error}, res: Response) => {
   try {
      if(!req.body) {
      throw req.error
   } 
    const result = calculator.calculate(req.params as any)
    sendResponse(res, 200, result);
 } catch (error) {
   const status = error instanceof WrongOperationError ? 404 : 400;
   sendResponse(res, status, error.message)

 }

})
function sendResponse(res: Response, status: number, result: number | string) {
      res.statusCode = status;
      res.send(result)
}

