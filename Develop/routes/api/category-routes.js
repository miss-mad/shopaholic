const router = require('express').Router();
const { Category, Product } = require('../../models');

// "/api/categories" = endpoint
// http://localhost:3001/api/categories = route

// get all categories
// POSTMAN - CATEGORY: GET ALL http://localhost:3001/api/categories (get all categories)
router.get('/', (req, res) => {
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
router.get('/:id', (req, res) => {
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

// POSTMAN - CATEGORY: POST http://localhost:3001/api/categories/ ()
router.post('/', (req, res) => {
  // create a new category
});

// POSTMAN - CATEGORY: PUT http://localhost:3001/api/categories/3 ()
router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

// POSTMAN - CATEGORY: DELETE http://localhost:3001/api/categories/3 ()
router.delete('/:id', (req, res) => {
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
