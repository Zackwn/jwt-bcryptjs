// Importando somente o necessario do mongosse
import mongoose from "../connection"
import bcrypt from "bcryptjs"
const Schema = mongoose.Schema

export interface UserProps {
    _id: string,
    name: string,
    email: string,
    password: string
}

const UserSchema = new Schema<UserProps>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true,
    }
})



UserSchema.pre("save", async function(next) {
    if ((this as any).password) 
        (this as any).password = await bcrypt.hash((this as any).password, 8)

    next()
})

// export user to use in other scripts
mongoose.model("users", UserSchema)
export default mongoose.model("users")