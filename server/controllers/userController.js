const User = require('../modal/userModal');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const usernameCheck = await User.findOne({ username });
        if (usernameCheck)
            return res.json({ status: false, message: "Username already used" });

        const emailCheck = await User.findOne({ email });
        if (emailCheck)
            return res.json({ status: false, message: "Email already used" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })

        delete user.password;
        return res.json({ status: true, user })
    } catch (err) {
        next(err);
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user)
            return res.json({ status: false, message: "Incorrect username and password" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid)
            return res.json({ status: false, message: "Incorrect username and password" });

        delete user.password;

        return res.json({ status: true, user });
    } catch (err) {
        next(err);
    }
}

module.exports.setAvatar = async (req, res, next) => {
    try {
        const { avatarImage } = req.body;
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, { isAvatarImageSet: true, avatarImage });

        res.json({
            isSet: user.isAvatarImageSet,
            image: user.avatarImage
        });
    } catch (err) {
        next(err);
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "avatarImage",
            "_id"
        ])
        return res.json({ status: true, users });
    } catch (err) {
        next(err);
    }
}