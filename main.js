/*Creado por LuxARTS
		2017
https://github.com/luxarts/BransenhamJS
*/
var pxSize=15;		//Tamaño del pixel
var dimensionX=20;	//Cantidad de píxeles horizontal
var dimensionY=20;	//Cantidad de píxeles vertical
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
		linea(x1,y1,x2,y2);
	}
}

function linea(x1, y1, x2, y2){
	ctx.fillStyle="#F00";

	var incyi, incxi;	//Incrementos inclinados
	var incyr, incxr;	//Incrementos rectos
	var dy=y2-y1;	//Delta Y (distancia en el eje Y)
	var dx=x2-x1;	//Delta x (distancia en el eje x)

	if(dy>=0){
		incyi=1;
	}
	else{
		dy=-dy;
		incyi=-1;
	}
	if(dx>=0){
		incxi=1;
	}
	else{
		dx=-dx;
		incxi=-1;
	}
	if(dx>=dy){
		incyr=0;
		incxr=incxi;
	}
	else{
		incxr=0;
		incyr=incyi;
		var dummy=dx;//Intercambia dx con dy
		dx=dy;
		dy=dummy;
	}

	//Inicializa valores
	var x=x1;
	var y=y1;
	var avr=(2*dy);
	var av=avr-dx;
	var avi=av-dx;
	var offsetx=dimensionX/2 - pxSize/2;//Centro de la cuadrícula (X)
	var offsety=dimensionY/2 - pxSize/2;//Centro de la cuadrícula (Y)
	do{
		ctx.fillRect(x*pxSize+offsetx,-y*pxSize+offsety,pxSize,pxSize); //Dibuja un pixel

		if(av>=0){
			x+=incxi;//Aumento inclinado
			y+=incyi;//Aumento recto
			av+=avi;//Avance inclinado
		}
		else{
			x+=incxr;//Aumento recto
			y+=incyr;//Aumento inclinado
			av+=avr;//Avance recto
		}
	}while(x!=x2&& (x1!=x2 || y1!=y2));
	if(x1!=x2 || y1!=y2)ctx.fillRect(x*pxSize+offsetx,-y*pxSize+offsety,pxSize,pxSize); //Dibuja el último pixel
}

setInterval(girar,100); //Llama a girar cada 500ms
var x2=0+1;
var y2=Math.floor(dimensionY/(pxSize*2));
var incx=1;
var incy=0;

function girar(){
	draw(x2,y2);
	if(x2==Math.floor(dimensionX/(pxSize*2))){//Abajo
		incx=0;
		incy=-1;
	}
	if(y2==Math.floor(-dimensionY/(pxSize*2))+1){//Izquierda
		incy=0;
		incx=-1;
	}
	if(x2==Math.floor(-dimensionX/(pxSize*2))+1){//Arriba
		incx=0;
		incy=1;
	}
	if(y2==Math.floor(dimensionY/(pxSize*2)) && incy==1){//Derecha
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
	linea(0,0,Math.floor(x2),Math.floor(y2));
	document.getElementById("x1").value = 0;
	document.getElementById("y1").value = 0;
	document.getElementById("x2").value = x2;
	document.getElementById("y2").value = y2;
}