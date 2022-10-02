const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// "/api/products" = endpoint
// http://localhost:3001/api/products = route
// defaults to a get request

// get all products
// should show all products in postman as an array of objects
// POSTMAN - PRODUCT: GET ALL http://localhost:3001/api/products (get all products)
router.get("/", (req, res) => {
  // find all products
  // included associated Category and Tag data
  Product.findAll({
    include: [{ model: Category }, { model: Tag }],
  }).then((allProductData) => {
    res.status(200).json(allProductData);
  });
});

// get one product
// POSTMAN - PRODUCT: GET ONE http://localhost:3001/api/products/4 (vinyl record)
router.get("/:id", (req, res) => {
  // find a single product by its `id`
  // included associated Category and Tag data
  Product.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: Category }, { model: Tag }],
  }).then((oneProductData) => {
    res.json(oneProductData);
  });
});

// create new product
// POSTMAN - PRODUCT: POST http://localhost:3001/api/products/ ()
router.post("/", (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Sandals",
      price: 25.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
      category_id: 5
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there are product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
// POSTMAN - PRODUCT: PUT http://localhost:3001/api/products/4 ()
router.put("/:id", (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
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

// POSTMAN - PRODUCT: DELETE http://localhost:3001/api/products/7 (higher priced sandals)
router.delete("/:id", (req, res) => {
  // delete one product by its `id` value
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
