var images = new Array(	"images/dynamicImage1.png","images/dynamicImage2.png","images/dynamicImage3.png");
var countimages = 0;
var numberOfSeconds = 0;
function startTime(nos){
	numberOfSeconds = nos;
	var tDate = new Date();
	if(countimages == images.length){
		countimages = 0;
	}
	if(tDate.getSeconds() % numberOfSeconds == 0){
		document.getElementById("img1").src = images[countimages];
	}
	countimages++;
	setTimeout("startTime(numberOfSeconds)", 1000);
}