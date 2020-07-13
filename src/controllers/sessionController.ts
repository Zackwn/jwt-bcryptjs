import { Request, Response } from "express"
import Users from "../database/models/users"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import "dotenv/config"

class sessionController {
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            // user é o User sem tipagem requirida
            const User = await Users.findOne({ email })

            if (!User)
                return res.status(400).json({ "Error": "User not found" })

            // Tipando o user para poder usar a password
            const user = (User as any)
            console.log(user.password, user.name, user.email)
        
            // Verifica se a senha está correta, Primeito argumento é a senha do signin
            // a outra é a do user já cadastrado
            const isPasswordCorrect = await bcrypt.compare(password, user.password)
            
            if (!isPasswordCorrect)
                return res.status(401).json({ "Error": "Wrong Password" })

            return res.status(200).json({
                    token: jwt.sign(
                        { userID: user._id }, 
                        String(process.env.APP_SECRET),
                        {
                            expiresIn: "7d"
                        }
                    )
            })
        } catch (err) {
            return res.status(500).json({"Error": "Something went wrong, try again!"})
        }
    }
}

export default new sessionController