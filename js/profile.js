var yourGames = document.getElementById('your-games-container');
var yourReviews = document.getElementById('show-reviews');

document.getElementById('upload-button').addEventListener('click', function (event) {
    event.preventDefault();
    var flag = false;
    var dataForm = new FormData(); 
    dataForm.append('title', document.querySelector('#title-input').value)
    dataForm.append('description', document.querySelector('#description-input').value)
    dataForm.append('category', document.querySelector('#category').value)
    dataForm.append('files', document.querySelector('#select-image').files[0])
    dataForm.append('files', document.querySelector('#upload-p5js').files[0])
    for (let i=0; i<document.querySelector('#upload-data').files.length; i++) {
        dataForm.append('files', document.querySelector('#upload-data').files[i]);
    }
    for (let pair of dataForm.entries()) {
        if (pair[1] == null || pair[1] === "") { 
            console.log("At least one field is empty");
            flag = true;
            break; 
        }
    }
    var imageFile = document.querySelector('#select-image').files[0];
    var scriptFile = document.querySelector('#upload-p5js').files[0];
    if ((!imageFile || !scriptFile)) {
        flag = true;
    }
    if (flag) {
        return;
    } else {
        $.ajax({
            type: 'POST',
            url: '/uploadGame',
            data: dataForm,
            processData: false, 
            contentType: false, 
            success: function (response) {
                window.location.reload();
            }
        })
    }
})


$.ajax({
    type: 'GET',
    url: '/session',
    success: function (response) {
        dropdown.remove();
        dropdown.style.display = 'flex';
        if (response == "You are not logged in") {
            window.location.href = '/login.html';
        } else {
            username = response;
            logged();
            $.ajax({
                type:'GET',
                url: '/get/category/list',
                dataType: 'JSON',
                success: function(response) {
                    var categorySelect = document.getElementById('category');
                    for (let i=0; i<response.length; i++) {
                        let option = document.createElement('option');
                        option.value = response[i].id;
                        option.innerHTML = response[i].title;
                        categorySelect.append(option);
                    }
                }
            })
            $.ajax({
                type: 'GET',
                url: '/get/profile/games',
                success: function (response2) {
                    for (let i=0; i<response2.length; i++) {
                        const imagePath = '/uploads/' + response2[i].id + '/' + response2[i].id + response2[i].image;
                        let card = new Card(response2[i].title, response2[i].category, imagePath, response2[i].id, response2[i].views, true);
                        card.setAvgReviews(response2[i].averageStars);
                        card.appendTo(yourGames);
                    }
                }
            })
            $.ajax({
                type: 'GET',
                url: '/profile/admin/',
                success: function(response3) {
                    if (response3 == "You are an admin") {
                        let admin = document.createElement('div');
                        let uploadwrite = document.getElementById('upload-write');
                        admin.style.width = "100%";
                        admin.innerHTML = `<div class="toolbar-admin"><a href="/admin.html">ADMIN</a></div>`;
                        uploadwrite.prepend(admin);
                        upload.style.width = "100%";
                    }
                }
            })
        }
    }
})

$.ajax({
    type: 'GET',
    url: '/profile/reviews',
    dataType: 'json',
    success: function(response) {
        for (let i=0; i<response.length; i++) {
            let card = new cardReview(response[i].text, response[i].stars, null);
            card.changeFrom('Game title: ' + response[i].title);
            card.appendTo(yourReviews);
        }
    }
})

var switchFolder = document.getElementsByClassName('folder');

for (let i=0; i<3; i++) {
    switchFolder[i].addEventListener('click', function() {
        for (let j=0; j<3; j++) {
            switchFolder[j].style.zIndex = 0;
        }
        const id = switchFolder[i].id.substring(switchFolder[i].id.length -1);
        switch(id) {
            case "1":
                document.getElementById('your-games').style.zIndex = 1;
                document.getElementById('upload-game').style.zIndex = 0;
                document.getElementById('your-reviews').style.zIndex = 0;
                break;
            case "2":
                document.getElementById('your-games').style.zIndex = 0;
                document.getElementById('upload-game').style.zIndex = 1;
                document.getElementById('your-reviews').style.zIndex = 0;
                break;
            case "3":
                document.getElementById('your-games').style.zIndex = 0;
                document.getElementById('upload-game').style.zIndex = 0;
                document.getElementById('your-reviews').style.zIndex = 1;
                break;
                
        }
        switchFolder[i].style.zIndex = 1;
    })
}