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


document.querySelector('#labs-check').addEventListener('click', (event)=>{
    const divLabsCont = document.querySelector('.labs-content');
    // console.log(divLabsCont.style.display,
    //      divLabsCont.style.height,
    //      divLabsCont.style.fontSize
    //      )
    if(
        divLabsCont.style.fontSize==''
    ){
        divLabsCont.style.fontSize = 'medium'
    }else{
        divLabsCont.style.fontSize = ''
    }
    
})

const projContainers = document.querySelectorAll('.project-container');
Array.prototype.forEach.call(projContainers,(projCont)=>{

    const aEl = projCont.querySelector('a');
    const aString = aEl.innerHTML;
    const arrLength = Array.from(aString).length;
    const width = arrLength*14;
    const widthPx = `${width}px`;
    projCont.style.width = widthPx;


    aEl.addEventListener('mouseover',(event)=>{
        if(window.screen.width>1204)
            projCont.style.width='100%'
    })
    aEl.addEventListener('mouseout',(event)=>{
        projCont.style.width=widthPx;
    })

})

const LangConfigArray = [
    {javascript:'#efd81d'},
    {react:'#61dafb'},
    {'asp.net core':'#592c8c'},
    {'entity framework':'#652076'},
    {swagger:'#6a9500'},
    {docker:'#2391e6'},
    {xunit:'black'},
    {angular:'#c3002f'},
    {vue:'#3fb27f'}
];

function setRightColorForElements(){
    const timeLineCont = document.querySelector('.timeline');
    const childNodes = timeLineCont.childNodes;

    function traversThroughChildNodes(childNodes){
        
    }
}



