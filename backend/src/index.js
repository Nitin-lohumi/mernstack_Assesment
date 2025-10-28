import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "../routes/authRoute.js";
import Assigmentrouter from "../routes/AssigmentRoute.js";
import verifyToken from "../middleware/AuthMiddleWare.js";
import connectDB from "../DB/Db.js";
dotenv.config();
const app = express();
app.use(cors({
    origin: ["http://localhost:5173", "https://mernstack-assesment.vercel.app"],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
connectDB();

app.use("/api/auth", router);

app.use(verifyToken);

app.use("/api", Assigmentrouter);

app.get("/auth/check", (req, res) => {
    return res.json({ isLoggedIn: "true", user: req.user });
});

app.get("/auth/logout", (req, res) => {
    req.user = null;
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
    });
    res.json({ msg: "sucessfull logout" });
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
