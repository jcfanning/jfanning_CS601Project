window.onload = function () {
    document.getElementById("jsToggle").classList.remove("hidden")
    document.getElementById("jsToggle").classList.add("show")
    document.getElementById("newQuote").onclick = function(){
        displayQuote();

    }
    document.getElementById("quoteContainer").style.visibility = "visible"
    displayQuote();
};

async function getQuote() {
    let url = "https://my-bao-server.herokuapp.com/api/breadpuns";
    const reply = await fetch(url).then((response) => {
        let data = response.json();
        return data;
    });
    return reply;
}

async function displayQuote() {
    console.log("DisplayQuote")
    let data = await getQuote();
    document.getElementById("quote").innerHTML = data;
}
