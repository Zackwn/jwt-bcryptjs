import express from "express"
const routes = express.Router()

import userController from "./controllers/userController"
import sessionController from "./controllers/sessionController"
import auth from "./middlewares/auth"
import authTest from "./tests/authTest"

routes.get("/users", userController.index)

routes.post("/create-user", userController.create)
routes.post("/login", sessionController.login)


routes.use(auth)

routes.get("/test", authTest.test)

export default routes


