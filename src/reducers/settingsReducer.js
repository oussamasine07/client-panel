import { 
    DISABLE_BALANCE_ON_ADD,
    DISABLE_BALANCE_ON_EDIT,
    ALLOW_REGISTRATION
} from "../actions/types";

// const initialState = {
//     disableBalanceOnAdd: true,
//     disableBalanceOnEdit: false,
//     allowRegistration: false
// }

export default (state = {}, action) => {
    switch (action.type) {
        case DISABLE_BALANCE_ON_ADD:
            return {
                ...state,
                disableBalanceOnAdd: action.payload
            };

        case DISABLE_BALANCE_ON_EDIT:
            return {
                ...state,
                disableBalanceOnEdit: action.payload
            };

        case ALLOW_REGISTRATION:
            return {
                ...state,
                allowRegistration: action.payload
            };

        default: 
            return state;
    }
}