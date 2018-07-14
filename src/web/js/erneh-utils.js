function call(method, postHash, onSuccess, onFail, onComplete) {
    var data = {};
    data['game-info'] = postHash;
    data['method'] = method;
    api("1/index", data, onSuccess, onFail, onComplete);
}

function cl(mesg, obj) {
    console.log(mesg + ":");
    console.log(obj);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

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

function _createPlayerHTML(team, name, number, gender, symbol) {
    var id = "player-t" + team + "-" + number;
    var html = '<div id="' + id + '" class="element-item ' + gender + '" data-category="team-' + team + '">';
    html += '<h3 class="name">' + name + "</h3>";
    html += '<p class="symbol">' + symbol + "</p>";
    html += '<p class="number">' + number + "</p>";

    //cl("player html", html);

    return html;
}

function _createPlayerNode(team, name, number, gender, symbol) {
    return $(_createPlayerHTML(team, name, number, gender, symbol));
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
