function call(method, postHash, onSuccess, onFail, onComplete) {
    var data = {};
    data['game-info'] = postHash;
    data['method'] = method;
    api("1/index", data, onSuccess, onFail, onComplete);
}

console.log("here!");

var ER = {};

ER.IS_DEMO = true;

ER.ST_BEFORE_GAME = 0;
ER.ST_BEFORE_PULL = 10;
ER.ST_AFTER_THROW = 20;

ER.state = ER.ST_BEFORE_GAME;

function cl(mesg, obj) {
    console.log(mesg + ":");
    console.log(obj);
}

/*
    <div class="element-item metalloid " data-category="metalloid">
      <h3 class="name">Tellurium</h3>
      <p class="symbol">Te</p>
      <p class="number">52</p>
      <p class="weight">127.6</p>
    </div>
    */

$(function () {
    cl("ER.state", ER);

    $('.grid')
        .isotope({
            // options...
            itemSelector: '.grid-item',
            masonry: {
                columnWidth: 200
            }
        });

    function createPlayerHTML(team, number, name, symbol) {
        var id = "player-t" + team + "-" + number;
        var html = '<div id="' + id + '" class="element-item" data-category="team-' + team + '">';
        html += '<h3 class="name">' + name + "</h3>";
        html += '<p class="symbol">' + symbol + "</p>";
        html += '<p class="number">' + number + "</p>";

        cl("player html", html);

        return html;
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    if (ER.IS_DEMO) {
        var team = 1;
        for (var i = 0; i < 14; ++i) {
            var player = createPlayerHTML(team, i, "Sale Mara", "Sm");
            $('div#roster-t' + team + ' .grid')
                .append(player);
            var $player = $('div#player-t' + team + '-' + i);
            $player.css('background-color', getRandomColor());
        }

        team = 2;
        for (var i = 20; i < 34; ++i) {
            var player = createPlayerHTML(team, i, "Homer Simpson", "Hs");
            $('div#roster-t' + team + ' .grid')
                .append(player);
            var $player = $('div#player-t' + team + '-' + i);
            $player.css('background-color', getRandomColor());
        }
    }

    var $buttons = $('button.button.game');
    var $buttonsBeforePull = $('button.button.game.before-pull');
    var $buttonsAfterThrow = $('button.button.game.after-throw');
    let $buttonsEditRoster = $('button.button.game.edit-roster');

    var $formGameInfo = $('form#form-game-info');

    var $gameInputField = $('input#input-game-field');
    var $inputTeam1Field = $('input#input-team-1-name-field');
    var $inputTeam2Field = $('input#input-team-2-name-field');
    var $inputRoundGameField = $('input#input-round-game-field');
    var $inputGameDateField = $('input#input-game-date-field');

    var $gameInfoFields = $('form#form-game-info input.game-info');

    var $submitGameInfo = $('input#submit-game-info');

    let $jumpToScoreUI = $('.new-score');
    let $scoreboard = $('span#scoreboard');

    let $buttonDemo = $('button#test-info');

    $scoreboard.hide();

    $gameInputField.attr('placeholder', 'Event name...');
    $gameInputField.focus();
    $inputRoundGameField.attr('placeholder', 'Game or Round...');
    $inputGameDateField.attr('placeholder', 'Date...');
    $inputTeam1Field.attr('placeholder', 'Team 1...');

    $inputTeam2Field
        .attr('placeholder', 'Team 2...')
        .submit(function () {
            console.log("Submitting form...");
        });

    console.log("form-game-info:");
    console.log($formGameInfo);



    $formGameInfo.submit(function (ev) {
        ev.preventDefault();
        console.log("Submitting form (on form element)...");
        console.log(ev);

        var gameInfo;

        if (ER.IS_DEMO) {
            $gameInputField.val('2018 London Summer League');
            $inputRoundGameField.val(5);
            $inputGameDateField.val('4 July 2018');
            $inputTeam1Field.val('Meridian');
            $inputTeam2Field.val('Curve');
        }

        gameInfo = {
            event: $gameInputField.val(),
            game: $inputRoundGameField.val(),
            date: $inputGameDateField.val(),
            teams: [{
                    name: $inputTeam1Field.val()
                },
                {
                    name: $inputTeam2Field.val()
                }
            ]
        };

        console.log(gameInfo);

        $inputTeam2Field.blur();

        call('get-game-id',
            gameInfo,
            function (data) {
                console.log("API: get-game-id():");
                console.log(data);

                activateBeforePullButtons();
                disableGameInfoFields();
                $submitGameInfo.hide();
                $scoreboard.show();

                enableRosterButtons();
            },
            function () {},
            function () {});
    });


    function f() {
        console.log("f() off!");
    }

    function deactivateAllButtons() {
        $buttons.prop('disabled', true);
        $buttons.css('background-color', '#333');
        $buttons.css('color', '#555');
    }

    function activateRosterButtons() {
        $buttonsEditRoster.prop('disabled', false);
        $buttonsEditRoster.addClass('turn-on');
    }

    function activateBeforePullButtons() {
        deactivateAllButtons();
        $buttonsBeforePull.prop('disabled', false);
        $buttonsBeforePull.css('background-color', '#777');
        $buttonsBeforePull.css('color', '#fff');
    }

    function activateAfterThrowButtons() {
        /*
        deactivateAllButtons();
        $buttonsAfterThrow.prop('disabled', false);
        $buttonsAfterThrow.css('background-color', '#777');
        $buttonsAfterThrow.css('color', '#fff');
        */
    }

    function activateJumpToScoreUI() {
        $jumpToScoreUI.css('visibility', 'visible');
    }

    function disableGameInfoFields() {
        $gameInfoFields
            .attr("disabled", "disabled")
            .css("background-color", "#222");
        //$inputRoundGameField.css('visibility', 'hidden');
        //$inputGameDateField.css('visibility', 'hidden');
        var $gameRound = $inputRoundGameField.val();
        $inputRoundGameField.val("G/R: " + $gameRound)
    }

    function enableRosterButtons() {
        activateRosterButtons();
        $inputTeam1Field.click(function (ev) {
            alert("yo!");
        });
    }

    function startGame() {

    }

    let $buttonPullFromLeft = $('button#pull-from-left');
    let $buttonPullFromRight = $('button#pull-from-right');
    let $buttonPull = $('button#pull');
    let $buttonJumpToScore = $('button#jump-to-score');

    console.log("button#pull-from-left");
    console.log($buttonPullFromLeft);

    console.log("button#jump-to-score");
    console.log($buttonJumpToScore);

    $buttonPullFromLeft.click(function (ev) {
        activateAfterThrowButtons();
    });

    $buttonPullFromRight.click(function (ev) {
        activateAfterThrowButtons();
    });
    $buttonPull.click(function (ev) {
        activateAfterThrowButtons();
    });

    $buttonJumpToScore.click(function (ev) {
        ev.preventDefault();
        activateJumpToScoreUI();
    });

    let $buttonEditTeam1Roster = $('button#edit-team1-roster');
    let $buttonEditTeam2Roster = $('button#edit-team2-roster');

    $buttonEditTeam1Roster.click(function (ev) {
        ev.preventDefault();
        alert("yo!");
    });

    console.log("inside zepto");

    deactivateAllButtons();

    var $field = $('div#field');
    var $left = $('div#left-ez');
    var $right = $('div#right-ez');
    var $grass = $('div.grass');

    console.log("Grass elements:");
    console.log($grass);

    /*
     $grass.on('click',
     function (ev) {
     var offset = $(this).offset();
     var width = offset.width;
     var height = offset.height;
     var x = offset.left;
     var y = offset.top;

     console.log(offset);
     console.log("WxH: " + width + "x" + height);

     var id = ev.target.id;
     console.log(id + " - click @ (" + x + ", " + y + ")");
     });
     */

    $field.on('click',
        function (ev) {
            var offset = $(this)
                .offset();
            var width = offset.width;
            var height = offset.height;
            var x = offset.left;
            var y = offset.top;

            console.log(offset);

            var fieldSection = ev.target.id;

            console.log("FIELD click @ (" + x + ", " + y + ") - " + fieldSection);
        });

});
