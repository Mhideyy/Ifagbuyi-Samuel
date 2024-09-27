const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
                                        {
                                            userName: {
                                                type: String,
                                                required: true,
                                                unique:  true
                                            },
                                            email: {
                                                type: String,
                                                required: true,
                                                unique:  true
                                            },
                                            password: {
                                                type: String,
                                            },

                                            necessaryInfo: {
                                                                type: Boolean,
                                                                default: true
                                            },

                                            gender: {
                                                type: String,
                                                enum: ['male', 'female']
                                            },
                                        },
                                        {timestamps: true}
);

const userModel = mongoose.model('USER', userSchema);
module.exports = userModel;

