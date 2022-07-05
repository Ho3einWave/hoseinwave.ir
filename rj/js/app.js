let downloadButton = document.querySelector(".input button");
let backwardButton = document.querySelector(".backward");
let dldata;

async function getdata() {
    let urlE = document.querySelector(".input input");
    let h = new Headers();
    h.append(
        "runtime-token",
        "55e4d8805c23356c41d52dcf091a8c4500071db0615e42888029039820c937a4"
    );
    h.append("Access-Control-Allow-Origin", "*");

    let f = new FormData();
    f.append("url", urlE.value);

    let ro = {
        method: "POST",

        headers: h,
        body: f,
        redirect: "follow",
    };

    response = await fetch("https://hoseinwave.ir/api/rjdl.php", ro);
    dldata = await response.json();
}

downloadButton.addEventListener("click", async(e) => {
    let containerLoaded = document.querySelector(".container-load");
    let containerDownloader = document.querySelector(".container-downloader");
    let imgElement = document.querySelector(".container-load img");
    let songNameElement = document.querySelector(".container-load h3");
    let likesElement = document.querySelector("#likes");
    let playsElement = document.querySelector("#plays");
    let dateElement = document.querySelector("#date");
    let lqlink = document.querySelector("#lqdl");
    let hqlink = document.querySelector("#hqdl");
    let loadingSVG = document.querySelector(".loading");
    let downloadSVG = document.querySelector(".download-svg");

    downloadSVG.classList.add("hide-obj");
    loadingSVG.classList.remove("hide-obj");
    downloadButton.disabled = true;
    await getdata();

    if (dldata.error_code === "400") {
        let error_text_old = document.querySelector(".container-downloader h3");
        if (error_text_old === null) {
            let error_text = document.createElement("h3");
            error_text.textContent = "Fail to get data, please check url 🙁";
            containerDownloader.appendChild(error_text);
        }
        downloadSVG.classList.remove("hide-obj");
        loadingSVG.classList.add("hide-obj");
        downloadButton.disabled = false;
    } else if (dldata.artwork !== undefined) {
        if (containerDownloader.lastChild.localName === "h3") {
            let theh3 = document.querySelector(".container-downloader h3");
            containerDownloader.removeChild(theh3);
        }

        imgElement.src = dldata.artwork;
        songNameElement.textContent = `${dldata.artist} - ${dldata.songname}`;
        likesElement.textContent = `${dldata.likes} Likes`;
        playsElement.textContent = `${dldata.views} Plays`;
        dateElement.textContent = dldata.rdate;
        lqlink.href = dldata.lqdownload;
        hqlink.href = dldata.hqdownload;

        containerDownloader.classList.add("hide");
        containerLoaded.classList.remove("hide");
    }
});

backwardButton.addEventListener("click", (e) => {
    let containerLoaded = document.querySelector(".container-load");
    let containerDownloader = document.querySelector(".container-downloader");
    let loadingSVG = document.querySelector(".loading");
    let downloadSVG = document.querySelector(".download-svg");
    let urlE = document.querySelector(".input input");
    urlE.value = "";
    downloadSVG.classList.remove("hide-obj");
    loadingSVG.classList.add("hide-obj");
    downloadButton.disabled = false;
    containerDownloader.classList.remove("hide");
    containerLoaded.classList.add("hide");
});