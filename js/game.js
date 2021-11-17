const APPLICATION_KEY = "4f27a8b94cc02d3c3568097927364eac6ccad32b05ca09cb8023b9b1e3a5df65";
const CLIENT_KEY = "dfcb8161c8fa59683c1835b3f303f5060e3c88ef9fb3cb7977b565bf792d37c3";
const ncmb = new NCMB(APPLICATION_KEY,CLIENT_KEY);
const DBName = "FTD";
let FTDClass = ncmb.DataStore(DBName);
let key = "score";

let timer = null;
const MAX = 2;
let count = 0;
let eTime = 0;

function init() {
  if (timer == null) {
    start = new Date();
    time();
    gameStart();
  }
}

function gameStart() {
  let size = 5;
  let qNum = Math.floor(Math.random()*q.length);

  for(let i = 0; i < size * size; i++){
    let s = document.createElement("span");
    s.textContent = q[qNum][0];
    s.setAttribute("id","num"+i);
    s.addEventListener('click',function(){
      if(this.textContent == q[qNum][1]){
        correct.play();
        count ++;
        while(cells.firstChild){
          cells.removeChild(cells.lastChild);
        }

        //終了処理
        if(count == MAX){

          let ftd = new FTDClass();
          let value = eTime;
          ftd.set(key,parseInt(value)).save()
          .then(function(){
            console.log("送信成功")
          }).catch(err => {
            console.log("err:"+err);
          });

          clearTimeout(timer);
          alert("omede tai");

          FTDClass.order("score").fetchAll()
          .then(item => {
            if(item[0].score >= eTime){
              alert("High score! :"+ eTime);
            }
          }).catch(err => {
            console.log("err:"+err);
          });

          //クリア後のクリア表示
          let end = document.createElement("span");
          end.textContent = "clear";
          end.setAttribute("id","endstr");
          cells.appendChild(end);
        }else{
          gameStart();
        }
      }else {
        wrong.play();
      }
    });

    cells.appendChild(s);

    if(i % size == size - 1){
      const br = document.createElement("br");
      cells.appendChild(br);
    }
  }

  let p = Math.floor(Math.random() * size * size);
  let ans = document.getElementById("num"+p);
  ans.textContent = q[qNum][1];
}

function time() {
  let now = new Date();
  eTime = parseInt((now.getTime() - start.getTime())/1000);
  score.textContent = eTime;
  timer = setTimeout(time, 1000);
}
