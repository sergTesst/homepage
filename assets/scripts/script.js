"use strict";

const cl = console.log;

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

const LangConfigObj = {
    javascript:'#efd81d',
    react:'#61dafb',
    ['asp.net core']:'#592c8c',
    ['entity framework core']:'#652076',
    swagger:'#6a9500',
    docker:'#2391e6',
    xunit:'black',
    angular:'#c3002f',
    vue:'#3fb27f',
    typescript: `#2f74c0`,
};

function setRightColorForElements(){
    const timeLineCont = document.querySelector('.timeline');
    const children = timeLineCont.children;
    // cl('children ', children);
    const allLinks = timeLineCont.querySelectorAll(`a[href]`)
    // cl(`allLinks `,allLinks);
    cl(`Object.keys(LangConfigObj)`, Object.keys(LangConfigObj));
    setColourForLinks(allLinks)
    function setColourForLinks(links){
        Array.from(links).forEach(link=>{
            let innerHTMLOfLink = link.innerHTML.trim().toLowerCase();
            // cl(` link.innerHTML.trim().toLowerCase() `,innerHTMLOfLink);
            
            if(Object.keys(LangConfigObj).includes(innerHTMLOfLink)){

                // cl(`innerHTMLOfLink, LangConfigObj[innerHTMLOfLink] `,
                //     innerHTMLOfLink, LangConfigObj[innerHTMLOfLink]);

                link.style.backgroundColor  = `${LangConfigObj[innerHTMLOfLink]}`;
            }
        })
    }

    // traverseChildren(timeLineCont);

    function traverseChildren(elem){
        if(elem.tagName === 'A')
            cl(elem, elem.tagName);
        if(!elem.children.length)
            return;
        Array.from(elem.children).forEach(child=>{
            traverseChildren(child)
        })
    }
}
setRightColorForElements()



