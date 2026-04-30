import type { Request, Response } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import UserRepository, { type IUser } from "../user/userRepository";

const userRepository = new UserRepository();

const authController = {
    async register(req: Request, res: Response) {
        try {
            const { email, firstName, lastName, password } = req.body;

         
            const existingUsers = await userRepository.findByEmail(email);
            if (existingUsers.length > 0) {
                return res.status(400).json({ error: "Cet email est déjà utilisé" });
            }

          
            const hashPassword = await argon2.hash(password);

          const newUser = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: hashPassword
            }
            const id = await userRepository.create(newUser as IUser);

            res.status(201).json({ id, message: "Utilisateur créé avec succès" });
        } catch (error) {
            console.error("Erreur lors de l'inscription:", error);
            res.status(500).json({ error: "Erreur lors de l'inscription" });
        }
    },

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

           
            const users = await userRepository.findByEmail(email);
            console.log(users[0]);
            if (users.length === 0) {
                return res.status(401).json({ error: "Email ou mot de passe incorrect" });
            }

            const user = users[0]!;

           console.log(users[0]);
            const isValidPassword = await argon2.verify(users[0] ? users[0].password: "null", password);

            if (!isValidPassword) {
                return res.status(401).json({ error: "Email ou mot de passe incorrect" });
            }

    
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET || "default_secret",
                { expiresIn: "24h" }
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000 
            });

            res.json({
                message: "Connexion réussie",
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            res.status(500).json({ error: "Erreur lors de la connexion" });
        }
    },

    async logout(req: Request, res: Response) {
        try {
           
            res.clearCookie("token");
            res.json({ message: "Déconnexion réussie" });
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
            res.status(500).json({ error: "Erreur lors de la déconnexion" });
        }
    }
};

export default authController;