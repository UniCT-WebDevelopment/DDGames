var fbody = document.getElementById('fbody');
var dropdown = document.getElementById('dropdown-menu');
var username;
var onDropdown = false;
var user = document.getElementById('user');

user.addEventListener('mouseenter', function() {
    onDropdown = true;
})

user.addEventListener('mouseleave', function() {
    onDropdown = false;
})


dropdown.addEventListener('mouseenter', function() {
    onDropdown = true;
})

dropdown.addEventListener('mouseleave', function() {
    onDropdown = false;
})

fbody.addEventListener('click', function() {
    if (!onDropdown) {
        dropdown.remove();
    }
})

function copyText() {
    navigator.clipboard.writeText("ddgames912@gmail.com");
    let popup = document.createElement('div');
    popup.innerHTML = ("Email copied to clipboard");
    popup.className = 'popup';
    fbody.appendChild(popup);
    popup.addEventListener('animationend', function (event) {
        if (event.elapsedTime == 2) {
            fbody.removeChild(popup);
        }
    })
}

var upload = document.getElementById('upload-a-game');

function logged() {
    upload.innerHTML = 'Welcome ' + username;
    upload.className = 'upload-a-game welcome-user';
}

user.addEventListener('click', function () {
    if (username) {
        if (fbody.contains(dropdown)) {
            fbody.removeChild(dropdown);
        } else {
            fbody.appendChild(dropdown);
            let tmp = document.getElementById('username-dropdown');
            if (tmp.innerHTML == '') {
                tmp.innerHTML = username;
            }
        }
    } else {
        window.location.href = '/login.html';
    }
})

function profile() {
    window.location.href = '/profile.html';
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

var popup = document.getElementById('menu-popup');

document.getElementById('menu-button').addEventListener('click', () => {
    const usernamePopup = document.getElementById('username');
    if (popup.style.display == 'none') {
        popup.style.display = 'flex';
        if (usernamePopup.innerHTML.length == 0) {
            let itemsBottom = document.getElementById('items-bottom');
            if (username) {
                usernamePopup.innerHTML = username;
                let admin = document.createElement('div');
                itemsBottom.append(admin);
                $.ajax({
                    type: 'GET',
                    url: '/profile/admin/',
                    success: function(response) {
                        if (response == "You are an admin") {
                            admin.innerHTML += 'Admin';
                            admin.className = 'menu-icons';
                            let adminImg = document.createElement('img');
                            adminImg.src = '../img/admin.png';
                            adminImg.width = '25';
                            adminImg.height = '25';
                            admin.prepend(adminImg);
                            admin.addEventListener('click', () => {
                                window.location.href = '/admin.html';
                            })
                        }
                    }
                })
                let profile = document.createElement('div');
                profile.innerHTML = 'Profile';
                profile.className = 'menu-icons';
                let profileImg = document.createElement('img');
                profileImg.src = '../img/userD.png';
                profileImg.width = '25';
                profileImg.height = '25';
                profile.prepend(profileImg);
                itemsBottom.append(profile);
                profile.addEventListener('click', () => {
                    window.location.href = '/profile.html';
                })

                let logout2 = document.createElement('div');
                logout2.innerHTML = 'Logout';
                logout2.className = 'menu-icons';
                let logoutImg = document.createElement('img');
                logoutImg.src = '../img/power-off.png';
                logoutImg.width = '25';
                logoutImg.height = '25';
                logout2.prepend(logoutImg);
                itemsBottom.append(logout2);
                popup.append(itemsBottom);
                logout2.addEventListener('click', () => {
                    logout();
                })
            } else {
                usernamePopup.innerHTML = 'Login';
                usernamePopup.className += ' menu-login';
                usernamePopup.addEventListener('click', () => {
                    window.location.href = '/login.html';
                })
            }
        }
    } else {
        popup.style.display = 'none';
    }
})

window.addEventListener('resize', () => {
    popup.style.display = 'none';
})

document.getElementById('dashboard').addEventListener('click', () => {
    popup.style.display = 'none';
})