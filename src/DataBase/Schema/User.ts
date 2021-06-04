import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    discordId: {
        type: String,
        required: true,
        unique: true
    },
    discordTag: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    guilds: {
        type: Array,
        required: true
    }
})

export default mongoose.model("User", UserSchema)