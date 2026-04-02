// POST /api/video/:videoId/quiz/submit
router.post("/:videoId/quiz/submit", (req,res)=>{
  const videoId = req.params.videoId;
  const { student_id, score } = req.body;

  const sql = `
    INSERT INTO student_video_progress (student_id, video_id, completed, quiz_completed, score)
    VALUES (?,?,1,1,?)
    ON DUPLICATE KEY UPDATE completed=1, quiz_completed=1, score=?
  `;
  db.query(sql,[student_id, videoId, score, score],(err)=>{
    if(err) return res.status(500).json({message:"Quiz submit failed"});
    res.json({message:"Quiz completed ✅"});
  });
});