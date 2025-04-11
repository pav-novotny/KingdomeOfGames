
const form = document.getElementById("form")
const target = document.getElementById("formExplain")
const navigation = document.getElementById("navigation")

const playername = form.elements["playerName"]
const games = form.elements["game"]
const playerdie = form.elements["playerDie"]
const opponentdie = form.elements["opponentDie"]
const playercolor = form.elements["playerColor"]
const opponentcolor = form.elements["opponentColor"]
const gamespeed = form.elements["gameSpeed"]
const submit = form.elements["submit"]

// navigation bar is hidden on main pages since game shouldn't be started before submitting form
navigation.style.visibility = "hidden"
//------------------------------------------------------------------------------------
// explanation of die selection
function selectDie(element){

    const old_img = document.getElementById("dieImg")
    if(old_img){
        old_img.remove()
    }

    let value = element.value


    let img_die = document.createElement("img")
    img_die.id = "dieImg"
    img_die.height = 90
    img_die.width = 90
    img_die.style.display = "block"

    if(value === "normalDie"){
        target.innerText = "An ordinary balanced die, all numbers have the same chance."
        img_die.src = "images/balanced_die.png"
        target.after(img_die)
    }
    else if (value === "badLuckDie"){
        target.innerText = "This die brings nothing but trouble, lower numbers are more likely."
        img_die.src = "images/bad_luck_die.png"
        target.after(img_die)
    }
    else if (value === "goodLuckDie")
    {
        target.innerText = "A die used by the luckiest players, higher numbers are more likely. "
        img_die.src = "images/lucky_die.png"
        target.after(img_die)
    }

}
//-------------------------------------------------------------------------------
// explanation of color selection
function selectColor(element){

    const old_img = document.getElementById("colorImg")
    if(old_img){
        old_img.remove()
    }

    let value = element.value

    let person_message

    if(element.id === "playerColor"){
        person_message = "for Player:"
    }
    else if(element.id === "opponentColor"){
        person_message = "for Opponent:"
    }
    

    let img_color = document.createElement("img")
    img_color.id = "colorImg"
    img_color.height = 120
    img_color.width = 90
    img_color.style.display = "block"

    target.innerText = "Chosen Color " + person_message

    if(value === "blue"){
        target.innerText += " " + value
        img_color.src = "images/blue.png"
        target.after(img_color)
    }
    else if (value === "yellow"){
        target.innerText += " " + value
        img_color.src = "images/yellow.png"
        target.after(img_color)
    }
    else if (value === "green")
    {
        target.innerText += " " + value
        img_color.src = "images/green.png"
        target.after(img_color)
    }
    else if (value === "red")
    {
        target.innerText += " " + value
        img_color.src = "images/red.png"
        target.after(img_color)
    }

}
//-------------------------------------------------------------------------------
// form validation
function validateForm(form){
    let playerName = form.elements["playerName"]

    let playerColor = form.elements["playerColor"]
    let opponentColor = form.elements["opponentColor"]


    if(!playerName.value){
        playerName.setCustomValidity("You don't want to stay nameless, do you?")
        playerName.reportValidity()
        return false
    }
    else if(playerName.value === "Opponent"){
        playerName.setCustomValidity("This name is taken by Opponent, choose a different name")
        playerName.reportValidity()
        return false
    }
    else{
        playerName.setCustomValidity("")
    }

    if(playerColor.value === opponentColor.value){
        playerColor.setCustomValidity("Player's and opponent's color cannot be the same")
        playerColor.reportValidity()
        return false
    }
    else{
        playerColor.setCustomValidity("")
    }
    return true
}

//-------------------------------------------------------------------------------
// explanation of game speed selection
function selectSpeed(element){

    let value = Number(element.value)
    let min = Number(element.min)
    let max = Number(element.max)

    if(value > max){value = max}
    if(value < min){value = min}

    element.value = value



    target.innerText = ""

    let speeds = ["Very Slow", "Slow", "Normal", "Fast", "Very Fast"]

    target.innerText = "Choose game speed (1 = very slow, 5 = very fast)" + "\n\n" + "Chosen speed: " + value + " = " + speeds[value-1]

    

}

//---------------------------------------------------------------------------------
// explanation of Player's name selection
playerName.addEventListener("focus", function(){
    target.innerText = "Assigns your Player's Name"
})
playerName.addEventListener("blur", function(){
    target.innerText = ""
})

//--------------------------------------------------------------------------------
// explanation of game selection
for(i=0; i<games.length;i++){
    games[i].addEventListener("change", function(){
        target.innerText = "Selects which game will start after submission" + "\n" + "Selected game: " + form.elements["game"].value
    })
    games[i].addEventListener("blur", function(){
        target.innerText = ""
    })
}

//--------------------------------------------------------------------
// fire events for die selection
playerdie.addEventListener("focus", function(){
    selectDie(this)
})

playerdie.addEventListener("blur", function(){
    target.innerText = ""
    const old_img = document.getElementById("dieImg")
    if(old_img){
        old_img.remove()
    }
})

playerdie.addEventListener("input", function(){
    selectDie(this)
})



opponentdie.addEventListener("focus", function(){
    selectDie(this)
})

opponentdie.addEventListener("blur", function(){
    target.innerText = ""
    const old_img = document.getElementById("dieImg")
    if(old_img){
        old_img.remove()
    }
})

opponentdie.addEventListener("input", function(){
    selectDie(this)
})

//----------------------------------------------------------------------
// fire events for color selection

playercolor.addEventListener("focus", function(){
    selectColor(this)
})

playercolor.addEventListener("blur", function(){
    target.innerText = ""
    const old_img = document.getElementById("colorImg")
    if(old_img){
        old_img.remove()
    }
})

playercolor.addEventListener("input", function(){
    selectColor(this)
})


opponentcolor.addEventListener("focus", function(){
    selectColor(this)
})

opponentcolor.addEventListener("blur", function(){
    target.innerText = ""
    const old_img = document.getElementById("colorImg")
    if(old_img){
        old_img.remove()
    }
})

opponentcolor.addEventListener("input", function(){
    selectColor(this)
})

//----------------------------------------------------------------------
// fire events for game speed selection

gamespeed.addEventListener("focus", function(){
    selectSpeed(this)
})

gamespeed.addEventListener("input", function(){
    selectSpeed(this)

})

gamespeed.addEventListener("blur", function(){
    if(!gamespeed.value){
        gamespeed.value = 3
        selectSpeed(this)
    }   
})

//---------------------------------------------------------------------
// after submission sends data to session storage (needed because the form redirects to a different page)
submit.addEventListener("click", function(e){
    if(validateForm(this.form)){

        navigation.style.visibility = "visible"

        formdata = new FormData(form)
        data = {}
        for(let[key, value] of formdata.entries()){
            data[key] = value
        }
        
        sessionStorage.setItem("data", JSON.stringify(data))

        if(data["game"] === "worms"){
            window.location.href = "Page2_PNo555.html"
        }
        else if(data["game"] === "geese"){
            window.location.href = "Page3_PNo555.html"
        }
    }
})