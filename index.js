import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
// var array = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

class taskClass{
    constructor(weight, time, name){
        this.weight = weight;
        this.time = time;
        this.name = name;
    }

    getWeight(){
        return this.weight;
    }

    getTime(){
        return this.time;
    }

    getName(){
        return this.name;
    }
}

app.post("/result", (req, res) =>{
    let taskN = req.body["task_name"];
    let taskW = req.body["task_weight"];
    let taskT = req.body["task_time"];
    let totalT = req.body["total_time"];
    var array = [];
    var result= [];
    // array.push(taskW)
    for(var i = 0; i < taskW.length && i < taskT.length && i < taskN.length; i ++){
        var task = new taskClass(taskW[i], taskT[i], taskN[i]);
        array.push(task);
    }
    array.sort((a, b) => b.getWeight() - a.getWeight());
    console.log(array);
    console.log("Total time: " + totalT);
    for(var i = 0; i < array.length; i ++){
        console.log(array[i].getTime());
        if(array[i].getTime() <= totalT){
            result.push(array[i]);
            totalT -= array[i].getTime();
            console.log("Total time: " + totalT);
        }
    }
    console.log(result);
    res.render("result.ejs", {
        result_array: result,
    });
    // res.redirect("/main");   

});

app.get("/facebook", (req, res) =>{
    res.redirect("http://www.facebook.com");
});

app.post("/main", (req, res) => {
    res.render("main.ejs");
});

app.get("/main", (req, res) => {
    res.render("main.ejs");
});

app.get("/result", (req, res) => {
    res.render("result.ejs");
});

app.listen(port, () => {
    console.log("Server running on port 3000");
});

