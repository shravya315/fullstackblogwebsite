import jwt from "jsonwebtoken";


const auth = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.json({ success: false, message: "No token provided" });
    }
    if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.json({ success: false, message: "Invalid token" });
    }
};

export default auth;
