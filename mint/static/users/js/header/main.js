function burger() {
    var x = document.getElementById("header_mint");
    if (x.className === "adaptive") {
        x.className += " responsive";
    } else {
        x.className = "adaptive_";
    }
}