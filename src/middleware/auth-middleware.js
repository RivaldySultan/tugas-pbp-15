import {prismaClient} from "../application/database.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.get('Authorization');
    console.log('Received token:', token);
    if (!token || !token.startsWith('Bearer ')) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end();
    } else {
        const extractedToken = token.split(' ')[1];

        const user = await prismaClient.user.findFirst({
            where: {
                token: extractedToken
            }
        });

        if (!user) {
            res.status(401).json({
                errors: "Unauthorized"
            }).end();
        } else {
            req.user = user;
            next();
        }
    }
}
