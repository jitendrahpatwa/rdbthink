//165.227.177.53:8080 rethinkdb
const r = require('rethinkdb');

r.connect({host:"165.227.177.53",port:28015},function(err,conn){
	if(err)	throw err;
	if(conn)	console.log("connected");

	//create db table	
	// r.
	// db('test').
	// tableCreate('pychamp').
	// run(conn,function(err,res){

	// 	if(err)	throw err;
	// 	if(res)	console.log("RDBRES:",res);

	// });


	// insert record
	r.
	db('test').
	table('pychamp')
	.insert({code:'Blockchain',date:(new Date()),author:"JP",day:"Saturday"})
	.run(conn,function(e,r){

		if(e)	throw e;
		if(r)	console.log("QueryRES:",r);

	});


	// select record
	// r.
	// db('test').
	// table('pychamp')
	// .run(conn,function(e,r){

	// 	if(e)	throw e;
	// 	if(r)	{
	// 		r.toArray(function(er,result){
	// 			if(er)	throw er;
	// 			if(result)	console.log("rows:",result)
	// 		})
	// 	}

	// });

	// where select record
	// r.
	// db('test').
	// table('pychamp').
	// filter(r.row('code').eq('Python')).
	// run(conn,function(e,r){

	// 	if(e)	throw e;
	// 	if(r)	{
	// 		r.toArray(function(er,result){
	// 			if(er)	throw er;
	// 			if(result)	console.log("rows:",result)
	// 		})
	// 	}

	// });
})