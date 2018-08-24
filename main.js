/*Creado por LuxARTS
		2017
https://github.com/luxarts/BransenhamJS
*/
var pxSize=10;		//Tamaño del pixel
var dimensionX=50;	//Cantidad de píxeles horizontal
var dimensionY=50;	//Cantidad de píxeles vertical
var borderWidth=1;	//Grosor de las lineas divisoras

dimensionX=(dimensionX+1)*pxSize;//Tamaño de la cuadrícula (X)
dimensionY=(dimensionY+1)*pxSize;//Tamaño de la cuadrícula (Y)

var c = document.getElementById("cuadricula"); //DOM de la cuadricula
c.width = dimensionX; //Ajusta el ancho
c.height = dimensionY;//Ajusta el alto

var ctx=c.getContext("2d");//Contexto 2D

cuadricula();

function cuadricula(x1, y1, x2, y2){
	ctx.fillStyle="#bbb";
	//Lineas divisoras verticales
	for (var x = 1; x < (dimensionX/pxSize); x++) {
		ctx.fillRect(x*pxSize,0,borderWidth,dimensionY);
	}
	//Lineas divisoras horizontales
	for(var y = 1; y < (dimensionY/pxSize); y++){
		ctx.fillRect(0,y*pxSize,dimensionX,borderWidth);
	}

	//Ejes cartesianos
	ctx.fillStyle="#aaa";
	ctx.fillRect(dimensionX/2-pxSize/2+borderWidth,0,pxSize-borderWidth,dimensionY);
	ctx.fillRect(0,dimensionY/2-pxSize/2+borderWidth,dimensionX,pxSize-borderWidth);
}
function redraw(){
	//Obtiene las nuevas coordenadas
	var x1=parseInt(document.getElementById("x1").value);
	var y1=parseInt(document.getElementById("y1").value);
	var x2=parseInt(document.getElementById("x2").value);
	var y2=parseInt(document.getElementById("y2").value);
	if(Number.isInteger(x1) && Number.isInteger(y1) && Number.isInteger(x2) && Number.isInteger(y2)){
		//Limpia la pantalla
		ctx.clearRect(0,0,c.width,c.height);
		//Dibuja la cuadrícula
		cuadricula();
		//Dibuja la linea
		line(x1,y1,x2,y2, "#F00");
	}
}

function line(x0, y0, x1, y1, color){
	var backup;

	y0 = -y0;
	y1 = -y1;

	var steep = Math.abs(y1 - y0) > Math.abs(x1 - x0);
	if(steep){
		//Intercambia x0 con y0
		backup = x0;
		x0 = y0;
		y0 = backup;
		//Intercambia x1 con y1
		backup = x1;
		x1 = y1;
		y1 = backup;
	}
	if(x0 > x1){
		//Intercambia x0 con x1
		backup = x0;
		x0 = x1;
		x1 = backup;
		//Intercambia y0 con y1
		backup = y0;
		y0 = y1;
		y1 = backup;
	}

	var dx, dy;
	dx = x1 - x0;
	dy = Math.abs(y1 - y0);

	var err = dx / 2;
	var ystep;

	if(y0 < y1)
		ystep = 1;
	else
		ystep = -1;

	var xbegin = x0;
	if(steep){
		for(; x0 <= x1; x0++){
			err -= dy;
			if(err < 0){
				var len = x0 - xbegin;
				if(len)
					gfx_vline(y0, xbegin, len + 1, color);
				else
					gfx_pixel(y0, x0, color);

				xbegin = x0 + 1;
				y0 += ystep;
				err += dx;
			}
		}
		if(x0 > xbegin + 1) gfx_vline(y0, xbegin, x0 - xbegin, color);
	}
	else{
		for(; x0 <= x1; x0++){
			err -= dy;
			if(err < 0){
				var len = x0 - xbegin;
				if(len)
					gfx_hline(xbegin, y0, len + 1, color);
				else
					gfx_pixel(x0, y0, color);

				xbegin = x0 + 1;
				y0 += ystep;
				err += dx;
			}
		}
		if(x0 > xbegin + 1) gfx_hline(xbegin, y0, x0 - xbegin, color);
	}
}

function gfx_pixel(x, y, color){
	ctx.fillStyle=color;
	var offsetx=dimensionX/2 - pxSize/2;//Centro de la cuadrícula (X)
	var offsety=dimensionY/2 - pxSize/2;//Centro de la cuadrícula (Y)
	ctx.fillRect(x*pxSize+offsetx, y*pxSize+offsety, pxSize, pxSize); //Dibuja un pixel
}
function gfx_hline(x0, y0, w, color){
	while(w>0){
		w--;
		gfx_pixel(x0+w, y0, color);
	}
}
function gfx_vline(x0, y0, h, color){
	while(h>0){
		h--;
		gfx_pixel(x0, y0+h, color);
	}
}

setInterval(girar,250); //Llama a girar cada 500ms
var x2=0+1;
var y2=Math.floor(dimensionY/(pxSize*2)-1);
var incx=1;
var incy=0;

function girar(){
	draw(x2,y2);
	if(x2==Math.floor(dimensionX/(pxSize*2))-1){//Abajo
		incx=0;
		incy=-1;
	}
	if(y2==Math.floor(-dimensionY/(pxSize*2))+2){//Izquierda
		incy=0;
		incx=-1;
	}
	if(x2==Math.floor(-dimensionX/(pxSize*2))+2){//Arriba
		incx=0;
		incy=1;
	}
	if(y2==Math.floor(dimensionY/(pxSize*2))-1 && incy==1){//Derecha
		incy=0;
		incx=1;
	}
	x2+=incx;
	y2+=incy;
}

function draw(x2,y2){
	//console.log(x2 + "," + y2);
	//Limpia la pantalla
	ctx.clearRect(0,0,c.width,c.height);
	//Dibuja la cuadrícula
	cuadricula();
	//Dibuja la linea
	line(0, 0, Math.floor(x2), Math.floor(y2), "#F00");
	document.getElementById("x1").value = 0;
	document.getElementById("y1").value = 0;
	document.getElementById("x2").value = x2;
	document.getElementById("y2").value = y2;
}