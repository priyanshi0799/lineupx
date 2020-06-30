const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const question_detail = {
    question: String,
    option_type: String,
    choices: [String],
};

const ClienttoCandidateSchema = new Schema({
    
    client_id: {
        type: Schema.Types.String
    },
    candidate_id: {
        type:  Schema.Types.String
    },
    feedback:{
        type: [question_detail]
    } 
});


module.exports = {
    feedbackClient : mongoose.model("Feedback_Client" , ClienttoCandidateSchema)
}