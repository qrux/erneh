let ER = {};

ER.IS_DEMO = true;

ER.ST_BEFORE_GAME = 0;
ER.ST_BEFORE_PULL = 10;
ER.ST_AFTER_THROW = 20;

ER.state = ER.ST_BEFORE_GAME;

ER.PREFIX_SEL_ROSTER_GRID = "div#roster-t-";

$(function () {
    cl("ER.state", ER);

    let $grid1 = $(ER.PREFIX_SEL_ROSTER_GRID + 1 + ' .grid');
    let $grid2 = $(ER.PREFIX_SEL_ROSTER_GRID + 2 + ' .grid');

    let $buttons = $('button.button.game');
    let $buttonsBeforePull = $('button.button.game.before-pull');
    let $buttonsAfterThrow = $('button.button.game.after-throw');
    let $buttonsEditRoster = $('button.button.game.edit-roster');

    let $formGameInfo = $('form#form-game-info');

    let $gameInputField = $('input#input-game-field');
    let $inputTeam1Field = $('input#input-team-1-name-field');
    let $inputTeam2Field = $('input#input-team-2-name-field');
    let $inputRoundGameField = $('input#input-round-game-field');
    let $inputGameDateField = $('input#input-game-date-field');

    let $gameInfoFields = $('form#form-game-info input.game-info');

    let $submitGameInfo = $('input#submit-game-info');

    let $jumpToScoreUI = $('.new-score');
    let $scoreboard = $('span#scoreboard');

    let $buttonDemo = $('button#test-info');

    let $formAddTeam1 = $('form#t1-add-player-form');
    let $formAddTeam2 = $('form#t2-add-player-form');

    let $buttonPullFromLeft = $('button#pull-from-left');
    let $buttonPullFromRight = $('button#pull-from-right');
    let $buttonPull = $('button#pull');
    let $buttonJumpToScore = $('button#jump-to-score');

    let $buttonEditTeam1Roster = $('button#edit-team1-roster');
    let $buttonEditTeam2Roster = $('button#edit-team2-roster');
    let $field = $('div#field');
    let $left = $('div#left-ez');
    let $right = $('div#right-ez');
    let $grass = $('div.grass');

    cl("grid1", $grid1);
    cl("grid2", $grid2);
    cl("form-game-info", $formGameInfo);
    cl("Grass elements", $grass);
    cl("button#pull-from-left", $buttonPullFromLeft);
    cl("button#jump-to-score", $buttonJumpToScore);

    // ////////////////////////////////////////////////////////////////
    //
    // Functions to add players.
    //
    // ////////////////////////////////////////////////////////////////

    function addPlayer(team, name, number, gender, symbol) {
        gender = gender.toLowerCase();

        let $player = _createPlayerNode(team, name, number, gender, symbol);
        if (1 == team) {
            $grid1.append($player)
                .isotope('appended', $player);
        } else {
            $grid2.append($player)
                .isotope('appended', $player);
        }
    }

    function addPlayerToTeam(team, text) {
        console.log("Team " + team + ": " + text);
        let strings = text.split(",");

        let name = strings[0].trim();
        let number = strings[1].trim();
        let gender = strings[2].trim();
        let symbol = strings[3].trim();

        // createPlayerHTML(team, number, name, gender, symbol);

        addPlayer(team, number, name, gender, symbol);
    }

    function addTeam(team, players) {
        $.each(players, function (idx, obj) {
            let number = idx;
            let player = obj;

            addPlayer(team, player.name, player.number, player.gender, player.symbol);
        });
    }

    function addRandomPlayer(team, number) {
        let player = {};
        let isMan = generateWeightedBool(0.7);
        if (1 == team) {
            player.name = isMan ? "John Doe" : "Jane Doe";
            player.symbol = "jD";
        } else {
            player.name = isMan ? "Jack Hill" : "Jill Hill";
            player.symbol = "jH";
        }
        player.gender = isMan ? 'm' : 'f';

        addPlayer(team, player.name, number, player.gender, player.symbol);
    }

    // ////////////////////////////////////////////////////////////////
    //
    // Start of DEMO mode
    //
    // ////////////////////////////////////////////////////////////////

    if (ER.IS_DEMO) {
        // Add random players for other team.
        for (let t = 1; t < 2; ++t) {
            let team = t + 1;
            let $grid = $(ER.PREFIX_SEL_ROSTER_GRID + team + ' .grid');
            for (let i = 0; i < 14; ++i) addRandomPlayer(team, i);
        }

        // Add Meridian
        addTeam(1, meridian);
    }

    // ////////////////////////////////////////////////////////////////
    //
    // Isotope Grid + Event-handling
    //
    // ////////////////////////////////////////////////////////////////

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

    // bind filter button click
    $('.filters-button-group')
        .on('click', 'button.button1', function () {
            console.log("CLICKED!");

            let filterValue = $(this)
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

            let filterValue = $(this)
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
            let sortValue = $(this)
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
            let sortValue = $(this)
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
            let $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', 'button', function () {
                $buttonGroup.find('.is-checked')
                    .removeClass('is-checked');
                $(this)
                    .addClass('is-checked');
            });
        });

    // ////////////////////////////////////////////////////////////////
    //
    // Custom Event-handling.
    //
    // ////////////////////////////////////////////////////////////////

    $scoreboard.hide();

    $gameInputField.attr('placeholder', 'Event name...');
    $gameInputField.focus();
    $inputRoundGameField.attr('placeholder', 'Game or Round...');
    $inputGameDateField.attr('placeholder', 'Date...');
    $inputTeam1Field.attr('placeholder', 'Team 1...');

    $inputTeam2Field.attr('placeholder', 'Team 2...')
        .submit(function () {
            console.log("Submitting form...");
        });

    $formGameInfo.submit(function (ev) {
        ev.preventDefault();
        console.log("Submitting form (on form element)...");
        console.log(ev);

        let gameInfo;

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
                    name: $inputTeam1Field.val(),
                    roster: getTeamRoster(1)
                },
                {
                    name: $inputTeam2Field.val(),
                    roster: getTeamRoster(2)
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
        let text = $formAddTeam1.find('input')
            .val();
        addPlayerToTeam(1, text);
    });

    $formAddTeam2.submit(function (ev) {
        ev.preventDefault();
        console.log("Adding player to Team 2");
        let text = $formAddTeam2.find('input')
            .val();
        addPlayerToTeam(2, text);
    });

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
        let $gameRound = $inputRoundGameField.val();
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

    $buttonEditTeam1Roster.click(function (ev) {
        ev.preventDefault();
    });

    deactivateAllButtons();


    /*
     $grass.on('click',
     function (ev) {
     let offset = $(this).offset();
     let width = offset.width;
     let height = offset.height;
     let x = offset.left;
     let y = offset.top;

     console.log(offset);
     console.log("WxH: " + width + "x" + height);

     let id = ev.target.id;
     console.log(id + " - click @ (" + x + ", " + y + ")");
     });
     */

    $field.on('click',
        function (ev) {
            let offset = $(this)
                .offset();
            let width = offset.width;
            let height = offset.height;
            let x = offset.left;
            let y = offset.top;

            console.log(offset);

            let fieldSection = ev.target.id;

            console.log("FIELD click @ (" + x + ", " + y + ") - " + fieldSection);
        });

});
