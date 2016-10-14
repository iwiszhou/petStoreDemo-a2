import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Pet, Tag, Category } from './models';
import { UtilsService } from './utils.service';

@Injectable()
export class UtilsApi {
	
	private apiEndpoint = "http://localhost:8080";
	
	constructor(private http: Http, private UtilsService: UtilsService){

	}

	getPetsList() : Promise<Pet[]> {
		return this.http.get(this.apiEndpoint + "/pets")
               .toPromise()
               .then(function(response){
				   return response.json();
			   })
               .catch(this.handleError);
	}

	getPetById(petId:number) : Promise<Pet> {
		return this.http.get(this.apiEndpoint + "/pet/" + petId)
               .toPromise()
               .then( function(response){
				   return response.json();
			   })
               .catch(this.handleError);
	}

	savePet(pet:Pet) : Promise<Pet> {
		let requestObj:any = {};

		//Validate Category
		if(pet.category && pet.category.name && pet.category.name!=""){
			requestObj.category = pet.category;
		}

		//Validate Photos
		if(pet.photoUrls && pet.photoUrls.length>0){
			requestObj.photoUrls = pet.photoUrls;
		}else{
			console.error("Phont urls are required");
			Promise.reject({ validation: false });
		}

		//Validate Tags
		if(pet.tags && pet.tags.length>0){
			requestObj.tags = pet.tags;
		}

		//Validate Status
		if(pet.status){
			requestObj.status = pet.status;
		}

		//Validate Name
		requestObj.name = pet.name;
		if(!requestObj.name){
			console.error("name is required");
			Promise.reject({ validation: false });
		}

		return this.http.post(this.apiEndpoint + "/pet", requestObj)
               .toPromise()
               .then( function(response){
				   return response.json();
			   })
               .catch(this.handleError);
	} 

	deletePetById(petId) : Promise<void> {
		
		//Input petId validation
		if(!petId || petId<0 || isNaN(petId) || !this.UtilsService.isNumber(petId)){
			console.error("Missing or Invaild input parameter. Please provide petId(number)");
			return Promise.reject("Missing or Invaild input parameter. Please provide petId(number)");
		}

		return this.http.delete(this.apiEndpoint + "/pet/" + petId)
			.toPromise()
			.then(() => null)
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}


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