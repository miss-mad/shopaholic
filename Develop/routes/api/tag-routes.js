const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// "/api/tags" = endpoint
// http://localhost:3001/api/tags = route

// get all tags
// POSTMAN - TAG: GET ALL http://localhost:3001/api/tags (get all tags)
router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  // no request body
  Tag.findAll({
    include: [{ model: Product }],
  }).then((allTagData) => {
    res.status(200).json(allTagData);
  });
});

// get one tag
// POSTMAN - TAG: GET ONE http://localhost:3001/api/tags/2 (pop music)
router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  // no request body
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: Product }],
  }).then((oneTagData) => {
    res.json(oneTagData);
  });
});

// create new tag
// POSTMAN - TAG: POST http://localhost:3001/api/tags/ (orange)
router.post("/", (req, res) => {
  /* req.body should look like this...
  {
    "tag_name": "orange"
  }
  */
  Tag.create(req.body)
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update tag
// POSTMAN - TAG: PUT http://localhost:3001/api/tags/6 ()
router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  /* req.body should look like this...
    {
      "tag_name": "purple"
    }
  */
  Tag.update({ tag_name: req.body.tag_name }, { where: { id: req.params.id } })
    .then((updatedTag) => {
      res.status(200).json(updatedTag);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// delete tag
// POSTMAN - TAG: DELETE http://localhost:3001/api/tags/9 (orange)
router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  // no request body
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
