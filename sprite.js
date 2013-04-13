/* 
 * image sprite + css code associated generator using cnavas
 *
 * @author Belakhdar Abdeldjalil<zendyani@gmail.com>
 * @link https://github.com/zendyani/cssprite
 * @license 
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; version 2
 * of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * example of use
 *
 *	sprite = new Generator;
 *	sprite.id = 'images';
 *	sprite.maxWidth = 500;
 *	sprite.displayResult();			
 */

function Generator(){
	this.id = '';
	this.height = 0;
	this.width = 0;
	this.maxWidth = 100;
	this.images = '';
	this.spriteDataUrl = '';
	this.css;
}

Generator.prototype.getAllImg  = function(){
	// get all image by bloc id
	var images = document.getElementById(this.id).getElementsByTagName("img");
	x = y =0;
	totalX = 0;
	for ( i=0; i<images.length; i++ ){	
		// used to compare with maxWidth to not overide x value
		totalX += images[i].width;
		if(totalX >= this.maxWidth){
			y += images[i].height;
			x = totalX;
			totalX = 0;
		}else{
			x += images[i].width;
		}
		y = (y === 0) ? images[i].height : y; 
	}

	this.images = images;
	this.width = x;
	this.height = y;
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

		x += images[i].width;
		if(x >= this.maxWidth){
			y += images[i].height;
			x = 0;
		}
	}

	this.css = css;

	// send sprite
	return c2.toDataURL();
}

// display result on a appended div in the end of body
Generator.prototype.displayResult = function(){

	div = document.createElement('div');
	a = document.createElement('a');
	span = document.createElement('span');

	a.href = this.generateSprite();
	a.textContent = "sprite image";
	a.target = '_blank';

	css = this.css;
	newCss = new Array();
	for (i=0; i<css.length; i++){
		name = css[i][0];
		x = css[i][1];
		y = css[i][2];
		newCss.push('.'+name+'{ background-position:'+x+'px '+y+'px; }');
	}

	span.textContent = newCss.join("\n");

	div.appendChild(a);
	div.appendChild(document.createElement("br"));
	div.appendChild(span);

	document.body.appendChild(div);	

}
