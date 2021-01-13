"use strict";

document.addEventListener('DOMContentLoaded', function(event){
    updateDisplay();
});

const heart = document.getElementById("heartClick");
let count = sessionStorage.getItem("likesCount");
if(count==undefined || count==null || count == NaN){
    count = 0;
}

heart.addEventListener("click",()=>{
    count++;
    if (typeof(Storage) !== "undefined") {
        sessionStorage.setItem("likesCount", count);
    } 
    updateDisplay();
});
heart.addEventListener("dblclick",()=>{
    sessionStorage.clear();
    count = 0;
    document.getElementById("likeCounter").innerHTML = "";
});

function updateDisplay(){
    
    const likesSpan = document.getElementById("likeCounter");
    likesSpan.innerHTML = sessionStorage.getItem("likesCount");
};