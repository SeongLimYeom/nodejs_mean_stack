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

var data={count:0};//선언된 변수는 서버에 저장되며, 서버가 종료될때까지 그 값을 유지하게  된다.
app.get('/', function (req, res){
	data.count++;
	res.render('my_first_ejs',data);
});
//'/'route을 생성하고 '/'에 route에 get 신호가 오면 my_first_ejs파일을 render 합니다.
//'/' route에 get신호가 오면 (브라우저로 페이지를 여는 경우 get신호로 요청(request)하게 됩니다.),
//data 오브젝트에 count값을 1 증가시키고, my_first_ejs를 render하는데, data 오브젝트를 넣어서 render하여 응답(response)합니다.

app.get('/reset', function (req, res){
	data.count=0;
	res.render('my_first_ejs',data);
});
//'/reset' route에 get신호가 오면, data 오브젝트의 count값을 0으로 바꾸고 data 오브젝트를 넣어서 my_first_ejs를 render하여 응답합니다.

app.get('/set/count', function (req, res){
	if(req.query.count) data.count=req.query.count;
	res.render('my_first_ejs',data);
});
//'/set/count' route에 get신호가 오면, request에 count query가 있는지 확인하고 있다면 그 값을 data.count에 대입합니다.
//그리고  data 오브젝트를 넣어서 my_first_ejs를 render하여 응답합니다. query는 주소표시줄에 ?,&를 사용하여 값을 넣는 것으로 웹서핑을 할때 가끔씩 주소가
//주소?id=myid&email=myemailaddres
//이런 식으로 되어 있는 것 본 적이 있을 겁니다. 이 값을 서버에서 받는 것입니다.


app.get('/set/:num', function (req, res){
	data.count=req.params.num;
	res.render('my_first_ejs',data);
});
//':num' 처럼 route 에 콜론이 오면, 이는 placeholder가 됩니다. 주소줄의 변수선언.. 정도로 생각하시면 되는데,
//:num에는 아무 값이나 들어갈 수 있으며, 이 값은 request의 parameter로 저장됩니다.
//'/set/아무값' route에 get신호가 오면, data.count에 그 값을 저장하고, data 오브젝트를 넣어서 my_first_ejs를 render하여 응답합니다.

//[nodeJS/Express] 6. Dynamic web (다이나믹 웹) 만들기 Route & EJS  여기까지했음

app.listen(8080, function(){
	console.log('Server On!');
});
