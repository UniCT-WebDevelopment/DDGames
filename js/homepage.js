$.ajax({
    type: 'GET',
    url: '/get/category/list',
    dataType: 'JSON',
    success: function(response) {
        const ul = document.getElementById('category-list');
        for(let i=0; i<response.length; i++) {
            const html = `
            <li style="--clr:`+ response[i].nameColor +`">
                <a href="category/`+response[i].id+`">
                    <img src="img/categories/`+ response[i].id +`.png" width="28px" height="28px">
                    `+ response[i].title +`
                </a>
            </li>
            `
            ul.innerHTML += html;
        }
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
    url: '/highest/rated',
    dataType: 'json',
    success: function(response) {
        var highestRated = document.getElementById('highest-rated');
        const imagePath = '/uploads/' + response.id + '/' + response.id + response.image;
        let card = new Card(response.title, response.category, imagePath, response.id, response.views);
        card.biggerCard(response.description);
        card.setAvgReviews(response.stars);
        card.appendTo(highestRated);
    }
})

$.ajax({
    type: 'GET',
    url: '/most/played',
    dataType: 'json',
    success: function(response) {
        var mostPlayed = document.getElementById('most-played')
        const imagePath = '/uploads/' + response.id + '/' + response.id + response.image;
        let card = new Card(response.title, response.category, imagePath, response.id, response.views);
        card.biggerCard(response.description);
        card.setAvgReviews(response.stars);
        card.appendTo(mostPlayed);
    }
})

$.ajax({
    type: 'GET',
    url: '/recommended',
    dataType: 'json',
    success: function(response) {
        var recommendedGame = document.getElementById('recommended-game')
        const imagePath = '/uploads/' + response.id + '/' + response.id + response.image;
        let card = new Card(response.title, response.category, imagePath, response.id, response.views);
        card.biggerCard(response.description);
        card.setAvgReviews(response.stars);
        card.appendTo(recommendedGame);
    }
})
