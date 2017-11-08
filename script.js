var curPlayer = "red"; // global state

var combos = [
  [1, 8, 15, 22],
  [2, 9, 16, 23],
  [3, 10, 17, 24],
  [4, 9, 14, 19],
  [5, 10, 15, 20],
  [6, 11, 16, 21],
  [7, 14, 21, 28],
  [8, 15, 22, 29],
  [9, 16, 23, 30],
  [10, 15, 20, 25],
  [11, 16, 21, 26],
  [12, 17, 22, 27],
  [13, 20, 27, 34],
  [14, 21, 28, 35],
  [15, 22, 29, 36],
  [16, 21, 26, 31],
  [17, 22, 27, 32],
  [18, 23, 28, 33],
  [19, 26, 33, 40],
  [20, 27, 34, 41],
  [21, 28, 35, 42],
  [22, 27, 32, 37],
  [23, 28, 33, 38],
  [24, 29, 34, 39]
];


(function() {

  $('.column').on('click', function(e) {

    // get all slots in column
    var slots = $(e.currentTarget).find('.slot');


    // find lowest one that no player has filled and add curPlayer’s class to that one
    for (var i = 5; i >= 0; i--) {
      if (!slots.eq(i).children().hasClass("red") && !slots.eq(i).children().hasClass("green")) {
        slots.eq(i).children().addClass(curPlayer);
        break;
      }
    }

    // Check for Victory in column
    if (checkSlots(slots)) {
      return gameOver();
    }

    // Check for Victory in row
    var slotsInRow = $(".row-" + i);

    if (checkSlots(slotsInRow)) {
      return gameOver();
    }


    // check for diagonal victory
    checkSlotsDiagonal()


    // change player after each turn
    if (curPlayer === "green") {
      curPlayer = "red";
      // need this to change color of the star for keyboard gameplay
      $(".player").removeClass("green");
      $(".player").addClass("red");

    } else {
      curPlayer = "green";
      $(".player").removeClass("red");
      $(".player").addClass("green");
    }
  });
})();



// Play with keyboard (left arrow, right arrow, return key)
(function() {
  var move = 0;

  $("body").on("keydown", function(e) {

    if (e.keyCode === 39) {
      move += 115;
      $(".outer").css({
        "margin-left": move + 'px'
      });
    }

    if (e.keyCode === 37) {
      move -= 115;
      $(".outer").css({
        "margin-left": move + 'px'
      });
    }

    if (e.keyCode === 13) {
      if (move == 0) {
        var slots = $(".column-0").find('.slot');
        checkClass(slots)

      }
      if (move == 115) {
        var slots = $(".column-1").find('.slot');
        checkClass(slots)
      }

      if (move == 230) {
        var slots = $(".column-2").find('.slot');
        checkClass(slots)
      }

      if (move == 345) {
        var slots = $(".column-3").find('.slot');
        checkClass(slots)
      }

      if (move == 460) {
        var slots = $(".column-4").find('.slot');
        checkClass(slots)
      }

      if (move == 575) {
        var slots = $(".column-5").find('.slot');
        checkClass(slots)

      }
      if (move == 690) {
        var slots = $(".column-6").find('.slot');
        checkClass(slots)
      }

      function checkClass() {
        for (var i = 5; i >= 0; i--) {
          if (!slots.eq(i).children().hasClass("red") && !slots.eq(i).children().hasClass("green")) {
            slots.eq(i).children().addClass(curPlayer);
            break;
          }
        }
      }

      // Check for Victory in column
      if (checkSlots(slots)) {
        return gameOver();
      }

      // Check for Victory in row
      for (var i = 5; i >= 0; i--) {
        var slotsInRow = $(".row-" + i);
        if (checkSlots(slotsInRow)) {
          return gameOver();
        }
      }

      // check for diagonal victory
      checkSlotsDiagonal()

      // change player after each turn
      if (curPlayer === "green") {
        curPlayer = "red";
        // need this to change color of the star for keyboard gameplay
        $(".player").removeClass("green");
        $(".player").addClass("red");

      } else {
        curPlayer = "green";
        $(".player").removeClass("red");
        $(".player").addClass("green");
      }
    }
  });
})();


// Victory checker rows & columns
function checkSlots(slots) {
  var str = "";
  for (var i = 0; i < slots.length; i++) {
    //check if each of slots children has the class curPlayer
    if (slots.eq(i).children().hasClass(curPlayer)) {
      str += "w"
    } else {
      str += "l"
    }
  }
  // as soon as the string contains 4 "w" in a row return true and trigger gameOver
  if (str.indexOf("wwww") > -1) {
    return true;
  }
}

// Victory checker diagonal
function checkSlotsDiagonal() {

  var slots = $('.slot')
  // for each loop on the collection of possible combinations to get each combo
  combos.forEach(function(combo) {
    var hasWon = true;
    for (var i = 0; i < 4; i++) {
      // check all 4 elements in each combo
      // -1 because the combos array starts at 1 while rows & columns start at 0
      if (!slots.eq(combo[i] - 1).children().hasClass(curPlayer)) {
        hasWon = false;
      }
    }
    // as soon as 4 items have the class curPlayer the player wins the game and the gameOver message will appear
    if (hasWon) {
      gameOver();
    }
  })
}

// Game over - reset game
function gameOver() {
  if (curPlayer == "green") {
    $(".winner").html("<p>Victory for " + curPlayer + " !!!!!" + "</p>").css("color", "#7CEA9C");
  }
  if (curPlayer == "red") {
    $(".winner").html("<p>Victory for " + curPlayer + " !!!!!" + "</p>").css("color", "#FF595E");
  }
  $(".winner").fadeIn("slow", function() {})
  setTimeout(function() {
    $(".winner").fadeOut("slow", function() {})
    $(".slot div").removeClass("red green")
    $(".player").removeClass("green");
    curPlayer = "red";
  }, 8000)
}
