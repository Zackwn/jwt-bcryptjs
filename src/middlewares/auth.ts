import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

import "dotenv/config"

declare module "express-serve-static-core" {
    interface Request {
        userId: string
    }
}


export default (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization

    if (!auth) 
        return res.json({ "Error": "Token not provided" })

    try {

        const parts = auth.split(" ")

        if (parts.length !== 2)
            return res.status(401).json({ "Error": "Token invalid" })

        const [ scheme, token ] = parts

        if (!/^Bearer$/i.test(scheme))
            return res.status(401).json({ "Error": "Token not provided correctly"})

        const Payload = jwt.verify(token, String(process.env.APP_SECRET))
        const payload = (Payload as any)

        req.userId = payload.userID

        next()
    } catch (err) {
        return res.status(401).json({ "Error": "Token invalid!" })
    }
}