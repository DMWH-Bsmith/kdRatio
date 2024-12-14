// ELEMENTS //////////////////////////////////////////////// 
const introEl = document.querySelector('.intro'); 
const firstEl = document.querySelector('.first');
const killsLeftEl = document.querySelector('.killsLeft');
//////////////////////////////////////////////////////////// 
// BUTTONS //////////////////////////////////////////////// 
const startBtn = document.querySelector('.startBtn');

//////////////////////////////////////////////////////////// 
// VALUES /////////////////////////////////////////////////
let killsLeft = 100;
///////////////////////////////////////////////////////////
// ARRAYS ////////////////////////////////////////////////
mapArray = ['Babylon', 'Derelict', 'Gala', 'Lowtown', 
    'Payback', 'Pit', 'Protocol', 'Red card', 'Rewind', 
    'Scud', 'Skyline', 'Stakeout', 'Subsonic', 'Vault', 
    'Vorkuta', 'Warehead']
//////////////////////////////////////////////////////////

killsLeftEl.textContent = killsLeft;



startBtn.addEventListener('click', () => {
    introEl.classList.add('hide');
    firstEl.classList.remove('hide');
})


let mapDropdown = document.createElement('select');


for (let i = 0; i <= mapArray.length -1; i++) { 
    const option = document.createElement('option'); 
    option.value = mapArray[i]; 
    option.textContent = mapArray[i]; 
    mapDropdown.appendChild(option); 
}

firstEl.appendChild(mapDropdown);




