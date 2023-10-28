const exprees = require("express");
const app = exprees();
const path = require("path");

const port = 8080;

app.use(exprees.static(path.join(__dirname,"public/css")));
app.use(exprees.static(path.join(__dirname,"public/js")));
app.use(exprees.static("public"));

app.set("view engine","ejs");  // locally search views folder
app.set("views",path.join(__dirname,"/views"));      // globally search by using path.join()

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
}); 

app.get("/",(req,res)=>{
    res.render("index.ejs");
});