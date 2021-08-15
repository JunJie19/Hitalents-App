const express = require('express');
const router = express.Router();
const dbOps = require('./dbOps');
const s3Ops = require('./s3Ops');
const pswOps = require('./pswOps');
const mailerOps = require('./mailerOps');


router.get('/api/get', (req, res) => {
    const name = req.query.name;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ get: `Sent via GET: ${name}` }));
});

router.post('/api/post', (req, res) => {
    res.send(
        `Sent via POST request: ${req.body.post}`,
    );
});

// ======
router.post('/api/login', dbOps.login);
router.post('/api/logout', dbOps.logout);
router.post('/api/signup', dbOps.signup);
router.post('/api/expertDashboard/totalapplicant', dbOps.expertDashboard_TotalApplicant);
router.post('/api/expertDashboard/gender', dbOps.expertDashboard_Gender);
router.post('/api/expertDashboard/expertise', dbOps.expertDashboard_Expertise);
router.post('/api/expertDashboard/category', dbOps.expertDashboard_Category);
router.post('/api/expertDashboard/nationality', dbOps.expertDashboard_Nationality);
router.post('/api/expertDashboard/sourceref', dbOps.expertDashboard_SourceRef);
router.post('/api/fetchExpert/all', dbOps.fetchExpertAll);
router.post('/api/addExpert', dbOps.addExpert);
router.post('/api/editExpert', dbOps.editExpert);
router.post('/api/completeExpertApplication/:expertid', dbOps.completeExpertApplication);
router.post('/api/deleteExpert/:expertid', dbOps.deleteExpert);
router.post('/api/fetchExpert/:expertid', dbOps.fetchExpert);
router.post('/api/expertApply', dbOps.expertApply);
router.post('/api/fetchEmployer', dbOps.fetchEmployer);
router.post('/api/fetchProject/all', dbOps.fetchProjectAll);
router.post('/api/fetchProject/:projectid', dbOps.fetchProject);
router.post('/api/addProject', dbOps.addProject);
router.post('/api/editProject', dbOps.editProject);
router.post('/api/deleteProject/:projectid', dbOps.deleteProject);
router.post('/api/fetchProjectExpert/:projectid', dbOps.fetchProjectExpert);
router.post('/api/fetchExpertProject/:expertid', dbOps.fetchExpertProject);
router.post('/api/fetchProjectMatching', dbOps.fetchProjectMatching);
router.post('/api/deleteProjectMatching', dbOps.deleteProjectMatching);
router.post('/api/sortByCategory', dbOps.sortByCategory);

// router.post('/api/file/upload', s3Ops.uploadFile);
// router.get('/api/file/:filename', s3Ops.downloadFile);

router.post('/api/forgotPassword', pswOps.forgotPassword);
router.post('/api/resetPassword/:token', pswOps.resetPassword);
router.post('/api/updatePassword', pswOps.updatePassword);

router.post('/api/mailer', mailerOps.mailSend);

module.exports = router;