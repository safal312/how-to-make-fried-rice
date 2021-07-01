document.addEventListener('DOMContentLoaded', init);

let introVideo, finalVideo, popup, loading;

let answer = {
    step: 0,
    spicy: 0
}

function startLoading() {
    // console.log("loading...");
    loading.style.opacity = 1;
    loading.style.pointerEvents = "all";
}

function stopLoading() {
    loading.style.opacity = 0;
    loading.style.pointerEvents = "none";
}

function init() {
    let title = document.querySelector('.main-title');
    loading = document.querySelector('.loading');
    introVideo = document.querySelector('.intro-video video');
    title.addEventListener('click', () => {
        let elem = document.documentElement;
        // elem.requestFullscreen();
        title.style.opacity = 0;
        startLoading();
        setTimeout(() => {
            title.style.pointerEvents = "none";
            introVideo.play();
            title.remove();
        }, 1000);
        introVideo.src = "videos/videos/First clip.mp4";
        introVideo.addEventListener("loadeddata", () => {
            // console.log("here");
            stopLoading();
            // introVideo.play();
            introVideo.addEventListener("ended", introVideoEnd);
        })
    })
}

function introVideoEnd() {
    popup = document.querySelector(".popup");
    let form = document.querySelector(".popup .container .spiciness");

    popup.style.pointerEvents = "all";
    popup.style.opacity = 1;

    form.addEventListener("submit", submitHandler);
}

function submitHandler(e) {
    startLoading();
    loading.innerHTML = "<img class='bg' src='images/bg.png'>Loading Story..";
    e.preventDefault();
    // console.log("after submitt");
    

    popup.style.pointerEvents = "none";
    answer.step = document.querySelector('input[name="steps"]:checked').value;
    answer.spicy = document.querySelector('input[name="spicy"]:checked').value;
    console.log(answer);
    finalVideo = document.querySelector(".final-video video");
    // finalVideo.load();
    
    introVideo.remove();

    if (answer.step == "Rice, Egg, Vegetables") {
        if (answer.spicy == "hot") {
            finalVideo.src = "videos/videos/rice, egg, spicy.mp4";
        } else {
            finalVideo.src = "videos/videos/rice, egg, mild.mp4";
        }
    } else if (answer.step == "Vegetables, Egg, Rice") {
        if (answer.spicy == "hot") {
            finalVideo.src = "videos/videos/vegetables first spicy.mp4";
        } else {
            finalVideo.src = "videos/videos/vegetables first mild.mp4";
        }
    } else if (answer.step == "Rice, Vegetables, Egg") {
        if (answer.spicy == "hot") {
            finalVideo.src = "videos/videos/rice, vegetable, spicy.mp4";
        } else {
            finalVideo.src = "videos/videos/rice, vegetable, mild.mp4";
        }
    }
    
    document.querySelector(".final-video").style.display = "block";
    popup.style.opacity = 0;

    // setTimeout(() => {
    //     popup.remove();
    // }, 500);
    
    finalVideo.play();
    finalVideo.addEventListener("loadeddata", () => {
        // console.log("stataghsgh");
            stopLoading();    
        
        // finalVideo.play();

        finalVideo.addEventListener("ended", theEnd);
    })
    
}

function theEnd() {
    // console.log("heree");
    let bg = new Audio("/audio/music.mp3");
    bg.volume = 0.5;
    bg.loop = true;
    bg.play();
    let ending = document.querySelector(".the-end");
    ending.style.opacity = 1;
    ending.style.pointerEvents = "all";
    // document.exitFullscreen();
}