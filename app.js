// ELEMENTS //////////////////////////////////////////////// 
const introEl = document.querySelector('.intro'); 
const firstEl = document.querySelector('.first');
const secondEl = document.querySelector('.second');
const killsLeftEl = document.querySelector('.killsLeft');
const inputRowEl = document.querySelector('.inputRow');
const gameArchiveEl = document.querySelector('.gameArchive');
const achievedSetEl = document.querySelector('.achievedSet');
const setTotalsEl = document.querySelector('.totals');
//////////////////////////////////////////////////////////// 
// BUTTONS //////////////////////////////////////////////// 
const startBtn = document.querySelector('.startBtn');
const subSingleScoreBtn = document.createElement('button');
subSingleScoreBtn.textContent = 'submit';
subSingleScoreBtn.classList.add('.subSingleScoreBtn');

//////////////////////////////////////////////////////////// 
// VALUES /////////////////////////////////////////////////
let killsLeft = 100;
///////////////////////////////////////////////////////////
// ARRAYS ////////////////////////////////////////////////
mapArray = ['Babylon', 'Derelict', 'Gala', 'Lowtown', 
    'Payback', 'Pit', 'Protocol', 'Red card', 'Rewind', 
    'Scud', 'Skyline', 'Stakeout', 'Subsonic', 'Vault', 
    'Vorkuta', 'Warehead'];

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
let killInput = document.createElement('input');
killInput.classList.add('killInput');
let hyph = document.createElement('h3');
hyph.textContent = ' - ';
let deathInput = document.createElement('input');
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

inputRowEl.appendChild(killInput);
inputRowEl.appendChild(hyph);
inputRowEl.appendChild(deathInput);
firstEl.appendChild(mapDropdown);
firstEl.appendChild(inputRowEl);
firstEl.appendChild(subSingleScoreBtn);

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
        killsLeftEl.textContent = killsLeft;
        console.log(mapDropdown.value);
        singleGameArray.push({ 
        kills: killInput.value, 
        deaths: deathInput.value,
        map: mapDropdown.value
        });

        if (killsLeft <= 0) {
            firstEl.classList.add('hide');
            secondEl.classList.remove('hide');
            let totalKills = killsLeft * -1 + 100;
            console.log(totalSetArray);
            let totalDeaths = 0;

            for (let i = 0; i < totalSetArray.games; i++) {
                let games = totalSetArray.games[i];
                console.log(games);
                
            
            }
            // let totalDeaths = 

            // let totalDeaths = 
            totalSetArray.push({ 
                totalKills: totalKills,
                totalDeaths: deathInput.value,
                games: {singleGameArray}
            })
            for ( let i = 0; i < totalSetArray[0].games.singleGameArray.length; i++){
                let div = document.createElement('div');
                div.classList.add('archiveDiv');
                let val = totalSetArray[0].games.singleGameArray[i];
                let ratio = (val.kills/val.deaths);
                let totalRatio = (totalSetArray[0].totalKills/totalSetArray[0].totalDeaths).toFixed(2);

                console.log(val);
                div.textContent = `${val.kills}   |||   ${val.deaths}  || ${ratio.toFixed(2)}%  ||  ${val.map}`;
                

                secondEl.appendChild(div);
                setTotalsEl.textContent = `K: ${totalSetArray[0].totalKills} D: ${totalSetArray[0].totalDeaths} R: ${totalRatio}`;
            };

        } else {

            killInput.value = '';
            deathInput.value = '';
            killInput.focus();
        }
    
    }
})

deathInput.addEventListener('keydown', (e) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
            killsLeft -= killInput.value;
            killsLeftEl.textContent = killsLeft;
            singleGameArray.push({ 
                kills: killInput.value, 
                deaths: deathInput.value,
                map: mapDropdown.value
            })
            if (killsLeft <= 0) {
                firstEl.classList.add('hide');
                secondEl.classList.remove('hide');
                console.log(totalSetArray);
            } else {
                killInput.value = '';
                deathInput.value = '';
                killInput.focus();
            }
        }    
    }
);

    subSingleScoreBtn.addEventListener('click', () => {
        killsLeft -= killInput.value;
        killsLeftEl.textContent = killsLeft;
        singleGameArray.push({ 
            kills: killInput.value, 
            deaths: deathInput.value,
            map: mapDropdown.value

        });
        killInput.value = '';
        deathInput.value = '';
        killInput.focus();
})






