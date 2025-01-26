
const jwt = require("jsonwebtoken");
const accessTokenKey = "147854785";

const isLogin = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                status: "fail",
                msg: "Unauthorized user"
            });
        }
        let decode = jwt.verify(token, accessTokenKey);
        const id = decode.id;
        const role = decode.role;


        req.headers.id = id;
        req.headers.role = role;

        if (!decode) {
            return res.status(401).json({
                status: "fail",
                msg: "Invalid token please login"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            msg: error.toString()
        });
    }
};

const isLogout = (req, res, next) => {
    try {
        let accessToken = req.cookies.accessToken;
        if (accessToken) {
            let decode = jwt.verify(accessToken, accessTokenKey);
            if (decode) {
                return res.status(409).json({
                    status: "fail",
                    msg: "You have already login"
                })
            } else {
                return res.status(401).json({
                    status: "fail",
                    msg: "User token expired"
                });
            }
        }
        next()
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: error.toString()
        });
    }
};

const isAdmin = (req, res, next) => {
    try {
        let role = req.headers.role;
        if (role !== "admin") {
            return res.status(403).json({
                status: "fail",
                msg: "You have not permission"
            })
        }
        next();

    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: error.toString()
        })
    }
};



module.exports = { isLogin, isLogout, isAdmin }