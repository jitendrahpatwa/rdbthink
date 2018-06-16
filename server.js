const express = require('express'),
	  r = require('rethinkdb'),
	  bodyparser = require("body-parser"),
	  path    = require("path"),
      PORT = 3316;
const app = express();

app.set('view engine', 'ejs');

app.use(bodyparser.json({
  limit: "10mb"
}));
app.use(bodyparser.urlencoded({
  limit: "10mb",
  extended: true,
  parameterLimit: 50000
}));

app.use((req, res, next) => {
  const allowOrigin = req.headers.origin || "http://localhost:" + PORT;

  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", allowOrigin);

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authentication, x-access-token");

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');

  next();
});

app.use(express.static(__dirname + '/views'));
//var conn;

//https://www.codementor.io/naeemshaikh27/node-with-express-and-ejs-du107lnk6
//https://www.npmjs.com/package/ejs

app.get("/", function(req,res,nex){
	// where select record
	try{

		r.connect({host:"165.227.177.53",port:28015},function(err,conn){
			if(err)	throw err;
			// if(conn){
			// 	conn = conn;
			// }
			r.
			db('test').
			table('pychamp').
			//filter(r.row('code').eq('Python')).
			run(conn,function(e,r){

				if(e)	throw e;
				if(r)	{
					r.toArray(function(er,result){
						if(er)	throw er;
						if(result)	{
							console.log("rows:",result)
							res.json({status:200,message:"all ok",data:result});
						}
					})
				}

			});
		});
	}catch(e){		
		res.json({status:400,message:"all ok",error:e});
	}
});

app.get("/rdb", function(req,res,nex){
	// where select record
	try{

		r.connect({host:"165.227.177.53",port:28015},function(err,conn){
			if(err)	throw err;
			// if(conn){
			// 	conn = conn;
			// }
			r.
			db('test').
			table('pychamp').
			//filter(r.row('code').eq('Python')).
			run(conn,function(e,r){

				if(e)	throw e;
				if(r)	{
					r.toArray(function(er,result){
						if(er)	throw er;
						if(result)	{
							var name = 'hello';
							//console.log("rows:",result)
							res.render('index', {name:name,data:result});
						}
					})
				}

			});
		});
	}catch(e){		
		res.render('index', {name:'name'});
	}
});

app.listen(PORT, err => {
  if (!err)
    console.log(`Server started on ${PORT}`);
});
