// one time script used for mapping tiles in Geese board.
// script creates a dictionary of coordinates for each tile
// 2 clicks are required for tile - top left corner and bottom right corner of the tile
// script gets relative positions of these corners, creates a dictionary and appends it to an array of coordinates
// script is set to get the output to console until all tiles are created (60 for geese) then I copied the coordinates from the console to worms_PNo555.js script
// this script is no embedded in any of the html files in final version
element = document.getElementById("gameboard")
counter = 1
x_first = null
y_first = null
firstClick = true
coordinates = []


element.addEventListener("mousedown", function(e){



    let target = e.target

    let boundaries = target.getBoundingClientRect()

    let x = e.clientX - boundaries.left;
    let y = e.clientY - boundaries.top;

    let percent_x = (x/boundaries.width) * 100
    let percent_y = (y/boundaries.height) * 100



    if(firstClick){
         x_first = percent_x
         y_first = percent_y
         firstClick = false
    }
    else{
        x_second = percent_x
        y_second = percent_y

        tile = {[counter]:{"top_left":[x_first, y_first], "bottom_right":[x_second, y_second]}}

        coordinates.push(tile)

        counter += 1

        firstClick = true
     
    }

    if(coordinates.length === 60){
        console.log(JSON.stringify(coordinates))
    }


})

