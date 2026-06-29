/*
=========================================
SCMPremier Discovery Experience
Build 0.5.4
=========================================
*/

const App = {

    init(){

        this.bindEvents();

        Router.show("dashboard-screen");

    },

    bindEvents(){

        const startButton =
            document.getElementById("btn-start-mission");

        if(startButton){

            startButton.addEventListener("click",()=>{

            resetGame();

            startTimer();

            Router.show("memory-screen");

            });

        }

        const retryButton =
            document.getElementById("retry-btn");

        if(retryButton){

            retryButton.addEventListener("click",()=>{

            resetGame();

            startTimer();

            Router.show("memory-screen");

            });

}

        const continueButton =
            document.getElementById("continue-btn");

        if(continueButton){

            continueButton.addEventListener("click",()=>{

                resetGame();

                Router.show("product-screen");

            });

        }

    }

};

document.addEventListener("DOMContentLoaded",()=>{

    App.init();

});
/*==================================================
MEMORY GAME ENGINE
==================================================*/

const MEMORY_ITEMS = [

    {
        id:1,
        image:"assets/products/500.webp"
    },

    {
        id:2,
        image:"assets/products/600.webp"
    },

    {
        id:3,
        image:"assets/products/2012.webp"
    },

    {
        id:4,
        image:"assets/products/2127.webp"
    },

    {
        id:5,
        image:"assets/products/5531.webp"
    },

    {
        id:6,
        image:"assets/products/5711.webp"
    }

];
function shuffle(array){

    const arr=[...array];

    for(let i=arr.length-1;i>0;i--){

        const j=Math.floor(Math.random()*(i+1));

        [arr[i],arr[j]]=[arr[j],arr[i]];

    }

    return arr;

}
function createMemoryBoard(){

    const grid=document.getElementById("memory-grid");

    if(!grid) return;

    grid.innerHTML="";

    const cards=shuffle([

        ...MEMORY_ITEMS,

        ...MEMORY_ITEMS

    ]);

    cards.forEach(item=>{

        const card=document.createElement("div");

        card.className="memory-card";

        card.dataset.id=item.id;

        card.innerHTML=`

            <div class="memory-card-inner">

                <div class="memory-card-front">

                    <img
                    src="assets/SCMP_LOGO_WH.webp"
                    class="memory-logo"
                    alt="SCMP">

                </div>

                <div class="memory-card-back">

                    <img
                    src="${item.image}"
                    class="memory-product-image"
                    alt="Product">

                </div>

            </div>

        `;
card.addEventListener(

    "click",

    ()=>{

        flipCard(card,item.id);

    }

);

        grid.appendChild(card);

    });

}

function flipCard(card, id){

    if(AppState.isBusy) return;

    if(card.classList.contains("flipped")) return;

    card.classList.add("flipped");

    AppState.selectedCards.push({

        id:id,

        element:card

    });

    if(AppState.selectedCards.length===2){

    checkMatch();

}

}

function checkMatch(){

    AppState.isBusy=true;

    const first=AppState.selectedCards[0];

    const second=AppState.selectedCards[1];

    AppState.attempts++;

    updateGameUI();

    if(first.id===second.id){

        AppState.matchedPairs++;

        updateGameUI();

        if(AppState.matchedPairs===AppState.totalPairs){

        setTimeout(()=>{

            finishMission();

        },1000);

}

        AppState.selectedCards=[];

        AppState.isBusy=false;

        return;

    }

    setTimeout(()=>{

        first.element.classList.remove("flipped");

        second.element.classList.remove("flipped");

        AppState.selectedCards=[];

        AppState.isBusy=false;

    },800);

}

function updateGameUI(){

    document.getElementById("attempt-count").textContent =
        AppState.attempts;

    document.getElementById("discoveries-count").textContent =
        `${AppState.matchedPairs} / ${AppState.totalPairs}`;

    const timerElement =
        document.getElementById("timer-count");

    if(timerElement){

        timerElement.textContent = AppState.timer;

    }
        
    updateProgressBar();    

}

function updateProgressBar(){

    const percent =
        (AppState.matchedPairs / AppState.totalPairs) * 100;

    const progressFill =
        document.getElementById("progress-fill");

    if(progressFill){

        progressFill.style.width = percent + "%";

    }

    const progressPercent =
    document.getElementById("progress-percent");

    if(progressPercent){
        
        progressPercent.textContent =
        Math.round(percent) + "%";

    }

    const dashboardDiscoveries =
        document.getElementById("dashboard-discoveries");

    if(dashboardDiscoveries){

        dashboardDiscoveries.textContent =
            AppState.matchedPairs;

    }

}

function finishMission(){

    clearInterval(AppState.timerInterval);

    const resultTime =
        document.getElementById("result-time");

    if(resultTime){

        resultTime.textContent =
            (30 - AppState.timer) + " s";

    }

    const resultAttempts =
        document.getElementById("result-attempts");

    if(resultAttempts){

        resultAttempts.textContent =
            AppState.attempts;

    }

    Router.show("mission-complete-screen");

}

function resetGame(){

    AppState.timer = 30;

    AppState.attempts = 0;

    AppState.matchedPairs = 0;

    AppState.selectedCards = [];

    AppState.isBusy = false;

    updateGameUI();

    createMemoryBoard();

}

function startTimer(){

    clearInterval(AppState.timerInterval);

    AppState.timer = 30;

    updateGameUI();

    AppState.timerInterval = setInterval(()=>{

        AppState.timer--;

        updateGameUI();

        if(AppState.timer <= 0){

            clearInterval(AppState.timerInterval);

            Router.show("mission-failed-screen");

        }

    },1000);

}

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        createMemoryBoard();

    }

);