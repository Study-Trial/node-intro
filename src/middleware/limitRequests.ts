import rateLimit from 'express-rate-limit';

export const limitRequests = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 3,
    message: "Too Many Requests"
})
