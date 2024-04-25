const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post("/signup", bodyParser.json(), async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res
            .status(400)
            .json({msg: "User with username already exists"});
        }        

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({username, password: hashedPassword}); 

        const savedUser = await newUser.save();

        console.log(savedUser.username);
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({error: err.message });
    }
});

router.post("/login", bodyParser.json(), async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res
            .status(400)
            .json({msg: "User with username does not exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ msg: "Incorrect password"})
        }

        const token = jwt.sign({ id: user._id }, '$2a$10$lqzdJM38guz3EvH4/bZjPe1GvZC2eUUH5hHCLBpz.ZoTgoiY6o7fW');

        res.json({ token, user: { id: user._id, username: user.username }});
    } catch (err) {
        res.status(500).json({error: err.message });
    }
});

router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.json(false);
        const verified = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
        if (!verified) return res.json(false);
        const user = await User.findById(verified.id);
        if (!user) return res.json(false);
        return res.json(true);
    } catch (err) {
        res.status(500).json({error: err.message });
    }
});

// Get users
// router.get('/', (req, res) => {
//     User.find()
//     .then((items) => res.json(items))
//     .catch((err) => res.status(404).json({ noitemsfound: "No items found"}));
// });
// Get user by id
// router.get('/:id', (req, res) => {
//     User.findById(req.params.id)
//     .then((item) => res.json(item))
//     .catch((err) => res.status(404).json({ noitemfound: "No item found"}));
// });
// // Get user by username
// router.get('/username/:username', (req, res) => {
//     User.find({username: req.params.username})
//     .then((item) => res.json(item))
//     .catch((err) => res.status(404).json({ noitemfound: "No item found"}));
// });
// // Add user
// router.post('/', bodyParser.json(), (req, res) => {
//     User.create(req.body)
//     .then((item) => res.json({ msg: 'Item added successfully' }))
//     .catch((err) => res.status(400).json({ error: 'Unable to add this item'}));
// });
// // Update user
// router.put('/:id',(req, res) => {
//     User.findByIdAndUpdate(req.params.id, req.body)
//     .then((item) => res.json({msg: 'Updated successfully'}))
//     .catch((err) => res.status(400).json({error: 'Unable to update the database'}))
// });
// // Delete user
// router.delete('/:id',(req, res) => {
//     User.findByIdAndDelete(req.params.id)
//     .then((item) => res.json({msg: 'Item deleted successfully'}))
//     .catch((err) => res.status(400).json({error: 'No item found'}))
// });

module.exports = router;