const express = require("express");
const router = express.Router();
const Job = require("../../../../../models/CompanyRecruiter/posted_Jobs");
const verifyToken = require("../../../../utill/verifyToken");
const SavedCandidate = require("../../../../../models/FreelanceRecruiter/SavedCandidate");
const RecruiterDetail = require("../../../../../models/FreelanceRecruiter/FreelanceRecruiter");
const AssignedJob = require("../../../../../models/CompanyRecruiter/assigned_job");
const getURL = require("../../../../utill/bucketURL");
const Candidate = require("../../../../../models/FreelanceRecruiter/Candidates");
const currentDate = require("../../../../utill/currentDate");

router.put("/addExistingCandidate", verifyToken, async (req, res, next) => {
  try {
    // const candidatesArr = req.body.candidate_id;
    // for (const element of candidatesArr) {
    //for updating candidates in assigned job schema
    const assigned_job_detail = await AssignedJob.find({
      job_id: req.body.job_id,
      recruiter_id: req.body.recruiter_id,
    });

    const job_detail = await Job.find({ _id: req.body.job_id });

    for (const saved_candidate_id of req.body.saved_candidate_id) {
      //for storing saved candidate id in candidate schema
      const tempArr = [];
      for (const stage of job_detail[0].stages) {
        const tempObj = {
          interview_date: "",
          status: stage,
          is_interview_accept: false,
          is_complete: false,
        };
        tempArr.push(tempObj);
      }
      const candidate = await new Candidate({
        candidate_id: saved_candidate_id,
        assigned_job_id: assigned_job_detail[0]._id,
        submit_date: currentDate(),
        status: "Unaction",
        stage_details: tempArr,
      }).save();

      //for updating recruiter schema
      const updatedRecruiter = await RecruiterDetail.findOneAndUpdate(
        {
          _id: req.body.recruiter_id,
        },
        {
          $push: {
            candidates: candidate._id,
          },
        },
        { new: true }
      );
      //for updating candidates in assigned job schema
      const updatedAssignedJob = await AssignedJob.findOneAndUpdate(
        {
          job_id: req.body.job_id,
          recruiter_id: req.body.recruiter_id,
        },
        {
          $push: {
            candidate_id: candidate._id,
          },
        },
        { new: true }
      );
    }

    res.json({ message: "success" });
  } catch (err) {
    console.log(err.message);
    res.status(400);
    next(err);
  }
});

module.exports = router;
