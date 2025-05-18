

let hour = document.querySelector("#hour");
let minute = document.querySelector("#minute"); 
let second = document.querySelector("#second");

let interval = null;

function start(){

interval = setInterval(function(){
second++;
second.innerHTML = second;

}, 1000)

}