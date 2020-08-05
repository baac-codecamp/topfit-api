const mongoose = require('mongoose');
const DietPlan = require('../models/dietPlanModel');
//const Comment = require('../models/commentModel');

module.exports.index = async function (req, res , next) {
    
    try {
             // select * from dietPlan; 
        const dietPlans = await DietPlan.find();
        res.status(200).json({
            data: dietPlans,
            success: true
        });

    } catch (err) {
        next(err); 
     }
}

// module.exports.getDietPlan = async function (req, res) {

//     try {
//         const { id } = req.params;
//         console.log(`id : ${id}`);
//         //const comments = await Comment.find();
//         const postWithComments = await DietPlan.findById(id)
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
//         const post = await DietPlan.findOne({ _id: id }).select('tags');
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


module.exports.getDietPlanById = async (req, res, next) => {
    const { id } = req.params;
    console.log(`Id : ${id}`);
    const dietPlans = await DietPlan.findOne({ _id: id });
    res.status(200).json({ data: { dietPlans } });
}

module.exports.createDietPlan = async (req, res) => {
    console.log(req.body);
    const { planId, planDetail, protein, fat, crab } = req.body;
    console.log(`planId : ${planId}`);
    let dietPlans = new DietPlan({
        planId: planId,
        planDetail: planDetail,
        protein: protein,
        fat: fat,
        crab: crab
    });
console.log(dietPlans);

    try {
        await dietPlans.save();
        res.status(201).json({ data: dietPlans, success: true });
    } catch (err) {
        res.status(500).json({
            errors: { err }
        });
    }
}

module.exports.updateDietPlan = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { planId, planDetail, protein, fat, crab } = req.body;
        console.log(req.body);
        console.log(`Id : ${id}`);
        console.log(`planId : ${planId}`);
        const dietPlans = await DietPlan.updateOne({ _id: id },
            {                planId: planId,
                planDetail: planDetail,
                protein: protein,
                fat: fat,
                crab: crab
            }
        );

        // console.log(dietPlans);

        if (dietPlans.nModified === 0) {
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
    //         const post = await DietPlan.findByIdAndUpdate(id, {
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

module.exports.deleteDietPlan = async (req, res, next) => {
    try {
        const { id } = req.params;
        const dietPlans = await DietPlan.findByIdAndDelete(id);

        if (!dietPlans) {
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

