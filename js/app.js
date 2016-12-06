$(document).ready(function() {

	/* nav dropdown menu */
	if ($(window).width() > 992) {
		$('ul.nav li.dropdown').hover(function() {
			//$(this).find('.dropdown-menu').stop(true, true).fadeIn();
			//$(this).find('.dropdown-menu').stop(true, true).slideDown();
			$(this).find('.dropdown-menu').removeClass('animated flipOutY').addClass('animated rubberBand');
			$(this).addClass('open');
		}, function() {
			//$(this).find('.dropdown-menu').stop(true, true).fadeOut();
			//$(this).find('.dropdown-menu').stop(true, true).slideUp();
			//$(this).find('.dropdown-menu').removeClass('animated flipInY').addClass('animated flipOutY');
			$(this).removeClass('open');
		});
	}

	/* remove focus from bootstrap btn */
	$('.btn').focus(function(event) {
		event.target.blur();
	});

	/* remove empty p tag */
	$('p').each(function() {
		var $this = $(this);
		if ($this.html().replace(/\s|&nbsp;/g, '').length == 0)
			$this.remove();
	});

	/* remove error image */
	$("img").error(function() {
		$(this).hide();
	});

	/* window scroll */
	// $fn.scrollSpeed(step, speed, easing);
	//jQuery.scrollSpeed(100, 600);

	/* register form */
	$("#email_reg").keyup(function() {
		var emailReg1 = /(@.*@)|(\.\.)|(@\.)|(\.@)|(^\.)/;
		// not valid
		var emailReg2 = /^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,6}|[0-9]{1,3})(\]?)$/;
		if (!(!emailReg1.test($(this).val())) && emailReg2.test($(this).val())) {
			$(this).css('outline', '1px solid red');
		} else {
			$(this).css('outline', 'none');
		}
	});

	var copyBtn = document.querySelector('#pass_copy');
	copyBtn.addEventListener('click', function () {
		var urlField = document.querySelector('#pass');
		// select the contents
		urlField.select();
		document.execCommand('copy'); // or 'cut'
	}, false);

	$("#pass_remove").click(function() {
		$("#pass").val(null);
		$("#cpass").val(null);
		$("#jak_pstrength").css('width', '0px');
	});

	$("#pass_ok").click(function() {
		$("#cpass").val($("#pass").val());
	});

	$("#pass_refresh").click(function() {
		$("#pass").val(generatePassword($('#pass_length').val()));
		passwordStrength($("#pass").val());
	});

	$("#pass").keyup(function() {
		passwordStrength($(this).val());
	});

	$("#cpass").keyup(function() {
		if ($(this).val() != $("#pass").val()) {
			$(this).css('outline', '1px solid red');
		} else {
			$(this).css('outline', 'none');
		}
	});

	$("#calc").click(function() {
		$('#hash').html(null);
		var a = Math.pow(94, parseInt($('#pass_length').val()));
		$("#combinations").text(a);
		var b = a / 100000000;
		$("#time").text(Math.round(b) + ' sec / ' + Math.round(b / 86400) + ' days / ' + Math.round(Math.round(b / 86400) * 0.00273791) + ' year');
		$("#binary").text(stringToBin($('#pass').val()));
		$("#hex").text(stringToHex($('#pass').val()));
		$.ajax({
			type : 'get',
			dataType : 'json',
			data : 'q=' + $('#pass').val(),
			url : 'hash.php',
			success : function(response) {
				if (response.error == 0) {
					$('#hash').html(response.info);
				}
			}
		});
		return false;
	});
	
	/* PROTECT THE FRONTEND CODE */

	/* disable right click */
	$(document).on("contextmenu", function(e) {
		e.preventDefault();
	});

	/* disable developer mode (f12) */
	$(document).keydown(function(event) {
		if (event.keyCode == 123) {
			return false;
		} else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
			return false;
			//Prevent from ctrl+shift+i
		}
	});

});

function generatePassword(num) {
	var num = num == 0 ? 8 : num;
	var password = '';
	var availableSymbols = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_+=~`[]{}|\:;\"\'<>,.?/";
	for (var i = 0; i < num; i++) {
		var symbol = availableSymbols[(Math.floor(Math.random() * availableSymbols.length))];
		password += symbol;
	}
	return password;
}

/* Password strength indicator */
function passwordStrength(password) {
	var desc = [{
		'width' : '0px'
	}, {
		'width' : '20%'
	}, {
		'width' : '40%'
	}, {
		'width' : '60%'
	}, {
		'width' : '80%'
	}, {
		'width' : '100%'
	}];
	var descClass = ['', 'progress-bar-danger', 'progress-bar-danger', 'progress-bar-warning', 'progress-bar-success', 'progress-bar-success'];
	var score = 0;

	//if password bigger than 6 give 1 point
	if (password.length > 6)
		score++;

	//if password has both lower and uppercase characters give 1 point
	if ((password.match(/[a-z]/)) && (password.match(/[A-Z]/)))
		score++;

	//if password has at least one number give 1 point
	if (password.match(/d+/))
		score++;

	//if password has at least one special caracther give 1 point
	if (password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/))
		score++;

	//if password bigger than 12 give another 1 point
	if (password.length > 10)
		score++;

	// display indicator
	$("#jak_pstrength").removeClass(descClass[score - 1]).addClass(descClass[score]).css(desc[score]);
}

function stringToBin(str) {
	var length = str.length, output = [];
	for (var i = 0; i < length; i++) {
		var bin = str[i].charCodeAt().toString(2);
		output.push(Array(8 - bin.length + 1).join("0") + bin);
	}
	return output.join(" ");
}

function stringToHex(str) {
	var result = '';
	for (var i = 0; i < str.length; i++) {
		result += str.charCodeAt(i).toString(16);
	}
	return result;
}

function convertToAscii(str) {
	var result = '';
	var currentChar = '';
	var i = 0;
	for (; i < str.length; i += 1) {
		currentChar = str[i].charCodeAt(0).toString(2);
		if (currentChar.length < 8) {
			while (8 - currentChar.length) {
				currentChar = '0' + currentChar;
			}
		}
		result += currentChar;
	}
	return result;
}

/* disable right click */
document.addEventListener("contextmenu", function(e) {
	e.preventDefault();
}, false);