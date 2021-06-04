import { Router } from "express"
import passport from "passport"
const router = Router()

router.get("/discord", passport.authenticate("discord"));

router.get("/discord/redirect", passport.authenticate("discord"), (req, res) => {
    res.send(200)
})

router.get("/", (req, res) => {
    if (req.user) {
        res.send(req.user)
    }
    else {
        res.sendStatus(401).send({ msg: "Unauthorized" })
    }
})

export default router