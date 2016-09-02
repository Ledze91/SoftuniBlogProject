const kinveyBaseUrl = 'https://baas.kinvey.com/';
const kinveyAppID = 'kid_Hkdx4K-o';
const appSecrets = '1409eda0984441d59da60bfbb0d0597f';
/* Ajax "Loading" event listener */
$(document).on({
    ajaxStart: function () {
        $('#infoBox').show();
    },
    ajaxStart: function () {
        $('#infoBox').hide();
    }
});
function showInfo(mesgText) {
    $('#infoBox').text(mesgText).show().delay(2000).fadeOut(2000);
}
function ajaxError(data) {
    let errorMsg = "ОПИТАЙ ПАК";
    $('#errorBox').text(errorMsg).show().delay(2000).fadeOut(2000);

}
function login() {
    let loginData = {
        username: $('#loginUser').val(),
        password: $('#loginPass').val()
    };
    $.ajax({
        method: "POST",
        url: kinveyBaseUrl + 'user/' + kinveyAppID + '/login',
        data: loginData,
        headers: { "Authorization": "Basic " + btoa(kinveyAppID + ":" + appSecrets) },
        success: loginSucces,
        error: ajaxError
    });
    function loginSucces(data) {
        sessionStorage.authToken = data.authToken;
        showInfo('Успешен вход!');
        window.setTimeout(function () {
            location.href = 'home-page.html';
            },3000);
    }
}
function register() {
    let fName = $('#fullName').val();
    let uName = $('#userName').val();
    let password = $('#passInput').val();
    let passwordConf = $('#passwordConfirm').val();
    if (fName === "") {
        showInfo("Oпитай пак! - ИМЕ-  е празно");
    }
    else if(uName === ""){
        showInfo("Опитай пак! -ПОТРЕБИТЕЛ- е празно");
    }
    else if(password.length < 4){
        showInfo("Паролата трябва да бъде минимум 4 символа");
    }
    else if(password != passwordConf){
        showInfo("Несъвпадение в паролите!");
    }
    else {
        registerMe();
    }
        function registerMe() {
            let registerData = {
                name: $('#fullName').val(),
                username: $('#userName').val(),
                password: $('#passInput').val(),
                passwordConf: $('#passwordConfirm').val(),
                
            };
            $.ajax({
                method: "POST",
                url: kinveyBaseUrl + 'user/' + kinveyAppID + '/',
                data: registerData,
                headers: {
                    "Authorization": "Basic " + btoa(kinveyAppID + ":" + appSecrets)
                },
                success: registerSucces,
                error: ajaxError,

            });

            function registerSucces(data) {
                sessionStorage.authToken = data.authToken;
                showInfo('Успешна регистрация!');
                window.setTimeout(function () {
                    location.href = 'index.html';
                },3000);

            }
        }
    }
$(function () {
    $('#formLogin').submit(function (e) { e.preventDefault(); login() });
    $('#formRegister').submit(function (e) { e.preventDefault(); register() });
});

function logout() {
    alert('logout');
    sessionStorage.clear();

}
$(document).ready(function(){

    //Check to see if the window is top if not then display button
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    //Click event to scroll to top
    $('.scrollToTop').click(function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });

});
function link() {
    var link_s = document.getElementById('link_id').value;
    document.getElementById('link_str').innerHTML = link_s.link()
}
var comment = $('.comment').val(); // your comment text box
$.ajax({
    type: 'POST',
    url: $(this).attr('action'),
    data: $(this).serialize(),
    success: function (data) {

        $('.commentbox').append("</br>" + comment); // list of comments. its inserting your last comment at the end of line.

    }
});
