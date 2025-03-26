import express from "express";
import { expressjwt as jwt } from "express-jwt";
import jwksRsa from "jwks-rsa";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const TENANT_ID = process.env.TENANT_ID;
const AUDIENCE = process.env.AUDIENCE;

app.use(
    jwt({
        secret: jwksRsa.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksUri: `https://login.microsoftonline.com/${TENANT_ID}/discovery/v2.0/keys`,
        }) as any,
        audience: AUDIENCE,
        issuer: `https://login.microsoftonline.com/${TENANT_ID}/v2.0`,
        algorithms: ["RS256"],
    })
);

// Protected Route
app.get("/protected", (req, res) => {
    res.json({ message: "Authenticated successfully via Managed Identity!" });
});

app.listen(PORT, () => console.log(`Microservice B running on port ${PORT}`));
