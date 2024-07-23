import api from "@/config/api.js";
import * as actiontypes from "@/redux/payment/ActionTypes.js";

export const createPayment = ({planType, jwt}) => async (dispatch) =>
{
    try
    {

        const { data } = await api.post(`/api/payment/${planType}`);
        console.log("payment successful", data);

        if(data.paymentLinkUrl)
            window.location.href = data.paymentLinkUrl;

    }
    catch (error)
    {
        console.log(error.message);
    }
};