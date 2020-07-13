import { Request, Response } from "express"
import Users from "../database/models/users"

class authTest {
    async test(req: Request, res: Response) {
        try {
            const user = await Users.findOne({ _id: req.userId })
            const UserRes = ( user as any )
            UserRes.password = undefined
    
            if (!user)
                return res.status(404).json({ "Error": "User not found" })
    
            // UserRes não entraga a senha, o user sim...
            return res.json({ UserRes })
        } catch (err) {
            return res.status(500).json("Internal error")
        }
    }
}

export default new authTest