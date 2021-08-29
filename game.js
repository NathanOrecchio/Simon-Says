var buttonColours = ['blue', 'green', 'red', 'yellow']
var gamePattern = []
var userClickedPattern = []
var started = false
var level = 0


$('.btn').click(function () {
    userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)
    console.log(userClickedPattern)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length - 1)

})

function nextSequence () {
    level ++;
    $('#level-title').text("Level " + level)
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour)

}

function playSound(name) {
    var audio = new Audio ('sounds/' + name + '.mp3')
    audio.play()
}

function animatePress (currentColour) {
    var activeButton = $("." + currentColour)
    activeButton.addClass("pressed")

    setTimeout( function () {
        activeButton.removeClass('pressed')
        
    }, 100)
}


$(document).keydown(function (){
    if(!started) {
        console.log('called once and never again!'); 
        nextSequence()
        $('h1').text("Level " + level)
        started = true
    }

})

function checkAnswer (currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("sucess")
        if( userClickedPattern.length === gamePattern.length) {
            setTimeout(
                function () {
                    nextSequence()
                }, 1000)
            
                userClickedPattern = []
            }
            
        }

            else {
        console.log('wrong')
        gameOver()
        startOver()
    }
    
}

function gameOver () {
    var wrong = new Audio ('sounds/wrong.mp3')
    wrong.play()
    var activeButton = $("body")
    activeButton.addClass("game-over")

    setTimeout( function () {
        activeButton.removeClass('game-over')
        
    }, 200)
    $("#level-title").text("Game Over. Press any key to restart.")
}

function startOver () {
    started = false
    level = 0
    gamePattern = []
    userClickedPattern = []
}