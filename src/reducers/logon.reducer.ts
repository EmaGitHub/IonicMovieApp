import { AccessState } from "../models/access.model";
import { Actions  } from "../actions/logonstate.actions"


const initialState: AccessState = {
    logState: false
};

export function reducer(state: AccessState = initialState, action: Actions) {

    switch (action.type) {
        case 'CHANGE_LOGON_STATE':

            return action.payload;

        default:
            return state;
    }
}