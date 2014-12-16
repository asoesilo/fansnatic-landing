// Javascript Document

/* =================================
   LOADER
=================================== */
// makes sure the whole site is loaded
$(window).load(function() {

    "use strict";

    // will first fade out the loading animation
    $(".signal").fadeOut();
        // will fade out the whole DIV that covers the website.
    $(".preloader").fadeOut("slow");

});


/* =================================
   LOGIN-SIGNUP MODAL
=================================== */

function showRegisterForm(){
    "use strict";
    $('.loginBox').fadeOut('fast',function(){
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast',function(){
            $('.register-footer').fadeIn('fast');
        });
        $('.modal-title').html('Create an Account');
        $('.modal-subtitle').html('Begin a 30-day free trial of SmartMVP');
    });
    $('.error').removeClass('alert alert-danger').html('');
}


function showLoginForm(){
    "use strict";
    $('#loginModal .registerBox').fadeOut('fast',function(){
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');
        });

        $('.modal-title').html('Sign in to <span>SmartMvp</span>');
        $('.modal-subtitle').html('Enter your email and password');
    });
    $('.error').removeClass('alert alert-danger').html('');
}


function openLoginModal(){
    "use strict";
    showLoginForm();
    $('#loginModal').modal('show');
}


function openRegisterModal(){
    "use strict";
    showRegisterForm();
    $('#loginModal').modal('show');
}


/* =================================
   EARLY ACCESS MODAL
=================================== */
function showEarlyAccessForm(){
    "use strict";
    $('.modal-title').html('Get Early Access');
    $('.modal-subtitle').html('Enter your email and Join Beta.');

    $('.error').removeClass('alert alert-danger').html('');
}

function openEarlyAccessModal(){
    "use strict";
    showEarlyAccessForm();
    $('#loginModal').modal('show');
}


/* =================================
   SCROLL NAVBAR
=================================== */
$(window).scroll(function(){
    "use strict";
    var b = $(window).scrollTop();
    if( b > 60 ){
        $(".navbar").addClass("is-scrolling");
    } else {
        $(".navbar").removeClass("is-scrolling");
    }
});


/* =================================
   DATA SPY FOR ACTIVE SECTION
=================================== */
(function($) {

    "use strict";

    $('body').attr('data-spy', 'scroll').attr('data-target', '.navbar-fixed-top').attr('data-offset', '11');

})(jQuery);


/* =================================
   HIDE MOBILE MENU AFTER CLICKING
=================================== */
(function($) {

    "use strict";

    $('.nav.navbar-nav li a').click(function () {
        var $togglebtn = $(".navbar-toggle");
        if (!($togglebtn.hasClass("collapsed")) && ($togglebtn.is(":visible"))){
            $(".navbar-toggle").trigger("click");
        }
    });

})(jQuery);


/* ==================================================== */
/* ==================================================== */
/* =======================================================
   DOCUMENT READY
======================================================= */
/* ==================================================== */
/* ==================================================== */

$(document).ready(function() {


"use strict";

/* =================================
   SCROLL TO
=================================== */
var onMobile;

onMobile = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) { onMobile = true; }

if (onMobile === true) {
    jQuery('a.scrollto').click(function (event) {
    jQuery('html, body').scrollTo(this.hash, this.hash, {gap: {y: -10}, animation:  {easing: 'easeInOutCubic', duration: 0}});
    event.preventDefault();
});
} else {
    jQuery('a.scrollto').click(function (event) {
    jQuery('html, body').scrollTo(this.hash, this.hash, {gap: {y: -10}, animation:  {easing: 'easeInOutCubic', duration: 1500}});
        event.preventDefault();
});
}


/* ==========================================
   FUNCTION FOR EMAIL ADDRESS VALIDATION
============================================= */
function isValidEmail(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}

/* ==========================================
   LOCAL NEWSLETTER/EARLY ACCESS SUBSCRIPTION
============================================= */
$("#subscribe").submit(function(e) {
    e.preventDefault();
    var data = {
        email: $("#email-field").val()
    };
    if ( isValidEmail(data['email']) ) {
        $.ajax({
            type: "POST",
            url: "/signup",
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            data: data,
            success: function() {
                $('.subscription-success').fadeIn(500);
                $('.subscription-failed').fadeOut(500);
            }
        });
    } else {
        $('.subscription-failed').fadeIn(500);
        $('.subscription-success').fadeOut(500);
    }

    return false;
});


/* ==========================================
   EARLY ACCESS MODAL VALIDATION
============================================= */
$("#earlyaccess-modal").submit(function(e) {
    e.preventDefault();
    var data = {
        email: $("#lm-email").val()
    };

    if ( isValidEmail(data['email']) ) {
        $.ajax({
            type: "POST",
            url: "assets/php/subscribe.php",
            data: data,
            success: function() {
                $('.lm-success').fadeIn(1000);
                $('.lm-failed').fadeOut(500);
            }
        });
    } else {
        $('.lm-failed').fadeIn(1000);
        $('.lm-success').fadeOut(500);
    }

    return false;
});

/* ========================================================================================
   SIGNUP-DIVIDER VALIDATION. WITHOUT CONFIRM PSW. FIELD VALUES WILL BE SENT TO SIGNUP.PHP
=========================================================================================== */
$("#signup-divider").submit(function(e) {
    e.preventDefault();
    var data = {
        email: $("#signup-email").val(),
        password: $("#signup-password").val()
    };

    if ( isValidEmail(data['email']) && (data['password'].length > 1)) {
        $.ajax({
            type: "POST",
            url: "assets/php/subscribe.php",
            data: data,
            success: function() {
                $('.signup-success').fadeIn(1000);
                $('.signup-failed').fadeOut(0);
            }
        });
    } else {
        $('.signup-failed').fadeIn(1000);
        $('.signup-success').fadeOut(500);
    }

    return false;
});

/* ========================================================================================
   FAST-REGISTRATION VALIDATION. WITHOUT CONFIRM PSW. FIELD VALUES WILL BE SENT TO SIGNUP.PHP
=========================================================================================== */
$("#fast-reg").submit(function(e) {
    e.preventDefault();
    var data = {
        name: $("#fast-name").val(),
        email: $("#fast-email").val(),
        password: $("#fast-password").val()
    };

    if ( isValidEmail(data['email']) && (data['password'].length > 1) && (data['name'].length > 1) ) {
        $.ajax({
            type: "POST",
            url: "assets/php/subscribe.php",
            data: data,
            success: function() {
                $('.fast-success').fadeIn(1000);
                $('.fast-failed').fadeOut(500);
            }
        });
    } else {
        $('.fast-failed').fadeIn(1000);
        $('.fast-success').fadeOut(500);
    }

    return false;
});


/* ===========================================================
   BOOTSTRAP FIX FOR IE10 in Windows 8 and Windows Phone 8
============================================================== */
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style');
    msViewportStyle.appendChild(
        document.createTextNode(
            '@-ms-viewport{width:auto!important}'
            )
        );
    document.querySelector('head').appendChild(msViewportStyle);
}


});
