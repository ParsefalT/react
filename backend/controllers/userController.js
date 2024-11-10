import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import createToken from "../utils/token.js";

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new Error("type all fields");
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).send("user exist");
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(password, salt);
    const newUser = new User({ email, username, password: hashedPass });

    try {
        await newUser.save();
        createToken(res, newUser._id);

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        });
    } catch (error) {
        throw new Error("invalid user");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const isPasswordValid = await bcryptjs.compare(
            password,
            existingUser.password
        );

        if (isPasswordValid) {
            createToken(res, existingUser._id);

            res.status(201).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin,
            });
        } else {
            res.status(401).json({ msg: "invalid fields" });
        }
    } else {
        res.status(401).json({ msg: "not found" });
    }
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ msg: "logout success" });
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    if (users) {
        res.status(200).send(users);
    } else {
        res.status(404).json({ msg: "not found" });
    }
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } else {
        res.status(404).json({ msg: "not found" });
    }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    
    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            const salt = await bcryptjs.genSalt(10);
            const hashedPass = await bcryptjs.hash(req.body.password, salt);
            user.password = hashedPass;
        }

        const updateUser = await user.save();

        res.json({
            _id: updateUser._id,
            username: updateUser.username,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        });
    } else {
        res.status(404).json({ msg: "something wrong" });
    }
});

export {
    createUser,
    loginUser,
    logoutCurrentUser,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
};
