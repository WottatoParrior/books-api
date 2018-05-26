var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('./'));
app.use(bodyParser.urlencoded({ extended: true }));

var mysql = require('mysql');
var connection = mysql.createConnection({
	host : '35.204.240.189 ',
	user: 'root',
	password: 'uWGZ9L9vGX4n',
	database: 'test'
});

connection.connect();

app.get('/',(req,res) => {
	res.send("Hello try at /books");
});


app.get('/books',function(req,res){
	var {keyword} = req.query;
	connection.query('SELECT * FROM books WHERE title LIKE ?','%'+keyword+'%', function (error, results, fields) {
		if (error) throw error;
		console.log(results);
		res.send(results);
		
	});
});

app.post('/books',function(req,res){
	var { title, author, genre, price } = req.body;
    connection.query('INSERT INTO books (author,title,genre,price) VALUES (?, ?, ?, ?)', [author, title, genre, parseFloat(price)],function(error,results,fields){
		if(error){
			throw error;
			
		}
		res.send("book added");
		
	});
	
});


app.listen(3000);