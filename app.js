const express = require ('express');

//init app

const app= express();

// views location

app.set('views', __dirname+ '/views');

// setting template engine

app.set('view engine', 'ejs');


//body parser middlware

var bodyParser = require('body-parser');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



//routes
/*
app.get('/', function(req, res){
	res.render("index", {name: "Faqja fillestare", title: "Index"});
});

*/

/*
app.get('/manage', function(req, res){
	res.render('manage');
});

*/


//sett up ongo db

const MongoClient = require('mongodb').MongoClient;
const mongoURL= 'mongodb://localhost:27017/todolist';
const ObjectId = require('mongodb').ObjectId;

//Connecting to mongodb

MongoClient.connect(mongoURL, function(err, db) {
	if(err) {
		console.log(err);
	}
	else{
			console.log('Database connected succssfully');
			todos = db.collection('todos');
			
		}

	
});

app.get('/', function(req, res){
	
	todos.find({}).toArray(function(err, docs) {
		if(err){
			console.log(err);
		}else{
			res.render('index', {docs: docs});
		}
	});
	
	
});

app.get('/todos/:id', function(req, res){
	
	var id = ObjectId(req.params.id);
	
	todos.findOne({_id: id}, function(err, doc){
		if(err){
			console.log(err);
		}else{
			res.render('show', {doc: doc});
		}
	});
	
	
});

app.post('/todos/add', function(req, res){
	
	todos.insert({title: req.body.title, description: req.body.description}, function(err, result){
		if (err){
			console.log(err);
		}else{
			res.redirect('/');
		}
	});
	
});

app.get('/todos/edit/:id', function(req, res){
	var id = ObjectId(req.params.id);
	
	todos.findOne({_id: id}, function(err, doc) {
		if(err){
			console.log(err);
		}else{
		res.render('edit', {doc:doc});
		}
		
	});
	
});

app.post('/todos/update/:id', function(req, res){
	var id = ObjectId(req.params.id);
	todos.updateOne({_id: id}, {$set: {title: req.body.title, description: req.body.description}}, function(err, result){
		if(err){
			console.log(err);
		}else{
			res.redirect('/');
		}
	});
	
});

app.get('/todos/delete/:id', function(req, res){
	var id = ObjectId(req.params.id);
	todos.deleteOne({_id: id}, function(err, result){
		if(err){
			console.log(err);
			
		}else{
			res.redirect('/');
		}
	});
	
	
});

// running app

app.listen(3000, function(){
	console.log("App running at: http://localhost:3000/");
	});