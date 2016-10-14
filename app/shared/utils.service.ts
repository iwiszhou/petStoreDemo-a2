import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
	isNumber(n) : boolean{
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
}