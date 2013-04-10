function Generator(){
	this.id = '';
	this.height = 0;
	this.width = 0;
	this.images = '';
	this.spriteDataUrl = '';
	this.css;
}

Generator.prototype.getAllImg  = function(){
	
	var images = document.getElementById(this.id).getElementsByTagName("img");
	var t_height = 0;
	var t_width = 0;

	for ( i=0; i<images.length; i++ ){	
		t_height = images[i].height;
		t_width += images[i].width;
	}

	this.images = images;
	this.width = t_width;
	this.height = t_height;
}

Generator.prototype.generateSprite = function(){
	
	this.getAllImg();
	
	c2 = document.createElement("canvas");
	c2.width = this.width;
	c2.height = this.height;
	cc2 = c2.getContext("2d");
	x = y = 0;
	
	images = this.images;
	css = new Array();

	for ( i=0; i<images.length; i++ ){
		
		imgSrc = images[i].src;
		imgName = imgSrc.substring(imgSrc.lastIndexOf('/') + 1, imgSrc.lastIndexOf('.'));

		img = new Image();
		img.src = images[i].src;

		cc2.drawImage(img,x,y);

		css.push([imgName,x,y]); 

		x += images[i].width; // incremented for every img
		y = 0;
	}
	this.css = css;

	// send sprite
	return c2.toDataURL();
}

// do the work
sprite = new Generator;
sprite.id = 'images';
img = sprite.generateSprite();

div = document.createElement('div');
a = document.createElement('a');
span = document.createElement('span');

a.href = img;
a.innerText = "sprite image";
a.target = '_blank';


css = sprite.css;
newCss = new Array();
for (i=0; i<css.length; i++){
	name = css[i][0];
	x = css[i][1];
	y = css[i][2];
	newCss.push('.'+name+'{ background-position:'+x+'px '+y+'px; }');
}

span.innerText = newCss.join("\n");

div.appendChild(a);
div.appendChild(document.createElement("br"));
div.appendChild(span);

document.body.appendChild(div);