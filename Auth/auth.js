const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config()




//======================================  Authentication  ===========================================//

const authenticationAndAuthorization = function (req, res, next) {
    try {
        let token = req.header("Authorization", "Bearer Token")

        if (!token) return res.status(401).send({ status: false, message: "Please enter token in bearer token" });
        let splittoken = token.split(" ")

        let authenticatedToken;

        try {
            authenticatedToken = jwt.verify(splittoken[1], process.env.jwtSecretKey);
        } catch (error) {
            if (error.mesage == "jwt expiry") {
                return res.status(401).json({ message: "Your session has been expired!" })
            }
            return res.status(401).json({ message: "Unauthenticated!" })
        }


        let userId = req.params.userId
        req.id = authenticatedToken.id
        req._id = authenticatedToken._id

        if (req.id != userId) return res.status(403).send({ status: false, message: "Unauthorized access!" });

        req.email = authenticatedToken.email
        req.firstName = authenticatedToken.firstName

        next()
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });

    }
};












module.exports = { authenticationAndAuthorization }