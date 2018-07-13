<?php

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

?>


<html>

<head>

    <title>Anulytics, Erneh</title>
    <link type="text/css" rel="stylesheet" href="css/index.css"/>
    <script type="text/javascript" src="js/lib/jquery.min.js"></script>
    <script type="text/javascript" src="js/lib/isotope.pkgd.min.js"></script>
    <script type="text/javascript" src="js/utils.js"></script>
    <script type="text/javascript" src="js/erneh-data.js"></script>
    <script type="text/javascript" src="js/erneh.js"></script>

</head>

<body>

    <div id="game-info">
        <form id="form-game-info" action="">
            <fieldset id="game-meta">
                <input id="input-game-field" class="game-info" type="text"/>
                <br/>
                <input id="input-round-game-field" class="game-info round-game" type="text"/>
                <input id="input-game-date-field" class="game-info round-game" type="text"/>
            </fieldset>
            <br/>
            <br/>
            <input id="input-team-1-name-field" class="game-info team-name" type="text"/>
            <span id="scoring-gap">
                <input id="submit-game-info" class="submit" type="submit" value="Start!"/>

                <span id="scoreboard">
                    <span id="output-team-1-score" class="score team-1">0</span>
                        vs
                    <span id="output-team-2-score" class="score team-2">0</span>
                </span>
            </span>
            <input id="input-team-2-name-field" class="game-info team-name" type="text"/>
        </form>
    </div>

    <div id="field-box-outer">
        <div id="field-box">
            <div id="field">
                <div id="proper" class="proper grass"></div>
                <div id="left-ez" class="ez grass"></div>
                <div id="right-ez" class="ez grass"></div>
            </div>
        </div>

        <div id="button-bar" class="button-bar">
            <button id="pull" class="button game before-pull">Pull</button>
            <button id="throw-disp-throwaway" class="button game after-throw">Throwaway</button>
            <button id="throw-disp-fifty-fifty" class="button game after-throw">50/50</button>
            <button id="throw-disp-drop" class="button button game after-throw">Drop</button>
            <button id="throw-disp-defended" class="button game after-throw">D</button>
        </div>
        <div id="button-bar-2" class="button-bar">
            <button id="start-point-from-left" class="button game before-pull">New Point (-&gt;)</button>
            <button id="start-point-from-right" class="button game before-pull">New Point (&lt;-)</button>
            <button id="jump-to-score" class="button game before-pull">Jump to Score</button>
            <button id="throw-unknown-source" class="button game after-throw">Unknown Spot</button>
        </div>
        <div id="button-bar-3" class="button-bar new-score">
            <span class="new-score">New Team 1 Score</span>
            <input id="new-score-team-1" class="game new-score" />
            <input id="new-score-team-2" class="game new-score" />
            <span class="new-score">New Team 2 Score</span>
        </div>
        <!--
        <div id="button-bar-4" class="button-bar edit-roster">
            <button id="edit-team1-roster" class="button game edit-roster">Edit Team 1 Roster</button>
            <button id="edit-team2-roster" class="button game edit-roster">Edit Team 2 Roster</button>
        </div>
        <div id="button-bar-9" class="button-bar edit-roster">
            <button id="test-info" class="button">Insert Demo Info</button>
        </div>
        -->
    </div>

    <div id="team-rosters">
        <div id="roster-t1">
            <form id="t1-add-player-form">
                <fieldset id="fs-t1">
                    <label>Add Team 1 Player</label>
                    <input id="t1-add-player-field" class="game-info" type="text"/>
                    <button class="button" type="submit">+</button>
                    <br/>
                    <label class="l-indent">name, number, gender, symbol</label>
                </fieldset>
            </form>
            <div class="button-group filters-button-group">
                <button class="button button1 is-checked" data-filter="*">All</button>
                <button class="button button1" data-filter=".f">Women</button>
                <button class="button button1" data-filter=".m">Men</button>
            </div>
            <div class="button-group sort-by-button-group">
              <button class="button button1 is-checked" data-sort-value="gender, number">Default</button>
              <button class="button button1" data-sort-value="name">Name</button>
              <button class="button button1" data-sort-value="symbol">Symbol</button>
              <button class="button button1" data-sort-value="number">#</button>
              <button class="button button1" data-sort-value="gender">Gender</button>
            </div>
            <div class="grid team-roster"></div>
        </div>
        <div id="roster-t2">
            <form id="t2-add-player-form">
                <fieldset id="fs-t2">
                    <button class="button" type="submit">+</button>
                    <input id="t2-add-player-field" class="game-info" type="text"/>
                    <label>Add Team 2 Player</label>
                    <br/>
                    <label class="r-indent">name, number, gender, symbol</label>
                </fieldset>
            </form>
            <div class="button-group filters-button-group">
                <button class="button button2 is-checked" data-filter="*">All</button>
                <button class="button button2" data-filter=".f">Women</button>
                <button class="button button2" data-filter=".m">Men</button>
            </div>
            <div class="button-group sort-by-button-group">
              <button class="button button2 is-checked" data-sort-value="gender, number">Default</button>
              <button class="button button2" data-sort-value="name">Name</button>
              <button class="button button2" data-sort-value="symbol">Symbol</button>
              <button class="button button2" data-sort-value="number">#</button>
              <button class="button button2" data-sort-value="gender">Gender</button>
            </div>
            <div class="grid team-roster"></div>
        </div>
    </div>

</body>

</html>
