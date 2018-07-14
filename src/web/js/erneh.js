//
/**
 * Copyright (c) 2018 Troy Wu
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 */

$(function () {
    let ER = {};

    ER.IS_DEMO = true;

    ER.ST_BEFORE_GAME = 0;
    ER.ST_BEFORE_PULL = 10;
    ER.ST_AFTER_THROW = 20;

    ER.state = ER.ST_BEFORE_GAME;
    ER.teams = [0, 0, 0]; // teams[0] is nothing (since teams are 1-indexed).
    ER.rosters = [0, 0, 0]; // rosters[0] is nothing (since teams are 1-indexed).
    ER.game = {};

    ER.PREFIX_SEL_ROSTER_GRID = "div#roster-t-";

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
    // Isotope Grid + Event-handling
    //
    // ////////////////////////////////////////////////////////////////

    /*
    $('.grid')
        .isotope({
            // options...
            itemSelector: '.element-item',
            layoutMode: 'fitRows',
            getSortData: {
                name: '.name',
                symbol: '.symbol',
                number: '.number parseInt',
                gender: '[class]'
            },
            sortBy: ['gender', 'number']
        });
        */


    // ////////////////////////////////////////////////////////////////
    //
    // Functions to add players.
    //
    // ////////////////////////////////////////////////////////////////

    function addPlayer(team, name, number, gender, symbol) {
        gender = gender.toLowerCase();

        let p = {
            name: name,
            number: number,
            gender: gender,
            symbol: symbol
        };

        if (0 === ER.rosters[team]) ER.rosters[team] = {};
        let roster = ER.rosters[team];

        roster[number] = p;

        let $player = _createPlayerNode(team, name, number, gender, symbol);

        let isIsotopeLoaded = true && (jQuery()
            .isotope);

        if (1 == team) {
            $grid1.append($player);
            if (isIsotopeLoaded) {
                $()
                    .isotope('appended', $player);
            }
        } else {
            $grid2.append($player);
            if (isIsotopeLoaded) {}
            $()
                .isotope('appended', $player);
        }
    }

    function addPlayerToTeam(team, text) {
        //console.log("Team " + team + ": " + text);

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

    function getTeamRoster(team) {
        return ER.rosters[team];
    }

    function initializeTeamNames(name1, name2) {
        ER.teams[1] = name1;
        ER.teams[2] = name2;
    }

    function findGrid($node) {
        return $node
            .closest('div.grid-box')
            .find('div.grid.team-roster');
    }

    function findTeamNumberFromGrid($grid) {
        return $grid.attr('id')
            .substring(1);
    }

    // ////////////////////////////////////////////////////////////////
    //
    // Event-handling functions.
    //
    // ////////////////////////////////////////////////////////////////

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

        /*
        $('.grid')
            .isotope({
                sortBy: ['gender', 'number']
            });
            */
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
            layoutMode: 'fitRows',
            getSortData: {
                name: '.name',
                symbol: '.symbol',
                number: '.number parseInt',
                gender: '[class]'
            },
            sortBy: ['gender', 'number']
        });

    // bind filter button click - TROY dynamic grid
    $('.filters-button-group')
        .on('click', 'button.button', function () {
            let filterValue = $(this)
                .attr('data-filter');
            // use filterFn if matches value
            filterValue = filterFns[filterValue] || filterValue;
            findGrid($(this))
                .isotope({
                    filter: filterValue
                });
        });

    // bind sort button click
    $('.sort-by-button-group')
        .on('click', 'button.button', function () {
            let sortValue = $(this)
                .attr('data-sort-value');
            // make an array of values
            sortValue = sortValue.split(',');
            findGrid($(this))
                .isotope({
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
    // Event-handling triggers.
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

        let name1 = $inputTeam1Field.val();
        let name2 = $inputTeam2Field.val();

        initializeTeamNames(name1, name2);

        let roster1 = getTeamRoster(1);
        let roster2 = getTeamRoster(2);

        gameInfo = {
            event: $gameInputField.val(),
            game: $inputRoundGameField.val(),
            date: $inputGameDateField.val(),
            teams: [name1, name2],
            rosters: [roster1, roster2]
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

    let $rosterForms = $('div.grid-box form');

    $rosterForms.submit(function (ev) {
        ev.preventDefault();

        let $grid = findGrid($(this));
        let team = findTeamNumberFromGrid($grid);

        console.log("Adding player to Team " + team);
        let text = $(this)
            .find('input')
            .val();

        addPlayerToTeam(team, text);
    });

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

    // ////////////////////////////////////////////////////////////////
    //
    // Field-handling (position + distance).
    //
    // ////////////////////////////////////////////////////////////////

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
