const home = document.querySelector(".home")
const btn_play = document.querySelector(".play")

const chargement = document.querySelector(".chargement")

const game = document.querySelector(".game")
const return_home = document.querySelector(".return-home")
const retry = document.querySelectorAll(".retry")
const minutes = document.querySelector(".minutes")
const seconds = document.querySelector(".seconds")
const stats = document.querySelectorAll(".stat")
const cases = document.querySelectorAll(".case")
const allCases = document.querySelector(".cases")
const tour = document.querySelector(".tour")
const X = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_6_146)"><path d="M10.0559 46.2817L23.9999 32.337C28.6477 36.9832 33.2969 41.634 37.9455 46.2817C43.323 51.6592 51.6585 43.3207 46.2855 37.9417C41.6362 33.297 36.9854 28.6455 32.3414 23.9978C36.9876 19.3479 41.6356 14.6999 46.2855 10.0537C51.6585 4.67775 43.3222 -3.6585 37.9455 1.71375C33.2977 6.363 28.6484 11.013 24.0007 15.6593L10.0567 1.71375C4.6792 -3.66225 -3.65855 4.677 1.7167 10.0537C6.36595 14.703 11.0137 19.3508 15.6644 23.9993C11.0144 28.6485 6.3667 33.2978 1.7167 37.9463C-3.6593 43.3208 4.67845 51.6592 10.0567 46.2787" fill="#009DDC"/></g><defs><clipPath id="clip0_6_146"><rect width="48" height="48" fill="white" transform="translate(48 48) rotate(-180)"/></clipPath></defs></svg>`
const O = `<svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_6_168)"><path d="M26 5.41666C14.6322 5.41666 5.4167 14.6321 5.4167 26C5.4167 37.3679 14.6322 46.5833 26 46.5833C37.3679 46.5833 46.5834 37.3679 46.5834 26C46.5834 14.6321 37.3679 5.41666 26 5.41666Z" stroke="#E7BC00" stroke-width="10"/></g><defs><clipPath id="clip0_6_168"><rect width="52" height="52" fill="white" transform="translate(52 52) rotate(-180)"/></clipPath></defs></svg>`

const end = document.querySelector(".end")
const winner = document.querySelector(".winner")
const mark_winner = document.querySelector(".mark-winner")
const text_winner = document.querySelector(".text-winner")
const time = document.querySelector(".time")

let gameSatut = true
let playerOn = "X"
let caseStatut = ["", "", "", "", "", "", "", "", ""]
const conditionsWon = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let gameStart = false

function homeActive(){
    home.style.display = "flex"
    game.style.display = "none"
    end.style.display = "none"

    // LANCER LA PARTIE
    btn_play.addEventListener("click", () => {
        gameSysteme(playerOn)
    })
}

homeActive()

// Chargement
function chargementGame(){
    chargement.style.display = "block"
}

// Chrono

let scd = 1
let min = 1

function chronometre(){
    // Chrono
    const minChrono = setInterval(() => {
        if(min.toString().length == 1){
            minutes.innerText = `0${min}`
        } else if(min.toString().length == 2 && min != 60){
            minutes.innerText = `${min}`
        } else if(min == 60){
            return
        }
        min++
    }, 60000)
    const scdChrono = setInterval(() => {
        if(scd.toString().length == 1){
            seconds.innerText = `0${scd}`
        } else if(scd.toString().length == 2 && scd != 60){
            seconds.innerText = `${scd}`
        } else if(scd == 60){
            scd = 0
            seconds.innerText = `00`
        }
        scd++
    }, 1000)
}



function gameSysteme(player){
    home.style.display = "none"
    // chargementGame()
    scd = 1
    min = 1

    chronometre()

    chargement.style.display = "none" 
    game.style.display = "flex" 
    
    cases.forEach((caseMark) => { 
        caseMark.classList.remove("win")
    })

    
    cases.forEach((caseMark, index) => {   
        caseMark.addEventListener("click", () => {
            if(caseStatut[index] != "" || !gameSatut){
                return
            }

            caseStatut[index] = player
            caseMark.innerHTML = `<img class="markOn" src="./images/${player}.svg">`

            if(player == "X"){
                tour.innerHTML = `O`
            }

            if(player == "O"){
                tour.innerHTML = `X`
            }

            verifGagne(player)
            player = player == "X" ? "O" : "X"
        })

        
    })
}

// VICTOIRES OU EGALITE
function verifGagne(player){
    let tourGagnant = false

    // On parcourt toutes les conditions de victoire
    for(let conditionWon of conditionsWon){
        // On récupère les 3 cases de la condition de victoire
        let val1 = caseStatut[conditionWon[0]]
        let val2 = caseStatut[conditionWon[1]]
        let val3 = caseStatut[conditionWon[2]]

        // Si l'une des cases est vide
        if(val1 === "" || val2 === "" || val3 === ""){
            continue
        }

        // Si les 3 cases sont identiques
        if(val1 === val2 && val2 === val3){
            // On gagne
            tourGagnant = true
        
            cases[conditionWon[0]].classList.toggle("win")
            cases[conditionWon[1]].classList.toggle("win")
            cases[conditionWon[2]].classList.toggle("win")

            break
        }
    }

    // Si on a gagné
    if(tourGagnant){
        end.style.display = "block"

        winner.innerHTML = `<img src="./images/${player}.svg" alt="" class="mark-winner">
                                <p class="text-winner">A GAGNÉ !</p>`

        time.innerText = `Temps de la partie : `
        gameSatut = false
        return
    }

    // Si toutes les cases sont remplies
    if(!caseStatut.includes("")){
        end.style.display = "block"
        winner.innerHTML = `<p class="text-winner">ÉGALITÉ !</p>`
        time.innerText = `Temps de la partie : `

        gameSatut = false
        return
    }

}

function retryGame(){
    console.log("RETRY")
    gameSatut = true
    caseStatut = ["", "", "", "", "", "", "", "", ""]
    cases.forEach(caseMark => caseMark.innerHTML = "")
    playerOn = "X"

    gameSysteme(playerOn)
}


// RECOMMENCER
retry.forEach((btn) => {
    btn.addEventListener("click", () => {
        home.style.display = "none"
        game.style.display = "none"
        end.style.display = "none"

        retryGame()
        gameSysteme()
    })
})

// Retourner à l'accueil
return_home.addEventListener("click", homeActive)