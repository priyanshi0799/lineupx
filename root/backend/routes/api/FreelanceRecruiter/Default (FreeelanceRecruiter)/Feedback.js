const express = require("express");
const formidable = require("formidable");

const router = express.Router();
// const candidateDetail = require("../../../../models/")
const RecruiterDetail = require("../../../../models/FreelanceRecruiter/FreelanceRecruiter");
const CandidateDetail = require("../../../../models/FreelanceRecruiter/Candidates");
const saveCandidateDetails = require("../../../../models/FreelanceRecruiter/SavedCandidate");
const {feedbackRecruiter} = require("../../../../models/FreelanceRecruiter/feedbackRecruiter");
const currentDate = require("../../../utill/currentDate");
const verifyToken = require("../../../utill/verifyToken");
const uploadFile = require("../../../utill/upload");
const parseMultipartData = require("../../../utill/helper");
const getURL = require("../../../utill/bucketURL");
var nodemailer = require("nodemailer");
const smtpTransport = require("../../../utill/mailConfiguration");

var mailOptions;


router.post("/CandidatefeedbackToRecruiter", verifyToken, async(req,res,next)=>{

    try{

        // console.log(req.body);
        const checkRecruiter = await RecruiterDetail.find({ _id: req.body._id});

        if(checkRecruiter.length == 0){
            console.log("invalid recruiter Id");
            res.sendStatus(404);
            return ;
        }

        // console.log(checkRecruiter[0].candidates);


        // const CandidatesDetails = await RecruiterDetail.findOne({
        //     candidates: checkRecruiter[0].candidates
        // });

        // console.log(CandidatesDetails);
        // for(candidateIds of checkRecruiter[0].candidates){
        //     for(ids of candidateIds[0]._id)
        //     {
        //         console.log(ids);
        //     }
        // }


        const tempList = [];
        const tempObj = {
            form: req.body.additional_questions
        };

        console.log(tempObj.form)

        tempList.push(tempObj.form);
        // console.log(tempList)

        for(candidateIDs of checkRecruiter[0].candidates)
        {
            const CandidatesInfo = await CandidateDetail.find({ _id: candidateIDs });

            const CandidatesPersonalInfo = await saveCandidateDetails.find({_id: CandidatesInfo[0].candidate_id});
            // console.log(CandidatesInfo);

            if(CandidatesInfo[0].status != 'Unaction' && CandidatesInfo[0].isFeedbackReceived == false){
                const newForm = await new feedbackRecruiter({
                    recruiter_id: checkRecruiter[0]._id,
                    candidate_id: CandidatesInfo[0].candidate_id,
                    feedback: tempObj.form
                }).save()

                // console.log(newForm.feedback)

                 mailOptions = {
                    to: CandidatesPersonalInfo[0].email,
                    subject: "Feedback for your Hiring.",
                   html:
                    "Hello"+ `${CandidatesPersonalInfo[0].name}` +"Please Share your feedback of your hiring with Us.<br>",
                };
                      smtpTransport.sendMail(mailOptions);
                 
                const updatedCandidate = await Candidate.findOneAndUpdate(
                        {
                          _id: CandidatesInfo[0].candidate_id,
                        },
                        {
                          $set: {
                            isFeedbackReceived: true
                          },
                        },
                        { new: true }
                );
                console.log("Data Updated Successfully")
            }
    }
      res.status(200).json({message: "Feedback sent successfully."});
    }
    catch(err){
        console.log(err);
        res.status(404).json({message: "Error"});
        next(err);
    }
});
// router.post("/CandidateFeedback",verifyToken,async(req,res,next)=>{
   
//    try
//    {
//     const checkRecruiter = await RecruiterDetail.find({
//         _id: req.body._id,
//     });

//     console.log(checkRecruiter);
//     if (checkRecruiter.length == 0) {
//         console.log("Please enter valid Id");
//         res.sendStatus(404);
//         return;
//     }

//     const candidateId = await CandidateDetail.findOne({_id: req.body.candidate_id});
//     // console.log(req.body);
//     console.log(candidateId);


//     if(candidateId.length == 0){
//         console.log("Candidate ID is not found.");
//         res.status(401).json({message: "Oops Candidate Id is not found."});
//     };

//     const docs = await saveCandidateDetails.find({_id: candidateId._id});

//     const tempObj = {
//         question: req.body.question,
//         option: req.body.option,
//         choices: req.body.choices
//     };

//      const newFeedbackForm = await new feedbackDetails({
//             candidate_id : docs[0]._id,
//             feedback: [tempObj]
//     }).save()

//     console.log(newFeedbackForm);

//     res.status(200).json({message:"Feedback Form Successfully Registered."});

//     mailOptions = {
//         to: docs[0].email,
//         subject: "Feedback for your Hiring.",
//         html:
//           "Hello"+ `${docs[0].name}` +"Please Share your feedback of your hiring with Us.<br>"
//           +`${newFeedbackForm}`,
//       };

//       smtpTransport.sendMail(mailOptions);

//       res.status(200).json({message: "Feedback sent successfully."});
//    }
//    catch(err){
//        console.log(err);
//        res.status(400).json({message: "Oops something went wrong!"});
//        next(err);
//    }
// });

module.exports = router;