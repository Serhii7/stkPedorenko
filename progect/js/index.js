var ul;
var list;
var imageWidth;
var imageNumber;
var currentImage = 5;
var left = 10;

function start(){
	ul = document.getElementById('slider-list');
	list = ul.children;
	imageNumber = list.length;
	imageWidth = 300;

	for(var i = 0; i<list.length; i++){
		list[i].style.maxWidth = window.innerWidth /4 +'px';
	}
	ul.style.width = parseInt(window.innerWidth /4 * imageNumber) + 'px';
	setTimeout(slider,3000);
}
function repeat(){
	setTimeout(slider,3000);
}
function slider(){
	if(currentImage + 1 > list.length){
		currentImage = 5;
		left = 10;
		ul.style.left = '-5%';
		repeat();
	}else{
		currentImage++;
		left +=10;
		ul.style.left = '-' + left + '%';
		repeat();
	}	
}
function sliderObj(id, width){
	this.ul = document.getElementById(id);
	this.list = this.ul.children;
	this.imageNumber = this.list.length;
	// console.log(this.imageNumber);
	this.imageWidth = width;
	this.currentImg = 1;
	this.currentTop = 0;

	this.ul.style.height = parseInt(imageWidth * imageNumber) + 'px';
	this.ul.style.top = '0px';

	this.sliding = function(){
		
		if(this.currentImg == this.imageNumber){
			this.currentImg = 1;
			this.currentTop = 0;
			this.ul.style.top = 0 + 'px';
			// console.log(this.ul);
		}else{
			this.currentTop += document.getElementById('list-l-dev').offsetWidth;
			this.currentImg++;
			this.ul.style.top ='-' + parseInt(this.currentTop) + "px";
		}
	}
	this.slidingT = function(){
		
		if(this.currentImg == 1){
			this.currentImg = this.imageNumber;
			this.currentTop = (this.imageNumber-1) * this.imageWidth;
			this.ul.style.top = '-' + this.currentTop + 'px';
			// console.log(this.currentImg, this.currentTop);
		}else if(this.currentImg == this.imageNumber){
			this.currentImg = this.imageNumber -1;
			this.currentTop -=document.getElementById('list-l-dev').offsetWidth ;
			this.ul.style.top ='-' + parseInt(this.currentTop) + "px";
			// console.log(this.currentImg, this.currentTop);
		}
		else{
			this.currentTop -= document.getElementById('list-l-dev').offsetWidth;
			this.currentImg--;
			this.ul.style.top ='-' + parseInt(this.currentTop) + "px";
			// console.log(this.currentImg, this.currentTop);
		}
	}

}

function init(){
	var widthSlider = document.getElementById('list-l-dev').offsetWidth
	var a = new sliderObj('prod-slider-list', widthSlider);
	var element = document.getElementById('arrow-r-prod');
	element.onclick = function(){
		a.sliding();
	}
	var elementT = document.getElementById('arrow-l-prod');
	elementT.onclick = function(){
		a.slidingT();
	}

	var b = new sliderObj('list-l-dev', widthSlider);
	var elementB = document.getElementById('arrow-r-dev');
	elementB.onclick = function(){
		b.sliding();
	}
	var elementTb = document.getElementById('arrow-l-dev');
	elementTb.onclick = function(){
		b.slidingT();
	}

}

function openT(evt, tab) {

	if(document.documentElement.clientWidth < 1024){
    	var tabCurrent = document.getElementById(tab);
    	evt.currentTarget.after(tabCurrent);
    	if(evt.currentTarget.classList.contains("active")){
    	// console.log(evt.currentTarget.classList.contains("active"))
    		tabcontent = document.getElementsByClassName("tabcontent");
    		for (i = 0; i < tabcontent.length; i++) {
    		    tabcontent[i].style.display = "none";
    		}
    		tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    		return;
    	}
    	
	}

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tab).style.display = "block";
    evt.currentTarget.className += " active";
}

if(document.documentElement.clientWidth < 1024){
	var tablinks = document.getElementsByClassName("tablinks");
	    for (i = 0; i < tablinks.length; i++) {
	        tablinks[i].className = tablinks[i].className.replace(" active", "");
	    }
}
document.getElementById('menu').onclick = function() {
      var a = document.getElementById('menu');
   a.classList.toggle("open");

    };

window.onload = function(){
	init();
	start();
};
