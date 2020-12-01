const lightbox = document.querySelector('.lightbox');
const row = document.querySelector('.row');
const row_record = document.querySelector('.row_record')


const data = JSON.parse(localStorage.getItem('img')) || [];

window.onload = function(){ 
    showList();
};
window.onresize = function(){

}

row.addEventListener('click',function(e){//點開圖片
    console.log(e);
    if(document.body.clientWidth <= 768) return;
    if(e.target.nodeName === "IMG"){
        lightbox.style.display = 'block';
        lightbox.innerHTML = e.target.outerHTML;
        imgRecord(e.target.currentSrc,calc_img(e.target.clientHeight,e.target.clientWidth));

    }
});

lightbox.addEventListener('click',function(e){//關掉大圖
    console.log(e);
    if(e.target.nodeName !== "IMG"){
        lightbox.style.display = 'none';
    }
})

function calc_img(img_height,img_width){ //比較圖片的寬高
    if(img_height<img_width){
        return "item wimg";
    }
    else if(img_height>=img_width){
        return "item himg";
    }
}

function imgRecord(HTML_content,img_size){//記錄按過哪張圖片
    for(let i=0;i<data.length;i++){
        if(data[i].content === HTML_content){
            data.splice(i,1);
            break;//不需要再讀取
        }
    }
    const todo = {
        content: HTML_content,
        size_class: img_size,
    }
    data.push(todo);
    localStorage.setItem('img',JSON.stringify(data));
}

function showList(){
    let str="";
    console.log(localStorage.img);
    if(!localStorage.img) str= '<p style="font-size:36px;">目前沒有紀錄哦!</p>';
    else{
        for(let i=data.length-1;i>=0;i--){
            str += `<div class="${data[i].size_class}"><a href="#"><img src="${data[i].content}" alt=""></a></div>`;   
        }
    }
    row_record.innerHTML = str;

}

