import { check, validationResult } from "express-validator"


export const validateLogin = [
    check("email").isEmail().withMessage("Please Enter A Valid Email").normalizeEmail(),
    check("password").not().isEmail().trim().escape(),
    HandleError
]


export const validateRegister = [
    check("email").isEmail().withMessage("Please Enter A Valid Email").normalizeEmail(),
    check("password").isLength({min:6}).withMessage("Password Must Be 6 characters long").trim().escape(),
    check("username").not().isEmpty().withMessage("Username Is Required").matches(/^[a-zA-Z0-9]+$/).withMessage('username must not contain spaces or special characters').trim().escape(),
    HandleError
];

export function HandleError(req,res,next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}