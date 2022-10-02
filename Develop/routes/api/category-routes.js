const router = require("express").Router();
const { Category, Product } = require("../../models");

// "/api/categories" = endpoint
// http://localhost:3001/api/categories = route

// get all categories
// POSTMAN - CATEGORY: GET ALL http://localhost:3001/api/categories (get all categories)
router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [{ model: Product }],
  }).then((allCategoryData) => {
    res.status(200).json(allCategoryData);
  });
});

// get one category
// POSTMAN - CATEGORY: GET ONE http://localhost:3001/api/categories/3 (music)
router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: Product }],
  }).then((oneCategoryData) => {
    res.json(oneCategoryData);
  });
});

// POSTMAN - CATEGORY: POST http://localhost:3001/api/categories/ (Pants)
router.post("/", (req, res) => {
  /* req.body should look like this...
    {
      "category_name": "Pants"
    }
  */
  // create a new category
  Category.create(req.body)
    .then((newCategory) => {
      res.status(200).json(newCategory);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// POSTMAN - CATEGORY: PUT http://localhost:3001/api/categories/6 (Shirts renamed to Sunglasses)
router.put("/:id", (req, res) => {
  // update a category by its `id` value
  /* req.body should look like this...
    {
      "category_name": "Sunglasses"
    }
  */
  Category.update(
    { category_name: req.body.category_name },
    { where: { id: req.params.id } }
  )
    .then((updatedCategory) => {
      res.status(200).json(updatedCategory);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// POSTMAN - CATEGORY: DELETE http://localhost:3001/api/categories/3 (music)
router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
