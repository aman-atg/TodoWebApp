const router = require("express").Router();
const Item = require("../../models/items.model");

// @Route GET api/items
// @Desc Get all items
// @access Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => {
      res.json(items);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});
// @Route POST api/items
// @Desc Post an item
// @access Public
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
  newItem
    .save()
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

// @Route DELETE api/items/:id
// @Desc Delete an item
// @access Public
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
