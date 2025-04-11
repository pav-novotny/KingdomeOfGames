//script for initializing and playing worms game

// gets data from form saved in sessionStorage
data = JSON.parse(sessionStorage.getItem("data"))

//after the page loads
document.addEventListener("DOMContentLoaded", function(){

    restart = document.getElementById("restart")

    restart.onclick = function(){location.reload()}

    //labels a player's die
    playersDieText = document.createTextNode(data["playerName"] + "'s Die")
    playersDieTextTarget = document.getElementById("wrap_player_roll")
    playersDieTextTarget.append(playersDieText)

    //creates unique position for each tile of the game board
    let cells = document.querySelectorAll("#gameboard td")

    for(i = 0; i < cells.length/10; i++){
        if(i%2 === 0){
            for(j = i*10; j < i*10 + 10; j++){
                span = document.createElement("span")
                span.setAttribute("position", cells.length - j)
                cells[j].append(span)
            }
        }
        if(i%2 === 1){
            for(j = i*10; j < i*10 + 10; j++){
                span = document.createElement("span")
                span.setAttribute("position", cells.length + j - (i*10*2 + 10) + 1) 
                cells[j].append(span)
            }
        }
        
    }

    let roll = document.getElementById("player_roll")
    let dropzone = document.getElementById("dropzone")
    
    // instanciate 2 objects, 1 player and 1 opponent and creates an array of objects
    player = new Worms(1, data["playerName"], data["playerDie"], data["playerColor"])
    opponent = new Worms(1, "Opponent", data["opponentDie"], data["opponentColor"])
    players = [player, opponent]

    // sets both player's pawn on tile 1
    Game.startingPosition(players)


    roll.addEventListener("dragstart", function(e){
        dropzone.style.border = "none"
        dropzone.innerText = ""
    })

    dropzone.addEventListener("dragover", function(e){
        e.preventDefault()
    })

    
    // when die is clicked, make a move for a player and opponent
    dropzone.addEventListener("drop",async function(e){
        // disables clicking while moving is occuring
        e.preventDefault()
        roll.style.pointerEvents = "none"
        roll.style.opacity = 0.5

        for(player of players){
            // assings a class to a player or opponents based on whose move it is in order to start rolling animation created in css
            if(player.name === "Opponent"){
                Game.dice_wrappers[1].classList.toggle("moveup")
                Game.dice_el[1].classList.toggle("spin")
            }
            else{
                Game.dice_wrappers[0].classList.toggle("moveup")
                Game.dice_el[0].classList.toggle("spin")
            }
            // moves player on board based on rules, then waits
            await player.move()
            await Game.sleep(200)
        }

        // removes the animation class for both players
        for(i = 0; i < Game.dice_el.length; i++){
            Game.dice_wrappers[i].classList.toggle("moveup")
            Game.dice_el[i].classList.toggle("spin")
        }

        // enables die to be clicked again
        roll.style.pointerEvents = "auto"
        roll.style.opacity = 1
    })

})
