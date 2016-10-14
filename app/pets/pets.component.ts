import { Component, OnInit } from '@angular/core';
import { UtilsApi } from '../shared/apis.service'
import { Pet } from '../shared/models';
import { MSG } from '../shared/constants';

@Component({
    moduleId: 'pets.id',
    selector: 'pets',
    templateUrl : './app/pets/pets.html',
	providers: []
})

export class PetsComponent implements OnInit{
	pets : Pet[];
	errorMsg : string;

	constructor(private utilsApi:UtilsApi){

	}

    ngOnInit(): void {
        this._getPetList();
    }

    private _getPetList(): void{
		this.utilsApi.getPetsList()
			.then( this._successCB_getPetList.bind(this) )
			.catch( this._errorCB_getPetList.bind(this) );
    }

	private _successCB_getPetList(response : Pet[]) : void{
		this.pets = response;
		
		if(!this.pets || this.pets.length == 0){
			this.errorMsg = MSG.NOT_FOUND_MSG;
		}
	}

	private _errorCB_getPetList(response:any) : void{
		this.errorMsg = MSG.SERVER_DOWN_MSG;
	}
}