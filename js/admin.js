var menuList = document.getElementsByClassName('element-list');
var mainDashboard = document.getElementById('main-dashboard');

for (let i = 0; i < menuList.length; i++) {
    menuList[i].addEventListener('click', () => {
        for (let j = 0; j < menuList.length; j++) {
            menuList[j].classList.remove('element-list-clicked');
            menuList[j].style.backgroundColor = '';
        }
        menuList[i].classList.add("element-list-clicked");
        switch (menuList[i].id) {
            case '1':
                dashboard();
                break;
            case '2':
                games();
                break;
            case '3':
                users();
                break;
            case '4':
                reviews();
                break;
            case '5':
                window.location.href = '/';
                break;
            case '6':
                logout();
                break;
            case '7':
                window.location.href ='/profile.html';
            case '8':
                categories();
        }
    })
    menuList[i].addEventListener('mousedown', () => {
        menuList[i].style.scale = 0.95;
    })
    menuList[i].addEventListener('mouseup', () => {
        menuList[i].style.scale = 1;
    })
    menuList[i].addEventListener('mouseenter', () => {
        if (!menuList[i].classList.contains('element-list-clicked')) {
            menuList[i].style.backgroundColor = '#404040';
        }
    })
    menuList[i].addEventListener('mouseleave', () => {
        if (!menuList[i].classList.contains('element-list-clicked')) {
            menuList[i].style.backgroundColor = '#303030';
        }
    })
}

function logout() {
    $.ajax({
        type: 'GET',
        url: '/logout',
        success: function (response) {
            if (response == "Logged out") {
                window.location.href = '/';
            }
        }
    })
}

function dashboard() {
    const html = `
    <div class="dashboard">
        <h2 style="margin-top: 0;">Dashboard</h2>
        <div class="inner-dashboard">
            <div>
                <div class="inner-dashboard-elements">
                    <div class="title">TOTAL GAME VIEWS</div>
                    <hr>
                    <div class="views">
                        <img src="../img/man.png" width="50px" height="50px">
                        <div id="views-counter"></div>
                    </div>
                </div>
                <div class="inner-dashboard-elements">
                    <div class="title">HIGHEST RATED</div>
                    <hr>
                    <div class="recommended-card">
                        <div class="img">
                            <img id="highest-rated-img" width="200" height="150">
                        </div>
                        <br>
                        <div class="datas">
                            <div id="highest-rated-id"><span class="bold-infos">Id: </span></div>
                            <div id="highest-rated-title"><span class="bold-infos">Title: </span></div>
                            <div id="highest-rated-author"><span class="bold-infos">Author: </span></div>
                            <div id="highest-rated-description"><span class="bold-infos">Description: </span></div>
                            <div id="highest-rated-category"><span class="bold-infos">Category: </span></div>
                            <div id="highest-rated-views"><span class="bold-infos"><img src="../img/eye.png" width="16" height="16" style="position: relative; top:2px; margin-right: 2px;"></span></div>
                            <div id="highest-rated-reviews"><span class="bold-infos">★★★★★<div id="hr-stars" class="inner-stars">★★★★★</div></span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="inner-dashboard-elements">
                <div class="title">RECOMMENDED</div>
                <hr>
                <div class="recommended-card">
                    <div>
                        <h4 style="margin: 0; margin-bottom: 5px; padding: 0;">Set a new recommended game</h4>
                        <select id="new-rec-game">
                            <option value="0" disabled selected>Select an option</option>
                        </select>
                        <input type="submit" id="new-rec-submit">
                        <span id="error" style="color: rgb(118, 3, 3); font-size: 14px;"></span>
                        <hr>
                    </div>
                    <br>
                    <div class="img">
                        <img id="rec-img" width="200" height="150">
                    </div>
                    <br>
                    <div class="datas">
                        <div id="rec-id"><span class="bold-infos">Id: </span></div>
                        <div id="rec-title"><span class="bold-infos">Title: </span></div>
                        <div id="rec-author"><span class="bold-infos">Author: </span></div>
                        <div id="rec-description"><span class="bold-infos">Description: </span></div>
                        <div id="rec-category"><span class="bold-infos">Category: </span></div>
                        <div id="rec-views"><span class="bold-infos"><img src="../img/eye.png" width="16" height="16" style="position: relative; top:2px; margin-right: 2px;"></span></div>
                        <div id="rec-reviews"><span class="bold-infos">★★★★★ <div id="rc-stars" class="inner-stars">★★★★★</div></span></div>
                    </div>
                </div>
            </div>
            <div class="inner-dashboard-elements">
                <div class="title">MOST PLAYED</div>
                <hr>
                <div class="recommended-card">
                    <div class="img">
                        <img id="most-played-img" width="200" height="150">
                    </div>
                    <br>
                    <div class="datas">
                        <div id="most-played-id"><span class="bold-infos">Id: </span></div>
                        <div id="most-played-title"><span class="bold-infos">Title: </span></div>
                        <div id="most-played-author"><span class="bold-infos">Author: </span></div>
                        <div id="most-played-description"><span class="bold-infos">Description: </span></div>
                        <div id="most-played-category"><span class="bold-infos">Category: </span></div>
                        <div id="most-played-views"><span class="bold-infos"><img src="../img/eye.png" width="16" height="16" style="position: relative; top:2px; margin-right: 2px;"></span></div>
                        <div id="most-played-reviews"><span class="bold-infos">★★★★★ <div id="mp-stars" class="inner-stars">★★★★★</div></span></div>
                    </div>
                </div>
            </div>

            <!--
            <div class="inner-dashboard-elements">
                <div class="title">ADD A CATEGORY</div>
                <hr>
                <form>
                    <div class="form-category">
                        <div id="container-title">
                            <label for="title-input">Title</label>
                            <input type="text" id="title-input" name="title" placeholder="max 20 characters">
                            <div id="title-error" class="error"></div>
                        </div>
                        <div id="container-bg">
                            <label for="bgcolor-input">Background Color</label>
                            <input type="text" id="bgcolor-input" name="bg_color" placeholder="HEX value (e.g. #fafafa)" maxlength="7">
                            <div id="bg-error" class="error"></div>
                        </div>
                        <div id="container-tc">
                            <label for="titlecolor-input">Title Color</label>
                            <input type="text" id="titlecolor-input" name="title_color" placeholder="HEX value (e.g. #fafafa)" maxlength="7">
                            <div id="tc-error" class="error"></div>
                        </div>
                        <div id="container-icon">
                            <label for="icon-input">Icon (.png)</label>
                            <input type="file" id="icon-input" name="files" accept="image/*">
                            <div id="img-error" class="error"></div>
                        </div>
                        <input type="submit" id="submit">
                    </div>
                </form>
            </div>
            -->
        </div>
    </div>
    `;
    mainDashboard.innerHTML = html;

    $.ajax({
        type: 'GET',
        url: '/total/views',
        success: function (response) {
            let container = document.getElementById('views-counter');
            container.innerHTML = response;
        }
    })
    $.ajax({
        type: 'GET',
        url: '/recommended',
        dataType: 'json',
        success: function (response) {
            document.getElementById('rec-id').innerHTML += response.id;
            document.getElementById('rec-title').innerHTML += response.title;
            document.getElementById('rec-author').innerHTML += response.author;
            document.getElementById('rec-description').innerHTML += response.description;
            document.getElementById('rec-category').innerHTML += response.category + " - " + response.categoryName;
            document.getElementById('rec-views').innerHTML += response.views;
            if (response.stars) {
                document.getElementById('rc-stars').style.width = response.stars * 13.2;
            } else {
                document.getElementById('rc-stars').style.width = 0;
            }
            const imagePath = '/uploads/' + response.id + '/' + response.id + response.image;
            document.getElementById('rec-img').src = imagePath;
            $.ajax({
                type: 'GET',
                url: '/get/all/games',
                dataType: 'JSON',
                success: function(response) {
                    var recInput = document.getElementById('new-rec-game');
                    for (let i=0; i<response.length; i++) {
                        let html = "<option value='"+response[i].id+"'>"+response[i].id+" - "+response[i].title+"</option>"
                        recInput.innerHTML += html;
                    }
                }
            })
            document.getElementById('new-rec-submit').addEventListener('click', () => {
                if (document.getElementById('new-rec-game').value) {
                    $.ajax({
                        type: 'POST',
                        url: '/new/recommended/' + document.getElementById('new-rec-game').value,
                        success: function (response2) {
                            if (response2 == "Recommended game updated successfully") {
                                window.location.reload();
                            } else {
                                document.getElementById('error').innerHTML = 'Game does not exist!';
                            }
                        }
                    })
                }
            })
        }
    })
    $.ajax({
        type: 'GET',
        url: '/most/played',
        dataType: 'json',
        success: function (response) {
            document.getElementById('most-played-id').innerHTML += response.id;
            document.getElementById('most-played-title').innerHTML += response.title;
            document.getElementById('most-played-author').innerHTML += response.author;
            document.getElementById('most-played-description').innerHTML += response.description;
            document.getElementById('most-played-category').innerHTML += response.category + " - " + response.categoryName;
            document.getElementById('most-played-views').innerHTML += response.views;
            if (response.stars) {
                document.getElementById('mp-stars').style.width = response.stars * 13.2;
            } else {
                document.getElementById('mp-stars').style.width = 0;
            }
            const imagePath = '/uploads/' + response.id + '/' + response.id + response.image;
            document.getElementById('most-played-img').src = imagePath;
        }
    })
    $.ajax({
        type: 'GET',
        url: '/highest/rated',
        dataType: 'json',
        success: function (response) {
            document.getElementById('highest-rated-id').innerHTML += response.id;
            document.getElementById('highest-rated-title').innerHTML += response.title;
            document.getElementById('highest-rated-author').innerHTML += response.author;
            document.getElementById('highest-rated-description').innerHTML += response.description;
            document.getElementById('highest-rated-category').innerHTML += response.category + " - " + response.categoryName;
            document.getElementById('highest-rated-views').innerHTML += response.views;
            if (response.stars) {
                document.getElementById('hr-stars').style.width = response.stars * 13.2;
            } else {
                document.getElementById('hr-stars').style.width = 0;
            }
            const imagePath = '/uploads/' + response.id + '/' + response.id + response.image;
            document.getElementById('highest-rated-img').src = imagePath;
        }
    })
}

function games() {
    const html = `
    <h2 style="margin-top: 0;">All games</h2>
    <div class="filter-categories">🔍Filter category
        <div>
            <select id="filter-categories">
                <option value="0" selected>All categories</option>
                <option value="1">Arcade</option>
                <option value="2">Puzzle</option>
                <option value="3">Platform</option>
                <option value="4">Adventure</option>
                <option value="5">Logic</option>
                <option value="6">Fighting</option>
            </select>
        </div>
    </div>
    <div class="container-scroll-phone">
        <div class="inner-games" >
            <div class="header">
                <div class="header-element" style="flex: 1">Userid</div>
                <div class="header-element" style="flex: 1">Id</div>
                <div class="header-element" style="flex: 2">Title</div>
                <div class="header-element" style="flex: 2">Description</div>
                <div class="header-element" style="flex: 1">Category</div>
                <div class="header-element" style="flex: 1">Views</div>
                <div class="header-element" style="flex: 1">Avg Reviews</div>
                <div class="header-element" style="flex: 1"></div>
                <div class="header-element" style="flex: 1"></div>
            </div>
            <div id="inner-games"></div>
        </div>
    </div>
    `;
    mainDashboard.innerHTML = html;

    $.ajax({
        type: 'GET',
        url: '/get/all/games',
        dataType: 'json',
        success: function (response) {
            const innerGames = document.getElementById('inner-games');
            if (response != "You are not an admin") {
                for (let i = 0; i < response.length; i++) {
                    createRow(innerGames, response[i], i);
                }
            }
        }
    })

    const select = document.getElementById('filter-categories');
    select.addEventListener('change', function () {

        var selectedCategory = select.options[select.selectedIndex].value;

        $.ajax({
            type: 'GET',
            url: '/get/all/games',
            dataType: 'json',
            success: function (response) {
                const innerGames = document.getElementById('inner-games');
                innerGames.innerHTML = '';
                if (response != "You are not an admin") {
                    for (let i = 0; i < response.length; i++) {
                        if (selectedCategory == 0 || response[i].category == selectedCategory) {
                            createRow(innerGames, response[i], i);
                        } 
                    }
                }
            }
        })
    })
}

function createRow(innerGames, response, i) {
    const row = document.createElement('div');
    row.className = 'db-row';
    row.style.backgroundColor = (i % 2 ? '#d0d0d0' : '#e0e0e0'); 
    const userid = document.createElement('div');
    userid.innerHTML = response.userid;
    userid.style.flex = 1;
    row.append(userid);
    const id = document.createElement('div');
    id.innerHTML = response.id;
    id.style.flex = 1;
    row.append(id);
    const title = document.createElement('div');
    title.innerHTML = response.title;
    title.style.flex = 2;
    row.append(title);
    const description = document.createElement('div');
    description.innerHTML = response.description;
    description.style.flex = 2;
    row.append(description);
    const category = document.createElement('div');
    category.innerHTML = response.category + " - " + response.categoryName;
    category.style.flex = 1;
    row.append(category);
    const views = document.createElement('div');
    views.innerHTML = response.views;
    views.style.flex = 1;
    row.append(views);
    const reviews = document.createElement('div');
    reviews.innerHTML = response.reviews;
    reviews.style.flex = 1;
    row.append(reviews);
    const editWrite = document.createElement('div');
    const edit = document.createElement('div');
    editWrite.className = 'delWrite';
    editWrite.innerHTML = 'Edit ✏️';
    edit.style.flex = 1;
    edit.append(editWrite);
    editWrite.addEventListener('click', () => {
        mainDashboard.innerHTML = `
            <h2 style="margin-top: 0;">Edit selected game</h2>
            <div class="inner-dashboard">
                <form class="form-edit">
                    <div class="form-row" style="background-color: #d0d0d0;">
                        <label for="edit-text">Title</label>
                        <input type="text" id="edit-text" value="`+response.title+`">
                    </div>
                    <div class="form-row" style="background-color: #e0e0e0; height: 120px;">
                        <label for="edit-description">Description</label>
                        <textarea id="edit-description" style="width: 350px; height: 100px; resize: none;" maxlength="400" placeholder="max 400 characters">`+response.description+`</textarea>
                    </div>
                    <div class="form-row" style="background-color: #d0d0d0;">
                        <label for="select-category">Category</label>
                        <select id="select-category">
                            <option value="`+response.category+`" selected>`+response.category+" - "+response.categoryName+`</option>
                        </select>
                    </div>
                    <div class="form-buttons" style="background-color: #e0e0e0;">
                        <button id="back-categories">Back</button>
                        <button id="submit-edit">Submit</button>
                    </div>
                </form>
            </div>
        `;
        $.ajax({
            type: 'GET',
            url: '/get/category/list',
            dataType: 'JSON',
            success: function(response2) {
                const selectedCategory = document.getElementById('select-category');
                for (let i=0; i<response2.length; i++) {
                    if (response2[i].id != response.category) {
                        const html = `<option value="`+response2[i].id+`">`+response2[i].id+" - "+response2[i].title+`</option>`;
                        selectedCategory.innerHTML += html;
                    }
                }
            }
        })
        document.getElementById('back-categories').addEventListener('click', () => {
            games();
        })
        document.getElementById('submit-edit').addEventListener('click', (event) => {
            event.preventDefault();
            const dataForm = {
                title: document.querySelector('#edit-text').value,
                description: document.querySelector('#edit-description').innerHTML,
                category: document.querySelector('#select-category').value
            }
            $.ajax({
                type: 'POST',
                url: '/update/game/' + response.id,
                data: dataForm,
                success: function(response2) {
                    games();
                }, 
                error: function(error) {
                    alert(error.responseText);
                }
            })
        })
    })
    row.append(edit);
    const del = document.createElement('div');
    const delWrite = document.createElement('div');
    del.style.flex = 1;
    delWrite.innerHTML = 'Delete ❌';
    delWrite.className = 'delWrite';
    del.append(delWrite);
    delWrite.addEventListener('click', () => {
        let fbody = document.getElementById('f-empty-body');
        let confirmDelete = document.createElement('div');
        confirmDelete.className = 'confirm-delete';
        fbody.append(confirmDelete);
        let deleteWrite = document.createElement('div');
        deleteWrite.innerHTML = 'Are you sure you want to delete this game?';
        deleteWrite.className = 'delete-write';
        confirmDelete.appendChild(deleteWrite);
        let deleteButtons = document.createElement('div');
        deleteButtons.className = 'delete-buttons';
        confirmDelete.appendChild(deleteButtons);
        let yes = document.createElement('button');
        yes.innerHTML = 'Yes';
        yes.className = 'button1';
        deleteButtons.appendChild(yes);
        let no = document.createElement('button');
        no.innerHTML = 'No';
        no.className = 'button1';
        deleteButtons.appendChild(no);
        no.addEventListener('click', () => {
            fbody.removeChild(confirmDelete);
        })
        yes.addEventListener('click', () => {
            fbody.removeChild(confirmDelete);
            $.ajax({
                type: 'POST',
                url: '/delete/' + response.id,
                success: function(response) {
                    row.remove();
                }
            })
        })
    })
    row.append(del);
    innerGames.append(row);
}

function users() {
    const html = `
    <h2 style="margin-top: 0;">All users</h2>
    <div class="container-scroll-phone">
        <div class="inner-users">
            <div class="header">
                <div class="header-element" style="flex: 1">Id</div>
                <div class="header-element" style="flex: 2">Email</div>
                <div class="header-element" style="flex: 2">Username</div>
                <div class="header-element" style="flex: 2">Password</div>
                <div class="header-element" style="flex: 1"></div>
            </div>
            <div id="inner-users"></div>
        </div>
    </div>
    `;
    mainDashboard.innerHTML = html;

    $.ajax({
        type: 'GET',
        url: '/get/all/users',
        dataType: 'json',
        success: function (response) {
            const innerUsers = document.getElementById('inner-users');
            if (response != "You are not an admin") {
                for (let i = 0; i < response.length; i++) {
                    const row = document.createElement('div');
                    row.className = 'db-row';
                    row.style.backgroundColor = (i % 2 ? '#d0d0d0' : '#e0e0e0');
                    const id = document.createElement('div');
                    id.innerHTML = response[i].id;
                    id.style.flex = 1;
                    row.append(id);
                    const email = document.createElement('div');
                    email.innerHTML = response[i].email;
                    email.style.flex = 2;
                    row.append(email);
                    const username = document.createElement('div');
                    username.innerHTML = response[i].username;
                    username.style.flex = 2;
                    row.append(username);
                    const password = document.createElement('div');
                    password.innerHTML = response[i].password;
                    password.style.flex = 2;
                    row.append(password);
                    const del = document.createElement('div');
                    const delWrite = document.createElement('div');
                    del.style.flex = 1;
                    delWrite.innerHTML = 'Delete ❌';
                    delWrite.className = 'delWrite';
                    del.append(delWrite);
                    delWrite.addEventListener('click', () => {
                        let fbody = document.getElementById('f-empty-body');
                        let confirmDelete = document.createElement('div');
                        confirmDelete.className = 'confirm-delete';
                        fbody.append(confirmDelete);
                        let deleteWrite = document.createElement('div');
                        deleteWrite.innerHTML = 'Are you sure you want to delete this user and their games?';
                        deleteWrite.className = 'delete-write';
                        confirmDelete.appendChild(deleteWrite);
                        let deleteButtons = document.createElement('div');
                        deleteButtons.className = 'delete-buttons';
                        confirmDelete.appendChild(deleteButtons);
                        let yes = document.createElement('button');
                        yes.innerHTML = 'Yes';
                        yes.className = 'button1';
                        deleteButtons.appendChild(yes);
                        let no = document.createElement('button');
                        no.innerHTML = 'No';
                        no.className = 'button1';
                        deleteButtons.appendChild(no);
                        no.addEventListener('click', () => {
                            fbody.removeChild(confirmDelete);
                        })
                        yes.addEventListener('click', () => {
                            fbody.removeChild(confirmDelete);
                            $.ajax({
                                type: 'POST',
                                url: '/delete/user/' + response[i].id,
                                success: function(response) {
                                    row.remove();
                                }
                            })
                        })
                    })
                    row.append(del);
                    innerUsers.append(row);
                }
            }
        }
    })
}

function reviews() {
    const html = `
    <h2 style="margin-top: 0;">All users</h2>
    <div class="filter-categories">🔍Filter stars
    <div>
        <select id="filter-reviews">
            <option value="0" selected>All stars</option>
            <option value="1">1 star</option>
            <option value="2">2 stars</option>
            <option value="3">3 stars</option>
            <option value="4">4 stars</option>
            <option value="5">5 stars</option>
        </select>
    </div>
</div>
    <div class="container-scroll-phone">
        <div class="inner-reviews">
            <div class="header">
                <div class="header-element" style="flex: 1">Gameid</div>
                <div class="header-element" style="flex: 2">Game Title</div>
                <div class="header-element" style="flex: 1">Userid</div>
                <div class="header-element" style="flex: 2">Username</div>
                <div class="header-element" style="flex: 2">Description</div>
                <div class="header-element" style="flex: 1">Stars</div>
                <div class="header-element" style="flex: 1"></div>
            </div>
            <div id="inner-reviews"></div>
        </div>
    </div>
    `;
    mainDashboard.innerHTML = html;

    $.ajax({
        type: 'GET',
        url: '/get/all/reviews',
        dataType: 'json',
        success: function (response) {
            const innerReviews = document.getElementById('inner-reviews');
            if (response != "You are not an admin") {
                for (let i = 0; i < response.length; i++) {
                    createRowReview(innerReviews, response[i], i);
                }
            }
        }
    })

    const select = document.getElementById('filter-reviews');
    select.addEventListener('change', function () {

        var selectedStars = select.options[select.selectedIndex].value;

        $.ajax({
            type: 'GET',
            url: '/get/all/reviews',
            dataType: 'json',
            success: function (response) {
                const innerReviews = document.getElementById('inner-reviews');
                innerReviews.innerHTML = '';
                if (response != "You are not an admin") {
                    for (let i = 0; i < response.length; i++) {
                        if (selectedStars == 0 || response[i].stars == selectedStars) {
                            createRowReview(innerReviews, response[i], i);
                        } 
                    }
                }
            }
        })
    })
}

function createRowReview(innerReviews, response, i) {
    const row = document.createElement('div');
    row.className = 'db-row';
    row.style.backgroundColor = (i % 2 ? '#d0d0d0' : '#e0e0e0');
    const gameid = document.createElement('div');
    gameid.innerHTML = response.gameid;
    gameid.style.flex = 1;
    row.append(gameid);
    const title = document.createElement('div');
    title.innerHTML = response.title;
    title.style.flex = 2;
    row.append(title);
    const userid = document.createElement('div');
    userid.innerHTML = response.userid;
    userid.style.flex = 1;
    row.append(userid);
    const username = document.createElement('div');
    username.innerHTML = response.username;
    username.style.flex = 2;
    row.append(username);
    const description = document.createElement('div');
    description.innerHTML = response.description;
    description.style.flex = 2;
    row.append(description);
    const stars = document.createElement('div');
    stars.innerHTML = response.stars;
    stars.style.flex = 1;
    row.append(stars);

    const del = document.createElement('div');
    const delWrite = document.createElement('div');
    del.style.flex = 1;
    delWrite.innerHTML = 'Delete ❌';
    delWrite.className = 'delWrite';
    del.append(delWrite);
    delWrite.addEventListener('click', () => {
        let fbody = document.getElementById('f-empty-body');
        let confirmDelete = document.createElement('div');
        confirmDelete.className = 'confirm-delete';
        fbody.append(confirmDelete);
        let deleteWrite = document.createElement('div');
        deleteWrite.innerHTML = 'Are you sure you want to delete this review?';
        deleteWrite.className = 'delete-write';
        confirmDelete.appendChild(deleteWrite);
        let deleteButtons = document.createElement('div');
        deleteButtons.className = 'delete-buttons';
        confirmDelete.appendChild(deleteButtons);
        let yes = document.createElement('button');
        yes.innerHTML = 'Yes';
        yes.className = 'button1';
        deleteButtons.appendChild(yes);
        let no = document.createElement('button');
        no.innerHTML = 'No';
        no.className = 'button1';
        deleteButtons.appendChild(no);
        no.addEventListener('click', () => {
            fbody.removeChild(confirmDelete);
        })
        yes.addEventListener('click', () => {
            fbody.removeChild(confirmDelete);
            $.ajax({
                type: 'POST',
                url: '/delete/review/' + response.gameid + '/' + response.userid,
                success: function(response) {
                    row.remove();
                }
            })
        })
    })
    row.append(del);
    innerReviews.append(row);
}

function categories() {
    const html = `
    <h2 style="margin-top: 0;">All categories</h2>
    <div style="display: flex; justify-content: end; align-items: center; gap: 5px;">Add a category<button id="add-category" style="width: 22px; height: 22px; padding: 0;">➕</button></div>
    <div class="container-scroll-phone">
        <div class="inner-users" style="height: calc(100vh - 174px);">
            <div class="header">
                <div class="header-element" style="flex: 1">Id</div>
                <div class="header-element" style="flex: 2">Title</div>
                <div class="header-element" style="flex: 1">Image</div>
                <div class="header-element" style="flex: 2">Background Color</div>
                <div class="header-element" style="flex: 2">Name Color</div>
                <div class="header-element" style="flex: 1"></div>
                <div class="header-element" style="flex: 1"></div>
            </div>
            <div id="inner-categories"></div>
        </div>
    </div>
    `;
    mainDashboard.innerHTML = html;

    document.getElementById('add-category').addEventListener('click', () => {
        mainDashboard.innerHTML = `
        <h2 style="margin-top: 0;">Add a category</h2>
        <div class="inner-dashboard">
            <form class="form-edit">
                <div class="form-row" style="background-color: #d0d0d0;">
                    <label for="edit-text">Title</label>
                    <input type="text" id="edit-text">
                </div>
                <div class="form-row" style="background-color: #e0e0e0;">
                    <label for="edit-bg">Background color</label>
                    <input type="color" id="edit-bg">
                </div>
                <div class="form-row" style="background-color: #d0d0d0;">
                    <label for="edit-title">Title color</label>
                    <input type="color" id="edit-title">
                </div>
                <div class="form-row" style="background-color: #e0e0e0;">
                    <label for="edit-img">Icon</label>
                    <input type="file" id="edit-img" accept="image/png">
                </div>
                <div class="form-buttons" style="background-color: #d0d0d0;">
                    <button id="back-categories">Back</button>
                    <button id="submit-edit">Submit</button>
                </div>
            </form>
        </div>
    `;
        document.getElementById('back-categories').addEventListener('click', () => {
            categories();
        })
        document.getElementById('submit-edit').addEventListener('click', (event) => {
            event.preventDefault();
            var dataForm = new FormData();
            dataForm.append('title', document.querySelector('#edit-text').value)
            dataForm.append('bgColor', document.querySelector('#edit-bg').value)
            dataForm.append('nameColor', document.querySelector('#edit-title').value)
            dataForm.append('files', document.querySelector('#edit-img').files[0]);
            $.ajax({
                type: 'POST',
                url: '/add/category',
                data: dataForm,
                processData: false, 
                contentType: false, 
                success: function (response) {
                    categories();
                },
                error: function (err) {
                    alert(err.responseText);
                }
            })
        })
    })

    $.ajax({
        type: 'GET',
        url: '/get/category/list',
        dataType: 'json',
        success: function (response) {
            const innerCategories = document.getElementById('inner-categories');
                for (let i = 0; i < response.length; i++) {
                    const row = document.createElement('div');
                    row.className = 'db-row';
                    row.style.backgroundColor = (i % 2 ? '#d0d0d0' : '#e0e0e0');
                    const id = document.createElement('div');
                    id.innerHTML = response[i].id;
                    id.style.flex = 1;
                    row.append(id);
                    const title = document.createElement('div');
                    title.innerHTML = response[i].title;
                    title.style.flex = 2;
                    row.append(title);
                    const containerImage = document.createElement('div');
                    containerImage.style.display = 'flex';
                    containerImage.style.justifyContent = 'center';
                    containerImage.style.alignItems = 'center';
                    const image = document.createElement('img');
                    image.src = '../img/categories/' + response[i].id + '.png';
                    image.width = 20;
                    image.height = 20;
                    containerImage.append(image);
                    containerImage.style.flex = 1;
                    row.append(containerImage);
                    const bgColor = document.createElement('div');
                    bgColor.innerHTML = response[i].bgColor;
                    bgColor.style.flex = 2;
                    row.append(bgColor);
                    const nameColor = document.createElement('div');
                    nameColor.innerHTML = response[i].nameColor;
                    nameColor.style.flex = 2;
                    row.append(nameColor);
                    const editWrite = document.createElement('div');
                    const edit = document.createElement('div');
                    editWrite.className = 'delWrite';
                    editWrite.innerHTML = 'Edit ✏️';
                    edit.style.flex = 1;
                    edit.append(editWrite);
                    editWrite.addEventListener('click', () => {
                        mainDashboard.innerHTML = `
                            <h2 style="margin-top: 0;">Edit selected category</h2>
                            <div class="inner-dashboard">
                                <form class="form-edit">
                                    <div class="form-row" style="background-color: #d0d0d0;">
                                        <label for="edit-text">Title</label>
                                        <input type="text" id="edit-text">
                                    </div>
                                    <div class="form-row" style="background-color: #e0e0e0;">
                                        <label for="edit-bg">Background color</label>
                                        <input type="color" id="edit-bg">
                                    </div>
                                    <div class="form-row" style="background-color: #d0d0d0;">
                                        <label for="edit-title">Title color</label>
                                        <input type="color" id="edit-title">
                                    </div>
                                    <div class="form-row" style="background-color: #e0e0e0;">
                                        <label for="edit-img">Icon</label>
                                        <input type="file" id="edit-img" accept="image/png">
                                    </div>
                                    <div class="form-buttons" style="background-color: #d0d0d0;">
                                        <button id="back-categories">Back</button>
                                        <button id="submit-edit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        `;
                        document.getElementById('edit-text').value = response[i].title;
                        document.getElementById('edit-bg').value = response[i].bgColor;
                        document.getElementById('edit-title').value = response[i].nameColor;
                        document.getElementById('back-categories').addEventListener('click', () => {
                            categories();
                        })
                        document.getElementById('submit-edit').addEventListener('click', (event) => {
                            event.preventDefault();
                            var dataForm = new FormData();
                            dataForm.append('title', document.querySelector('#edit-text').value)
                            dataForm.append('bgColor', document.querySelector('#edit-bg').value)
                            dataForm.append('nameColor', document.querySelector('#edit-title').value)
                            dataForm.append('files', document.querySelector('#edit-img').files[0]);  
                            $.ajax({
                                type: 'POST',
                                url: '/update/category/' + response[i].id,
                                data: dataForm,
                                processData: false,
                                contentType: false,
                                success: function(response2) {
                                    categories();
                                }, 
                                error: function(error) {
                                    alert(error.responseText);
                                }
                            })
                        })
                    })
                    row.append(edit);
                    const del = document.createElement('div');
                    const delWrite = document.createElement('div');
                    del.style.flex = 1;
                    delWrite.innerHTML = 'Delete ❌';
                    delWrite.className = 'delWrite';
                    del.append(delWrite);
                    delWrite.addEventListener('click', () => {
                        let fbody = document.getElementById('f-empty-body');
                        let confirmDelete = document.createElement('div');
                        confirmDelete.className = 'confirm-delete';
                        fbody.append(confirmDelete);
                        let deleteWrite = document.createElement('div');
                        deleteWrite.innerHTML = 'Are you sure you want to delete this category and its games?';
                        deleteWrite.className = 'delete-write';
                        confirmDelete.appendChild(deleteWrite);
                        let deleteButtons = document.createElement('div');
                        deleteButtons.className = 'delete-buttons';
                        confirmDelete.appendChild(deleteButtons);
                        let yes = document.createElement('button');
                        yes.innerHTML = 'Yes';
                        yes.className = 'button1';
                        deleteButtons.appendChild(yes);
                        let no = document.createElement('button');
                        no.innerHTML = 'No';
                        no.className = 'button1';
                        deleteButtons.appendChild(no);
                        no.addEventListener('click', () => {
                            fbody.removeChild(confirmDelete);
                        })
                        yes.addEventListener('click', () => {
                            fbody.removeChild(confirmDelete);
                            $.ajax({
                                type: 'POST',
                                url: '/delete/category/' + response[i].id,
                                success: function(response) {
                                    row.remove();
                                }
                            })
                        })
                    })
                    row.append(del);
                    innerCategories.append(row);
                }
        }
    })
}

dashboard();

var menu = document.getElementById('menu');

document.getElementById('menu-phone').addEventListener('click', function() {
    if (menu.style.display == 'none')  {
        menu.style.display = 'flex';
    } else {
        menu.style.display = 'none';
    }
})

mainDashboard.addEventListener('click', function() {
    if (window.innerWidth <= 768) {
        menu.style.display = 'none';
    }
})

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        menu.style.display = 'flex';
    } else {
        menu.style.display = 'none';
    }
})