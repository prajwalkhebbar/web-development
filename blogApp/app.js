var express = require("express"),
    methodOverride=require("method-override"),
    expressSanitizer=require("express-sanitizer"),
    bodyParser= require("body-parser"),
    mongoose = require("mongoose");

var app = express();
mongoose.connect("mongodb://localhost/blogdb");

//APP CONFIG
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
// MONGOOSE CONFIG

// creating the mongoose schema
// schema is the pattern the blog object are gonna follow
var blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{ type:Date, default: Date.now}
});

var blog= mongoose.model("blog",blogSchema);

// blog.create({
//     title:"First blog",
//     image:"https://static.pexels.com/photos/261577/pexels-photo-261577.jpeg",
//     body:"enter some random jiberish here please i beg of you....heres a cat hitting the keyboard sdfasdfasdfgasgdxcvsdufkn .shfc .kli.asdf"
// },function(err,blog_entry){
//     if(err){
//         console.log("err in creation of blog");
//     }
//     else{
//         console.log("a blog entry has been noted");
//     }
// });  

//RESTFUL ROUTES
// INDEX ROUTES
app.get("/",function(req,res){
    res.redirect("/blog");
});
app.get("/blog",function(req,res){
    blog.find({},function(err,blogs){
        if(err){
            console.log("err in finding the vlog");
        }
        else{
            res.render("index",{blogs:blogs});
        }
    })
    
});

//NEW ROUTE
app.get("/blog/new",function(req, res) {
   res.render("new"); 
});

//CREATE ROUTE
app.post("/blog",function(req,res){
    console.log(req.body);
    //here we use sanitizer to get rid of script tag in the blog body
    req.body.blog.body=req.sanitize(req.body.blog.body);
    console.log("==================");
    console.log(req.body);
    //creating blog
    blog.create(req.body.blog,function(err,newBlog){
        if(err){
            res.render("new");
        }
        else{
            res.redirect("/blog");
        }
    })
});

//SHOW ROUTE
app.get("/blog/:id",function(req, res) {
    blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            console.log("err in finding blog by id");
            res.redirect("/blog");
        }
        else{
            res.render("show",{blog:foundBlog});
        }
    });
});

//EDIT ROUTE
app.get("/blog/:id/edit",function(req, res) {
    blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            console.log("err in finding blog by id");
            res.redirect("/blog");
        }
        else{
            res.render("edit",{blog:foundBlog});
        }
    });
});

//UPDATE ROUTE
app.put("/blog/:id",function(req,res){
    req.body.blog.body=req.sanitize(req.body.blog.body);
    blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
        if(err){
            res.redirect("/blog");
        }
        else{
            res.redirect("/blog/"+req.params.id);
        }
    });
});

//DELETE ROUTE
app.delete("/blog/:id",function(req,res){
    blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/blogs");
        }
        else{
            console.log("a blog has been deleted");
            res.redirect("/blog");
        }
    });
});
app.listen(process.env.PORT,process.env.IP,function(){
   console.log("the server is running"); 
});