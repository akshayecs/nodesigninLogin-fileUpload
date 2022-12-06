const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Audio = require("../models/Audio");
const multer = require("multer");
const Audic = require("audic");
const upload = multer({ storage })

/////storage and upload for audio song
const audioStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'audio', 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});

///audio upload
const audioUpload = multer({
    storage: audioStorage,
    limits: {
      fileSize: 15000000 // 15000000 Bytes = 15 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(mp3)$/)) { 
         // upload only mp3 format
         return cb(new Error('Please upload a audio'))
       }
     cb(undefined, true)
  }
}) 

/////// storage and upload for audioimage

const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'images', 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});


///image upload
const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 10000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
}) 







router.get("/",(req,res,next) => {
  res.status(200).json({
    message:"user route working"
  })
}) 

router.get("/",(req,res) => {
    console.log("route working correectly!");
}) 


router.get("/register",(req,res) => {
    res.render("register")
}) 

router.get("/login",(req,res) => {
    res.render("login");
})

router.get("/welcome",(req,res) => {
    res.render("welcome");
})

app.get("/", (req, res) => {
    // res.send('Add your employees details');
    let sql = "SELECT * FROM employeemst";
    let query = connection.query(sql, (err, rows) => {
        if (err) throw err;
        res.render('user_index', {
            title: 'Please add employee details here',
            employees : rows
        });
    })

});
// router.get("/logout",(req,res) => {
//     res.redirect("login");
// })


router.post("/userRegister",(req,res,next) => {
  const {name,email,password} = req.body

  User.create({
      name,
      email,
      password
  }).then((result) => {
      res.render("login")
  }).catch((err) => {
      res.render("register")
  })
})


router.post("/userLogin" ,(req,res) => {
  const {email,password} = req.body;

  User
      .findOne({email:email})
      .then((result) => {

          if(result){
              if(result.password == password){
                  res.redirect("/users/welcome");
              }
              else{
                  res.redirect("/users/login");
              }
          }
          else{
              res.redirect("/users/login");
          }

      })
      .catch((err) => {
          console.log(err);
      })
})

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

// For Single image upload
router.post('/uploadImage', imageUpload.single('image'), (req, res) => {
    res.send(req.file)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


// For multiple image upload

router.post('/uploadBulkImage', imageUpload.array('images', 4),     (req, res) => {
    res.send(req.files)
 }, (error, req, res, next) => {
     res.status(400).send({ error: error.message })
 })


// For Single audio upload
router.post('/uploadAudio', audioUpload.single('audio'), (req, res) => {
    res.send(req.file)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})



// For multiple audio upload
router.post('/uploadBulkAudio', audioUpload.array('audio', 4),     (req, res) => {
   res.send(req.files)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})





module.exports = router;