
import * as actionTypes from "./ActionTypes.js";
import api from "@/config/api.js";


export const sendMessage = (messageData) =>
{
    return async (dispatch) =>
    {
        dispatch({ type: actionTypes.SEND_MESSAGE_REQUEST });
        try
        {
            const response = await api.post(`api/messages/send`, messageData);
            console.log("message sent ---", response.data);
            dispatch({ type: actionTypes.SEND_MESSAGE_SUCCESS, message: response.data });
        }
        catch (error)
        {
            console.log(error);
            dispatch({ type: actionTypes.SEND_MESSAGE_FAILURE, error: error.message });
        }
    }
};


export const fetchChatByProject = ({ projectId }) =>
{
    return async (dispatch) =>
    {
        dispatch({ type: actionTypes.FETCH_CHAT_BY_PROJECT_REQUEST });
        try
        {
            const response = await api.get(`api/projects/${projectId}/chat`);

            console.log("fetch chat", response.data);

            dispatch({ type: actionTypes.FETCH_CHAT_BY_PROJECT_SUCCESS, chat: response.data });
        }
        catch (error)
        {
            console.log(error);
            dispatch({ type: actionTypes.FETCH_CHAT_BY_PROJECT_FAILURE, error: error.message });
        }
    }
};


export const fetchChatMessages = (chatId) =>
{
    return async (dispatch) =>
    {
        dispatch({ type: actionTypes.FETCH_CHAT_MESSAGES_REQUEST });
        try
        {
            const response = await api.get(`api/messages/chat/${chatId}`);

            console.log("fetch chat messages", response.data);

            dispatch({ type: actionTypes.FETCH_CHAT_MESSAGES_SUCCESS, messages: response.data });
        }
        catch (error)
        {
            console.log(error);
            dispatch({ type: actionTypes.FETCH_CHAT_BY_PROJECT_FAILURE, error: error.message });
        }
    }
};