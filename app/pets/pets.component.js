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
var apis_service_1 = require('../shared/apis.service');
var constants_1 = require('../shared/constants');
var PetsComponent = (function () {
    function PetsComponent(utilsApi) {
        this.utilsApi = utilsApi;
    }
    PetsComponent.prototype.ngOnInit = function () {
        this._getPetList();
    };
    PetsComponent.prototype._getPetList = function () {
        this.utilsApi.getPetsList()
            .then(this._successCB_getPetList.bind(this))
            .catch(this._errorCB_getPetList.bind(this));
    };
    PetsComponent.prototype._successCB_getPetList = function (response) {
        this.pets = response;
        if (!this.pets || this.pets.length == 0) {
            this.errorMsg = constants_1.MSG.NOT_FOUND_MSG;
        }
    };
    PetsComponent.prototype._errorCB_getPetList = function (response) {
        this.errorMsg = constants_1.MSG.SERVER_DOWN_MSG;
    };
    PetsComponent = __decorate([
        core_1.Component({
            moduleId: 'pets.id',
            selector: 'pets',
            templateUrl: './app/pets/pets.html',
            providers: []
        }), 
        __metadata('design:paramtypes', [apis_service_1.UtilsApi])
    ], PetsComponent);
    return PetsComponent;
}());
exports.PetsComponent = PetsComponent;
//# sourceMappingURL=pets.component.js.map