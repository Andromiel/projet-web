document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelectorAll('.title-box:not(#main-title-box)').forEach((value, key)=>{
        value.style.setProperty('--vibrate-start', key*10+'%');
        value.style.setProperty('animation-delay', key*0.1+'s');
    })
})