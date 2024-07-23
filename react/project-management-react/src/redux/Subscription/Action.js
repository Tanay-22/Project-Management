import * as actionTypes from "./ActionTypes.js";
import api from "@/config/api.js";


export const getUserSubscription = () =>
{
    return async (dispatch) =>
    {
        dispatch({ type: actionTypes.GET_USER_SUBSCRIPTION_REQUEST });
        try
        {
            const response = await api.get(`/api/subscription/user`);
            console.log("get user subscription", response.data);
            dispatch({ type: actionTypes.GET_USER_SUBSCRIPTION_SUCCESS, payload: response.data });
        }
        catch (error)
        {
            console.log(error);
            dispatch({ type: actionTypes.GET_USER_SUBSCRIPTION_FAILURE, error: error.message });
        }
    };
};


export const upgradeSubscription = ({ planType }) =>
{
    return async (dispatch) =>
    {
        dispatch({ type: actionTypes.UPGRADE_SUBSCRIPTION_REQUEST });
        try
        {
            const response = await api.patch(`/api/subscription/upgrade`, null,
                {
                    headers: { "Authorization" : `Bearer ${localStorage.getItem("jwt")}`},
                    params: { planType: planType }
                }) ;

            console.log("upgrade user subscription", response.data);
            dispatch({ type: actionTypes.UPGRADE_SUBSCRIPTION_SUCCESS, payload: response.data });
        }
        catch (error)
        {
            console.log(error);
            dispatch({ type: actionTypes.UPGRADE_SUBSCRIPTION_FAILURE, error: error.message });
        }
    };
};