import * as actionType from "@/redux/Auth/ActionTypes.js";

const initialState =
{
    user: null,
    loading: false,
    error: null,
    jwt: null,
    projectSize: 0
};

export const authReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case actionType.LOGIN_REQUEST:
        case actionType.REGISTER_REQUEST:
        case actionType.GET_USER_REQUEST:
            return { ...state, loading: true, error: null };

        case actionType.LOGIN_SUCCESS:
        case actionType.REGISTER_SUCCESS:
            return { ...state, loading: false, error: null, jwt: action.payload.jwt };

        case actionType.GET_USER_SUCCESS:
            return { ...state, loading: false, error: null, user: action.payload };

        case actionType.LOGOUT:
            return initialState;

        case actionType.REGISTER_FAILURE:
        case actionType.GET_USER_FAILURE:
        case actionType.LOGIN_FAILURE:
            return { ...state, loading: false, error: action.error };

        default:
            return state;
    }
}