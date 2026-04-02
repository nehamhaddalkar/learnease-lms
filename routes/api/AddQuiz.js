// POST /api/video/:videoId/quiz
router.post("/:videoId/quiz", (req,res)=>{
  const videoId = req.params.videoId;
  const { question, options, correct_option } = req.body;

  const sql = `INSERT INTO video_quiz (video_id, question, options, correct_option)
               VALUES (?,?,?,?)`;
  db.query(sql,[videoId, question, JSON.stringify(options), correct_option], (err)=>{
    if(err) return res.status(500).json({message:"Quiz add failed"});
    res.json({message:"Quiz added ✅"});
  });
});