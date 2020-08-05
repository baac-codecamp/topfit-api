const express = require('express')
const router = express.Router()
const contentController   = require('../controllers/contentController')

//GET localhost:3000/api/post
router.get('/', contentController.index)
//GET localhost:3000/api/post/xxxxxxxxxxx
router.get('/:id', contentController.getContentById)
// router.get('/tag/:id', contentController.getTags)
// router.get('/comment/:id', contentController.getComments)
//POST localhost:3000/api/post  {BODY}
 router.post('/', contentController.createContent)
//PUT localhost:3000/api/post/xxxxxxxxxxxx {BODY}
router.put('/:id', contentController.updateContent)
//PATCH localhost:3000/api/post/xxxxxxxxxxxx {BODY}
// router.patch('/:id', contentController.updatePostSome)
// DELETED localhost:3000/api/post/xxxxxxxxxxxx
router.delete('/:id', contentController.deleteContent)

module.exports = router
