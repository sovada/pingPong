(function () {
    var canvasWidth = (window.innerWidth) -15,
        canvasHeight = (window.innerHeight),
        canvas,
        canvasContext,
        player1,
        player2,
        ball,
        random,
        back = false,
        down = false;

    player1 = {
        pseudo: "",
        score: 0,
        cursor: {
            x: 50,
            y: (canvasHeight /2) -50,
            width: 5,
            height: 100
        }
    };

    player2 = {
        pseudo: "",
        score: 0,
        cursor: {
            x: (canvasWidth) -50,
            y: (canvasHeight /2) -50,
            width: 5,
            height: 100
        }
    };

    ball = {
        x: Math.round(canvasWidth /2),
        y: Math.round(canvasHeight /2),
        width: 10,
        heigth : 10
    };

    var pseudo = function () {
        if (player1.pseudo === "") {
            player1.pseudo = player1.pseudo = prompt("Entrez le pseudo du joueur 1:") || "player1";
        }

        if (player2.pseudo === "") {
            player2.pseudo = player2.pseudo = prompt("Entrez le pseudo du joueur 2:") || "player2";
        }
    }.apply();

    window.onload = function () {
        canvas = document.getElementById("pingPong");
        canvas.height = canvasHeight;
        canvas.width = canvasWidth;
        canvasContext = canvas.getContext("2d");

        setInterval(randomThat, 8000);
        setInterval(drawEverything, 1);
    };

    function drawEverything () {
        // Surface de jeux
        var createArea = function () {
            canvasContext.fillStyle = "black";
            canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        }.apply();

        ball.x += 1;
        canvasContext.fillStyle = "white";
        canvasContext.fillRect(ball.x, ball.y, ball.width, ball.heigth);

        // Filet de jeu de tennis
        var filet = function () {
            for (var i = 40; i < (canvas.height) - 40; i += 40) {
                canvasContext.fillStyle = "white";
                canvasContext.fillRect((canvas.width / 2) - 5, i - 5, 5, 20);
            }
        }.apply();

        // Score player1
        var scorePlayer1 = function () {
            canvasContext.fillStyle = "white";
            canvasContext.fillRect(100, 100, 200, 100);
            canvasContext.fillStyle = "black";
            canvasContext.fillRect(105, 105, 190, 90);
            canvasContext.font = "30px Verdana";
            canvasContext.fillStyle = "white";
            canvasContext.fillText(player1.pseudo + ":", 110, 130);
            canvasContext.font = "15px Verdana";
            canvasContext.fillStyle = "white";
            canvasContext.fillText(player1.score, 110, 160);
        }.apply();

        // Score player2
        var scorePlayer2 = function () {
            canvasContext.fillStyle = "white";
            canvasContext.fillRect(canvas.width - 300, 100, 200, 100);
            canvasContext.fillStyle = "black";
            canvasContext.fillRect(canvas.width - 295, 105, 190, 90);
            canvasContext.font = "30px Verdana";
            canvasContext.fillStyle = "white";
            canvasContext.fillText(player2.pseudo + ":", canvas.width - 290, 130);
            canvasContext.font = "15px Verdana";
            canvasContext.fillStyle = "white";
            canvasContext.fillText(player2.score, canvas.width - 290, 160);
        }.apply();

        function cursorPlayer1 (where) {
            where = where || "";
            if (where == "up") {
                player1.cursor.y = player1.cursor.y -9;
                canvasContext.fillStyle = "black";
                canvasContext.fillRect(player1.cursor.x, player1.cursor.y +10, player1.cursor.width, player1.cursor.height);
            } else if(where == "down") {
                player1.cursor.y = player1.cursor.y +9;
                canvasContext.fillStyle = "black";
                canvasContext.fillRect(player1.cursor.x, player1.cursor.y -10, player1.cursor.width, player1.cursor.height);
            }
            canvasContext.fillStyle = "white";
            canvasContext.fillRect(player1.cursor.x, player1.cursor.y, player1.cursor.width, player1.cursor.height);
        };

        function cursorPlayer2 (where) {
            where = where || "";
            if (where == "up") {
                player2.cursor.y = player2.cursor.y -9;
                canvasContext.fillStyle = "black";
                canvasContext.fillRect(player2.cursor.x, player2.cursor.y +10, player2.cursor.width, player2.cursor.height);
            } else if(where == "down") {
                player2.cursor.y = player2.cursor.y +9;
                canvasContext.fillStyle = "black";
                canvasContext.fillRect(player2.cursor.x, player2.cursor.y -10, player2.cursor.width, player2.cursor.height);
            }
            canvasContext.fillStyle = "white";
            canvasContext.fillRect(player2.cursor.x, player2.cursor.y, player2.cursor.width, player2.cursor.height);
        };

        cursorPlayer1();
        cursorPlayer2();

        document.onkeypress = function(event) {
            event = event || window.event;
            var charCode = event.keyCode || event.which;
            var charStr = String.fromCharCode(charCode);

            charStr === "z" ? cursorPlayer1("up") : 0;
            charStr === "s" ? cursorPlayer1("down") : 0;

            charStr === "e" ? cursorPlayer2("up") : 0;
            charStr === "d" ? cursorPlayer2("down") : 0;
        };

        // collision avec la raquette du joueur 2
        if (ball.x === player2.cursor.x -10 && ball.y <= player2.cursor.y + 100 && ball.y >= player2.cursor.y) {
            back = true;
            canvasContext.fillStyle = "white";
            canvasContext.fillRect(ball.x, ball.y, ball.width, ball.heigth);

        }else if (ball.x === player2.cursor.x -10) {
            player1.score ++;
            ball.x = 100;
        }

        if (back) {
            ball.x = ball.x - 2;
            ball.y = ball.y - random;
            canvasContext.fillStyle = "white";
            canvasContext.fillRect(ball.x, ball.y, ball.width, ball.heigth);
        }


        // collision avec la raquette du joueur 1
        if (ball.x === player1.cursor.x +10 && ball.y <= player1.cursor.y + 100 && ball.y >= player1.cursor.y) {
            back = false;
            canvasContext.fillStyle = "white";
            canvasContext.fillRect(ball.x, ball.y, ball.width, ball.heigth);
        }else if (ball.x === player1.cursor.x ) {
            player2.score ++;
            ball. y = 200;
            ball.x = canvasWidth -100;
        }

        // collision avec le haut
        if (Math.round(ball.y) === 0 ) {
            down = true;
            ball.y = ball.y + 1;
            canvasContext.fillStyle = "white";
            canvasContext.fillRect(ball.x, ball.y, ball.width, ball.heigth);

        } else if (Math.round(ball.y) >= canvasHeight) {
            down = false;
            ball.y = canvasHeight - 1;
            canvasContext.fillStyle = "white";
            canvasContext.fillRect(ball.x, ball.y, ball.width, ball.heigth);
        }

        if (down) {
            console.log("down");
            ball.y = ball.y +1;
        } if (!down) {
            ball.y = ball.y -1;
        }

    }

    function randomThat() {
        random = Math.random();
    }
}());