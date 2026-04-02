const express = require("express");
const router = express.Router();
const db = require("../../config/db");

router.get("/:course_id", (req, res) => {

const studentId = req.session?.user?.id;
const courseId = req.params.course_id;

if(!studentId){
return res.status(401).json({message:"Login required"});
}

// 🔥 TOTAL VIDEOS
const totalVideosQuery = `
SELECT COUNT(*) AS total FROM videos WHERE course_id = ?
`;

// 🔥 COMPLETED VIDEOS
const completedVideosQuery = `
SELECT COUNT(*) AS completed 
FROM video_progress 
WHERE student_id = ? AND course_id = ?
`;

// 🔥 ASSIGNMENTS
const assignmentQuery = `
SELECT 
COUNT(*) AS totalAssignments,
SUM(CASE WHEN submitted = 1 THEN 1 ELSE 0 END) AS submitted
FROM assignments
WHERE course_id = ?
`;

db.query(totalVideosQuery,[courseId],(err,totalRes)=>{

if(err) return res.status(500).json({message:"DB Error"});

db.query(completedVideosQuery,[studentId,courseId],(err2,compRes)=>{

if(err2) return res.status(500).json({message:"DB Error"});

db.query(assignmentQuery,[courseId],(err3,assignRes)=>{

if(err3) return res.status(500).json({message:"DB Error"});

const totalVideos = totalRes[0].total || 0;
const completedVideos = compRes[0].completed || 0;

const completion = totalVideos === 0 ? 0 :
Math.round((completedVideos / totalVideos) * 100);

res.json({
completion,
assignmentsSubmitted: assignRes[0].submitted || 0,
totalAssignments: assignRes[0].totalAssignments || 0,
result: completion > 80 ? "A" : completion > 50 ? "B" : "C"
});

});

});

});

});

module.exports = router;