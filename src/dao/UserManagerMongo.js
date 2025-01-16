import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../utils/hash.js";
import { usersModelo } from "./models/userModel.js";

export class UserManagerMongo {
    static async create(user) {
        const { first_name, last_name, email, age, password } = user;

        if (!first_name || !last_name || !email || !age || !password) {
            return {
                message: "All fields are required",
            };
        }
        const userExists = await usersModelo.findOne({ email });

        if (userExists)
            return { message: "User already exists" };

        try {
            const hashedPassword = await hashPassword(password);

            const newUser = await usersModelo.create({
                first_name,
                last_name,
                age,
                password: hashedPassword,
                email,
            });

            return newUser;
        } catch (error) {
            console.log(error);
        }
    }

    static async login(user) {
        const { email, password } = user;
        if (!email || !password) {
            return {
                message: "All fields are required",
            };
        }
        const userExists = await usersModelo.findOne({ email });

        if (!userExists)
            return { message: "User not found" };

        const isPasswordCorrect = await comparePassword(
            password,
            userExists.password
        );

        if (!isPasswordCorrect)
            return { message: "Incorrect password" };

        const token = jwt.sign(
            {
                email: userExists.email,
            },
            "secret",
            { expiresIn: "1h" }
        );

        return {
            message: "Login successful",
            token,
        }
    }
    
}