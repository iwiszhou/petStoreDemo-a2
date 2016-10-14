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
var Rx_1 = require('rxjs/Rx');
var router_1 = require('@angular/router');
var apis_service_1 = require('../shared/apis.service');
var constants_1 = require('../shared/constants');
var CreatePetComponent = (function () {
    function CreatePetComponent(router, UtilsApi) {
        this.router = router;
        this.UtilsApi = UtilsApi;
        this.countDown = 5;
    }
    CreatePetComponent.prototype.ngOnInit = function () {
        this.status = constants_1.PET_STATUS || [];
        this.pet = {
            status: this.status[0]
        };
    };
    CreatePetComponent.prototype.ngOnDestroy = function () {
        if (this.interval) {
            this.interval.unsubscribe();
        }
    };
    CreatePetComponent.prototype.back = function () {
        this.router.navigate(['/pets']);
    };
    CreatePetComponent.prototype.submitForm = function () {
        this._savePet(this.pet);
    };
    //Helper function
    CreatePetComponent.prototype._prepareRequestObj = function (pet) {
        var _photos = [], _tags, requestObj, category;
        if (!pet) {
            return;
        }
        if (pet.photoUrls && pet.photoUrls.length > 0) {
            _photos = this._strToArrayObj(pet.photoUrls, undefined);
        }
        if (pet.tags && pet.tags.length > 0) {
            _tags = this._strToArrayObj(pet.tags, 'name');
        }
        category = { name: pet.categoryName, id: undefined };
        requestObj = {
            id: undefined,
            name: pet.name,
            status: pet.status.value,
            tags: _tags,
            photoUrls: _photos,
            category: category
        };
        return requestObj;
    };
    CreatePetComponent.prototype._strToArrayObj = function (str, keyName) {
        var retArr = [], splitArr;
        if (str && str.length > 0) {
            splitArr = str.split(",");
            for (var i = 0; i < splitArr.length; i++) {
                if (splitArr[i] && splitArr[i].length > 0) {
                    if (keyName) {
                        retArr.push((_a = {},
                            _a[keyName] = splitArr[i],
                            _a
                        ));
                    }
                    else {
                        retArr.push(splitArr[i]);
                    }
                }
            }
        }
        return retArr;
        var _a;
    };
    //Add Pet
    CreatePetComponent.prototype._savePet = function (pet) {
        this.errorMsg = "";
        var requestObj = this._prepareRequestObj(pet);
        this.UtilsApi.savePet(requestObj)
            .then(this._successCB_savePet.bind(this))
            .catch(this._errorCB_savePet.bind(this));
    };
    CreatePetComponent.prototype._successCB_savePet = function (response) {
        var _this = this;
        this.successMsg = constants_1.MSG.SUCCESS_ADD_MSG;
        this.countDown = 5;
        this.interval = Rx_1.Observable.interval(1000).take(5);
        this.interval = this.interval.subscribe(function (x) {
            _this.countDown--;
            if (_this.countDown <= 0) {
                _this.router.navigate(['/pets']);
            }
        });
    };
    CreatePetComponent.prototype._errorCB_savePet = function (response) {
        this.errorMsg = constants_1.MSG.SERVER_DOWN_MSG;
    };
    CreatePetComponent = __decorate([
        core_1.Component({
            moduleId: 'createPet.id',
            selector: 'create-pet',
            templateUrl: './app/create-pet/create-pet.html',
            providers: []
        }), 
        __metadata('design:paramtypes', [router_1.Router, apis_service_1.UtilsApi])
    ], CreatePetComponent);
    return CreatePetComponent;
}());
exports.CreatePetComponent = CreatePetComponent;
//# sourceMappingURL=create-pet.component.js.map