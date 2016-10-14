"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var CustomCarouselComponent = (function () {
    function CustomCarouselComponent() {
        this._currentDeg = 0;
        this.magicNumber = 72; // Y rotation degree
        this.tz = 0; // translate Z value
        this.imageWidth = 210; //Define in css
        this.imageSize = 0;
    }
    CustomCarouselComponent.prototype.ngOnInit = function () {
        //Beta only. WIP - this component current is still under development. It only support 5 images.
        if (!this.images || (this.images && this.images.length == 1)) {
            console.error("Sorry. This component is still under development. It only support >1 images.");
        }
        else {
            this.imageSize = this.images.length;
            this.magicNumber = parseInt(360 / this.imageSize + "");
            this.tz = Math.round((this.imageWidth / 2) / Math.tan(((Math.PI * 2) / this.imageSize) / 2));
            for (var i = 0; i < this.imageSize; i++) {
                this.tempImg = this.images[i];
                this.images[i] = {
                    image: this.images[i],
                    figureStyle: { "transform": "rotateY(" + (i * this.magicNumber) + "deg )  translateZ(" + this.tz + "px)" }
                };
            }
            this._rotate(this._currentDeg);
        }
    };
    CustomCarouselComponent.prototype.nextImage = function () {
        this._currentDeg = this._currentDeg - this.magicNumber;
        this._rotate(this._currentDeg);
    };
    CustomCarouselComponent.prototype.previousImage = function () {
        this._currentDeg = this._currentDeg + this.magicNumber;
        this._rotate(this._currentDeg);
    };
    //Helper functions
    CustomCarouselComponent.prototype._rotate = function (deg) {
        this.carouselStyle = { "transform": "translateZ(-145px) rotateY(" + deg + "deg)" };
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], CustomCarouselComponent.prototype, "images", void 0);
    CustomCarouselComponent = __decorate([
        core_1.Component({
            moduleId: 'customercarousel.id',
            selector: 'custom-carousel',
            templateUrl: './app/shared/carousel/carousel.html',
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], CustomCarouselComponent);
    return CustomCarouselComponent;
}());
exports.CustomCarouselComponent = CustomCarouselComponent;
//# sourceMappingURL=carousel.component.js.map