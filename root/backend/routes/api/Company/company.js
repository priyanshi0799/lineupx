const express = require("express");
const router = express.Router();
const Company = require("../../../models/CompanyRecruiter/Company");
const currentDate = require("../../utill/currentDate");
const verifyToken = require("../../utill/verifyToken");
const getURL = require("../../utill/bucketURL");
const {clientsSupportModel} = require("../../../models/Feedback/FeedbackModal");
const smtpTransport = require("../../utill/mailConfiguration");
const {feedbackClient}= require("../../../models/CompanyRecruiter/feedbackClient");
router.put("/companyInfo", verifyToken, async (req, res, next) => {
    try {
        //for checking id is present or not.
        console.log(req.body);
        const checkComapny = await Company.find({ _id: req.body._id });
        if (checkComapny.length == 0) {
            console.log("Please enter valid Id");
            res.sendStatus(404);
            return;
        }
        const updatedData = await Company.findOneAndUpdate(
            { _id: req.body._id },
            {
                $set: {
                    email: req.body.email,
                    designation: req.body.designation,
                    contact_number: req.body.contact_number,
                    twitter_id: req.body.twitter_id,
                    facebook_id: req.body.facebook_id,
                    linkedin_id: req.body.linkedin_id,
                    gmail_id: req.body.gmail_id,
                    skype_id: req.body.skype_id,
                    subscription: req.body.subscription,
                    is_companyInfo_updated: true,
                },
            },
            { new: true }
        );
        res.json({ message: "success" });
    } catch (err) {
        console.log(err.message);
        res.status(400);
        next(err);
    }
});

router.put("/aboutCompany", verifyToken, async (req, res, next) => {
    try {
        //for checking id is present or not.
        const logourl = await getURL(req, res, "logo");
        console.log(logourl);
        const checkComapny = await Company.find({ _id: req.body._id });
        if (checkComapny.length == 0) {
            console.log("Please enter valid Id");
            res.sendStatus(404);
            return;
        }
        const updatedData = await Company.findOneAndUpdate(
            { _id: req.body._id },
            {
                $set: {
                    company_name: req.body.company_name,
                    company_description: req.body.company_description,
                    additional_information: req.body.additional_information,
                    company_video: req.body.company_video,
                    industry: req.body.industry,
                    website: req.body.website,
                    logo: logourl,
                    is_aboutCompany_updated: true,
                },
            },
            { new: true }
        );
        res.json({ message: "success" });
    } catch (err) {
        console.log(err.message);
        res.status(400);
        next(err);
    }
});

router.put("/billingInformation", verifyToken, async (req, res, next) => {
    // console.log(req.body)
    try {
        //for checking id is present or not.
        const checkComapny = await Company.find({ _id: req.body._id });
        if (checkComapny.length == 0) {
            console.log("Please enter valid Id");
            res.sendStatus(404);
            return;
        }
        const updatedData = await Company.findOneAndUpdate(
            { _id: req.body._id },
            {
                $set: {
                    contact_person: req.body.contact_person,
                    billing_name: req.body.billing_name,
                    address: req.body.address,
                    account_number: req.body.account_number,
                    service_tax_number: req.body.service_tax_number,
                    company_identification_number:
                        req.body.company_identification_number,
                    GST_number: req.body.GST_number,
                    is_billingInformation_updated: true,
                },
            },
            { new: true }
        );
        res.json({ message: "success" });
    } catch (err) {
        console.log(err.message);
        res.status(400);
        next(err);
    }
});

router.put("/updateCompanyInfo", verifyToken, async function (req, res, next) {
    //for checking id is present or not.
    const checkComapny = await Company.find({ _id: req.body._id });
    if (checkComapny.length == 0) {
        console.log("Please enter valid Id");
        res.sendStatus(404);
        return;
    }
    const updateData = JSON.parse(JSON.stringify(req.body));
    delete updateData._id;
    try {
        Company.findByIdAndUpdate(
            { _id: req.body._id },
            {
                $set: { ...updateData },
            },
            { upsert: true },
            function (err, result) {
                if (err) {
                    console.log(err.message);
                    res.status(400);
                    next(err);
                } else {
                    res.json({ message: "success" });
                }
            }
        );
    } catch (e) {
        console.log(e.message);
        res.status(400);
        next(e);
    }
});

router.get('/support-issue', async(req,res,next)=>{

    try{
        const docs = await clientsSupportModel.find({ email: req.query.email });
        if (docs.length == 0) {
          console.log("Please enter valid Id");
          res.sendStatus(404);
          return;
        }
        console.log(docs)
        res.json(docs[0]);
    }
    catch(e){
        res.status(400);
        console.log(e.message);
        next(e);
    }
});

router.post('/support-issue', verifyToken,async(req,res,next)=>{
    try
    {   
        const clientemail = await Company.findOne({
            email: req.body.email
          });


        const imageUrl = await getURL(req, res, "image");
        
        console.log(req.body);


        
        var ticket = Math.floor(Math.random() * 100000 + 54);

        complaint_no = "LIN"+ticket.toString()+"X";
        console.log(complaint_no);

        const ClientSupportEmail = await clientsSupportModel.findOne({
            email: req.body.email
         });

        const tempObj = {
                email: req.body.email,
                complaint_no: complaint_no,
                issue: req.body.issue,
                textfield: req.body.textfield,
                complaint_img_url: imageUrl,
                IssueRaiseOn: currentDate(),
                status: "Pending"
        } 

        if(!ClientSupportEmail){
            const newIssueEntry = await new clientsSupportModel({
                email: req.body.email,
                details: [tempObj]
            }).save()

            console.log(newIssueEntry);
        }
        else {
            const ExistingEntry = await clientsSupportModel.findOneAndUpdate(
                // {_id: req.body._id},
                {email: req.body.email},
                {
                    $push:{
                        details: [tempObj]
                    }
                },
                {new: true}
            );
            console.log(ExistingEntry);
        }
        res.status(200).json({message:"Client compaint succueessfully registered"});
        
        // send email
        mailOptions = {
            to: req.body.email,
            subject: "Client Complaint Number generated",
            html:
              "Hello,<br> your complaint number is ["+
              complaint_no+"].<br>Our Team will let you know within 2-4 Business days.<br> kind regards,<br> Team LineUpx"
          };

          smtpTransport.sendMail(mailOptions);
    }
    catch(e){
     res.status(400);
     console.log(e.message);
     next(e);
    }

});

router.post('/client-feedback-template',verifyToken,async(req,res,next)=>{

    try{
        const checkClient = await Company.find({_id: req.body._id});

        if(checkClient.length == 0){
            console.log("Enter Valid Client Details");
            res.sendStatus(404);
            return;
        }
  
  const tempObj = {
    form: req.body.additional_questions
    };

        for (const job_id of checkClient[0].job_id) {
            const assigned_job_doc = await AssignedJob.find({ job_id: job_id });
            for (const assigned_job of assigned_job_doc) {
              for (const candidate_id of assigned_job.candidate_id) {
                const candidate_info = await Candidate.find({ _id: candidate_id });
                const saved_candidate_info = await SavedCandidate.find({
                  _id: candidate_info[0].candidate_id,
                });
                  
                if (candidate_info[0].status != "Unaction" && candidate_info[0].isClientFeedVerified==false) {
                    const newForm = await new feedbackClient({
                        client_id: checkClient[0]._id,
                        candidate_id: candidate_info[0].candidate_id,
                        feedback: tempObj.form
                    }).save()
    
                     mailOptions = {
                        to: saved_candidate_info[0].email,
                        subject: "Feedback for your Hiring.",
                       html:
                        "Hello"+ `${saved_candidate_info[0].name}` +"Please Share your feedback of your hiring with Us.<br>",
                    };
                          smtpTransport.sendMail(mailOptions);

                  const updatedCandidate = await Candidate.findOneAndUpdate(
                        {
                          _id: candidate_info[0].candidate_id,
                        },
                        {
                          $set: {
                            isClientFeedVerified: true
                          },
                        },
                        { new: true }
                );
                console.log("Data Updated Successfully") 
                }
            }
         }
    }
        res.status(200).json({message: "successful"});
    }
    catch(err){
        console.log(err);
        res.status(404).json({message: "Error"});
        next(err);
    }
});
module.exports = router;
