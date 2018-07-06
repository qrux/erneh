<?php

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");


?>


<html>

<head>

<title>Anulytics, Erneh</title>
<link type="text/css" rel="stylesheet" href="css/index.css" />
<script type="text/javascript" src="js/lib/zepto.min.js"></script>

<script type="text/javascript">

console.log("here!");

var ER = {};

ER.ST_BEFORE_GAME = 0;
ER.ST_BEFORE_PULL = 10;
ER.ST_AFTER_THROW = 20;

$(function() {

    var $buttons = $('button.button.game');
    var $buttonsBeforePull = $('button.button.game.before-pull');
    var $buttonsAfterThrow = $('button.button.game.after-throw');

    function f() {
        console.log("f() off!");
    }

    function deactivateAllButtons() {
        $buttons.prop('disabled', true);
        $buttons.css('background-color', '#777');
    };

    function activateBeforePullButtons() {
        deactivateAllButtons();
        $buttonsBeforePull.prop('disabled', false);
        $buttonsBeforePull.css('background-color', '#444');
    };
    function activateAfterThrowButtons() {
        deactivateAllButtons();
        $buttonsAfterThrow.prop('disabled', false)
        $buttonsAfterThrow.css('background-color', '#444');
    };

    let $buttonPullFromLeft = $('button#pull-from-left');
    let $buttonPullFromRight = $('button#pull-from-right');
    let $buttonPull = $('button#pull');

    console.log("button#pull-from-left");
    console.log($buttonPullFromLeft);
    $buttonPullFromLeft.click(function(ev) {
        activateAfterThrowButtons();
    });

    $buttonPullFromRight.click(function(ev) {
        activateAfterThrowButtons();
    });
    $buttonPull.click(function(ev) {
        activateAfterThrowButtons();
    });

    console.log("inside zepto");

    deactivateAllButtons();
    //activateBeforePullButtons();

    var $field = $('div#field');
    var $left = $('div#left-ez');
    var $right = $('div#right-ez');
    var $grass = $('div.grass');

    console.log("Grass elements:");
    console.log($grass);

    $grass.on('click',
        function(ev) {
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

    $field.on('click',
        function(ev) {
            var offset = $(this).offset();
            var width = offset.width;
            var height = offset.height;
            var x = offset.left;
            var y = offset.top;

            console.log(offset);
            console.log("WxH: " + width + "x" + height);

            console.log("FIELD click @ (" + x + ", " + y + ")");
            var obj = ev.target.id;
            console.log("        id: " + obj);
        });
    });

</script>
</head>

<body>

<div id="game-info">
    <h1 id="game-name-field">(No Game in Progress)</h1>
    <br/>
    <h2 id="team-1-name-field">(team 1) / 0 - 0 / (team 2)</h2>
</div>

<div id ="field-box">
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
</div>

</body>

</html>
