const express = require('express')
const router = express.Router()
const historyController   = require('../controllers/historyController')

//GET localhost:3000/api/post
router.get('/', historyController.index)
//GET localhost:3000/api/post/xxxxxxxxxxx
router.get('/:id', historyController.getHistoryById)
// router.get('/tag/:id', historyController.getTags)
// router.get('/comment/:id', historyController.getComments)
//POST localhost:3000/api/post  {BODY}
 router.post('/', historyController.createHistory)
//PUT localhost:3000/api/post/xxxxxxxxxxxx {BODY}
router.put('/:id', historyController.updateHistory)
//PATCH localhost:3000/api/post/xxxxxxxxxxxx {BODY}
// router.patch('/:id', historyController.updatePostSome)
// DELETED localhost:3000/api/post/xxxxxxxxxxxx
router.delete('/:id', historyController.deleteHistory)

module.exports = router
