const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const RecruiterDetail = require("../../../models/FreelanceRecruiter/FreelanceRecruiter");
const { allSupportModel } = require("../../../models/Feedback/FeedbackModal.js");
var nodemailer = require("nodemailer");
const smtpTransport = require("../../utill/mailConfiguration");
const getURL = require("../../utill/bucketURL");
const uploadFile = require("../../utill/upload");
const currentDate = require("../../utill/currentDate");
const { update } = require('ddos/lib');

// const uuid4 = require("uuid/v4")

var mailOptions;

// router.get('/support-issue/:email/:complaintNumber', async(req,res,next)=>{
//     try{
//         const docs = await allSupportModel.findOne({ email: req.query.email });
//         if (docs.length == 0) {
//           console.log("Please enter valid Id");
//           res.sendStatus(404);
//           return;
//         }
//         else{
//             res.status(200).json(docs[0].details[0].req.query.complaintNumber);
//         }
//     }
//     catch(e){
//         res.status(400);
//         console.log(e.message);
//         next(e);
//     }
// });
router.get('/support-issue', async(req,res,next)=>{

    try{
        const docs = await allSupportModel.find({ email: req.query.email });
        console.log(req.query.email);
        if (docs.length == 0) {
          console.log("Please enter valid Id");
          res.sendStatus(404);
          return;
        }
        res.json(docs[0]);
    }
    catch(e){
        res.status(400);
        console.log(e.message);
        next(e);
    }
});
router.post('/support-issue',async (req,res,next)=>{
    try
    {   
        const imageUrl = await getURL(req, res, "image");
        
        console.log(req.body);

        const currentUserRecruiter = await RecruiterDetail.findOne({
            email: req.body.email
          });
        
        var complaint_no = Math.floor(Math.random() * 100000 + 54);
        console.log(complaint_no);

        // const compalint = await new singleSupportModel({
        //     status: "Pending",
        //     issueCreatedAt: currentDate(),
        //     email: req.body.email,
        //     issues : req.body.issues,
        //     textfield: req.body.textfield,
        //     complaint_no: complaint_no,
        //     complaint_img_url: imageUrl
        // }).save();

        const recruiterEmail = await allSupportModel.findOne({
            email: req.body.email
        });

        const tempObj = {
                complaint_no: complaint_no,
                issue: req.body.issues,
                textfield: req.body.textfield,
                complaint_img_url: imageUrl,
                IssueRaiseOn: currentDate(),
                status: "Pending"
        } 

        if(!recruiterEmail){
            const newIssueEntry = await new allSupportModel({
                email : req.body.email,
                details: [tempObj]
                // complaint_no: complaint_no,
                // issue: req.body.issues,
                // textfield: req.body.textfield,
                // complaint_img_url: imageUrl,
                // IssueRaiseOn: currentDate(),
                // status: "Pending"
            }).save()

            console.log(newIssueEntry);
        }
        else {
            const ExistingEntry = await allSupportModel.findOneAndUpdate(
                {email: req.body.email},
                {
                    $push:{
                        details: [tempObj]
                        // "complaint_no": "complaint_no",
                        // "issue": "req.body.issues",
                        // "textfield": "req.body.textfield",
                        // "complaint_img_url": "imageUrl",
                        // "IssueRaiseOn": "currentDate()",
                        // "status": "Pending"
                    }
                },
                {new: true}
            );
            console.log(ExistingEntry);
        }
        res.status(200).json({message:"compaint succueessfully registered"});
        
        // send email
        mailOptions = {
            to: req.body.email,
            subject: "Complaint Number generated",
            html:
              "Hello,<br> your complaint number is "+
              complaint_no+" Our Team will let you know within 2-4 Business days.<br> kind regards,<br> Team LineUpx"
          };

          smtpTransport.sendMail(mailOptions);
    }
    catch(e){
     res.status(400);
     console.log(e.message);
     next(e);
    }
});
module.exports = router;