import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15*60*1000,
    max: 100,
    message:{
        succes: false,
        msg: "Demasiadas peticiones desde esta IP intenta más tarde"
    }
})

export default limiter;