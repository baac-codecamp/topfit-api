const mongoose = require('mongoose');
const Content = require('../models/contentModel');
//const Comment = require('../models/commentModel');

module.exports.index = async function (req, res , next) {
    
    try {
             // select * from content; 
        const contents = await Content.find();
        res.status(200).json({
            data: contents,
            success: true
        });

    } catch (err) {
        next(err); 
     }
}

// module.exports.getContent = async function (req, res) {

//     try {
//         const { id } = req.params;
//         console.log(`id : ${id}`);
//         //const comments = await Comment.find();
//         const postWithComments = await Content.findById(id)
//             .populate('comments', 'message user');

//         console.log(postWithComments);
//         res.status(200).json({
//             data: postWithComments,
//             success: true
//         });
//     } catch (err) {
//         res.status(500).json(
//             {
//                 error: [{
//                     code: 500,
//                     message: err.message
//                 }]
//             });
//     }
// }

// module.exports.getTags = async function (req, res, next) {

//     try {
//         const { id } = req.params;
//         console.log(`id : ${id}`);
//         const post = await Content.findOne({ _id: id }).select('tags');
//         console.log(post);
//         res.status(200).json({
//             data: post,
//             success: true
//         });
//     } catch (err) {
//         res.status(500).json(
//             {
//                 error: [{
//                     code: 500,
//                     message: err.message
//                 }]
//             });
//     }
// }


module.exports.getContentById = async (req, res, next) => {
    const { id } = req.params;
    console.log(`Id : ${id}`);
    const contents = await Content.findOne({ _id: id });
    res.status(200).json({ data: { contents } });
}

module.exports.createContent = async (req, res) => {
    console.log(req.body);
    const { contentId, contentDetail, imgUrl } = req.body;
    console.log(`contentId : ${contentId}`);
    let contents = new Content({
        contentId: contentId,
        contentDetail: contentDetail,
        imgUrl: imgUrl
    });
console.log(contents);

    try {
        await contents.save();
        res.status(201).json({ data: contents, success: true });
    } catch (err) {
        res.status(500).json({
            errors: { err }
        });
    }
}

module.exports.updateContent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { contentId, contentDetail, imgUrl } = req.body;
        console.log(req.body);
        console.log(`Id : ${id}`);
        console.log(`contentId : ${contentId}`);
        const contents = await Content.updateOne({ _id: id },
            {                 contentId: contentId,
                contentDetail: contentDetail,
                imgUrl: imgUrl
            }
        );

        // console.log(contents);

        if (contents.nModified === 0) {
            throw new Error('Cannot update');
        } else {
            res.status(201).json(
                {
                    message: "Update completed",
                    success: true
                });
        }
    } catch (err) {
        res.status(500).json({
            error: [{
                code: 500,
                message: err.message
            }]
        });
    }
}

    // module.exports.updatePostSome = async (req, res, next) => {

    //     try {
    //         console.log(req.body);
    //         const { id } = req.params;
    //         const { title } = req.body;

    //         console.log(`Id : ${id}`);
    //         const post = await Content.findByIdAndUpdate(id, {
    //             title: title
    //         });

    //         console.log(`post : ${post}`);

    //         if (!post) {
    //             throw new Error('Notthing to update');
    //         } else {
    //             res.status(201).json({ data: post, success: true });
    //         }

    //     } catch (err) {
    //         res.status(500).json({
    //             errors: {
    //                 code: 500,
    //                 message: err.message
    //             }
    //         });
    //     }
    // }

module.exports.deleteContent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contents = await Content.findByIdAndDelete(id);

        if (!contents) {
            res.status(404).json({
                success: fasle, errors: {
                    message: "Cannot delete"
                }
            });
        }

        res.status(200).json({
            message: 'Deleted have been completed',
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            errors: {
                success: fasle,
                message: "Cannot delete"
            }
        })
    }
}

