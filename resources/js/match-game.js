var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function(){
  var $game = $('#game');
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);

});

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var valuesArray = []; //empty array to hold ordered card values

  for (i=1; i <= 8; i++ ) { //for loop to populate array with two of #'s 1-8'
    valuesArray.push(i);
    valuesArray.push(i);
  }

  var cardValues = []; //empty array to populate with random ordered #'s

  while (valuesArray.length > 0) { //populate array with random ordered #'s'
    var randomIndex = Math.floor((Math.random() * valuesArray.length));
    var randomValue = valuesArray.splice(randomIndex, 1); //splice returns number from array and removes
    cardValues.push(randomValue); //adds value at random index and adds to array
  }

  return cardValues; //returns random array
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  var colors = ['hsl(25, 85%, 65%)', 'hsl(55, 85%, 65%)', 'hsl(90, 85%, 65%)', 'hsl(160, 85%, 65%)', 'hsl(220, 85%, 65%)', 'hsl(265, 85%, 65%)', 'hsl(310, 85%, 65%)', 'hsl(360, 85%, 65%)']

  $game.empty(); //empties $game

  $game.data('flippedCards', []); //attaches empty flippedCard array to $game

  for (i=0; i < cardValues.length; i++) { //sets data for each card
    var $cardElement = $('<div class="card col-xs-3"></div>');
    var value = cardValues[i];
    var color = colors[value-1];
    var data = {
      value: value,
      isFlipped: false,
      color: color
    }
    $cardElement.data(data); //attaches data object to each cardElement

    $game.append($cardElement); //adds $cardElement to html in #game
  }

  $('.card').click(function() { //calls flip card function for clicked card
    MatchGame.flipCard($(this), $('#game'));
  });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($card.data('isFlipped')) {
    return;
  } else {
    $card.css('background-color', $card.data('color')).text($card.data('value')).data('isFlipped', true);
  }

  var flippedCards = $game.data('flippedCards');
  flippedCards.push($card);

  if (flippedCards.length === 2) {
   if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
      var matchCss = {
        backgroundColor: 'rgb(153, 153, 153)',
        color: 'rgb(204, 204, 204)'
      }
      flippedCards[0].css(matchCss);
      flippedCards[1].css(matchCss);
    } else {
      var card1 = flippedCards[0];
      var card2 = flippedCards[1];
      window.setTimeout(function(){
      card1.css('background-color', 'rgb(32, 64, 86)').text('').data('isFlipped', false);
      card2.css('background-color', 'rgb(32, 64, 86)').text('').data('isFlipped', false);
    }, 500);
  }
    $game.data('flippedCards', []); //resets flipped cards to empty
  }

};
