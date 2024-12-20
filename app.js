// ELEMENTS //////////////////////////////////////////////// 
const introEl = document.querySelector('.intro'); 
const firstEl = document.querySelector('.first');
const secondEl = document.querySelector('.second');
const killsLeftEl = document.querySelector('.killsLeft');
const inputRowEl = document.querySelector('.inputRow');
const gameArchiveEl = document.querySelector('.gameArchive');
const achievedSetEl = document.querySelector('.achievedSet');
const setTotalsEl = document.querySelector('.totals');
const inGameTotalsEl = document.querySelector('.inGameTotals');
const currKillTotal = document.querySelector('.currKillTotal');
const currdeathTotal = document.querySelector('.currDeathTotal');
const currRatioTotal = document.querySelector('.currRatioTotal');
//////////////////////////////////////////////////////////// 
// BUTTONS //////////////////////////////////////////////// 
const startBtn = document.querySelector('.startBtn');
const subSingleScoreBtn = document.createElement('button');
subSingleScoreBtn.textContent = 'submit';
subSingleScoreBtn.classList.add('subSingleScoreBtn');

//////////////////////////////////////////////////////////// 
// VALUES /////////////////////////////////////////////////
let killsLeft = 100;
let totalKills = 0;
let totalDeaths = 0;
///////////////////////////////////////////////////////////
// ARRAYS ////////////////////////////////////////////////
mapArray = [' Babylon', 'Derelict', '  Gala  ', 'Hideout', ' Lowtown', 'Nuketown',  
    ' Payback', '   Pit  ', 'Protocol', 'Red card', '  Rewind', 
    '  Scud  ', 'Skyline ', 'Stakeout', 'Subsonic', ' Vault  ', 
    'Vorkuta ', 'Warehead'];

singleGameArray = [];
totalSetArray = [];
//////////////////////////////////////////////////////////


startBtn.addEventListener('click', () => {
    introEl.classList.add('hide');
    firstEl.classList.remove('hide');
    killInput.focus();
})

killsLeftEl.textContent = killsLeft;


let mapDropdown = document.createElement('select');



// INPUT ROW ELEMENTS ---> .inputRowEl ///////////////////
let kDiv = document.createElement('div');
kDiv.classList.add('kDiv');
kDiv.textContent = 'K';

let killInput = document.createElement('input');
killInput.type = 'number';
killInput.classList.add('killInput');

let dDiv = document.createElement('div');
dDiv.classList.add('dDiv');
dDiv.textContent = 'D';


let deathInput = document.createElement('input');
deathInput.type = 'number';
deathInput.classList.add('deathInput');
//////////////////////////////////////////////////////////


// ARCHIEVED SET ELEMENTS /////////////////////////////////

//////////////////////////////////////////////////////////



for (let i = 0; i <= mapArray.length -1; i++) { 
    const option = document.createElement('option'); 
    option.value = mapArray[i]; 
    option.textContent = mapArray[i]; 
    mapDropdown.appendChild(option); 
}
inputRowEl.appendChild(kDiv);
inputRowEl.appendChild(killInput);
inputRowEl.appendChild(dDiv);
inputRowEl.appendChild(deathInput);
firstEl.appendChild(mapDropdown);
firstEl.appendChild(inputRowEl);
firstEl.appendChild(subSingleScoreBtn);
firstEl.appendChild(gameArchiveEl);

killInput.addEventListener('input', () => {
    if (killInput.value.length > 1) {
        deathInput.focus();
    }
})

killInput.addEventListener('keydown', (e) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
        deathInput.focus();
    }
})


deathInput.addEventListener('input', () => {
    if (deathInput.value.length > 1) {
        killsLeft -= killInput.value;
        totalDeaths += parseInt(deathInput.value, 10);
        totalKills += parseInt(killInput.value, 10);
        singleGameArray.push({ 
            kills: killInput.value, 
            deaths: deathInput.value,
            map: mapDropdown.value
        });  

        if (killsLeft <= 0) {
            firstEl.classList.add('hide');
            secondEl.classList.remove('hide');
            
            totalSetArray.push({ 
                totalKills: totalKills,
                totalDeaths: totalDeaths,
                games: {singleGameArray}
            })  





            for ( let i = 0; i < totalSetArray[0].games.singleGameArray.length; i++){
                let div = document.createElement('div');
                div.classList.add('archiveDiv');
                let val = totalSetArray[0].games.singleGameArray[i];
                console.log(val);
                let gameNumber = document.createElement('div');
                let killDiv = document.createElement('div');
                let deathDiv = document.createElement('div');
                let ratioDiv = document.createElement('div');
                let mapDiv = document.createElement('div');

                gameNumber.textContent = `${i + 1}.`;
                killDiv.textContent = val.kills;
                deathDiv.textContent = val.deaths;
                ratioDiv.textContent = (val.kills/val.deaths).toFixed(2);
                mapDiv.textContent = val.map;

                
                div.appendChild(gameNumber);
                div.appendChild(killDiv);
                div.appendChild(deathDiv);
                div.appendChild(ratioDiv);
                div.appendChild(mapDiv);

                if ((val.kills/val.deaths) < 1){
                    div.classList.add('red');
                };

                if ((val.kills/val.deaths) > 1){
                    div.classList.add('green');
                };

                if ((val.kills/val.deaths) === 1){
                    div.classList.add('grey');
                };

                secondEl.appendChild(div);
                
                if (i === totalSetArray[0].games.singleGameArray.length -1){
                    let totalKillDiv = document.createElement('div');
                    let totalDeathDiv = document.createElement('div');
                    let totalRatioDiv = document.createElement('div');
                    totalKillDiv.textContent = 'K: ' + totalSetArray[0].totalKills;
                    totalDeathDiv.textContent = 'D: ' + totalSetArray[0].totalDeaths;
                    totalRatioDiv.textContent = '%: ' + (totalSetArray[0].totalKills/totalSetArray[0].totalDeaths).toFixed(2);
                    setTotalsEl.appendChild(totalKillDiv);
                    setTotalsEl.appendChild(totalDeathDiv);
                    setTotalsEl.appendChild(totalRatioDiv);
                    secondEl.appendChild(setTotalsEl);
                } 
            };

        } else {  
            killsLeftEl.textContent = killsLeft;
            currKillTotal.textContent = 'K: ' + totalKills;
            currdeathTotal.textContent = 'D: ' + totalDeaths;
            currRatioTotal.textContent = 'R: ' + ((100-killsLeft)/totalDeaths).toFixed(2);
            inGameTotalsEl.appendChild(currKillTotal);
            inGameTotalsEl.appendChild(currdeathTotal);
            inGameTotalsEl.appendChild(currRatioTotal);
            for ( let i = 0; i < singleGameArray.length; i++){
                if (i === singleGameArray.length - 1) {
                    const singleArchiveRow = document.createElement('div');
                    singleArchiveRow.classList.add('singleArchiveRow');
                    const gameNumArch = document.createElement('div');
                    const kDivArch = document.createElement('div');
                    const dDivArch = document.createElement('div');
                    const rDivArch = document.createElement('div');
                    const mDivArch = document.createElement('div');

                    gameNumArch.textContent = `${i + 1}.`;
                    kDivArch.textContent = singleGameArray[i].kills;
                    dDivArch.textContent = singleGameArray[i].deaths;
                    rDivArch.textContent = (singleGameArray[i].kills/singleGameArray[i].deaths).toFixed(2);
                    mDivArch.textContent = singleGameArray[i].map;

                    singleArchiveRow.appendChild(gameNumArch);
                    singleArchiveRow.appendChild(kDivArch);
                    singleArchiveRow.appendChild(dDivArch);
                    singleArchiveRow.appendChild(rDivArch);
                    singleArchiveRow.appendChild(mDivArch);

                    // singleArchiveRow.addEventListener('click', ()=> {
                    //     // console.log('Howdy bretheren');
                    // })
                    gameArchiveEl.appendChild(singleArchiveRow);
                }
                
                
            }
            killInput.value = '';
            deathInput.value = '';
            killInput.focus();
        }
    
    }
})

deathInput.addEventListener('keydown', (e) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
        killsLeft -= killInput.value;
        totalDeaths += parseInt(deathInput.value, 10);
        totalKills += parseInt(killInput.value, 10);
        singleGameArray.push({ 
            kills: killInput.value, 
            deaths: deathInput.value,
            map: mapDropdown.value
        }); 

        if (killsLeft <= 0) {
            firstEl.classList.add('hide');
            secondEl.classList.remove('hide');
            totalSetArray.push({ 
                totalKills: totalKills,
                totalDeaths: totalDeaths,
                games: {singleGameArray}
            })
            for ( let i = 0; i < totalSetArray[0].games.singleGameArray.length; i++){
                let div = document.createElement('div');
                div.classList.add('archiveDiv');
                let val = totalSetArray[0].games.singleGameArray[i];
                let gameNumber = document.createElement('div');
                let killDiv = document.createElement('div');
                let deathDiv = document.createElement('div');
                let ratioDiv = document.createElement('div');
                let mapDiv = document.createElement('div');

                gameNumber.textContent = `${i + 1}.`;
                killDiv.textContent = val.kills;
                deathDiv.textContent = val.deaths;
                ratioDiv.textContent = (val.kills/val.deaths).toFixed(2);
                mapDiv.textContent = val.map;

                
                div.appendChild(gameNumber);
                div.appendChild(killDiv);
                div.appendChild(deathDiv);
                div.appendChild(ratioDiv);
                div.appendChild(mapDiv);

                if ((val.kills/val.deaths) < 1){
                    div.classList.add('red');
                };

                if ((val.kills/val.deaths) > 1){
                    div.classList.add('green');
                };

                if ((val.kills/val.deaths) === 1){
                    div.classList.add('grey');
                };
                
                if (i === totalSetArray[0].games.singleGameArray.length - 1){
                    let totalKillDiv = document.createElement('div');
                    let totalDeathDiv = document.createElement('div');
                    let totalRatioDiv = document.createElement('div');

                    totalKillDiv.textContent = 'K: ' + totalSetArray[0].totalKills;
                    totalDeathDiv.textContent = 'D: ' + totalSetArray[0].totalDeaths;
                    totalRatioDiv.textContent = '%: ' + (totalSetArray[0].totalKills/totalSetArray[0].totalDeaths).toFixed(2);
            
                    setTotalsEl.appendChild(totalKillDiv);
                    setTotalsEl.appendChild(totalDeathDiv);
                    setTotalsEl.appendChild(totalRatioDiv);

                }

                secondEl.appendChild(div);
                secondEl.appendChild(setTotalsEl);
            }
        } else {
            console.log(singleGameArray);
            killsLeftEl.textContent = killsLeft;
            currKillTotal.textContent = 'K: ' + (100 - killsLeft);
            currdeathTotal.textContent = 'D: ' + totalDeaths;
            currRatioTotal.textContent = '%: ' + ((killsLeft * -1 + 100)/totalDeaths).toFixed(2);
            inGameTotalsEl.appendChild(currKillTotal);
            inGameTotalsEl.appendChild(currdeathTotal);
            inGameTotalsEl.appendChild(currRatioTotal);
            for ( let i = 0; i < singleGameArray.length; i++){
                if (i === singleGameArray.length - 1) {
                    const singleArchiveRow = document.createElement('div');
                    singleArchiveRow.classList.add('singleArchiveRow');
                    const gameNumArch = document.createElement('div');
                    const kDivArch = document.createElement('div');
                    const dDivArch = document.createElement('div');
                    const rDivArch = document.createElement('div');
                    const mDivArch = document.createElement('div');

                    gameNumArch.textContent = `${i + 1}.`;
                    kDivArch.textContent = singleGameArray[i].kills;
                    dDivArch.textContent = singleGameArray[i].deaths;
                    rDivArch.textContent = (singleGameArray[i].kills/singleGameArray[i].deaths).toFixed(2);
                    mDivArch.textContent = singleGameArray[i].map;

                    singleArchiveRow.appendChild(gameNumArch);
                    singleArchiveRow.appendChild(kDivArch);
                    singleArchiveRow.appendChild(dDivArch);
                    singleArchiveRow.appendChild(rDivArch);
                    singleArchiveRow.appendChild(mDivArch);
                    gameArchiveEl.appendChild(singleArchiveRow);
                }
                
                
            }
            killInput.value = '';
            deathInput.value = '';
            killInput.focus();
        }
        }    
    }
);

subSingleScoreBtn.addEventListener('click', () => {
    killsLeft -= killInput.value;
        totalDeaths += parseInt(deathInput.value, 10);
        totalKills += parseInt(killInput.value, 10);
        singleGameArray.push({ 
            kills: killInput.value, 
            deaths: deathInput.value,
            map: mapDropdown.value
        }); 

        if (killsLeft <= 0) {
            firstEl.classList.add('hide');
            secondEl.classList.remove('hide');
            totalSetArray.push({ 
                totalKills: totalKills,
                totalDeaths: totalDeaths,
                games: {singleGameArray}
            })
            for ( let i = 0; i < totalSetArray[0].games.singleGameArray.length; i++){
                let div = document.createElement('div');
                div.classList.add('archiveDiv');
                let val = totalSetArray[0].games.singleGameArray[i];
                let gameNumber = document.createElement('div');
                let killDiv = document.createElement('div');
                let deathDiv = document.createElement('div');
                let ratioDiv = document.createElement('div');
                let mapDiv = document.createElement('div');

                gameNumber.textContent = `${i + 1}.`;
                killDiv.textContent = val.kills;
                deathDiv.textContent = val.deaths;
                ratioDiv.textContent = (val.kills/val.deaths).toFixed(2);
                mapDiv.textContent = val.map;

                
                div.appendChild(gameNumber);
                div.appendChild(killDiv);
                div.appendChild(deathDiv);
                div.appendChild(ratioDiv);
                div.appendChild(mapDiv);

                if ((val.kills/val.deaths) < 1){
                    div.classList.add('red');
                };

                if ((val.kills/val.deaths) > 1){
                    div.classList.add('green');
                };

                if ((val.kills/val.deaths) === 1){
                    div.classList.add('grey');
                };
                
                if (i === totalSetArray[0].games.singleGameArray.length - 1){
                    let totalKillDiv = document.createElement('div');
                    let totalDeathDiv = document.createElement('div');
                    let totalRatioDiv = document.createElement('div');

                    totalKillDiv.textContent = 'K: ' + totalSetArray[0].totalKills;
                    totalDeathDiv.textContent = 'D: ' + totalSetArray[0].totalDeaths;
                    totalRatioDiv.textContent = '%: ' + (totalSetArray[0].totalKills/totalSetArray[0].totalDeaths).toFixed(2);
            
                    setTotalsEl.appendChild(totalKillDiv);
                    setTotalsEl.appendChild(totalDeathDiv);
                    setTotalsEl.appendChild(totalRatioDiv);

                }

                secondEl.appendChild(div);
                secondEl.appendChild(setTotalsEl);
            }
        } else {
            killsLeftEl.textContent = killsLeft;
            currKillTotal.textContent = 'K: ' + (100 - killsLeft);
            currdeathTotal.textContent = 'D: ' + totalDeaths;
            currRatioTotal.textContent = '%: ' + ((killsLeft * -1 + 100)/totalDeaths).toFixed(2);
            inGameTotalsEl.appendChild(currKillTotal);
            inGameTotalsEl.appendChild(currdeathTotal);
            inGameTotalsEl.appendChild(currRatioTotal);
            for ( let i = 0; i < singleGameArray.length; i++){
                if (i === singleGameArray.length - 1) {
                    const singleArchiveRow = document.createElement('div');
                    singleArchiveRow.setAttribute('id', `${i + 1}`);
                    singleArchiveRow.classList.add('singleArchiveRow');
                    const gameNumArch = document.createElement('div');
                    const kDivArch = document.createElement('div');
                    const dDivArch = document.createElement('div');
                    const rDivArch = document.createElement('div');
                    const mDivArch = document.createElement('div');

                    gameNumArch.textContent = `${i + 1}.`;
                    kDivArch.textContent = singleGameArray[i].kills;
                    dDivArch.textContent = singleGameArray[i].deaths;
                    rDivArch.textContent = (singleGameArray[i].kills/singleGameArray[i].deaths).toFixed(2);
                    mDivArch.textContent = singleGameArray[i].map;

                    singleArchiveRow.appendChild(gameNumArch);
                    singleArchiveRow.appendChild(kDivArch);
                    singleArchiveRow.appendChild(dDivArch);
                    singleArchiveRow.appendChild(rDivArch);
                    singleArchiveRow.appendChild(mDivArch);

                    singleArchiveRow.addEventListener('click', ()=> {
                        // Pop up modal 
                        // two inputs
                        // Confirm change / cancel
                        console.log(`${singleGameArray[i]}`);
                    })
                    gameArchiveEl.appendChild(singleArchiveRow);
                }
                
                
            }
            killInput.value = '';
            deathInput.value = '';
            killInput.focus();
        }
})






