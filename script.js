// ダークモード設定

const themeButton =
document.getElementById("themeButton");

const themeIcon =
document.getElementById("themeIcon");

let isDarkMode =
localStorage.getItem("darkMode") === "true";

function applyTheme(){

    if(isDarkMode){

        document.body.classList.add("dark-mode");

        themeIcon.textContent = "☼";

    }else{

        document.body.classList.remove("dark-mode");

        themeIcon.textContent = "☾";

    }

}

themeButton.addEventListener("click",()=>{

    isDarkMode = !isDarkMode;

    localStorage.setItem(
        "darkMode",
        isDarkMode
    );

    applyTheme();

});

applyTheme();
const historyPanel=
document.getElementById(
"historyPanel"
);

const historyList=
document.getElementById(
"historyList"
);

const menuButton=
document.getElementById(
"menuButton"
);

menuButton.addEventListener("click",(e)=>{

    // メニューを押した時は開閉
    historyPanel.classList.toggle("open");

    // イベントがページ全体に伝わらないようにする
    e.stopPropagation();

});


// 履歴パネル内をクリックしても閉じない
historyPanel.addEventListener("click",(e)=>{

    e.stopPropagation();

});


// ページのどこかをクリックしたら閉じる
document.addEventListener("click",()=>{

    historyPanel.classList.remove("open");

});

let history=
JSON.parse(
localStorage.getItem(
"diceHistory"
)
)||[];

function saveHistory(text){

history.unshift(text);

if(history.length>50){

history.pop();

}

localStorage.setItem(
"diceHistory",
JSON.stringify(history)
);

renderHistory();

}

function renderHistory(){

historyList.innerHTML="";

history.forEach(item=>{

const div=
document.createElement(
"div"
);

div.className=
"history-item";

div.textContent=item;

historyList.appendChild(div);

});

}

renderHistory();
const container = document.getElementById("diceContainer");
const addButton = document.getElementById("addButton");

function createDice(count=1,sides=6){

    const card=document.createElement("div");
    card.className="dice-card";

    card.innerHTML=`

<button class="deleteButton">
×
</button>

<input type="number"
class="count"
value="${count}"
min="1">

<span>d</span>

<input type="number"
class="sides"
value="${sides}"
min="2">

<button class="rollButton">
Roll
</button>

<div class="result">
-
</div>

`;

    const button=
    card.querySelector(".rollButton");

    button.addEventListener("click",()=>{

    const diceCount=
    Number(
    card.querySelector(".count").value
    );

    const sides=
    Number(
    card.querySelector(".sides").value
    );

    let total=0;
    let rolls=[];

    for(let i=0;i<diceCount;i++){

        let roll=
        Math.floor(
        Math.random()*sides
        )+1;

        rolls.push(roll);

        total+=roll;

    }

    card.querySelector(
    ".result"
    ).textContent=
    `${total} [${rolls}]`;

    const resultText=
    `${diceCount}d${sides}
→ ${total}
[${rolls}]`;

    saveHistory(resultText);

});


const deleteButton=
card.querySelector(
".deleteButton"
);

deleteButton.addEventListener(
"click",
()=>{

card.remove();

});

    container.appendChild(card);

}


createDice(1,100);
createDice(1,10);
createDice(2,4);

addButton.addEventListener(
"click",
()=>{
createDice();
});