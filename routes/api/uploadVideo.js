// POST /api/video/upload
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req,file,cb)=> cb(null,"uploads/videos/"),
  filename: (req,file,cb)=> cb(null,Date.now()+"-"+file.originalname)
});
const upload = multer({storage});

router.post("/upload", upload.single("video"), (req,res)=>{
  const { course_id, title, description, created_by } = req.body;
  const file_path = req.file.path;

  const sql = `INSERT INTO videos (course_id,title,description,file_path,created_by,video_order)
               VALUES (?,?,?,?,?,(SELECT IFNULL(MAX(video_order)+1,1) FROM videos WHERE course_id=?))`;
  db.query(sql,[course_id,title,description,file_path,created_by,course_id],(err)=>{
    if(err) return res.status(500).json({message:"Upload failed"});
    res.json({message:"Video uploaded ✅"});
  });
});