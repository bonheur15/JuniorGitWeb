const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const fetch = require("node-fetch");
const IP = require('ip');

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PagesUrl = ["/about","/"];
const PatheticPath = ["/wp-login","/admin","/sql","/db","user"];

const AssetsUrl = ["/assets/*"];
var WebConfig = {
    "Api_Url":"https://st28451.ispot.cc/API/"
}
var OnlineIp = [{
    "Ip":"::1",
    "time":"1672203944018"
}];
var errors = [];
var resentShares = [];
var last_ip ="";
app.get(PagesUrl,(req,res)=>{
    var resUrl = req.url;
    if(req.url == "/") resUrl += "index.html";
    else resUrl +=".html";

    res.sendFile(__dirname+"/html"+resUrl);
});
app.get("/more*",(req,res)=>{
    var resUrl = req.url;
    resUrl = resUrl.split("?")[1];
    res.sendFile(__dirname+"/html/more.html");
});
app.get("/app*",(req,res)=>{
    res.sendFile(__dirname+"/apk/Igiti_8_0.0.apk");
});
app.get("/download*",(req,res)=>{
    res.setHeader('Content-disposition', 'attachment; filename=Igiti.apk');
    res.sendFile(__dirname+"/apk/Igiti_8_0.0.apk");
});
app.get("/share*",(req,res)=>{
    res.setHeader('Content-disposition', 'attachment; filename=Igiti.apk');
    res.sendFile(__dirname+"/apk/Igiti_8_0.0.apk");
});
app.get("/watch*",(req,res)=>{
    var resUrl = req.url;
    resUrl = resUrl.split("?")[1];
    res.sendFile(__dirname+"/html/watch.html");
});
app.get(AssetsUrl,(req,res)=>{
    res.sendFile(__dirname+"/html"+req.url);
});
app.get("/favicon.ico",(req,res)=>{
    res.sendFile(__dirname+"/html/favicon.ico");
});
app.get("/not",(req,res)=>{
    res.sendFile(__dirname+"/html/not.html");
});
app.get("/log",(req,res)=>{
    res.send({"Online_ip":OnlineIp,"Errors":errors});
});
app.get(PatheticPath,(req,res)=>{
    var resUrl = req.url;
    console.log("Pathetic Path :)"+resUrl);
    res.send("Why would i have this path available :)");
});
app.get("*",(req,res)=>{
    var resUrl = req.url;
    console.log(resUrl);
    res.send("Sorry this page doest seem to exist");
});


function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
}

io.on('connection', (socket) => {
    const clientIp = socket.request.headers['x-forwarded-for'] || socket.request.connection.remoteAddress;

    console.log(clientIp)
    var timenow = new Date();
    timenow = timenow.getTime();
    console.log(timenow);
    OnlineIp.push({
        "Ip":clientIp,
        "time":timenow
    });
    socket.on("disconnect",()=>{
        var address = clientIp;

        var removed = false;
        OnlineIp.forEach((item,index) => {
            if(item.Ip == clientIp && !removed) {
                OnlineIp.splice(index,1);
                removed = true;
            }
        });
        if(!removed) errors.push("Ip Conflicts in removing IP"+clientIp);
    });
});
  
server.listen(PORT, () => {
    console.log('listening on *:'+PORT);
});

