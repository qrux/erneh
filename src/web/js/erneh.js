function call(method, postHash, onSuccess, onFail, onComplete) {
    var data = {};
    data['game-info'] = postHash;
    data['method'] = method;
    api("1/index", data, onSuccess, onFail, onComplete);
}

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

$(function () {
    cl("ER.state", ER);

    $('.grid')
        .isotope({
            // options...
            itemSelector: '.element-item',
            cellsByRow: {
                columnWidth: 150,
                rowHeight: 150
            },
            layoutMode: 'fitRows',
            getSortData: {
                name: '.name',
                symbol: '.symbol',
                number: '.number parseInt',
                gender: '[class]'
            },
            sortBy: ['gender', 'number']
        });


    var $grid1 = $('div#roster-t' + 1 + ' .grid');
    var $grid2 = $('div#roster-t' + 2 + ' .grid');

    cl("grid1", $grid1);
    cl("grid2", $grid2);

    function generateRandomBool() {
        return Math.random() >= 0.5;

        var a = new Uint8Array(1);
        return function () {
            crypto.getRandomValues(a);
            return a[0] > 127;
        };
    }

    function generateWeightedBool(weight) {
        return Math.random() < weight;

        var a = new Uint8Array(1);
        return function () {
            crypto.getRandomValues(a);
            return a[0] > 127;
        };
    }

    function generateRandomPlayer(team, number) {
        var player = {};
        var isMan = generateWeightedBool(0.7);
        if (1 == team) {
            player.name = isMan ? "John Doe" : "Jane Doe";
            player.symbol = "jD";
        } else {
            player.name = isMan ? "Jack Hill" : "Jill Hill";
            player.symbol = "jH";
        }
        player.gender = isMan ? 'm' : 'f';

        var html = addPlayer(team, player.name, number, player.gender, player.symbol);

        return html;
    }

    function createPlayerHTML(team, name, number, gender, symbol) {
        var id = "player-t" + team + "-" + number;
        var html = '<div id="' + id + '" class="element-item ' + gender + '" data-category="team-' + team + '">';
        html += '<h3 class="name">' + name + "</h3>";
        html += '<p class="symbol">' + symbol + "</p>";
        html += '<p class="number">' + number + "</p>";

        //cl("player html", html);

        return html;
    }

    function createPlayerNode(team, name, number, gender, symbol) {
        return $(createPlayerHTML(team, name, number, gender, symbol));
    }

    function addPlayer(team, name, number, gender, symbol) {
        gender = gender.toLowerCase();

        var $player = createPlayerNode(team, name, number, gender, symbol);
        if (1 == team) {
            $grid1.append($player)
                .isotope('appended', $player);
        } else {
            $grid2.append($player)
                .isotope('appended', $player);
        }
    }

    function addTeam(team, players) {
        $.each(players, function (idx, obj) {
            var number = idx;
            var player = obj;

            //cl("#" + number + ": ", player);

            addPlayer(
                team,
                player.name,
                player.number,
                player.gender,
                player.symbol
            );
        });
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // filter functions
    var filterFns = {
        // show if number is greater than 50
        m: function () {
            var number = $(this)
                .find('.m')
                .text();
            return parseInt(number, 10) > 50;
        },
        // show if name ends with -ium
        f: function () {
            var number = $(this)
                .find('.f')
                .text();
            return parseInt(number, 10) > 50;
        },
        /*
        // show if name ends with -ium
        ium: function () {
            var name = $(this)
                .find('.name')
                .text();
            return name.match(/ium$/);
        }
        */
    };

    // bind filter button click
    $('.filters-button-group')
        .on('click', 'button.button1', function () {
            console.log("CLICKED!");

            var filterValue = $(this)
                .attr('data-filter');

            console.log("filter-value: " + filterValue);

            // use filterFn if matches value
            filterValue = filterFns[filterValue] || filterValue;

            console.log(filterValue);

            $grid1.isotope({
                filter: filterValue
            });
        });
    $('.filters-button-group')
        .on('click', 'button.button2', function () {
            console.log("CLICKED!");

            var filterValue = $(this)
                .attr('data-filter');

            console.log("filter-value: " + filterValue);

            // use filterFn if matches value
            filterValue = filterFns[filterValue] || filterValue;

            console.log(filterValue);

            $grid2.isotope({
                filter: filterValue
            });
        });

    // bind sort button click
    $('.sort-by-button-group')
        .on('click', 'button.button1', function () {
            var sortValue = $(this)
                .attr('data-sort-value');
            // make an array of values
            sortValue = sortValue.split(',');
            $grid1.isotope({
                sortBy: sortValue
            });
        });
    // bind sort button click
    $('.sort-by-button-group')
        .on('click', 'button.button2', function () {
            var sortValue = $(this)
                .attr('data-sort-value');
            // make an array of values
            sortValue = sortValue.split(',');
            $grid2.isotope({
                sortBy: sortValue
            });
        });

    // change is-checked class on buttons
    $('.button-group')
        .each(function (i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', 'button', function () {
                $buttonGroup.find('.is-checked')
                    .removeClass('is-checked');
                $(this)
                    .addClass('is-checked');
            });
        });
    // change is-checked class on buttons
    /*
    $('.button-group')
        .each(function (i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', 'button.button2', function () {
                $buttonGroup.find('.is-checked')
                    .removeClass('is-checked');
                $(this)
                    .addClass('is-checked');
            });
        });
        */

    if (ER.IS_DEMO) {
        for (var t = 1; t < 2; ++t) {
            var team = t + 1;
            var $grid = $('div#roster-t' + team + ' .grid');

            for (var i = 0; i < 14; ++i) {
                var number = t * 20 + i;

                var player = generateRandomPlayer(team, number);
                $grid.append(player);
            }
        }

        addTeam(1, meridian);

        $('.grid')
            .isotope({
                // options...
                itemSelector: '.element-item',
                cellsByRow: {
                    columnWidth: 150,
                    rowHeight: 150
                },
                layoutMode: 'fitRows',
                getSortData: {
                    name: '.name',
                    symbol: '.symbol',
                    number: '.number parseInt',
                    gender: '[class]'
                },
                sortBy: ['gender', 'number']
            });
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

    let $formAddTeam1 = $('form#t1-add-player-form');
    let $formAddTeam2 = $('form#t2-add-player-form');

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

    $formAddTeam1.submit(function (ev) {
        ev.preventDefault();
        console.log("Adding player to Team 1");
        var text = $formAddTeam1.find('input')
            .val();
        addPlayerToTeam(1, text);
    });

    $formAddTeam2.submit(function (ev) {
        ev.preventDefault();
        console.log("Adding player to Team 2");
        var text = $formAddTeam2.find('input')
            .val();
        addPlayerToTeam(2, text);
    });

    function addPlayerToTeam(team, text) {
        console.log("Team " + team + ": " + text);
        var strings = text.split(",");

        var name = strings[0].trim();
        var number = strings[1].trim();
        var gender = strings[2].trim();
        var symbol = strings[3].trim();

        // createPlayerHTML(team, number, name, gender, symbol);

        addPlayer(team, number, name, gender, symbol);
    }


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
            .css("background-color", "#30292F");
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
