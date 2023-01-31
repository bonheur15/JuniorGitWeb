

function ShowAdsBanner3(){
    if(AdsConfig.Banners.Banner3.ImgSrc == "") return;
    document.getElementById("ads-section-banner3").innerHTML = `<a target="_blank" href="`+AdsConfig.Banners.Banner3.RedirectUrl+`"><img src="`+AdsConfig.Banners.Banner3.ImgSrc+`"></a>`;
}



function ShowSliders(data){
var HtmlElement = "";
for(var i = 0; i < data.length;i++){
HtmlElement += `
    <div class="item">
        <li>
            <div class="slider-info banner-view" style="background: url(`+web_config.thumbnail_url+data[i].thumbnail+`) no-repeat center;background-size: cover;">
                <div class="banner-info">
                    <h3>`+data[i].orginalName+`</h3>
                    <p>`+data[i].description+`</p>
                    <a href="watch?`+data[i].fileName+`" class="play-view1">
                        <span class="video-play-icon">
                            <span class="fa fa-play"></span>
                        </span>
                        <h6>Watch Now</h6>
                    </a>
                    <!-- dialog itself, mfp-hide class is required to make dialog hidden -->
                    <div id="small-dialog1" class="zoom-anim-dialog mfp-hide">
                    </div>
                </div>
            </div>
        </li>
    </div>
`;

}

document.getElementById("home-slider").innerHTML = HtmlElement;
    setTimeout(() => {
        $(document).ready(function () {
            $('.owl-one').owlCarousel({
                stagePadding:0,
                loop: true,
                margin: 0,
                nav: true,
                responsiveClass: true,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplaySpeed: 1000,
                autoplayHoverPause: false,
                responsive: {
                    0: {
                        items: 1,
                        stagePadding: 40,
                        nav: false
                    },
                    480: {
                        items: 1,
                        stagePadding: 60,
                        nav: true
                    },
                    667: {
                        items: 1,
                        stagePadding: 80,
                        nav: true
                    },
                    1000: {
                        items: 1,
                        nav: true
                    }
                }
            })
        })        
    }, 10);
}
// var data = [
//     {
//         "id": "6",
//         "orginalName": "Blackout",
//         "description": "After waking up in a Mexican hospital with no memory of his past, a man finds himself being hunted by various cartel factions who are all looking for something he stole.",
//         "thumbnail": "2.jpg",
//         "fileName": null,
//         "movie_length": "91",
//         "movie_tag": "Action",
//         "movie_type": "Movie",
//         "movie_year": "2022",
//         "movie_country": "USA",
//         "movie_rate": "1",
//         "movie_section": "Slider",
//         "date_upload": "2022-12-21 13:14:43"
//       }
// ]
function ShowReleases(data){
    var HtmlElement = "";
    for(var i = 0; i < data.length;i++){
        HtmlElement += `
        <div class="item vhny-grid card-release">
        <div class="tag-type">`+data[i].movie_tag.split(",")[0]+` - `+data[i].movie_type+`</div>
        <div class="box16 mb-0">
            <a href="watch?`+data[i].fileName+`">
                <figure>
                    <img class="img-fluid" src="`+web_config.thumbnail_url+data[i].thumbnail+`" alt="">
                </figure>
                <div class="box-content">
                    <h4> <span class="post">
                            <span class="fa fa-clock-o"> </span>
                            `+WatchTimeCalcl(data[i].movie_length)+` </span>

                        <span class="post fa fa-heart text-right"></span>
                    
                    </h4>
                    
                </div>
                <span class="fa fa-play video-icon" aria-hidden="true"></span>
            </a>
        </div>
        <h3> <a class="title-gd" href="watch?`+data[i].fileName+`">`+data[i].orginalName+` (`+data[i].movie_year+`)</a></h3>
        <p>`+data[i].description+`...t</p>
        <div class="button-center text-center mt-4">
            <a href="watch?`+data[i].fileName+`" class="btn watch-button">Watch now</a>
        </div>
        </div>
        `;
        if(i == Math.floor(data.length / 2) && AdsConfig.Banners.Banner1.ImgSrc != ""){
            HtmlElement += `
            <div class="item vhny-grid">
            <div class="box16 list-movie-card-sub">
                <a target="_blank" href="`+AdsConfig.Banners.Banner1.RedirectUrl+`">
                <figure>
                    <img class="img-fluid" src="`+AdsConfig.Banners.Banner1.ImgSrc+`">
                </figure>
                </a>
            </div>
            </div>
            `;
        }
    }
    document.getElementById("new-releases").innerHTML = HtmlElement;
    setTimeout(() => {
        $(document).ready(function () {
            $('.owl-three').owlCarousel({
                loop: true,
                margin: 20,
                nav: false,
                responsiveClass: true,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplaySpeed: 1000,
                autoplayHoverPause: false,
                responsive: {
                    0: {
                        items: 2,
                        nav: false
                    },
                    480: {
                        items: 2,
                        nav: true
                    },
                    667: {
                        items: 3,
                        nav: true
                    },
                    1000: {
                        items: 5,
                        nav: true
                    }
                }
            })
        })
            
    }, 10);
}

function ShowLatestMovie(data){
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
                <p class="movie-dec-made">`+data[i].description+`...</p>
                <h4> <span class="post"><span class="fa fa-clock-o"> </span> `+WatchTimeCalcl(data[i].movie_length)+`</span>

                    <span class="post fa fa-heart text-right"></span>
                </h4>
                
                </div>
                <span class="fa fa-play video-icon" aria-hidden="true"></span>
            </a>
        </div>
    </div>
    `;
    if(i == Math.floor(data.length / 2) && AdsConfig.Banners.Banner2.ImgSrc != ""){
        HtmlElement += `
        <div class="item vhny-grid">
        <div class="box16 list-movie-card-sub">
            <a target="_blank" href="`+AdsConfig.Banners.Banner2.RedirectUrl+`">
            <figure>
                <img class="img-fluid" src="`+AdsConfig.Banners.Banner2.ImgSrc+`">
            </figure>
            </a>
        </div>
        </div>
        `;
    }
}
    document.getElementById("latest-container").innerHTML = HtmlElement;
}

function WatchTimeCalcl(time){
    var hour = Math.floor(time / 60);
    var minutes = time - (60*hour);
    return hour+"Hr "+minutes+"min";
}




var Database = {};

function FetchAllData(){
    fetch(web_config.api_url+"demo.php?movies_db")
    .then(result => result.json())
    .then((data)=>{
        ShowSliders(data.slider);
        ShowReleases(data.new);
        ShowLatestMovie(data.popular);
        setTimeout(() => {
            document.getElementById("loader").className="hideLoader";
        }, 200);
    });

}




fetch(web_config.api_url+"demo.php?ads")
.then(result=>result.json())
.then((data)=>{
    AdsConfig = data;
    ShowAdsBanner3();
    FetchAllData();
});
