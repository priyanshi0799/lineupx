const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const question_detail = {
    question: String,
    option_type: String,
    choices: [String],
};



const recruitertoCandidateSchema = new Schema({
    candidate_id: {
        type:  Schema.Types.Array
    },
    feedback:{
        type: [question_detail]
    } 
});


module.exports = {
    feedbackRecruiter : mongoose.model("Feedback_recruiter" , recruitertoCandidateSchema)
}