const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// "/api/products" = endpoint
// http://localhost:3001/api/products = route
// Defaults to a get request

// Get all products
// Should show all products in postman as an array of objects
// POSTMAN - PRODUCT: GET ALL http://localhost:3001/api/products (get all products)
router.get("/", (req, res) => {
  // Find all products
  // Included associated Category and Tag data
  // No request body
  Product.findAll({
    include: [{ model: Category }, { model: Tag }],
  }).then((allProductData) => {
    res.status(200).json(allProductData);
  });
});

// Get one product
// POSTMAN - PRODUCT: GET ONE http://localhost:3001/api/products/4 (vinyl record)
router.get("/:id", (req, res) => {
  // Find a single product by its "id"
  // Included associated Category and Tag data
  // No request body
  Product.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: Category }, { model: Tag }],
  }).then((oneProductData) => {
    res.json(oneProductData);
  });
});

// Create new product
// POSTMAN - PRODUCT: POST http://localhost:3001/api/products (Sandals)
router.post("/", (req, res) => {
  /* req.body should look like this...
    {
    "product_name": "Sandals",
    "price": 25.00,
    "stock": 3,
    "category_id": 5,
    "tagIds": [
        3,
        4,
        5,
        6,
        7
    ]
}
  */
  Product.create(req.body)
    .then((product) => {
      // If there are product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // If no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Update product
// POSTMAN - PRODUCT: PUT http://localhost:3001/api/products/6 (update sandals bc they're on sale)
router.put("/:id", (req, res) => {
  // Update product data
  /* req.body should look like this...
    {
    "product_name": "Sandals - Sale!",
    "price": 12.00,
    "stock": 1,
    "category_id": 5,
    "tagIds": [
        5
    ]
}
  */
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // Find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // Get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // Create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // Figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// Delete product
// POSTMAN - PRODUCT: DELETE http://localhost:3001/api/products/6 (delete sandals)
router.delete("/:id", (req, res) => {
  // Delete one product by its "id" value
  // No request body
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedProduct) => {
      res.json(deletedProduct);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
