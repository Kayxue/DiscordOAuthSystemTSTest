import passport from "passport"
import DiscordStrategy from "passport-discord"
import { CallBack_Url, Client_Id, Client_Secret } from "../config";
import User from "../DataBase/Schema/User";


export default function init() {
    passport.serializeUser((user: any, done) => {
        done(null, user.discordId)
    })
    passport.deserializeUser(async (discordId: string, done) => {
        try {
            const user = await User.findOne({ discordId })
            return user ? done(null, user) : done(null, null)
        } catch (err) {
            done(err, null)
        }
    })
    passport.use(
        new DiscordStrategy({
            clientID: Client_Id,
            clientSecret: Client_Secret,
            callbackURL: CallBack_Url,
            scope: ["identify", "guilds"],
        }, async (accessToken, refreshToken, profile, done) => {
            const { id, username, discriminator, avatar, guilds } = profile;
            console.log(profile)
            try {
                let findUser = await User.findOneAndUpdate({ discordId: id }, {
                    discordTag: `${username}#${discriminator}`,
                    avatar,
                    guilds
                }, { new: true })
                if (findUser) {
                    console.log("User was found");
                    return done(null, findUser)
                }
                else {
                    const newUser = await User.create({
                        discordId: id,
                        discordTag: `${username}#${discriminator}`,
                        avatar,
                        guilds
                    });
                    return done(null, newUser);
                }
            } catch (err) {
                console.log(err);
                return done(err, null)
            }
        })
    )
}
