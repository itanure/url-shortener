import rateLimit from "express-rate-limit";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS_LOCAL = 100;
const RATE_LIMIT_MAX_REQUESTS_DEFAULT = 100;
const RATE_LIMIT_MESSAGE = "Too many requests, please try again later.";

export const rateLimiter = rateLimit({
    windowMs: RATE_LIMIT_WINDOW_MS,
    max: (req, res) => {
        if (req.ip === '127.0.0.1') {
            return RATE_LIMIT_MAX_REQUESTS_LOCAL; 
        }
        return RATE_LIMIT_MAX_REQUESTS_DEFAULT; 
    },
    message: RATE_LIMIT_MESSAGE
});