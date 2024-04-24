const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");
const User = require("../models/user");

// Get users
// router.get('/', (req, res) => {
//     User.find()
//     .then((items) => res.json(items))
//     .catch((err) => res.status(404).json({ noitemsfound: "No items found"}));
// });
// Get user by id
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ noitemfound: "No item found"}));
});
// Get user by username
router.get('/username/:username', (req, res) => {
    User.find({username: req.params.username})
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ noitemfound: "No item found"}));
});
// Add user
router.post('/', bodyParser.json(), (req, res) => {
    User.create(req.body)
    .then((item) => res.json({ msg: 'Item added successfully' }))
    .catch((err) => res.status(400).json({ error: 'Unable to add this item'}));
});
// Update user
router.put('/:id',(req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
    .then((item) => res.json({msg: 'Updated successfully'}))
    .catch((err) => res.status(400).json({error: 'Unable to update the database'}))
});
// Delete user
router.delete('/:id',(req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then((item) => res.json({msg: 'Item deleted successfully'}))
    .catch((err) => res.status(400).json({error: 'No item found'}))
});
module.exports = router;