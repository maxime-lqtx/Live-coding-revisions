import express from "express";
import userController from "../src/modules/user/userController";
import authController from "./modules/auth/authController";
import verifyToken from "./middleware/verifyToken";

const router = express.Router();


router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.post("/users", userController.create);
router.get("/users", verifyToken, userController.readAll);
router.get("/users/:id", verifyToken, userController.read);
router.put("/users/:id", verifyToken, userController.update);
router.delete("/users/:id", verifyToken, userController.delete);

export default router;