// this script contains logic of the games
// the class Game has common attributes of both games like dice rolling, creating pawns and setting them on 1st tile etc.
// then each subclass has it's own move() method to define specific game logic
class Game {
    // object with information about player and an opponent
    // position = position on board, name = player name, dieType = type of die which players play with (alters probabilities), color = pawn color
    constructor(position, name, dieType, color){
        this.position = position
        this.name = name
        this.dieType = dieType
        this.color = color
    }

    // variable to determine chosen speed of game (length of animations moving from tile to tile)
    static gameSpeed = JSON.parse(sessionStorage.getItem("data"))["gameSpeed"]

    // saving elements for dice animations
    static dice_wrappers = document.querySelectorAll("#actions > span")
    static dice_el = document.querySelectorAll("#actions > span > img")

     
    
    // list of intervals between each tile to tile movement
    static speeds = [500, 350, 200, 100, 50]
    // list of possible value for each die (goodLuck has higher values twice, badluck has lower values twice)
    static dice = {"normalDie": [1, 2, 3, 4, 5, 6], "goodLuckDie": [1, 2, 3, 4, 4, 5, 5, 6, 6], "badLuckDie":  [1, 1, 2, 2, 3, 3, 4, 5, 6]}

    // generic function seen in multiple sources on internet to delay code in async function
    static sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms))
    }
     
    // moves both players to tile number 1 with created pawn based on color chosen
    static startingPosition(players){
        let target_cell = document.querySelector("[position='1']")
        for(let player of players){
            let pawn = document.createElement("img")
            pawn.src = "images/" + player.color + ".png"
            pawn.style.display = "block"
            if(player.name === "Opponent"){
                pawn.id = "op_pawn"
            }
            else{
                pawn.id = "pl_pawn"
            }
            target_cell.append(pawn)
        }
    }

    

}

class Worms extends Game{
    // data about ladders and Game (start position : finish position)
    static specialTiles = {3:39, 6:28, 12:7, 24:38, 25:5, 33:14, 35:55, 42:58, 51:29, 52:71, 56:1, 62:43, 65:85, 67:32, 72:66, 73:94, 79:98, 82:64, 87:45, 91:69, 96:54}

    // main function of the class to move player on board
    async move(){
        
        // select a die based on player choice
        let die = Game.dice[this.dieType]
        // selects random element from die value list
        let roll = die[Math.floor(Math.random()* die.length)]
        // calculates target position based on roll
        let new_position = this.position + roll
        // select speed of animations from speed list
        let speed = Game.speeds[Game.gameSpeed - 1]

        // changes dice based on a value rolled
        if(this.name === "Opponent"){
            Game.dice_el[1].src = `images/die${roll}.png`
        }
        else{
            Game.dice_el[0].src = `images/die${roll}.png`
        }

        // makes sure the winner doesn't exceeds the board
        if(new_position > 100){
            return
        }

        // selects the pawn based on the player or opponent
        let pawn
        if(this.name === "Opponent"){
            pawn = document.getElementById("op_pawn")
        }
        else{
            pawn = document.getElementById("pl_pawn") 
        }
        // moves a player tile by tile until he reaches the goal
        for(let i = this.position; i <= new_position; i++){
                let new_target = document.querySelector(`[position='${i}']`)
                new_target.append(pawn)
                await Game.sleep(speed)
        }
        // saves the new position to object attribute
        this.position = new_position

        // if the player steps on a special tile (ladder or worm)
        if(this.position in Worms.specialTiles){
            // blinks couple of times to mark stepping on special tile
            for(i = 0; i < 4; i++){
                pawn.style.filter = "brightness(2)"
                await Game.sleep(200)
                pawn.style.filter = ""
                await Game.sleep(200)
            }
            let value = Worms.specialTiles[this.position]
            // if it's ladder, moves player up tile by tile with increased speed
            if(value > this.position){
                for(let i = this.position; i <= value; i++){
                        let new_target = document.querySelector(`[position='${i}']`)
                        new_target.append(pawn)
                        await Game.sleep(speed / 1.75) 
                }
            }
            // if it's worm, moves player down tile by tile with increased speed
            else{
                for(let i = this.position; i >= value; i--){
                    let new_target = document.querySelector(`[position='${i}']`)
                        new_target.append(pawn)
                        await Game.sleep(speed / 1.75) 
                }
            }
            // saves the new position to object attribute
            this.position = value
        }
        // blick couple of times to confirm end of the move
        for(i = 0; i < 2; i++){
            pawn.style.filter = "brightness(2)"
            await Game.sleep(100)
            pawn.style.filter = ""
            await Game.sleep(100)
        }

        // displays a message for a winner and reloads the page
        if(this.position === 100){
            if(this.name === "Opponent"){
                window.alert(`Oh no you lost, try next time!`)
            }
            else{
                window.alert(`Congratulation ${this.name}, You Win!!!!!!`)
            }
            let roll = document.getElementById("player_roll")
            roll.style.pointerEvents = "none"
            roll.style.opacity = 0.5
            location.reload()
            return
            
        }
        

    }

}

class Geese extends Game{
    constructor(position, name, dieType, color){
        super(position, name, dieType, color) 
        // extra attributes for controlling staying rounds or when player needs to roll 6 to continue
        this.stay_turn = 0
        this.roll_6 = false
    }
    // data about special tiles (start position : finish position/status gained)
    static specialTiles = {5:8, 9:"roll_6", 13:16, 15:"stay_1", 18:"roll_twice", 24:"stay_1", 30:34, 33:38, 36:"stay_2", 40:"stay_1", 45:50, 49:"roll_twice", 52:43, 57:"stay_2"}

    // main function of the class to move player on board
    async move(){

        // if player has to stay some turns, decrease the turns by 1 and cancels the roll
        if(this.stay_turn > 0){
            this.stay_turn -= 1
            return
        }
        while(true){

            // select a die based on player choice
        let die = Game.dice[this.dieType]
        // selects random element from die value list
        let roll = die[Math.floor(Math.random()* die.length)]
        // calculates target position based on roll
        let new_position = this.position + roll
        // select speed of animations from speed list
        let speed = Game.speeds[Game.gameSpeed - 1]

        // changes dice based on a value rolled
        if(this.name === "Opponent"){
            Game.dice_el[1].src = `images/die${roll}.png`
        }
        else{
            Game.dice_el[0].src = `images/die${roll}.png`
        }

        // if player has roll_6 attribute, roll is canceled unless he rolls 6
        if(this.roll_6){
            if(roll === 6){
                this.roll_6 = false
                await Game.sleep(200)
                continue
            }
            else{
                return
            }
        }
      

        // selects the pawn based on the player or opponent
        let pawn
        if(this.name === "Opponent"){
            pawn = document.getElementById("op_pawn")
        }
        else{
            pawn = document.getElementById("pl_pawn") 
        }

        // player returns back if his new target position is higher than goal tile
        if(new_position > 60){
            for(let i = this.position; i <= 60; i++){
                let new_target = document.querySelector(`[position='${i}']`)
                new_target.append(pawn)
                await Game.sleep(speed)
            }
            new_position = 60 - (new_position-60)
        }
        // moves a player tile by tile until he reaches the goal
        if(this.position < new_position){
            for(let i = this.position; i <= new_position; i++){
                let new_target = document.querySelector(`[position='${i}']`)
                new_target.append(pawn)
                await Game.sleep(speed)
        }}
        else{
            for(let i = this.position; i >= new_position; i--){
                let new_target = document.querySelector(`[position='${i}']`)
                new_target.append(pawn)
                await Game.sleep(speed)
        }
        }
       
        // saves the new position to object attribute
        this.position = new_position

        // if the player steps on a special tile (ladder or worm)
        if(this.position in Geese.specialTiles){

            // reveals the explanation of the special tile (by setting display block, in css set to "none")
            // sets background color corresponding player's chosen colors (for green and blue increased brightness for readability)
            let tileExplain = document.getElementById(`special_tile_${this.position}`)
            tileExplain.style.display = "block"
            if(this.color === "red" || this.color === "yellow"){
                tileExplain.style.backgroundColor = this.color
            }
            else if (this.color === "green"){
                tileExplain.style.backgroundColor = "rgb(20, 220, 20)"
            }
            else if (this.color === "blue"){
                tileExplain.style.backgroundColor = "rgb(4, 141, 253)"
            }
            
            // blinks couple of times to mark stepping on special tile
            for(i = 0; i < 4; i++){
                pawn.style.filter = "brightness(2)"
                await Game.sleep(200)
                pawn.style.filter = ""
                await Game.sleep(200)
            }
            let value = Geese.specialTiles[this.position]

            // if special tiles moves player to a different tile, moves him to a file
            if(Number.isInteger(value)){
                if(value > this.position){
                    for(let i = this.position; i <= value; i++){
                            let new_target = document.querySelector(`[position='${i}']`)
                            new_target.append(pawn)
                            await Game.sleep(speed / 1.75) 
                    }
                }
                // if it's worm, moves player down tile by tile with increased speed
                else{
                    for(let i = this.position; i >= value; i--){
                        let new_target = document.querySelector(`[position='${i}']`)
                            new_target.append(pawn)
                            await Game.sleep(speed / 1.75) 
                    }
                }
                this.position = value
            }
            // gives player roll_6 status
            else if(value === "roll_6"){
                this.roll_6 = true
            }
            // makes player roll again to step further
            else if(value === "roll_twice"){
                continue
            }
            // sets player to stay 2 rounds
            else if(value === "stay_2"){
                this.stay_turn = 2
            }
            // sets player to stay 1 round
            else if(value === "stay_1"){
                this.stay_turn = 1
            }
            // saves the new position to object attribute

        }
        // blick couple of times to confirm end of the move
        for(i = 0; i < 2; i++){
            pawn.style.filter = "brightness(2)"
            await Game.sleep(100)
            pawn.style.filter = ""
            await Game.sleep(100)
        }


        // displays a message for a winner and reloads the page
        if(this.position === 60){
            if(this.name === "Opponent"){
                window.alert(`Oh no you lost, try next time!`)
            }
            else{
                window.alert(`Congratulation ${this.name}, You Win!!!!!!`)
            }
            let roll = document.getElementById("player_roll")
            roll.style.pointerEvents = "none"
            roll.style.opacity = 0.5
            location.reload()
            return
            
        }
        break

        }
        

    }

}



