import mongoose from "mongoose"

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/jwtDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    // useFindAndModify: false
}, (err) => {
    if (!err) {
        console.log("Database Ok!")
        return
    }
    console.log(err)
})


export default mongoose