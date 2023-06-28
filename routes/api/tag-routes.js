const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagsData = await Tag.findAll({
      include: { Product }
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(404).json(err)
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try{
  const tagId = await Tag.findByPk(req.body.id, { include:Product })
  if (!tagId) {
    res.status(404).json({ message: 'No tags with Id' });
    return;
  }
    res.status(200).json(tagId)
  } catch(err) {
res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
    // create a new tag
  try{
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  }catch(err){
    res.status(400).json(err)
  }

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
 const tagId = await Tag.findByPk(req.params.id);
 if(!tagId){
  res.status(404).json({message: 'No tag with Id'})
return; 
}
Tag.update({tag_name: req.body.tag_name}, {where: {id:req.params.id}});
res.status(200).json();  
}catch (err) {
  res.status(500).json(err)
}
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{ 
    const tagId = await Tag.findByPk(req.params.id);
    if(!tagId){
      res.status(404).json({message:'No tag with Id'});
    }
    const tag = await Tag.delete({where: {id: req.params.id}});
  res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
