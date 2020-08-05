const express = require('express')
const router = express.Router()
const dietPlanController   = require('../controllers/dietPlanController')

//GET localhost:3000/api/post
router.get('/', dietPlanController.index)
//GET localhost:3000/api/post/xxxxxxxxxxx
router.get('/:id', dietPlanController.getDietPlanById)
// router.get('/tag/:id', dietPlanController.getTags)
// router.get('/comment/:id', dietPlanController.getComments)
//POST localhost:3000/api/post  {BODY}
 router.post('/', dietPlanController.createDietPlan)
//PUT localhost:3000/api/post/xxxxxxxxxxxx {BODY}
router.put('/:id', dietPlanController.updateDietPlan)
//PATCH localhost:3000/api/post/xxxxxxxxxxxx {BODY}
// router.patch('/:id', dietPlanController.updatePostSome)
// DELETED localhost:3000/api/post/xxxxxxxxxxxx
router.delete('/:id', dietPlanController.deleteDietPlan)

module.exports = router
