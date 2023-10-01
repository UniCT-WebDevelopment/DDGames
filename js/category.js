var fbody = document.getElementById('fbody');
var dashboard = document.getElementById('dashboard');
var gamesList = [];
var bgColor;
var categoryId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
var nameCategory = document.getElementById('title-category');
var outerdb = document.getElementById('outer-db');

$.ajax({
    type: 'GET',
    url: '/get/category/list',
    dataType: 'JSON',
    success: function(response) {
        for (let i=0; i<response.length; i++) {
            if (response[i].id == categoryId) {
                bgColor = response[i].bgColor;
                nameCategory.innerHTML = response[i].title + ' Games';
                nameCategory.style.color = response[i].nameColor;
                outerdb.style.borderColor = response[i].nameColor;
                break;
            }
        }
        if (!bgColor) {
            outerdb.innerHTML = 'Error 404: page not found';
            outerdb.style.display = 'flex';
            outerdb.style.justifyContent = 'center';
            outerdb.style.fontSize = '22px';
            outerdb.style.fontFamily = 'Fragment-Core, sans-serif';
            outerdb.style.fontWeight = 'bold';
        }
        if (parseInt(window.getComputedStyle(document.getElementById('body')).width) > 1024) {
            fbody.style.backgroundColor = bgColor;
            dashboard.style.backgroundColor = bgColor;
        } else {
            dashboard.style.backgroundColor = bgColor;
        }
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

$.ajax({
    type: 'GET',
    url: '/categories' + window.location.href.substring(window.location.href.lastIndexOf('/')),
    success: function(response) {
        for (let i=0; i<response.length; i++) {
            const imagePath = '/uploads/' + response[i].id + '/' + response[i].id + response[i].image;
            let card = new Card(response[i].title, response[i].category, imagePath, response[i].id, response[i].views);
            card.setAvgReviews(response[i].average);
            gamesList.push(card);
            const internalDB = document.getElementById('internal-db');
            card.appendTo(internalDB);
        }
    }
})