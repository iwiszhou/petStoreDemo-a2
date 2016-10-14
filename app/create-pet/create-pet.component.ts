import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { UtilsApi } from '../shared/apis.service'
import { UtilsService } from '../shared/utils.service'
import { Pet, Tag, Category, PetStatus } from '../shared/models';
import { MSG, PET_STATUS } from '../shared/constants';

@Component({
    moduleId: 'createPet.id',
    selector: 'create-pet',
    templateUrl : './app/create-pet/create-pet.html',
	providers: []
})

export class CreatePetComponent implements OnInit{
	pet : any;
	status : PetStatus[];
	errorMsg: string;
	successMsg : string;
	countDown:number = 5;
	private interval : any;
	

	constructor(private router : Router, private UtilsApi:UtilsApi){

	}

	ngOnInit() : void{
		this.status = PET_STATUS || [];

		this.pet = {
			status : this.status[0]
		};
	}

	ngOnDestroy() : void{
		if(this.interval){
			this.interval.unsubscribe();
		}
	}

	back() : void{
		this.router.navigate(['/pets']);
	}

	submitForm() :void{
		this._savePet(this.pet);
	}

	//Helper function
	private _prepareRequestObj(pet):Pet{
		let _photos : string[] = [],
			_tags : Tag[],
			requestObj :Pet,
			category: Category;
		
		if(!pet){
			return;
		}

		if(pet.photoUrls && pet.photoUrls.length>0){
			_photos = this._strToArrayObj( pet.photoUrls, undefined);
		}

		if(pet.tags && pet.tags.length>0){
			_tags = this._strToArrayObj( pet.tags, 'name');
		}

		category = { name : pet.categoryName, id: undefined };

		requestObj = {
			id		: undefined,
			name 	: pet.name,
			status 	: pet.status.value,
			tags 	: _tags,
			photoUrls 	: _photos,
			category 	: category
		}

		return requestObj;
	}

	
	private _strToArrayObj(str, keyName):Array<any>{
		var retArr = [],
			splitArr;

		if(str && str.length>0){
			
			splitArr = str.split(",");

			for(var i=0; i<splitArr.length; i++){
				if(splitArr[i] && splitArr[i].length>0){
					if(keyName){
						retArr.push({
							[keyName] : splitArr[i]
						});	
					}else{
						retArr.push(splitArr[i]);
					}
					
				}
			}
		}

		return retArr;
	}

	//Add Pet
	private _savePet(pet){
		this.errorMsg="";
		
		var requestObj = this._prepareRequestObj(pet);
		
		this.UtilsApi.savePet(requestObj)
			.then(this._successCB_savePet.bind(this))
			.catch(this._errorCB_savePet.bind(this));
	}

	private _successCB_savePet(response){

		this.successMsg = MSG.SUCCESS_ADD_MSG;

		this.countDown = 5;

		this.interval = Observable.interval(1000).take(5);
		this.interval = this.interval.subscribe((x) => {
			this.countDown--;
			if(this.countDown<=0){
				this.router.navigate(['/pets']);
			}
		});
		
	}

	private _errorCB_savePet(response){
		this.errorMsg = MSG.SERVER_DOWN_MSG;
	}
}