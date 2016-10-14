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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var utils_service_1 = require('./utils.service');
var UtilsApi = (function () {
    function UtilsApi(http, UtilsService) {
        this.http = http;
        this.UtilsService = UtilsService;
        this.apiEndpoint = "http://localhost:8080";
    }
    UtilsApi.prototype.getPetsList = function () {
        return this.http.get(this.apiEndpoint + "/pets")
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    UtilsApi.prototype.getPetById = function (petId) {
        return this.http.get(this.apiEndpoint + "/pet/" + petId)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    UtilsApi.prototype.savePet = function (pet) {
        var requestObj = {};
        //Validate Category
        if (pet.category && pet.category.name && pet.category.name != "") {
            requestObj.category = pet.category;
        }
        //Validate Photos
        if (pet.photoUrls && pet.photoUrls.length > 0) {
            requestObj.photoUrls = pet.photoUrls;
        }
        else {
            console.error("Phont urls are required");
            Promise.reject({ validation: false });
        }
        //Validate Tags
        if (pet.tags && pet.tags.length > 0) {
            requestObj.tags = pet.tags;
        }
        //Validate Status
        if (pet.status) {
            requestObj.status = pet.status;
        }
        //Validate Name
        requestObj.name = pet.name;
        if (!requestObj.name) {
            console.error("name is required");
            Promise.reject({ validation: false });
        }
        return this.http.post(this.apiEndpoint + "/pet", requestObj)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    UtilsApi.prototype.deletePetById = function (petId) {
        //Input petId validation
        if (!petId || petId < 0 || isNaN(petId) || !this.UtilsService.isNumber(petId)) {
            console.error("Missing or Invaild input parameter. Please provide petId(number)");
            return Promise.reject("Missing or Invaild input parameter. Please provide petId(number)");
        }
        return this.http.delete(this.apiEndpoint + "/pet/" + petId)
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    UtilsApi.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    UtilsApi = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, utils_service_1.UtilsService])
    ], UtilsApi);
    return UtilsApi;
}());
exports.UtilsApi = UtilsApi;
//  this.heroService.getHeroes().then(heroes => this.heroes = heroes);
// 'use strict';
// angular.module('petStoreApp')
// 		.service('UtilsApi', ['$resource', '$q', 'UtilsService', 'ENV', UtilsApi]);
// 		function UtilsApi($resource, $q, UtilsService, ENV) {
// 			var _apiEndpoint = ENV.apiEndpoint;
// 			this.getPetsList = function(){
// 				var deferred = $q.defer();
// 				$resource(
// 					_apiEndpoint + "/pets",
// 					{},
// 					{ 'get' : { method:'GET', isArray:true} }
//     			).get(
// 					{},
// 					function(response){
// 						deferred.resolve(response);
// 					},
// 					function(error){
// 						deferred.reject(error);
// 					}
// 				);
// 				return deferred.promise;
// 			};
// 			this.getPetById = function(petId){
// 				var deferred = $q.defer();
// 				//Input petId validation
// 				if(!petId || petId<0 || isNaN(petId) || !UtilsService.isNumber(petId)){
// 					console.error("Missing or Invaild input parameter. Please provide petId(number)");
// 					return;
// 				}
// 				$resource(_apiEndpoint + "/pet/"+petId).get(
// 					{},
// 					function(response){
// 						deferred.resolve(response);
// 					},
// 					function(error){
// 						deferred.reject(error);
// 					}
// 				);
// 				return deferred.promise;
// 			};
// 			this.savePet = function(pet){
// 				var deferred = $q.defer(),
// 					reqeustObj = {};
// 				//Validate Category
// 				if(pet.category && pet.category.name && pet.category.name!=""){
// 					reqeustObj.category = pet.category;
// 				}
// 				//Validate Photos
// 				if(pet.photoUrls && pet.photoUrls.length>0){
// 					reqeustObj.photoUrls = pet.photoUrls;
// 				}else{
// 					console.error("Phont urls are required");
// 					deferred.reject({ validation: false });
// 				}
// 				//Validate Tags
// 				if(pet.tags && pet.tags.length>0){
// 					reqeustObj.tags = pet.tags;
// 				}
// 				//Validate Status
// 				if(pet.status){
// 					reqeustObj.status = pet.status;
// 				}
// 				//Validate Name
// 				reqeustObj.name = pet.name;
// 				if(!reqeustObj.name){
// 					console.error("name is required");
// 					deferred.reject({ validation: false });
// 				}
// 				$resource(_apiEndpoint + "/pet").save(
// 					reqeustObj,
// 					function(response){
// 						deferred.resolve(response);
// 					},
// 					function(error){
// 						deferred.reject(error);
// 					}
// 				);
// 				return deferred.promise;
// 			};
// 			this.deletePetById = function(petId){
// 				var deferred = $q.defer();
// 				//Input petId validation
// 				if(!petId || petId<0 || isNaN(petId) || !UtilsService.isNumber(petId)){
// 					console.error("Missing or Invaild input parameter. Please provide petId(number)");
// 					return;
// 				}
// 				$resource(_apiEndpoint + "/pet/"+petId).delete(
// 					{},
// 					function(response){
// 						deferred.resolve(response);
// 					},
// 					function(error){
// 						deferred.reject(error);
// 					}
// 				);
// 				return deferred.promise;
// 			};
// 		} 
//# sourceMappingURL=apis.service.js.map