// GET /api/course/:courseId/videos/:studentId
router.get("/:courseId/videos/:studentId", (req,res)=>{
  const { courseId, studentId } = req.params;

  const sql = `
    SELECT v.video_id, v.title, v.description, v.file_path, v.video_order,
           IFNULL(p.completed,0) AS completed,
           IFNULL(p.quiz_completed,0) AS quiz_completed
    FROM videos v
    LEFT JOIN student_video_progress p
      ON p.video_id=v.video_id AND p.student_id=?
    WHERE v.course_id=?
    ORDER BY v.video_order
  `;
  db.query(sql,[studentId,courseId],(err,results)=>{
    if(err) return res.status(500).json([]);
    res.json(results);
  });
});