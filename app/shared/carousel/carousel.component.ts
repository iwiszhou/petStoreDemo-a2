import { Component, OnInit, Input } from '@angular/core';

@Component({
    moduleId: 'customercarousel.id',
    selector: 'custom-carousel',
    templateUrl : './app/shared/carousel/carousel.html',
	providers: []
})

export class CustomCarouselComponent implements OnInit{
	@Input() images : any[];
	carouselStyle: any;
	private _currentDeg : number = 0;
	private magicNumber:number = 72; // Y rotation degree
	private tz : number = 0; // translate Z value
	private imageWidth : number = 210; //Define in css
	private imageSize:number = 0;
	private tempImg : string;

	ngOnInit():void{
		//Beta only. WIP - this component current is still under development. It only support 5 images.
		if(!this.images || (this.images && this.images.length==1) ){
			console.error("Sorry. This component is still under development. It only support >1 images.");
		}else{
			this.imageSize = this.images.length;
			
			this.magicNumber = parseInt( 360 / this.imageSize + "" );

			this.tz = Math.round( ( this.imageWidth / 2 ) / Math.tan( ( ( Math.PI * 2 ) / this.imageSize ) / 2 ) );

			for(var i=0; i<this.imageSize; i++){
				this.tempImg = this.images[i];
				this.images[i] = {
					image : this.images[i],
					figureStyle : { "transform": "rotateY(" + (i * this.magicNumber) + "deg )  translateZ("+this.tz+"px)" }
				} 
			}
			this._rotate(this._currentDeg);
		}
	}

	nextImage() : void{
		this._currentDeg = this._currentDeg - this.magicNumber;
		this._rotate(this._currentDeg);
	}

	previousImage() : void{
		this._currentDeg = this._currentDeg + this.magicNumber;
		this._rotate(this._currentDeg);
	}

	//Helper functions
	private _rotate(deg):void{
		this.carouselStyle = { "transform" : "translateZ(-145px) rotateY("+deg+"deg)" };	
	}
}