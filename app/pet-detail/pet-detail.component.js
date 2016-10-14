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
var router_1 = require('@angular/router');
var Rx_1 = require('rxjs/Rx');
var router_2 = require('@angular/router');
var apis_service_1 = require('../shared/apis.service');
var constants_1 = require('../shared/constants');
var PetDetailComponent = (function () {
    function PetDetailComponent(UtilsApi, route, router) {
        this.UtilsApi = UtilsApi;
        this.route = route;
        this.router = router;
        this.countDown = 5;
    }
    PetDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var _petId = +params['id'];
            if (!_petId) {
                _this.errorMsg = constants_1.MSG.NOT_FOUND_MSG;
            }
            else {
                _this._getPetById(_petId);
            }
        });
    };
    PetDetailComponent.prototype.ngOnDestroy = function () {
        if (this.interval) {
            this.interval.unsubscribe();
        }
    };
    PetDetailComponent.prototype.deletePet = function (petId, $event) {
        if (window.confirm(constants_1.MSG.DELETE_COMFIRMATION_MSG)) {
            this._deletePetById.call(this, petId);
        }
        $event.stopPropagation();
    };
    //Delete Pet By Id
    PetDetailComponent.prototype._deletePetById = function (petId) {
        this.errorMsg = "";
        this.UtilsApi.deletePetById(petId).then(this._successCB_deletePetById.bind(this), this._errorCB_deletePetById.bind(this));
    };
    PetDetailComponent.prototype._successCB_deletePetById = function (response) {
        var _this = this;
        this.successMsg = constants_1.MSG.SUCCESS_DELETE_MSG;
        this.countDown = 5;
        this.interval = Rx_1.Observable.interval(1000).take(5);
        this.interval = this.interval.subscribe(function (x) {
            _this.countDown--;
            if (_this.countDown <= 0) {
                _this.router.navigate(['/pets']);
            }
        });
    };
    PetDetailComponent.prototype._errorCB_deletePetById = function (response) {
        this.errorMsg = constants_1.MSG.SERVER_DOWN_MSG;
    };
    //Get Pet By Id
    PetDetailComponent.prototype._getPetById = function (petId) {
        this.errorMsg = "";
        this.UtilsApi.getPetById(petId)
            .then(this._successCB_getPetById.bind(this))
            .catch(this._errorCB_getPetById.bind(this));
    };
    PetDetailComponent.prototype._successCB_getPetById = function (response) {
        this.pet = response;
    };
    PetDetailComponent.prototype._errorCB_getPetById = function (response) {
        if (response.status == 404) {
            this.errorMsg = constants_1.MSG.NOT_FOUND_MSG;
        }
        else {
            this.errorMsg = constants_1.MSG.SERVER_DOWN_MSG;
        }
    };
    PetDetailComponent = __decorate([
        core_1.Component({
            moduleId: 'petDetail.id',
            selector: 'pet-detail',
            templateUrl: './app/pet-detail/pet-detail.html',
            providers: []
        }), 
        __metadata('design:paramtypes', [apis_service_1.UtilsApi, router_1.ActivatedRoute, router_2.Router])
    ], PetDetailComponent);
    return PetDetailComponent;
}());
exports.PetDetailComponent = PetDetailComponent;
//# sourceMappingURL=pet-detail.component.js.map