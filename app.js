/*var http = require('http');
var express = require('express');
var app = express();

app.use(function(req, res){
	res.writeHead(200, {"Content-Type":"text/html"});
	res.end('<h1>Hello express</h1>');
});

http.createServer(app).listen(1337, function(){
	console.log('Server running ap http://127.0.0.1:1337/');
});*/


var express = require('express');
var path = require('path');
var app = express();

//body에 데이터를 넣어 서버에 데이터를 전달
var bodyParser = require('body-parser');

//mongodb 연결하는 소스
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB);
//자바 스크립트 키워드 process.env 는 환경변수를 끌어온다.
// 환경변수 MONGO_DB에 주소값 mongodb://yeom:seonglim@ds013881.mlab.com:13881/means 를 저장해둠


var db = mongoose.connection;

db.once("open",function () {
		console.log("DB connected!");
});//db.once

db.on("error",function (err){
		console.log("DB ERROR :", err);
});//db.on

//yeomseonglim - seonglim90(사이트 계정)
//db (yeom - seonglim)사용자 계정

var dataSchema = mongoose.Schema({
	name:String,
	count:Number
});//dataSchema

var Data = mongoose.model('data',dataSchema);

Data.findOne({name:"myData"},function(err,data){
	if(err) return console.log("Data ERROR:",err);
	if(!data){
		Data.create({name:"myData",count:0},function (err,data){
			if(err) return console.log("Data ERROR:",err);
			console.log("Counter initialized :",data);
		});//Data.create
	}//if
});//Data.findOne

//model setting
var postSchema = mongoose.Schema({
	title: {type:String, required:true},
	body: {type:String, required:true},
	createdAt: {type:Date, default:Date.now},
	updatedAt: Date
});
var Post = mongoose.model('post',postSchema);






/*
//[nodeJS/Express] 6. Dynamic web (다이나믹 웹) 만들기 Route & EJS  여기까지했음
/*app.get('/', function (req, res){
	res.send('Hello World!');
});// url로 get이 오면 응답으로 Hello World!를 보내주라
*/

app.set("view engine", 'ejs');
//express에게 ejs를 view engine으로 사용할 것을 알립니다.
//자동으로 /view 폴더를 검색하고 확장자가 ejs인 파일을 찾는다.

//app.use(express.static(__dirname + '/public'));
//app.use는 미들웨어 사용을 위해 쓰이는 함수
console.log(__dirname);
//__dirname은 node에서 제공하는 node 파일의 경로를 담고 있는 변수
//__가 붙어 있는 변수들은 항상 뭔가 특별한 변수이다.

app.use(express.static(path.join(__dirname, 'public')));
//path는 node에서 제공하는 모듈이다
// __dirname,'/public'을 하던 'public'을 하던 /에 상관없이 주소조합을 알아서 해준다.

app.use(bodyParser.json());
//모든 서버에 도착하는 신호들의 body를 JSON으로 분석할 것

//set routes
app.get('/posts', function(req,res){
	Post.find({}, function (err,posts) {
		if(err) return res.json({success:false, message:err});
		res.json({success:true, data:posts});
	});
});//index
app.post('/posts', function(req,res){
	Post.create(req.body.post,function (err,post){
		if(err) return res.json({success:false, message:err});
		res.json({success:true, data:post});
	});
});//create
app.get('/posts/:id', function(req,res){
	Post.findById(req.params.id, function(err,post) {
		if(err) return res.json({success:false, message:err});
		res.json({success:true, data:post});
	});
});//show
app.put('/posts/:id', function(req,res){
	req.body.post.updatedAt=Date.now();
	Post.findByIdAndUpdate(req.params.id, req.body.post, function (err,post){
		if(err) return res.json({success:false, message:err});
		res.json({success:true, message:post._id+" updated"});
	});
});//updated
app.delete('/posts/:id', function(req,res){
	Post.findByIdAndRemove(req.params.id, function(err,post) {
		if(err) return res.json({success:false, message:err});
		res.json({success:true, message:post._id+" deleted"});
	});
});//destroy
















//[nodeJS/Express] 6. Dynamic web (다이나믹 웹) 만들기 Route & EJS
/*var data={count:0};//선언된 변수는 서버에 저장되며, 서버가 종료될때까지 그 값을 유지하게  된다.

app.get('/', function (req, res){
	Data,findOne({name:"myData"},function(err,data){
	if(err) return console.log("Data ERROR:",err);
	data.count++;
	data.save(function (err){
	if(err) return console.log("Data ERROR:",err);
	res.render('my_first_ejs',data);
		});//save
	});//findOne
});*/
//'/'route을 생성하고 '/'에 route에 get 신호가 오면 my_first_ejs파일을 render 합니다.
//'/' route에 get신호가 오면 (브라우저로 페이지를 여는 경우 get신호로 요청(request)하게 됩니다.),
//data 오브젝트에 count값을 1 증가시키고, my_first_ejs를 render하는데, data 오브젝트를 넣어서 render하여 응답(response)합니다.
/*
app.get('/reset', function (req, res){
	data.count=0;
	res.render('my_first_ejs',data);
});*/
//'/reset' route에 get신호가 오면, data 오브젝트의 count값을 0으로 바꾸고 data 오브젝트를 넣어서 my_first_ejs를 render하여 응답합니다.
/*
app.get('/set/count', function (req, res){
	if(req.query.count) data.count=req.query.count;
	res.render('my_first_ejs',data);
});*/
//'/set/count' route에 get신호가 오면, request에 count query가 있는지 확인하고 있다면 그 값을 data.count에 대입합니다.
//그리고  data 오브젝트를 넣어서 my_first_ejs를 render하여 응답합니다. query는 주소표시줄에 ?,&를 사용하여 값을 넣는 것으로 웹서핑을 할때 가끔씩 주소가
//주소?id=myid&email=myemailaddres
//이런 식으로 되어 있는 것 본 적이 있을 겁니다. 이 값을 서버에서 받는 것입니다.
/*
app.get('/set/:num', function (req, res){
	data.count=req.params.num;
	res.render('my_first_ejs',data);
});*/
//':num' 처럼 route 에 콜론이 오면, 이는 placeholder가 됩니다. 주소줄의 변수선언.. 정도로 생각하시면 되는데,
//:num에는 아무 값이나 들어갈 수 있으며, 이 값은 request의 parameter로 저장됩니다.
//'/set/아무값' route에 get신호가 오면, data.count에 그 값을 저장하고, data 오브젝트를 넣어서 my_first_ejs를 render하여 응답합니다.


//[nodeJS/Express] 6. Dynamic web (다이나믹 웹) 만들기 Route & EJS  여기까지했음
















//[nodeJS/Express] 7-2 함수를 만들어서 사용 Route & EJS
var flag = false;
var su = 0;
app.get('/', function (req,res) {
	if(flag){
		su += 1;
		setCounter(res,su);
		console.log("/ -> false");
	}else{
		setCounter(res,0);
		flag = true;
		console.log("/ -> ture");
	}
});

app.get('/reset', function (req,res) {
	setCounter(res,0);
});

app.get('/set/count', function (req,res) {
	if(req.query.count) setCounter(res,req.query.count);
	else getCounter(res);
});

app.get('/set/:num', function (req,res) {
	if(req.params.num) setCounter(res,req.params.num);
	else getCounter(res);
});

//setCounter
function setCounter(res,num) {
	console.log("setCounter");
	Data.findOne({name:"myData"},function (err,data) {
		if(err) return console.log("Data ERROR:",err);
		data.count=num;
		data.save(function (err) {
			if(err) return console.log("Data ERROR:",err);
			res.render('my_first_ejs',data);
		});
	});
}

//getCounter
function getCounter(res) {
	console.log("getCounter");
	Data.findOne({name:"mydata"},function (err,data) {
		if(err) return console.log("Data ERROR:",err);
		res.render('my_first_ejs',data);
});
}


app.listen(3000, function(){
	console.log('Server On!');
});
