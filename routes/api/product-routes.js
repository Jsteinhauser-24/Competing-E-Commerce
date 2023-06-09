const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include:[ Category, Tag]
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err)
  }
  // find all products
  // be sure to include its associated Category and Tag data
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    const productId = await Product.findByPk(req.params.id,
       {include: [Category, Tag]}
       );
       if(!productId) {
        res.status(400).json ({message: 'No Product found at Id'});
       return;
      }
      res.status(200).json(productId);
  } catch (err) {
    res.status(500).json(err)
  }
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
});

// create new product
router.post('/', async (req, res) => {
  try {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
 const newProduct = await Product.create(req.body)
 res.status(200).json(newProduct);
  }catch(err){
    res.status(400).json(err)
  }
});

// update product
router.put('/:id', async (req, res) => {
  // update product data
  try{
const productId = await Product.findByPk(req.params.id);
if(!productId){
  res.status(404).json({message: 'No Product with Id'})
  return;
}
Product.update(
  {product_name:req.body.product_name}, 
  {where: {id: req.params.id}})
  res.status(200).json();
  } catch (err) {
    res.status(500).json(err)
  }
});
      // find all associated tags from ProductTag
    //   return ProductTag.findAll({ where: { product_id: req.params.id } });
    // })
    // .then((productTags) => {
    //   // get list of current tag_ids
    //   const productTagIds = productTags.map(({ tag_id }) => tag_id);
    //   // create filtered list of new tag_ids
    //   const newProductTags = req.body.tagIds
    //     .filter((tag_id) => !productTagIds.includes(tag_id))
    //     .map((tag_id) => {
    //       return {
    //         product_id: req.params.id,
    //         tag_id,
    //       };
    //     });
    //   // figure out which ones to remove
    //   const productTagsToRemove = productTags
    //     .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
    //     .map(({ id }) => id);

    //   // run both actions
    //   return Promise.all([
    //     ProductTag.destroy({ where: { id: productTagsToRemove } }),
    //     ProductTag.bulkCreate(newProductTags),
    //   ]);
    // })
    // .then((updatedProductTags) => res.json(updatedProductTags))
    // .catch((err) => {
    //   // console.log(err);
    //   res.status(400).json(err);
    // });

router.delete('/:id', async (req, res) => {
  try{
    let productId = await Product.findByPk(req.params.id);
    if(!productId) {
      res.status(404).json({message:'No product with this Id'})   
     }
     let product = await Product.destroy({where:{id: req.params.id}});
     res.status(200).json(product);
    } catch (err) {
      res.status(404).json(err)
    };
  // delete one product by its `id` value
});

module.exports = router;
