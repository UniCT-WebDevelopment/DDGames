var fbody = document.getElementById('fbody');

document.getElementById('login-button').onclick = (event) => {
    event.preventDefault();
    $('.flip-card__input').css("border-color", "var(--main-color)");
    $('#wrong-credentials').html("");
    const dataForm = {
        email: document.querySelector('#emailLogin').value,
        password: document.querySelector('#passwordLogin').value
    }
    let list = [];
    if (dataForm.email.length == 0) list.push($('#emailLogin'));
    if (dataForm.password.length == 0) list.push($('#passwordLogin'));
    list.forEach((element) => {
        $(element).css("border-color", "red");
    })
    if (list.length > 0) {
        $('#login-button').addClass('shake').on('animationend', function (event) {
            $(this).removeClass('shake');
        });
        return;
    }
    $.ajax({
        type: 'POST',
        url: '/login',
        data: dataForm,
        success: function(response) {
            if (response == "Successful login") {
                window.location.href = '/';
            } else {
                $('#wrong-credentials').html("Wrong credentials");
                $('#login-button').addClass('shake').on('animationend', function (event) {
                    $(this).removeClass('shake');
                });
            }
        }
    })
}

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

$.ajax({
    type: 'GET',
    url: '/session',
    success: function(response) {
        if (response == "You are not logged in") {
          
        } else {
            window.location.href = '/profile.html';
        }
    }
})

var popup = document.getElementById('menu-popup');

document.getElementById('menu-button').addEventListener('click', () => {
    const usernamePopup = document.getElementById('username');
    if (popup.style.display == 'none') {
        popup.style.display = 'flex';
                
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