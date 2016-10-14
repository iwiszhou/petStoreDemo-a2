import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { UtilsApi } from '../shared/apis.service'
import { Pet } from '../shared/models';
import { MSG } from '../shared/constants';

@Component({
    moduleId: 'petDetail.id',
    selector: 'pet-detail',
    templateUrl : './app/pet-detail/pet-detail.html',
	providers: []
})

export class PetDetailComponent implements OnInit{
	errorMsg : string;
	successMsg : string;
	countDown : number = 5;
	pet: Pet;
	private interval : any;

	constructor(private UtilsApi:UtilsApi, private route: ActivatedRoute, private router: Router){
		
	}

	ngOnInit(): void {
		this.route.params.forEach((params: Params) => {
			let _petId : number = +params['id'];
			if(!_petId){
				this.errorMsg = MSG.NOT_FOUND_MSG;
			}else{
				this._getPetById(_petId);	
			}
		});
	}

	ngOnDestroy(): void{
		if(this.interval){
			this.interval.unsubscribe();
		}
	}

	deletePet(petId, $event) : void{
		if(window.confirm(MSG.DELETE_COMFIRMATION_MSG)){
			this._deletePetById.call(this,petId);
		}
		$event.stopPropagation();
	}

	//Delete Pet By Id
	private _deletePetById(petId):void{
		this.errorMsg="";
		this.UtilsApi.deletePetById(petId).then(
			this._successCB_deletePetById.bind(this),
			this._errorCB_deletePetById.bind(this)
		);
	}

	private _successCB_deletePetById(response:Pet):void{
		
		this.successMsg = MSG.SUCCESS_DELETE_MSG;
		this.countDown = 5;

		this.interval = Observable.interval(1000).take(5);
		this.interval = this.interval.subscribe((x) => {
			this.countDown--;
			if(this.countDown<=0){
				this.router.navigate(['/pets']);
			}
		});		
	}

	private _errorCB_deletePetById(response:any):void{
		this.errorMsg = MSG.SERVER_DOWN_MSG;
	}

	//Get Pet By Id
	private _getPetById(petId):void{
		this.errorMsg="";
		this.UtilsApi.getPetById(petId)
			.then(this._successCB_getPetById.bind(this))
			.catch(this._errorCB_getPetById.bind(this));
	}

	private _successCB_getPetById(response: Pet): void{
		this.pet = response;
	}

	private _errorCB_getPetById(response) : void{
		if(response.status == 404){
			this.errorMsg = MSG.NOT_FOUND_MSG;
		}else{
			this.errorMsg = MSG.SERVER_DOWN_MSG;	
		}
	}
}