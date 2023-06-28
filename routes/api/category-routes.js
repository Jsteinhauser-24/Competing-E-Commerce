const router = require('express').Router();
const sequelize = require('sequelize');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: Product});
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: Product,
    });
    if (!categoryData) {
      res.status(404).json({message:'Not Found'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    let updateCategory = await Category.findByPk(req.params.id);
    if(!updateCategory){res.status(404).json({message: "No category found with this Id"})
    return;
  } 
  Category.update(req.body, {where: {id:req.params.id}});
  res.status(200).json();
}catch (err){
  res.status(400).json(err);
}
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try{
    

    let deleteCategory = await Category.destroy({where: {id: req.params.id}});
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(400).json(err)
  };
  // delete a category by its `id` value
});

module.exports = router;
