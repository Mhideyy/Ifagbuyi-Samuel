const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
                                        {
                                            title: {
                                                        type: String, 
                                                        required: true
                                                    },
                                                
                                            description: {
                                                            type: String,
                                                            required: true
                                                        },

                                            previewpics: {
                                                            type: String,
                                                            required: true
                                                        },

                                            allpics: {
                                                            type: String,
                                                            required: true
                                                        },

                                            creatorId: {
                                                            type: mongoose.Types.ObjectId,
                                                            required: true
                                                        },

                                            likes: { 
                                                        type: [mongoose.Types.ObjectId],
                                                        default: [] 
                                                    },
                                                    
                                            dislikes: { 
                                                        type: [mongoose.Types.ObjectId],
                                                        default: [] 
                                                    },
                                            comment: { 
                                                        type: [mongoose.Types.ObjectId],
                                                        ref: "COMMENT",
                                                        default: [] 
                                                    }
                                        },
                                            { timestamps: true }
                                    );

const postModel = mongoose.model('POST', postSchema);
module.exports = postModel;