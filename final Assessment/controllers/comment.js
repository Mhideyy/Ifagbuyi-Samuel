const commentModel = require('../models/comment');
const postModel = require('../models/post');

const makeComment = async (req, res) => {
    const {comment, postId} = req.body;
    const {id} = req.user;

    const newComment = new commentModel({comment, postId, userId: id});
    try {
       const savedComment = await newComment.save();
       await postModel.findByIdAndUpdate( postId, { $push: { comment: savedComment.id}});
       res.json({ message: "comment made successfully"});

    } catch (error) {
        res.json({ message: error.message});
    };
};

const getComment = async (req, res ) => {
    const { commentId } = req. query;

    try {
        const gottenComment = await commentModel.findById(commentId).populate({ path: "userId", select: "userName gender"}).populate({path: "postId", select: "title description"});
        res.json(gottenComment);
    } catch (error) {
        res.json({ message: error.message})
    };
};

module.exports = { makeComment, getComment };