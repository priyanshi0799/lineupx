const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RecruiterDetail = require("../FreelanceRecruiter/FreelanceRecruiter");
const ClientDetails = require("../CompanyRecruiter/Company");

const ClientIssueDetail = {
    complaint_no: String,
    issue: String,
    textfield: String,
    complaint_img_url: String,
    IssueRaiseOn: String,
    status: String
}

const RecruiterIssueDetail = {
    complaint_no: String,
    issue: String,
    textfield: String,
    complaint_img_url: String,
    IssueRaiseOn: String,
    status: String
};

const ClientsupportSchema  = new Schema({  
    email: {
        type: Schema.Types.String
    },
    details:{
     type: [ClientIssueDetail]
    }
});


const overallSupportSchema = new Schema({

    email:{
        type: Schema.Types.String
    },
    details:{
        type: [RecruiterIssueDetail]
    }
});

const supportSchema = new Schema({

    complaint_no: {
        type: Schema.Types.String,
        trim: true
    },

    email: {
        type: Schema.Types.String,
        ref: 'recruiter_detail'
    },

    issues: {
        type: Schema.Types.String,
        enum: ["how may i help you?", "Payment failed query","Lapsum rendo","lesum rendo"],
        required: true,
        default: "how may i help you?"
    },

    textfield: {
        type: Schema.Types.String,
        required: true
    },
    complaint_img_url:{
        type: Schema.Types.String
    },
    issueCreatedAt:{
        type: Schema.Types.String
    },
    status:{
        type: Schema.Types.String,
        enum: ["Unresolved", "Pending","Resolved"],
        default: "Unresolved"
    }

});

// supportingSchema = mongoose.model(
//   "supportAndRaise-issue",
//   supportSchema
// );

// module.exports = supportingSchema;


module.exports = {

    singleSupportModel: mongoose.model("supportAndRaise-issue",supportSchema),
    allSupportModel: mongoose.model("OverallSupportSchema",overallSupportSchema),
    clientsSupportModel: mongoose.model("ClientSupportSchema",ClientsupportSchema)

};