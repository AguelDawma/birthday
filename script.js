const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const screens=["loading","lock","home","memories","counter"];
let code="", unlocked=false;

function show(id){
  screens.forEach(s=>$("#"+s).classList.toggle("active",s===id));
  const nav=$("#nav"), music=$("#musicToggle");
  nav.classList.toggle("show",["home","memories","counter"].includes(id));
  music.classList.toggle("show",unlocked);
  $$(".nav button").forEach(b=>b.classList.toggle("active",b.dataset.page===id));
}
setTimeout(()=>show("lock"),2600);

function updateDots(){
  const chars=code.padEnd(8,"•").split("").map((c,i)=>i<code.length?"●":"•").join(" ");
  $("#dots").textContent=chars;
}
function unlock(){
  if(code==="23082026"){
    unlocked=true; show("home");
    const m=$("#music"); m.volume=.35; m.play().catch(()=>{});
    startCounter();
  }else if(code.length>=6){
    $("#dots").animate([{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],250);
    code=""; updateDots();
  }
}
$$(".keypad button").forEach(b=>b.addEventListener("click",()=>{
  const k=b.dataset.key;
  if(k==="back") code=code.slice(0,-1);
  else if(k==="clear") code="";
  else if(code.length<8) code+=k;
  updateDots(); if(code.length>=8) unlock();
}));

$("#openMemories").onclick=()=>show("memories");
$("#messageBtn").onclick=()=>show("counter");
$("#close").onclick=()=>$("#modal").classList.remove("show");
$("#counterNext").onclick=()=>$("#modal").classList.add("show");
$("#restart").onclick=()=>location.reload();

$$(".nav button").forEach(b=>b.onclick=()=>show(b.dataset.page));
$("#musicToggle").onclick=()=>{
 const m=$("#music");
 if(m.paused)m.play().catch(()=>{}); else m.pause();
};

function startCounter(){
 const birth=new Date("2006-10-02T00:00:00");
 function tick(){
  const now=new Date(), diff=now-birth;
  $("#years").textContent=Math.floor(diff/(365.2425*864e5));
  $("#days").textContent=Math.floor(diff/864e5).toLocaleString();
  $("#hours").textContent=Math.floor(diff/36e5).toLocaleString();
 }
 tick(); setInterval(tick,60000);
}
function celebrate(){
 for(let i=0;i<35;i++){
  const h=document.createElement("span"); h.className="heart"; h.textContent=Math.random()>.5?"♥":"♡";
  h.style.left=Math.random()*100+"%"; h.style.animationDelay=Math.random()*.8+"s"; h.style.fontSize=10+Math.random()*22+"px";
  $("#hearts").appendChild(h); setTimeout(()=>h.remove(),5000);
 }
}
$("#celebrate").onclick=()=>{celebrate(); $("#modal").classList.remove("show"); show("home");};
