import { Router } from "express";
import passport from "passport";
import { UserManagerMongo } from "../dao/UserManagerMongo.js";

export const router = Router();

router.get("/", async (req, res) => {
    const users = await UserManagerMongo.getUsers();
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ users });
})

router.post("/", async (req, res) => {
    const user = await UserManagerMongo.create(req.body);
    res.setHeader('Content-Type', 'application/json');
    return res.status(201).json({ "Usuario creado": user });
})

router.post("/login", async (req, res) => {
    const user = await UserManagerMongo.login(req.body);
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ user });
})

router.get("/profile", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({ user: req.user });
});