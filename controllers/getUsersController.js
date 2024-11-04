const Users = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
    try {
        const { role } = req.query;
        const filter = role ? { role } : {};
        const users = await Users.find(filter);
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: "Error retrieving users" })
    }
};