$(document).ready(function(){
	var current = 0;
	var audio = init(current);
	var repeat = false;
	var random = false;

	if ( navigator.userAgent.indexOf('Chrome') > -1 ) {
		var prog = $('#valumer').val();
		$('#progressVolume').css('width',((prog*100)/50) +"%");
		$('#valumer').mousemove(function(){
			var prog = $('#valumer').val();
			$('#progressVolume').css('width',((prog*100)/50) +"%");
		});
	}
	
	function init(number){;
		var songName = play[number]['song'];
		audio = new Audio('list/' + songName);
		audio.volume = parseFloat($('#valumer').val()/50);
		$('#artist marquee').text(songName);
		audio.addEventListener("loadeddata", function() {
			$('#progressBar').attr('max', Math.ceil(this.duration));
		});
		$('#cover-img').attr('src','list/covers/' + play[number]['cover']);
		return audio;
	};

	$('#vol').click(function(){
		$('#volume').toggle('fast');
		$('#vol').toggleClass('grey');
	});

	$('#rep').click(function(){
		repeat = !repeat;
		$('#rep').toggleClass('grey');
		$('#col').addClass('grey');
		random = false;
	});

	$('#col').click(function(){
		random = !random;
		$('#col').toggleClass('grey');
		$('#rep').addClass('grey');
		repeat = false;
	});
	
	$('#play').click(function(){
		audio.play();
		$('#play').hide();
		$('#pause').show();
		duration();
	});

	$('#pause').click(function(){
		audio.pause();
		$('#pause').hide();
		$('#play').show();
	});

	$('#next').click(function(){
		$('#play').hide();
		$('#pause').show();
		audio.pause();
		next();
	});

	function next(){

		if(current >= play.length-1){
			current = 0;
		}else{
			current +=  1;
		}
		audio = init(current);
		audio.play();
		duration();
	};
	function repeatSong(){
		audio = init(current);
		audio.play();
		duration();
	};
	function randomSong(){
		var randomNumber  = -1;
		while(randomNumber == -1){
			randomNumber  = Math.floor((Math.random() * play.length));
			if(randomNumber !=  current){
				current = randomNumber;
				initSong(current);
				console.log(current);
				randomNumber = 0;
			}
		}
	}
	function initSong(current){
		audio = init(current);
		audio.play();
		duration();
	};

	$('#prev').click(function(){
		$('#play').hide();
		$('#pause').show();
		audio.pause();

		if(current == 0){
			current = (play.length-1);
		}else{
			current -=  1;
		}
		audio = init(current);
		audio.play();
		duration();
		console.log(current);
	});

	$('#valumer').change(function(){
		audio.volume = parseFloat(this.value/50);
	});

	$('#progressBar').change(function(){
		audio.currentTime = parseFloat(this.value);
	});

	$('#vMax').click(function(){
		audio.volume = 1;
		$('#valumer').val(50);
		var prog = $('#valumer').val();
		$('#progressVolume').css('width',((prog*100)/50) +"%");
	});	

	$('#vMin').click(function(){
		audio.volume = 0;
		$('#valumer').val(0);
		var prog = $('#valumer').val();
		$('#progressVolume').css('width',((prog*100)/50) +"%");
	});	

function duration(){
	$(audio).bind('timeupdate',function(){

		var mimutes = parseInt((audio.currentTime)/60)%60;
		var seconds = parseInt(audio.currentTime%60);

		if(seconds < 10){
			seconds = '0' + seconds;
		}

		$('#duration').html(mimutes + ':' + seconds);
		var value = 0;

		if(audio.currentTime > 0){
			value = Math.ceil((audio.currentTime*100)/audio.duration);
		}

		if ( navigator.userAgent.indexOf('Chrome') > -1 ) {
			$('#progressCurrent').css('width',value + '%');
		}

		$('#progressBar').val(audio.currentTime);

		if (value == 100 && !repeat && !random){
			next();
		} else if (value == 100 && repeat){
			repeatSong();
		} else if (value == 100 && random){
			randomSong();
		}
	});
	}
});
