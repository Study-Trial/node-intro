import {NextFunction, Request, Response} from 'express'

export interface RequestWithTime extends Request {
    requestTime?: Date;
}

export function appendTime(req: RequestWithTime & {error: Error}, res: Response, next: NextFunction) {
    const time: any = new Date().toLocaleString();
    req.requestTime = time;
next();
}
