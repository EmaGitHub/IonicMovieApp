import { Action } from '@ngrx/store';
import { AccessState } from '../models/access.model';



export class ChangeStateAction implements Action {
    readonly type = 'CHANGE_LOGON_STATE';

    constructor(public payload: AccessState) {
     }
}

export type Actions = ChangeStateAction;
