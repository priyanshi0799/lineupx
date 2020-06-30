const express = require("express");
const formidable = require("formidable");

const router = express.Router();
const RecruiterDetail = require("../../../../models/FreelanceRecruiter/FreelanceRecruiter");
const currentDate = require("../../../utill/currentDate");
const verifyToken = require("../../../utill/verifyToken");
const uploadFile = require("../../../utill/upload");
const parseMultipartData = require("../../../utill/helper");
const getURL = require("../../../utill/bucketURL");

router.get("/profile_info", verifyToken, async function (req, res, next) {
  try {
    const docs = await RecruiterDetail.find({ _id: req.query._id });
    if (docs.length == 0) {
      console.log("Please enter valid Id");
      res.sendStatus(404);
      return;
    }
    res.json(docs);
  } catch (e) {
    console.log(e);
    res.status(400);
    next(e);
  }
});

router.put("/billing_information", async (req, res, next) => {
  // console.log(req.body)
  try {
      //for checking id is present or not.
      const checkId = await RecruiterDetail.find({ id: req.body._id });
      if (checkId.length == 0) {
          console.log("Please enter valid ID");
          res.sendStatus(404);
          return;
      }
      
      const updatedData = await RecruiterDetail.findOneAndUpdate(
          { id: req.body._id },
          {
              $set: {
                  contact_person: req.body.contact_person,
                  billing_name: req.body.billing_name,
                  address: req.body.address,
                  account_number: req.body.account_number,
                  service_tax_number: req.body.service_tax_number,
                  company_identification_number: req.body.cin,
                  GST_number: req.body.gst,
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
module.exports = router;
