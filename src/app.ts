import express from "express"
import session from "express-session"
import passport from "passport"
import { MOngoLink, Port } from "./config"
import routes from "./Routes/index"
import init_strategy from "./Strategies/discord"
import mongoose from "mongoose"
import Store from "connect-mongo"
init_strategy()

const app = express()

mongoose.connect(MOngoLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(session({
    secret: "secret",
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    resave: false,
    saveUninitialized: false,
    store: Store.create({
        mongoUrl: MOngoLink
    })
}))

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);

app.listen(Port, () => console.log(`Running on Port ${Port}`))
