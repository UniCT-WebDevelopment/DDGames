$.ajax({
    type: 'GET',
    url: '/session',
    success: function (response) {
        dropdown.remove();
        dropdown.style.display = 'flex';
        if (response == "You are not logged in") {
           
        } else {
            username = response;
            logged();
        }
    }
})

const url = window.location.href;
const gameId = url.substring(url.lastIndexOf('/') + 1);

var fbody = document.getElementById('fbody');
var dashboard = document.getElementById('dashboard');
var bgColor;

$.ajax({
    type: 'GET',
    url: '/get/game/' + gameId,
    dataType: 'json',
    success: function (response) {
        bgColor = response.bgColor;
        if (parseInt(window.getComputedStyle(document.getElementById('body')).width) > 1024) {
            fbody.style.backgroundColor = bgColor;
            dashboard.style.backgroundColor = bgColor;
        } else {
            dashboard.style.backgroundColor = bgColor;
        }
        var iframe = document.getElementById('game-url');
        iframe.src = '../uploads/' + response.id + '/empty.html';
        let gameTitle = document.getElementById('game-title');
        gameTitle.innerHTML = response.title;
        let gameAuthor = document.getElementById('game-author');
        gameAuthor.innerHTML = response.username;
        let gameDescription = document.getElementById('game-description');
        gameDescription.innerHTML = response.description;
    },
    error: function () {
        const gameError = document.getElementById('game');
        gameError.innerHTML = 'Error 404: page not found';
    }
})

window.addEventListener('resize', () => {
    if (parseInt(window.getComputedStyle(document.getElementById('body')).width) > 1024) {
        fbody.style.backgroundColor = bgColor;
        dashboard.style.backgroundColor = bgColor;
    } else {
        dashboard.style.backgroundColor = bgColor;
    }
})


var sendData = document.getElementById('send-button');
sendData.addEventListener('click', function(event) {
    event.preventDefault();
    if (username == undefined) {
        alert("You must be logged in");
    } else {
        var dataForm = {
            textReview: document.querySelector('#writeReview').value,
            starValue: $("input[name='rate']:checked").val(),
            gameId: gameId,
        }
        $.ajax({
            type: 'POST',
            url: '/send/review',
            data: dataForm,
            success: function(response) {
                console.log(response);
                window.location.reload();
            }
        })
    }
})

var cardsContainer = document.getElementById('cards-container');
var reviewsList = [];

$.ajax({
    type: 'GET',
    url: '/receive/review/' + gameId,
    dataType: 'json',
    success: function(response) {
        for (let i=0; i<response.length; i++) {
            let card = new cardReview(response[i].text, response[i].stars, response[i].username);
            reviewsList.push(card);
            card.appendTo(cardsContainer);
        }
    }
})

for (let i=1; i<=5; i++) {
    document.getElementById('filter-star-' + i).addEventListener('click', () => {
        reviewsList.forEach(card => {
            if (card.numberOfStars != i) {
                card.removeFromFather();
            } else {
                card.appendTo(cardsContainer);
            }
        })
    })
}

document.getElementById('filter-all').addEventListener('click', function() {
    reviewsList.forEach(card => card.appendTo(cardsContainer));
})