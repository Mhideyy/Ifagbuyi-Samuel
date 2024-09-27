const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
                                                comment:
                                                        {
                                                            type: String,
                                                            require: true
                                                        },  
                                                        
                                                userId:
                                                        {
                                                            type: mongoose.Schema.ObjectId,
                                                            ref: "USER",
                                                            require: true
                                                        },         
                                                postId:
                                                        {
                                                            type: mongoose.Schema.ObjectId,
                                                            ref: "POST",
                                                            require: true
                                                        },   
                                            },

                                            {timestamps: true}

);

const commentModel = new mongoose.model( "COMMENT", commentSchema);

module.exports = commentModel;