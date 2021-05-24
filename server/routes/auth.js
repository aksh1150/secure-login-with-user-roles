import express from 'express';

const router = express.Router();

// middleware
import { requireSignin } from '../middlewares'

// controllers
import { register, login, logout } from "../controllers/auth";

router.post("/register", register)
router.post("/login", login)
router.get("/logout", logout)
router.get("/current-user", requireSignin)

module.exports = router