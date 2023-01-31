
function ShowCenterAds4(){
    if(AdsConfig.Banners.Banner4.ImgSrc == "") return;
    var srclink = AdsConfig.Banners.Banner4.ImgSrc;
    if(!srclink.includes("http")) srclink = web_config.thumbnail_url+srclink;
    document.getElementById("centeradssrc").src = srclink;
    document.getElementById("center-ads").style.display = "flex";
    document.getElementById("centerlinkads").href = AdsConfig.Banners.Banner4.RedirectUrl;

    counter_center = Math.round(Math.random() * 10 + 4);
    if(counter_center < 6 ) counter_center = 8;
    var counter_center_time_interval = setInterval(() => {
        counter_center = counter_center - 1;
        document.getElementById("center-counter").innerText = "This ad will close in "+counter_center;
        if(counter_center == 0){
            document.getElementById("center-ads").style.display="none";
            clearInterval(counter_center_time_interval);
        } 
    }, 1000);
}



var AdsConfig = {

};




function FetchAds(){
    fetch(web_config.api_url+"?ads")
    .then(result=>result.json())
    .then((data)=>{
        AdsConfig = data;
        ShowCenterAds4();
    });
}
FetchAds();

// 20230104004137
// http://localhost/api/dev/?getvideo=linkidtest



var video = document.querySelector('video');

var movie_id = window.location.search.split("?")[1];
if(movie_id == "demo") movie_id = "1";
if(movie_id == undefined || movie_id == "") window.location.href=".";
fetch(web_config.api_url+"?getvideo="+movie_id)
.then(result=>result.json())
.then((data)=>{
    if(data.movie_type == "Movie") ShowMovie(data.movie_file);
    if(data.movie_type == "Series") ShowSeries(data.movie_file); 
    document.getElementById("movie_title").innerText = data.movie_name;
    if(movie_id == "bella.mp4") return;
    video.poster = web_config.thumbnail_url+data.movie_poster;

});
var test;
var series_data = [];




// [
//     {
//         "Season_Name": "Seasion 1",
//         "Episode": [
//             {
//                 "Episode_Name": "Episode 1",
//                 "filename": "3PercentS01E01"
//             },
//             {
//                 "Episode_Name": "Episode 2",
//                 "filename": "3PercentS01E02"
//             },
//             {
//                 "Episode_Name": "Episode 3",
//                 "filename": "3PercentS01E03"
//             },
//             {
//                 "Episode_Name": "Episode 4",
//                 "filename": "3PercentS01E04"
//             }
//         ]
//     }
// ]


// {
//     "movie_type": "Series",
//     "movie_file": [
//       {
//         "id": "12",
//         "link_id": "LaReinaLink",
//         "se_ep": "3,1",
//         "fileName": "LAREINAS3E1",
//         "views": "0"
//       },
//       {
//         "id": "13",
//         "link_id": "LaReinaLink",
//         "se_ep": "3,2",
//         "fileName": "LAREINAS3E2",
//         "views": "0"
//       }
//     ]
//   }

function ShowSeries(file){
    file.forEach(item => {
        var season_temp_name = "Season "+item.se_ep.split(",")[0];
        var found = false;
        series_data.forEach(item2 => {
            if(item2.Season_Name == season_temp_name) found = true;
        });
        if(!found) series_data.push({"Season_Name":season_temp_name,"Episode":[]});
    });
    series_data.forEach(item => {
        file.forEach(item2 => {
            if(item.Season_Name.split("Season ")[1] == item2.se_ep.split(",")[0]){
                item.Episode.push({"Episode_Name":"Episode "+item2.se_ep.split(",")[1],"filename":item2.fileName});
            }
        });
    });

    ShowSeasonHtml();
    ShowEpisodeHtml(0)
}

function ShowSeasonHtml(){
    document.getElementById("season-html-container").innerHTML = "";
    series_data.forEach((item,index)=> {
        document.getElementById("season-html-container").innerHTML +=`<option value='`+index+`'>` +item.Season_Name+`</option>`;
    });
    document.getElementById("series-section").style.display = "block";
    
}
function AutoPlaySeason(){
    if(autoplayvalid) {
        var episodebtn = document.getElementsByClassName("episode");
        episodebtn[0].click();
        autoplayvalid = false
    }
}
var autoplayvalid = true;
function ShowEpisodeHtml(index){
    index = Number(index);
    var HtmlElement = "";
    series_data[index].Episode.forEach(item => {
        HtmlElement += `<div class="episode" onclick='ChangeViewVideo("`+item.filename+`",this)'>`+item.Episode_Name+`</div>`;
    });
    document.getElementById("episodes-container").innerHTML = HtmlElement;
    AutoPlaySeason();
}
function ChangeViewVideo(file,btndiv){
    video.controls = true;
    fetch(web_config.api_url+"?visited=/"+file);

    var episodebtn = document.getElementsByClassName("episode");
    episodebtn[0].classList.contains("active");
    episodebtn[0].classList.toggle("active",false);
    for(var i = 0 ; i < episodebtn.length ;i++){
        if(episodebtn[i].classList.contains("active")) episodebtn[i].classList.toggle("active",false);
    }
    btndiv.classList.toggle("active",true);
    var url = web_config.media_url+file;
    document.getElementById("videoPlayer").src = url+".mp4";
    if(!url.includes(".mp4")){
        url = url +".mp4";  
        video.controlsList="nodownload";
        
    }
    FetchAds();
}

function ShowMovie(file){

    var url = web_config.media_url+file;
    if(!url.includes(".mp4")){
       url = url +".mp4";  
       video.controlsList="nodownload";
    }
    video.src = url;
    

}



var test ;
var busyads = false;
const ios = () => {
    if (typeof window === `undefined` || typeof navigator === `undefined`) return false;

    return /iPhone|iPad|iPod/i.test(navigator.userAgent || navigator.vendor || (window.opera && opera.toString() === `[object Opera]`));
};
video.addEventListener("timeupdate",()=>{
    if(ios()) return;
    if(AdsConfig.AdsTimeStamp[0] == undefined) return;
    var currentTime = Math.round(video.currentTime/60);
    if(currentTime > AdsConfig.AdsTimeStamp[0] && !busyads){
        busyads = true;
        AdsConfig.AdsTimeStamp.shift();
        DisplayAdsClip();
        
    }
});

video.addEventListener("ended",()=>{
    if(busyads){
        busyads = false;
        video.src = tempmovie_url;
        setTimeout(() => {
            video.currentTime = previusTimeBeforeAds;
            video.controls = true;
            injectStyles("","disableControls");
        }, 500);
    }
})

fetch(web_config.api_url+"?played="+movie_id);
var previusTimeBeforeAds = 0;
var tempmovie_url = "";

function DisplayAdsClip(){
    previusTimeBeforeAds = video.currentTime;
    tempmovie_url = video.src;
    
    fetch(web_config.api_url+"?adsclip")
    .then(result => result.json())
    .then((data)=>{
        if(data.ClipUrl == "") return;
        video.src = web_config.media_url+data.ClipUrl;
        video.controls = false;
       injectStyles("::-webkit-media-controls {display:none !important;}","disableControls");
    });
}

const injectStyles = function (rule, id) {
    console.log("injectStyles");
    removeStyle(id);
    const style = document.createElement("style");
    style.id = id;
    style.appendChild(document.createTextNode(rule));
    document.head.appendChild(style);
  };
  
  const removeStyle = function (id) {
    const el = document.getElementById(id);
    if (el) {
      el.remove();
    }
};

document.getElementById("videoPlayer").addEventListener('loadeddata', (e) => {
   if(document.getElementById("videoPlayer").readyState >= 3){
    document.getElementById("videoPlayer").play();
   }
});