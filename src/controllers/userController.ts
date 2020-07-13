import { Request, Response } from "express"
import Users from "../database/models/users"

class userController {
    async index(req: Request, res: Response) {
        const _Users = await Users.find()
        return res.json({"Users": _Users})
    }
    
    async create(req: Request, res: Response) {
            try {
                const { 
                    name, 
                    email, 
                    password,
                } = req.body
                const data = {name, email, password}
                
                if (await Users.findOne({ email }))
                    return res.status(400).json({ "Error": "User alredy exists" })

                const newUser = await Users.create(data)

                // Retornar user -- sem a senha
                // const user = newUser as any
                // user.password = undefined
                // return res.json({ user })

                // Retornando o _id
                const { _id } = newUser
                return res.json({ _id })
            } catch (err) {
                return res.status(500).json({ "Error": "Something went wrong, try again!" })
            }        
    }
}

export default new userController