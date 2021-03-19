const cors = require("cors");
const exp = require("express");
const bp = require("body-parser");
const passport = require("passport");
const { connect } = require("mongoose");
const { success, error } = require("consola");
const User = require("./models/User");
const fs=require('fs')


// Bring in the app constants
const { DB, PORT } = require("./config");

// Initialize the application
const app = exp();

// Middlewares
app.use(exp.static('event'))
app.use(cors());
app.use(bp.json());
app.use(passport.initialize());

require("./middlewares/passport")(passport);

// User Router Middleware
app.use("/api/users", require("./routes/users"));

const startApp = async () => {
  try {
    // Connection With DB
    await connect(DB, {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    success({
      message: `Successfully connected with the Database \n${DB}`,
      badge: true
    });

    // Start Listenting for the server on PORT
    app.listen(PORT, () =>
      success({ message: `Server started on PORT ${PORT}`, badge: true })
    );
  } catch (err) {
    error({
      message: `Unable to connect with Database \n${err}`,
      badge: true
    });
    startApp();
  }
};

app.get('/list',cors(),async (req,res)=>{

  all=await	User.find((err,docs)=>{
		if(!err){res.send(docs);return docs}
		else{console.log('Error:'+ JSON.stringify(err,undefined,2));}
	});
  //console.log(all)
  
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'event/index.html'));
})

app.get('/video',(req,res)=>{
  const readstream=fs.createReadStream("Batman Vs Superman  2016 Extended 720p WEB-DL x264-Belex - Dual Audio.mkv");
  readstream.on("data",(chunkdata)=>{
    res.write(chunkdata)
  })
  res.on('end',()=>{
    res.end()
  })
  res.on("error",(err)=>{
    console.log(err)
    res.end("file note found")
  })
})

app.get('/test',(req,res)=>{
  const readstream=fs.createReadStream("k63 (1).mp4");
  readstream.on("data",(chunkdata)=>{
    res.write(chunkdata)
  })
  res.on('end',()=>{
    res.end()
  })
  res.on("error",(err)=>{
    console.log(err)
    res.end("file note found")
  })
})



startApp();
