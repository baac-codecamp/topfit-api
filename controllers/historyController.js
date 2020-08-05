const mongoose = require('mongoose');
const History = require('../models/historyModel');
const Comment = require('../models/commentModel');

module.exports.index = async function (req, res , next) {
    
    try {
             // select * from history; 
        const historys = await History.find();
        res.status(200).json({
            data: historys,
            success: true
        });

    } catch (err) {
        next(err); 
     }
}

// module.exports.getHistory = async function (req, res) {

//     try {
//         const { id } = req.params;
//         console.log(`id : ${id}`);
//         //const comments = await Comment.find();
//         const postWithComments = await History.findById(id)
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
//         const post = await History.findOne({ _id: id }).select('tags');
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


module.exports.getHistoryById = async (req, res, next) => {
    const { id } = req.params;
    console.log(`Id : ${id}`);
    const history = await History.findOne({ _id: id });
    res.status(200).json({ data: { history } });
}

module.exports.createHistory = async (req, res) => {
    console.log(req.body);
    const { userId, weight, height, fat, BMI } = req.body;
    console.log(`UserID : ${userId}`);
    let history = new History({
        userId: userId,
        weight: weight,
        height: height,
        fat: fat,
        BMI: BMI
    });

    try {
        await history.save();
        res.status(201).json({ data: history, success: true });
    } catch (err) {
        res.status(500).json({
            errors: { err }
        });
    }
}

module.exports.updateHistory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId, weight, height, fat, BMI } = req.body;
        console.log(req.body);
        console.log(`Id : ${id}`);
        console.log(`userId : ${userId}`);
        const post = await History.updateOne({ _id: id },
            {        userId: userId,
                weight: weight,
                height: height,
                fat: fat,
                BMI: BMI
            }
        );

        // console.log(post);

        if (post.nModified === 0) {
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
    //         const post = await History.findByIdAndUpdate(id, {
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

module.exports.deleteHistory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await History.findByIdAndDelete(id);

        if (!post) {
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

