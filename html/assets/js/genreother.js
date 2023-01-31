


var player = videojs('video-js');

// var player = videojs('video-js');



// setTimeout(() => {
//     document.getElementById("banner").classList.replace("hide","show");

// }, 3000);

// document.getElementById("close-btn").addEventListener("click",()=>{
//     document.getElementById("banner").classList.replace("show","hide");

// });
var adscounter = 5;


var clearads = setInterval(() => {
    adscounter -=1;
    document.getElementById("outcolse-counter").innerText = "This ads will close after "+adscounter+"s";
    if(adscounter == 0){
        clearInterval(clearads);
        document.getElementById("center-center").classList.replace("show","hide");
    } 
}, 1000);

var currentTime = 0;
var currentsrc = "https://st28451.ispot.cc/stream/videos/2.mp4";
var clearads2 = setInterval(() => {
    if(player.currentTime() > 30) {
        clearInterval(clearads2);
        console.log("show ads");
        currentTime = player.currentTime();
        player.src({src: "banner/ad2.mp4" });
        player.play();
        player.controls(false);
        setTimeout(() => {
            player.src(currentsrc);
            player.play();
            player.controls(true);
            player.currentTime(currentTime);
        }, 15000);
    };
}, 500);