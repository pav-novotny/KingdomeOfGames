//script for initializing and playing geese game

// coordinates generated with board_mapping.js
// board_mapping.js is a one time script, which was used to get coordinates relative to container for each tile with mouse clicks.
coordinates = [{"1":{"top_left":[5.69233064756789,86.625],"bottom_right":[15.050731125037304,96.5]}},{"2":{"top_left":[15.14622500746046,86.75],"bottom_right":[24.122649955237243,96.5]}},{"3":{"top_left":[24.695613249776187,86.625],"bottom_right":[33.194568785437184,96.5]}},{"4":{"top_left":[33.576544315129816,86.5],"bottom_right":[42.45747538048344,96.5]}},{"5":{"top_left":[42.934944792599225,86.75],"bottom_right":[51.52939421068338,96.25]}},{"6":{"top_left":[51.91136974037601,86.5],"bottom_right":[60.60131304088332,96.375]}},{"7":{"top_left":[61.0787824529991,86.75],"bottom_right":[69.67323187108326,96.5]}},{"8":{"top_left":[70.05520740077588,86.75],"bottom_right":[78.7451507012832,96.125]}},{"9":{"top_left":[78.84064458370635,86.5],"bottom_right":[88.86750223813787,95.75]}},{"10":{"top_left":[86.48015517755894,79.25],"bottom_right":[95.17009847806625,89.875]}},{"11":{"top_left":[86.67114294240525,71.125],"bottom_right":[96.12503730229783,80.875]}},{"12":{"top_left":[86.67114294240525,62.5],"bottom_right":[96.69800059683676,71]}},{"13":{"top_left":[86.48015517755894,53],"bottom_right":[96.79349447925992,62.125]}},{"14":{"top_left":[82.46941211578633,45.875],"bottom_right":[92.87824529991047,56.25]}},{"15":{"top_left":[63.848105043270664,45.375],"bottom_right":[71.58310951954641,55.50000000000001]}},{"16":{"top_left":[54.20322291853178,45.75],"bottom_right":[63.561623396001195,55.25]}},{"17":{"top_left":[44.08087138167711,48.5],"bottom_right":[54.298716800954935,57.49999999999999]}},{"18":{"top_left":[40.26111608475082,56.25],"bottom_right":[49.428528797373914,63.87500000000001]}},{"19":{"top_left":[39.401671142942405,66.75],"bottom_right":[50.096985974336015,73.125]}},{"20":{"top_left":[44.55296926290659,72.75],"bottom_right":[54.484333034914954,80.375]}},{"21":{"top_left":[56.11310056699492,75],"bottom_right":[64.99403163234855,85]}},{"22":{"top_left":[63.657117278424344,75.25],"bottom_right":[73.49298716800955,84]}},{"23":{"top_left":[70.9146523425843,70.75],"bottom_right":[79.31811399582215,81.25]}},{"24":{"top_left":[72.06057893166219,62.625],"bottom_right":[81.51447329155475,71.75]}},{"25":{"top_left":[72.15607281408535,53.5],"bottom_right":[82.18293046851686,62.125]}},{"26":{"top_left":[72.15607281408535,44.375],"bottom_right":[82.18293046851686,53.125]}},{"27":{"top_left":[73.68397493285586,33.875],"bottom_right":[82.5649059982095,43.5]}},{"28":{"top_left":[79.60459564309161,29.5],"bottom_right":[90.68188600417785,40.25]}},{"29":{"top_left":[87.05311847209788,24.625],"bottom_right":[96.31602506714414,33.75]}},{"30":{"top_left":[86.95762458967472,16.125],"bottom_right":[97.46195165622203,24.375]}},{"31":{"top_left":[83.42435094001792,5.375],"bottom_right":[93.16472694717994,15.5]}},{"32":{"top_left":[74.44792599224112,4],"bottom_right":[81.99194270367055,14.374999999999998]}},{"33":{"top_left":[64.70754998507908,4.5],"bottom_right":[74.06595046254849,14.249999999999998]}},{"34":{"top_left":[56.495076096687555,7.75],"bottom_right":[65.7579826917338,17]}},{"35":{"top_left":[54.96717397791704,17.125],"bottom_right":[65.66248880931064,26.125]}},{"36":{"top_left":[55.25365562518652,27],"bottom_right":[64.99403163234855,34.75]}},{"37":{"top_left":[50.765443151298115,34],"bottom_right":[60.50581915846016,42.625]}},{"38":{"top_left":[42.266487615637125,36.75],"bottom_right":[51.91136974037601,43.625]}},{"39":{"top_left":[33.576544315129816,40],"bottom_right":[43.79438973440764,50.74999999999999]}},{"40":{"top_left":[28.80185019397195,47.875],"bottom_right":[38.542226201133985,57.875]}},{"41":{"top_left":[27.655923604894063,56.99999999999999],"bottom_right":[37.396299612056104,66.875]}},{"42":{"top_left":[27.178454192778272,66.625],"bottom_right":[36.15487914055506,76]}},{"43":{"top_left":[22.40376007162041,74.875],"bottom_right":[33.863025962399284,82.875]}},{"44":{"top_left":[15.528200537153088,74.375],"bottom_right":[22.976723366159355,84.5]}},{"45":{"top_left":[4.068934646374216,71.875],"bottom_right":[14.859743360190988,80.125]}},{"46":{"top_left":[3.591465234258431,62.125],"bottom_right":[13.809310653536258,69.75]}},{"47":{"top_left":[3.591465234258431,53],"bottom_right":[13.809310653536258,61.625]}},{"48":{"top_left":[3.209489704565801,43.625],"bottom_right":[13.522829006266788,52.25]}},{"49":{"top_left":[3.209489704565801,34.25],"bottom_right":[13.618322888689944,43]}},{"50":{"top_left":[3.0185019397194868,25.374999999999996],"bottom_right":[13.618322888689944,33.5]}},{"51":{"top_left":[5.501342882721576,13.875000000000002],"bottom_right":[13.045359594150998,24.75]}},{"52":{"top_left":[7.984183825723664,7.625],"bottom_right":[18.67949865711728,17.375]}},{"53":{"top_left":[18.01104148015518,4.625],"bottom_right":[26.41450313339302,14.249999999999998]}},{"54":{"top_left":[26.891972545508803,3.875],"bottom_right":[35.48642196359296,14.124999999999998]}},{"55":{"top_left":[36.63234855267085,3.875],"bottom_right":[45.799761265293945,14.625]}},{"56":{"top_left":[44.36735302894658,12.375],"bottom_right":[52.77081468218442,19.625]}},{"57":{"top_left":[42.266487615637125,21],"bottom_right":[52.3888391524918,28.125]}},{"58":{"top_left":[34.340495374515065,26.375],"bottom_right":[46.086242912563414,34.5]}},{"59":{"top_left":[26.41450313339302,27.875],"bottom_right":[37.68278125932557,38]}},{"60":{"top_left":[19.347955834079382,37.25],"bottom_right":[29.85228290062668,47.625]}}]

data = JSON.parse(sessionStorage.getItem("data"))


document.addEventListener("DOMContentLoaded", function(){

    // gives function to a restart button
    let restart = document.getElementById("restart")

    restart.onclick = function(){location.reload()}

    let descriptionTiles = document.querySelectorAll("#specialTilesDescription > span")

    //labels a player's die
    playersDieText = document.createTextNode(data["playerName"] + "'s Die")
    playersDieTextTarget = document.getElementById("wrap_player_roll")
    playersDieTextTarget.append(playersDieText)
    
    let board = document.getElementById("gameboard")
    
    // initializes the board
    for(i = 1; i <= coordinates.length; i++){
        let span = document.createElement("span")
        span.setAttribute("position", i)

        const left = coordinates[i-1][`${i}`]["top_left"][0]
        const top = coordinates[i-1][`${i}`]["top_left"][1]
        const right = coordinates[i-1][`${i}`]["bottom_right"][0]
        const bottom = coordinates[i-1][`${i}`]["bottom_right"][1]

        const width = right - left
        const height = bottom - top
        
        span.style.left = left + "%"
        span.style.top = top + "%"
        span.style.width = width + "%"
        span.style.height = height + "%"
        board.append(span)
    }


    let roll = document.getElementById("player_roll")
    let dropzone = document.getElementById("dropzone")
    
    // instanciate 2 objects, 1 player and 1 opponent and creates an array of objects
    player = new Geese(1, data["playerName"], data["playerDie"], data["playerColor"])
    opponent = new Geese(1, "Opponent", data["opponentDie"], data["opponentColor"])
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

        e.preventDefault()
        // disables clicking while moving is occuring
        roll.style.pointerEvents = "none"
        roll.style.opacity = 0.5

        // after a die is rolled, removes special tiles descriptions
        for(tile of descriptionTiles){
            tile.style.display = "none"
        }

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

