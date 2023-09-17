import express from "express"
import { createUser, getUserByEmail } from "../db/users";
import { random, authentication } from "../helpers";

export const register = async (req: express.Request, res: express.Response) => {
    try{
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            console.log("smt")
            return res.sendStatus(400);
        }
        
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            console.log("User with that email already exist");
            return res.sendStatus(400);
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            }
        });

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
        console.log("error register")
        return res.sendStatus(400);
    }
}