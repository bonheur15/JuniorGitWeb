function ShowMovies(data){
var HtmlElement = "";
for(var i = 0; i < data.length;i++){
    HtmlElement += `
    <div class="item vhny-grid">
        <div class="box16 list-movie-card-sub">
            <div class="tag-type">`+data[i].movie_tag.split(",")[0]+` - `+data[i].movie_type+`</div>
            <a href="watch?`+data[i].fileName+`">
            <figure>
                <img class="img-fluid" src="`+web_config.thumbnail_url+data[i].thumbnail+`" alt="">
            </figure>
            <div class="box-content">
                <h3 class="title">`+data[i].orginalName+` (`+data[i].movie_year+`)</h3>
                <h4> <span class="post"><span class="fa fa-clock-o"> </span></span>

                    <span class="post fa fa-heart text-right"></span>
                </h4>
                
                </div>
                <span class="fa fa-play video-icon" aria-hidden="true"></span>
            </a>
        </div>
    </div>
    `;
}

document.getElementById("list-container").innerHTML = HtmlElement;
}
function WatchTimeCalcl(time){
    if(time == 0) time = 90;
    var hour = Math.floor(time / 60);
    var minutes = time - (60*hour);
    return hour+"Hr "+minutes+"min";
}

var searchpar = "";
var fetchpar = "";
if(window.location.search != "") {
    searchpar = window.location.search.split("?search=")[1];
    fetchpar = web_config.api_url+"?search="+searchpar;
    console.log(searchpar);
    fetch(web_config.api_url+"?visited=/S-"+searchpar);
}
else{
    fetchpar = web_config.api_url+"?movies_db=all";
    fetch(web_config.api_url+"?visited=/more");
}

// fetch(web_config.api_url+"?visited=/"+searchpar);

fetch(fetchpar)
.then(result=>result.json())
.then((data)=>{
    if(window.location.search != "") ShowMovies(data.movies);
    else ShowMovies(data.all);
    setTimeout(() => {
        document.getElementById("loader").className="hideLoader";
    }, 200);
});
