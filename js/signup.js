document.getElementById('signup-button').onclick = (event) => {
    event.preventDefault();
    $('.flip-card__input').css("border-color", "var(--main-color)")
    $('#general-error').html("");
    const dataForm = {
        username: document.querySelector('#userRegistrazione').value,
        email: document.querySelector('#emailRegistrazione').value,
        password: document.querySelector('#passwordRegistrazione').value
    }
    let list = [];
    if (dataForm.username.length == 0) list.push($('#userRegistrazione'));
    if (dataForm.email.length == 0) list.push($('#emailRegistrazione'));
    if (dataForm.password.length == 0) list.push($('#passwordRegistrazione'));
    list.forEach((element) => {
        $(element).css("border-color", "red");
    })
    if (list.length > 0) {
        $('#signup-button').addClass('shake').on('animationend', function (event) {
            $(this).removeClass('shake');
        });
        return;
    }
    $.ajax({
        type: 'POST',
        url: '/signup',
        data: dataForm,
        success: function (response) {
            console.log("Response from server: ", response);
            if (response == "Max 20 characters") {
                $('#general-error').html('Username: ' + response);
                $('#signup-button').addClass('shake').on('animationend', function (event) {
                    $(this).removeClass('shake');
                });
            } else if (response == "Username already taken") {
                $('#general-error').html(response);
                $('#signup-button').addClass('shake').on('animationend', function (event) {
                    $(this).removeClass('shake');
                });
            } else if (response == "Email already used") {
                $('#general-error').html(response);
                $('#signup-button').addClass('shake').on('animationend', function (event) {
                    $(this).removeClass('shake');
                });
            } else if (response == "Invalid email") {
                $('#general-error').html(response);
                $('#signup-button').addClass('shake').on('animationend', function (event) {
                    $(this).removeClass('shake');
                });
            } else {
                window.location.href = '/';
            }
        },
    })
}