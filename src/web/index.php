<?php

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");


?>


<html>

<head>

    <title>Anulytics, Erneh</title>
    <link type="text/css" rel="stylesheet" href="css/index.css"/>
    <script type="text/javascript" src="js/lib/zepto.min.js"></script>
    <script type="text/javascript" src="js/utils.js"></script>

    <script type="text/javascript">

        function call(method, postHash, onSuccess, onFail, onComplete) {
            var data = {};
            data['game-info'] = postHash;
            data['method'] = method;
            api("1/index", data, onSuccess, onFail, onComplete);
        }

        console.log("here!");

        var ER = {};

        ER.ST_BEFORE_GAME = 0;
        ER.ST_BEFORE_PULL = 10;
        ER.ST_AFTER_THROW = 20;

        $(function () {

            var $buttons = $('button.button.game');
            var $buttonsBeforePull = $('button.button.game.before-pull');
            var $buttonsAfterThrow = $('button.button.game.after-throw');

            var $formGameInfo = $('form#form-game-info');

            var $gameInputField = $('input#input-game-field');
            var $inputTeam1Field = $('input#input-team-1-name-field');
            var $inputTeam2Field = $('input#input-team-2-name-field');
            var $inputRoundGameField = $('input#input-round-game-field');
            var $inputGameDateField = $('input#input-game-date-field');

            var $gameInfoFields = $('form#form-game-info input.game-info');

            var $submitGameInfo = $('input#submit-game-info');

            let $jumpToScoreUI = $('.new-score');

            $gameInputField.attr('placeholder', 'Event name...');
            $gameInputField.focus();
            $inputRoundGameField.attr('placeholder', 'Game or Round...');
            $inputGameDateField.attr('placeholder', 'Date...');
            $inputTeam1Field.attr('placeholder', 'Team 1...');

            $inputTeam2Field
                .attr('placeholder', 'Team 2...')
                .submit(function () {
                    console.log("Submitting form...");
                })
            ;

            console.log("form-game-info:");
            console.log($formGameInfo);

            $formGameInfo.submit(function (ev) {
                ev.preventDefault();
                console.log("Submitting form (on form element)...");
                console.log(ev);

                var gameInfo = {
                        event: $gameInputField.val(),
                        game : $inputRoundGameField.val(),
                        date : $inputGameDateField.val(),
                        teams: [
                            {
                                name: $inputTeam1Field.val()
                            },
                            {
                                name: $inputTeam2Field.val()
                            }
                        ]
                    }
                ;

                console.log(gameInfo);

                call('get-game-id',
                     gameInfo,
                     function (data) {
                         console.log("API: get-game-id():");
                         console.log(data);

                         activateBeforePullButtons();
                         disableGameInfoFields();
                         $submitGameInfo.hide();
                     }, function () {
                    }, function () {
                    });
            });


            function f() {
                console.log("f() off!");
            }

            function deactivateAllButtons() {
                $buttons.prop('disabled', true);
                $buttons.css('background-color', '#333');
                $buttons.css('color', '#555');
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
                    .css("background-color", "#222")
                ;
                //var $gameRound = $inputRoundGameField.val();
                //$inputRoundGameField.val($gameRound)
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
                    var offset = $(this).offset();
                    var width = offset.width;
                    var height = offset.height;
                    var x = offset.left;
                    var y = offset.top;

                    console.log(offset);

                    var fieldSection = ev.target.id;

                    console.log("FIELD click @ (" + x + ", " + y + ") - " + fieldSection);
                });
        });

    </script>
</head>

<body>

<form id="form-game-info" action="">
    <div id="game-info">
        <input id="input-game-field" class="game-info" type="text"/>
        <br/>
        <input id="input-round-game-field" class="game-info round-game" type="text"/>
        <input id="input-game-date-field" class="game-info round-game" type="text"/>
        <br/>
        <br/>
        <input id="input-team-1-name-field" class="game-info team-name" type="text"/>
        <span id="output-team-1-score" class="score team-1">0</span> vs <span id="output-team-2-score"
                                                                              class="score team-2">0</span>
        <input id="input-team-2-name-field" class="game-info team-name" type="text"/>
    </div>

    <div id="field-box">
        <input id="submit-game-info" class="submit" type="submit" value="&lt;Start Game&gt;"/>
        <div id="field">
            <div id="proper" class="proper grass"></div>
            <div id="left-ez" class="ez grass"></div>
            <div id="right-ez" class="ez grass"></div>
        </div>

        <div id="button-bar" class="button-bar">
            <button id="pull" class="button game before-pull">Pull</button>
            <button id="throw-disp-throwaway" class="button game after-throw">Throwaway</button>
            <button id="throw-disp-fifty-fifty" class="button game after-throw">50/50</button>
            <button id="throw-disp-drop" class="button button game after-throw">Drop</button>
            <button id="throw-disp-defended" class="button game after-throw">D</button>
        </div>
        <div id="button-bar-2" class="button-bar">
            <button id="start-point" class="button game before-pull">New Point (no pull)</button>
            <button id="jump-to-score" class="button game before-pull">Jump to Score</button>
            <button id="throw-unknown-source" class="button game after-throw">Unknown Spot</button>
        </div>
        <div id="button-bar-3" class="button-bar new-score">
            <span class="new-score">New Team 1 Score</span>
            <input id="new-score-team-1" class="game new-score" />
            <input id="new-score-team-2" class="game new-score" />
            <span class="new-score">New Team 2 Score</span>
        </div>
    </div>
</form>

</body>

</html>
