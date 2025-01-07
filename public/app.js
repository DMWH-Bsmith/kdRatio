// import { log } from "console";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";



const firebaseConfig = {
  apiKey: "AIzaSyC_4POpukuO7q2s866B_BAIkDXQH4MMMt0",
  authDomain: "bops-stats.firebaseapp.com",
  databaseURL: "https://bops-stats-default-rtdb.firebaseio.com",
  projectId: "bops-stats",
  storageBucket: "bops-stats.firebasestorage.app",
  messagingSenderId: "644014516522",
  appId: "1:644014516522:web:98144f508a3612e9029653",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dataRef = ref(database, 'data');


// function addData() {
//   const dataRef = ref(database, "data");
//   set(dataRef, { 
//     name: 'Brian',
//     kills: 0, 
//     deaths: 0, 
//     ratio: 0,
//     games: 0,
//     date: Date
// });
// }

const audioElement = document.getElementById('audioElement');
/////////////////////////////////////////////////////////////
// ELEMENTS ////////////////////////////////////////////////
const introEl = document.querySelector(".intro");
const firstEl = document.querySelector(".first");
const secondEl = document.querySelector(".second");
const killsLeftEl = document.querySelector(".killsLeft");
const inputRowEl = document.querySelector(".inputRow");
const gameArchiveEl = document.querySelector(".gameArchive");
const achievedSetEl = document.querySelector(".achievedSet");
const setTotalsEl = document.querySelector(".totals");
const inGameTotalsEl = document.querySelector(".inGameTotals");
const currKillTotal = document.querySelector(".currKillTotal");
const currdeathTotal = document.querySelector(".currDeathTotal");
const currRatioTotal = document.querySelector(".currRatioTotal");
////////////////////////////////////////////////////////////
// BUTTONS ////////////////////////////////////////////////
const leaderboardBtn = document.querySelector(".leaderboard");
const startBtn = document.querySelector(".startBtn");
const subSingleScoreBtn = document.createElement("button");
subSingleScoreBtn.textContent = "SUBMIT";
subSingleScoreBtn.classList.add("subSingleScoreBtn");
////////////////////////////////////////////////////////////
// VALUES /////////////////////////////////////////////////
let killsLeft = 100;
let totalKills = 0;
let totalDeaths = 0;
///////////////////////////////////////////////////////////
// ARRAYS ////////////////////////////////////////////////
const mapArray = [
  " ",
  "Babylon",
  "Derelict",
  "Gala",
  "Hideout",
  "Lowtown",
  "Nuketown",
  "Payback",
  "Pit",
  "Protocol",
  "Red card",
  "Rewind",
  "Scud",
  "Skyline",
  "Stakeout",
  "Subsonic",
  "Vault",
  "Vorkuta",
  "Warehead",
];

const singleGameArray = [];
const totalSetArray = [];
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
startBtn.addEventListener("click", () => {
  audioElement.play();
  introEl.classList.add("hide");
  firstEl.classList.remove("hide");
  killInput.focus();
});

killsLeftEl.textContent = killsLeft;
let mapDropdown = document.createElement("select");
//////////////////////////////////////////////////////////
// INPUT ROW ELEMENTS ---> .inputRowEl ///////////////////
let kTotal = document.createElement("div");
kTotal.classList.add("kTotal");

let kDiv = document.createElement("div");
kDiv.classList.add("kDiv");
kDiv.textContent = "Kills:";

let killInput = document.createElement("input");
killInput.type = "number";
killInput.classList.add("killInput");



let dTotal = document.createElement("div");
dTotal.classList.add("dTotal");

let dDiv = document.createElement("div");
dDiv.classList.add("dDiv");
dDiv.textContent = "Deaths:";

let deathInput = document.createElement("input");
deathInput.type = "number";
deathInput.setAttribute('maxlength', '2');
deathInput.classList.add("deathInput");
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
for (let i = 0; i <= mapArray.length - 1; i++) {
  const option = document.createElement("option");
  option.value = mapArray[i];
  option.textContent = mapArray[i];
  mapDropdown.appendChild(option);
}
// mapDropdown.textContent = '';
kTotal.appendChild(kDiv);
kTotal.appendChild(killInput);
dTotal.appendChild(dDiv);
dTotal.appendChild(deathInput);
inputRowEl.appendChild(kTotal);
inputRowEl.appendChild(dTotal);
firstEl.appendChild(mapDropdown);
firstEl.appendChild(inputRowEl);
firstEl.appendChild(gameArchiveEl);

const container = document.createElement("div");
container.classList.add("container");

const table = document.createElement("table");
table.classList.add("table-striped");

const tHead = document.createElement("thead");
tHead.classList.add("inGameArchHeaders");
const trEl = document.createElement("tr");

const thGameNum = document.createElement("th");
thGameNum.classList.add("col");
thGameNum.textContent = `#`;

const thKills = document.createElement("th");
thKills.classList.add("col");
thKills.textContent = "Kills";

const thDeaths = document.createElement("th");
thDeaths.classList.add("col");
thDeaths.textContent = "Deaths";

const thRatio = document.createElement("th");
thRatio.classList.add("col");
thRatio.textContent = "%";

const thMap = document.createElement("th");
thMap.classList.add("col");
thMap.textContent = "Map";

trEl.appendChild(thGameNum);
trEl.appendChild(thKills);
trEl.appendChild(thDeaths);
trEl.appendChild(thRatio);
trEl.appendChild(thMap);
tHead.appendChild(trEl);
table.appendChild(tHead);
container.appendChild(table);
container.appendChild(table);
gameArchiveEl.appendChild(container);

killInput.addEventListener("input", () => {
  if (killInput.value.length > 1) {
    deathInput.focus();
  }
});

killInput.addEventListener("keydown", (e) => {
  if ((event.key === "Enter" || event.keyCode === 13) && killInput.value) {
    deathInput.focus();
  }
});

deathInput.addEventListener("input", () => {
  if (deathInput.value.length > 1 && killInput.value && mapDropdown.value != ' ')  {
        console.log(killInput.value);

        totalDeaths += parseInt(deathInput.value, 10);
        totalKills += parseInt(killInput.value, 10);
        singleGameArray.push({
        kills: killInput.value,
        deaths: deathInput.value,
        map: mapDropdown.value,
        });
        if (killInput.value < killsLeft){
        let killNum = parseInt(killInput.value, 10);
        let index = 0;
        const interval = setInterval(() => { 
            if (index < killNum) { 
                index++; 
                killsLeft--;
                audioElement.play();
                killsLeftEl.textContent = killsLeft;
                console.log(killsLeft);

            } else { 
                clearInterval(interval);
                console.log('done?');
                console.log(killsLeft);
            } 
        }, 600);
        // console.log(killsLeft -=killInput.value); 
        mapDropdown.value = ' ';
        gameArchiveEl.classList.remove("hide");
        currKillTotal.textContent = "K: " + (100 - killsLeft);
        currdeathTotal.textContent = "D: " + totalDeaths;
        currRatioTotal.textContent =
            "%: " + ((killsLeft * -1 + 100) / totalDeaths).toFixed(2);
        inGameTotalsEl.appendChild(currKillTotal);
        inGameTotalsEl.appendChild(currdeathTotal);
        inGameTotalsEl.appendChild(currRatioTotal);
        for (let i = 0; i < singleGameArray.length; i++) {
            if (i === singleGameArray.length - 1) {
            const tBody = document.createElement("tbody");
            const trEl2 = document.createElement("tr");

            const thActGameNum = document.createElement("td");
            thActGameNum.classList.add("col");
            thActGameNum.textContent = `${i + 1}`;

            const thActKills = document.createElement("td");
            thActKills.classList.add("col");
            thActKills.textContent = singleGameArray[i].kills;

            const thActDeaths = document.createElement("td");
            thActDeaths.classList.add("col");
            thActDeaths.textContent = singleGameArray[i].deaths;

            const thActRatio = document.createElement("td");
            thActRatio.classList.add("col");
            thActRatio.textContent = (
                singleGameArray[i].kills / singleGameArray[i].deaths
            ).toFixed(2);

            const thActMap = document.createElement("td");
            thActMap.classList.add("col");
            thActMap.textContent = singleGameArray[i].map;

            trEl2.appendChild(thActGameNum);
            trEl2.appendChild(thActKills);
            trEl2.appendChild(thActDeaths);
            trEl2.appendChild(thActRatio);
            trEl2.appendChild(thActMap);

            tBody.appendChild(trEl2);

            if (
                (singleGameArray[i].kills / singleGameArray[i].deaths).toFixed(
                2
                ) < 1
            ) {
                tBody.classList.add("red");
            } else if (
                (singleGameArray[i].kills / singleGameArray[i].deaths).toFixed(
                2
                ) > 1
            ) {
                tBody.classList.add("green");
            } else if (
                (singleGameArray[i].kills / singleGameArray[i].deaths).toFixed(
                2
                ) == 1
            ) {
                tBody.classList.add("grey");
            }
            table.appendChild(tBody);
            container.appendChild(table);
            gameArchiveEl.appendChild(container);
            }
        }
        killInput.value = "";
        deathInput.value = "";
        killInput.focus();



        } else {
            firstEl.classList.add("hide");
            secondEl.classList.remove("hide");
            totalSetArray.push({
                totalKills: totalKills,
                totalDeaths: totalDeaths,
                games: { singleGameArray },
            });

            push(dataRef, totalSetArray)
                .then(() => {
                console.log("Array pushed successfully");
                })
                .catch((error) => {
                console.error("Error pushing array:", error);
                });

            leaderboardBtn.addEventListener("click", () => {
                get(ref)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                    let myObj = snapshot.val();
                    for (const key in myObj) {
                        if (myObj.hasOwnProperty(key)) {
                        const entry = myObj[key];
                        let x = 0;
                        entry.forEach((item) => {
                            x++;
                            // console.log(`Set ${x} Total Kills: ${item.totalKills}`);
                            // console.log(`Set ${x} Total Deaths: ${item.totalDeaths}`);

                            item.games.singleGameArray.forEach((game) => {
                            console.log(`${game}`);
                            });
                        });
                        }
                    }
                    } else {
                    console.log("No data available");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
            });

            for ( let i = 0; i < totalSetArray[0].games.singleGameArray.length; i++) {
                if (i === singleGameArray.length - 1) {
                const tBody = document.createElement("tbody");
                const trEl3 = document.createElement("tr");

                const thActGameNum = document.createElement("td");
                thActGameNum.classList.add("col");
                thActGameNum.textContent = `${i + 1}`;

                const thActKills = document.createElement("td");
                thActKills.classList.add("col");
                thActKills.textContent = singleGameArray[i].kills;

                const thActDeaths = document.createElement("td");
                thActDeaths.classList.add("col");
                thActDeaths.textContent = singleGameArray[i].deaths;

                const thActRatio = document.createElement("td");
                thActRatio.classList.add("col");
                thActRatio.textContent = (
                    singleGameArray[i].kills / singleGameArray[i].deaths
                ).toFixed(2);

                const thActMap = document.createElement("td");
                thActMap.classList.add("col");
                thActMap.textContent = singleGameArray[i].map;

                trEl3.appendChild(thActGameNum);
                trEl3.appendChild(thActKills);
                trEl3.appendChild(thActDeaths);
                trEl3.appendChild(thActRatio);
                trEl3.appendChild(thActMap);
                tBody.appendChild(trEl3);

                if (
                    (singleGameArray[i].kills / singleGameArray[i].deaths).toFixed(
                    2
                    ) < 1
                ) {
                    tBody.classList.add("red");
                } else if (
                    (singleGameArray[i].kills / singleGameArray[i].deaths).toFixed(
                    2
                    ) > 1
                ) {
                    tBody.classList.add("green");
                } else if (
                    (singleGameArray[i].kills / singleGameArray[i].deaths).toFixed(
                    2
                    ) == 1
                ) {
                    tBody.classList.add("grey");
                }

                table.appendChild(tBody);
                achievedSetEl.appendChild(table);

                if (i === totalSetArray[0].games.singleGameArray.length - 1) {
                    let totalKillDiv = document.createElement("div");
                    let totalDeathDiv = document.createElement("div");
                    let totalRatioDiv = document.createElement("div");
                    totalKillDiv.textContent =
                    "KILLS: " + totalSetArray[0].totalKills;
                    totalDeathDiv.textContent =
                    "DEATHS: " + totalSetArray[0].totalDeaths;
                    totalRatioDiv.textContent =
                    "%: " +
                    (
                        totalSetArray[0].totalKills / totalSetArray[0].totalDeaths
                    ).toFixed(2);
                    setTotalsEl.appendChild(totalKillDiv);
                    setTotalsEl.appendChild(totalDeathDiv);
                    setTotalsEl.appendChild(totalRatioDiv);
                    secondEl.appendChild(setTotalsEl);
                }
                }
                secondEl.appendChild(setTotalsEl);
            }

        }  
    }
});

deathInput.addEventListener("keydown", (e) => {
  if (event.key === "Enter" || event.keyCode === 13) {
    if (killInput.value && deathInput.value && mapDropdown.value != mapDropdown[0].value) {
      totalDeaths += parseInt(deathInput.value, 10);
      totalKills += parseInt(killInput.value, 10);
      singleGameArray.push({
        kills: killInput.value,
        deaths: deathInput.value,
        map: mapDropdown.value,
      });

      if (killsLeft <= 0) {
        firstEl.classList.add("hide");
        secondEl.classList.remove("hide");
        totalSetArray.push({
          totalKills: totalKills,
          totalDeaths: totalDeaths,
          games: { singleGameArray },
        });
        for (
          let i = 0;
          i < totalSetArray[0].games.singleGameArray.length;
          i++
        ) {
          if (i === singleGameArray.length - 1) {
            // const tableArch = document.createElement('table');
            const tBody = document.createElement("tbody");
            const trEl3 = document.createElement("tr");

            const thActGameNum = document.createElement("td");
            thActGameNum.classList.add("col");
            thActGameNum.textContent = `${i + 1}`;

            const thActKills = document.createElement("td");
            thActKills.classList.add("col");
            thActKills.textContent = singleGameArray[i].kills;

            const thActDeaths = document.createElement("td");
            thActDeaths.classList.add("col");
            thActDeaths.textContent = singleGameArray[i].deaths;

            const thActRatio = document.createElement("td");
            thActRatio.classList.add("col");
            thActRatio.textContent = (
              singleGameArray[i].kills / singleGameArray[i].deaths
            ).toFixed(2);

            const thActMap = document.createElement("td");
            thActMap.classList.add("col");
            thActMap.textContent = singleGameArray[i].map;

            trEl3.appendChild(thActGameNum);
            trEl3.appendChild(thActKills);
            trEl3.appendChild(thActDeaths);
            trEl3.appendChild(thActRatio);
            trEl3.appendChild(thActMap);
            tBody.appendChild(trEl3);

            if (
              (singleGameArray[i].kills / singleGameArray[i].deaths).toFixed(
                2
              ) < 1
            ) {
              tBody.classList.add("red");
            } else if (
              (singleGameArray[i].kills / singleGameArray[i].deaths).toFixed(
                2
              ) > 1
            ) {
              tBody.classList.add("green");
            } else if (
              (singleGameArray[i].kills / singleGameArray[i].deaths).toFixed(
                2
              ) == 1
            ) {
              tBody.classList.add("grey");
            }

            table.appendChild(tBody);
            achievedSetEl.appendChild(table);

            if (i === totalSetArray[0].games.singleGameArray.length - 1) {
              let totalKillDiv = document.createElement("div");
              let totalDeathDiv = document.createElement("div");
              let totalRatioDiv = document.createElement("div");
              totalKillDiv.textContent =
                "KILLS: " + totalSetArray[0].totalKills;
              totalDeathDiv.textContent =
                "DEATHS: " + totalSetArray[0].totalDeaths;
              totalRatioDiv.textContent =
                "%: " +
                (
                  totalSetArray[0].totalKills / totalSetArray[0].totalDeaths
                ).toFixed(2);
              setTotalsEl.appendChild(totalKillDiv);
              setTotalsEl.appendChild(totalDeathDiv);
              setTotalsEl.appendChild(totalRatioDiv);
              secondEl.appendChild(setTotalsEl);
            }
          }

          secondEl.appendChild(setTotalsEl);
        }
      } else {
        let killNum = parseInt(killInput.value, 10);
        let index = 0;
        const interval = setInterval(() => { 
            if (index < killNum) { 
                index++; 
                killsLeft--;
                audioElement.play();
                killsLeftEl.textContent = killsLeft;
            } else { 
                clearInterval(interval); // Stop the interval when the loop is done 
            } 
        }, 600);
        mapDropdown.value = ' ';
        gameArchiveEl.classList.remove("hide");
        console.log(singleGameArray);
        killsLeftEl.textContent = killsLeft;
        currKillTotal.textContent = "K: " + (100 - killsLeft);
        currdeathTotal.textContent = "D: " + totalDeaths;
        currRatioTotal.textContent =
          "%: " + ((killsLeft * -1 + 100) / totalDeaths).toFixed(2);
        inGameTotalsEl.appendChild(currKillTotal);
        inGameTotalsEl.appendChild(currdeathTotal);
        inGameTotalsEl.appendChild(currRatioTotal);
        for (let i = 0; i < singleGameArray.length; i++) {
          if (i === singleGameArray.length - 1) {
            const tBody = document.createElement("tbody");
            const trEl2 = document.createElement("tr");

            const thActGameNum = document.createElement("td");
            thActGameNum.classList.add("col");
            thActGameNum.textContent = `${i + 1}`;

            const thActKills = document.createElement("td");
            thActKills.classList.add("col");
            thActKills.textContent = singleGameArray[i].kills;

            const thActDeaths = document.createElement("td");
            thActDeaths.classList.add("col");
            thActDeaths.textContent = singleGameArray[i].deaths;

            const thActRatio = document.createElement("td");
            thActRatio.classList.add("col");
            thActRatio.textContent = (
              singleGameArray[i].kills / singleGameArray[i].deaths
            ).toFixed(2);

            const thActMap = document.createElement("td");
            thActMap.classList.add("col");
            thActMap.textContent = singleGameArray[i].map;

            trEl2.appendChild(thActGameNum);
            trEl2.appendChild(thActKills);
            trEl2.appendChild(thActDeaths);
            trEl2.appendChild(thActRatio);
            trEl2.appendChild(thActMap);

            tBody.appendChild(trEl2);

            if (
              (singleGameArray[i].kills / singleGameArray[i].deaths).toFixed(
                2
              ) < 1
            ) {
              tBody.classList.add("red");
            } else if (
              (singleGameArray[i].kills / singleGameArray[i].deaths).toFixed(
                2
              ) > 1
            ) {
              tBody.classList.add("green");
            } else if (
              (singleGameArray[i].kills / singleGameArray[i].deaths).toFixed(
                2
              ) == 1
            ) {
              tBody.classList.add("grey");
            }
            table.appendChild(tBody);
            container.appendChild(table);
            gameArchiveEl.appendChild(container);
          }
        }
        killInput.value = "";
        deathInput.value = "";
        killInput.focus();
      }
    }
  }
});

// subSingleScoreBtn.addEventListener("click", () => {
//   if (killInput.value != "" || deathInput.value != "") {
//     killsLeft -= killInput.value;
//     totalDeaths += parseInt(deathInput.value, 10);
//     totalKills += parseInt(killInput.value, 10);
//     singleGameArray.push({
//       kills: killInput.value,
//       deaths: deathInput.value,
//       map: mapDropdown.value,
//     });

//     if (killsLeft <= 0) {
//       firstEl.classList.add("hide");
//       secondEl.classList.remove("hide");
//       totalSetArray.push({
//         totalKills: totalKills,
//         totalDeaths: totalDeaths,
//         games: { singleGameArray },
//       });
//       for (let i = 0; i < totalSetArray[0].games.singleGameArray.length; i++) {
//         if (i === singleGameArray.length - 1) {
//           const tBody = document.createElement("tbody");
//           const trEl3 = document.createElement("tr");

//           const thActGameNum = document.createElement("td");
//           thActGameNum.classList.add("col");
//           thActGameNum.textContent = `${i + 1}`;

//           const thActKills = document.createElement("td");
//           thActKills.classList.add("col");
//           thActKills.textContent = singleGameArray[i].kills;

//           const thActDeaths = document.createElement("td");
//           thActDeaths.classList.add("col");
//           thActDeaths.textContent = singleGameArray[i].deaths;

//           const thActRatio = document.createElement("td");
//           thActRatio.classList.add("col");
//           thActRatio.textContent = (
//             singleGameArray[i].kills / singleGameArray[i].deaths
//           ).toFixed(2);

//           const thActMap = document.createElement("td");
//           thActMap.classList.add("col");
//           thActMap.textContent = singleGameArray[i].map;

//           trEl3.appendChild(thActGameNum);
//           trEl3.appendChild(thActKills);
//           trEl3.appendChild(thActDeaths);
//           trEl3.appendChild(thActRatio);
//           trEl3.appendChild(thActMap);
//           tBody.appendChild(trEl3);

//           if (
//             (singleGameArray[i].kills / singleGameArray[i].deaths).toFixed(2) <
//             1
//           ) {
//             tBody.classList.add("red");
//           } else if (
//             (singleGameArray[i].kills / singleGameArray[i].deaths).toFixed(2) >
//             1
//           ) {
//             tBody.classList.add("green");
//           } else if (
//             (singleGameArray[i].kills / singleGameArray[i].deaths).toFixed(2) ==
//             1
//           ) {
//             tBody.classList.add("grey");
//           }

//           table.appendChild(tBody);
//           achievedSetEl.appendChild(table);

//           if (i === totalSetArray[0].games.singleGameArray.length - 1) {
//             let totalKillDiv = document.createElement("div");
//             let totalDeathDiv = document.createElement("div");
//             let totalRatioDiv = document.createElement("div");
//             totalKillDiv.textContent = "KILLS: " + totalSetArray[0].totalKills;
//             totalDeathDiv.textContent =
//               "DEATHS: " + totalSetArray[0].totalDeaths;
//             totalRatioDiv.textContent =
//               "%: " +
//               (
//                 totalSetArray[0].totalKills / totalSetArray[0].totalDeaths
//               ).toFixed(2);
//             setTotalsEl.appendChild(totalKillDiv);
//             setTotalsEl.appendChild(totalDeathDiv);
//             setTotalsEl.appendChild(totalRatioDiv);
//             secondEl.appendChild(setTotalsEl);
//           }
//         }
//         secondEl.appendChild(setTotalsEl);
//       }
//     } else {
//       gameArchiveEl.classList.remove("hide");
//       killsLeftEl.textContent = killsLeft;
//       currKillTotal.textContent = "K: " + (100 - killsLeft);
//       currdeathTotal.textContent = "D: " + totalDeaths;
//       currRatioTotal.textContent =
//         "%: " + ((killsLeft * -1 + 100) / totalDeaths).toFixed(2);
//       inGameTotalsEl.appendChild(currKillTotal);
//       inGameTotalsEl.appendChild(currdeathTotal);
//       inGameTotalsEl.appendChild(currRatioTotal);
//       for (let i = 0; i < singleGameArray.length; i++) {
//         if (i === singleGameArray.length - 1) {
//           const tBody = document.createElement("tbody");
//           const trEl2 = document.createElement("tr");

//           const thActGameNum = document.createElement("td");
//           thActGameNum.classList.add("col");
//           thActGameNum.textContent = `${i + 1}`;

//           const thActKills = document.createElement("td");
//           thActKills.classList.add("col");
//           thActKills.textContent = singleGameArray[i].kills;

//           const thActDeaths = document.createElement("td");
//           thActDeaths.classList.add("col");
//           thActDeaths.textContent = singleGameArray[i].deaths;

//           const thActRatio = document.createElement("td");
//           thActRatio.classList.add("col");
//           thActRatio.textContent = (
//             singleGameArray[i].kills / singleGameArray[i].deaths
//           ).toFixed(2);

//           const thActMap = document.createElement("td");
//           thActMap.classList.add("col");
//           thActMap.textContent = singleGameArray[i].map;

//           trEl2.appendChild(thActGameNum);
//           trEl2.appendChild(thActKills);
//           trEl2.appendChild(thActDeaths);
//           trEl2.appendChild(thActRatio);
//           trEl2.appendChild(thActMap);

//           tBody.appendChild(trEl2);

//           if (
//             (singleGameArray[i].kills / singleGameArray[i].deaths).toFixed(2) <
//             1
//           ) {
//             tBody.classList.add("red");
//           } else if (
//             (singleGameArray[i].kills / singleGameArray[i].deaths).toFixed(2) >
//             1
//           ) {
//             tBody.classList.add("green");
//           } else if (
//             (singleGameArray[i].kills / singleGameArray[i].deaths).toFixed(2) ==
//             1
//           ) {
//             tBody.classList.add("grey");
//           }
//           console.log(
//             (singleGameArray[i].kills / singleGameArray[i].deaths).toFixed(2)
//           );
//           table.appendChild(tBody);
//           container.appendChild(table);
//           gameArchiveEl.appendChild(container);
//         }
//       }
//       killInput.value = "";
//       deathInput.value = "";
//       killInput.focus();
//     }
//   }
// });
