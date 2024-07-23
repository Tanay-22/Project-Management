import * as actionTypes from "./ActionTypes.js";
import api from "@/config/api.js";


export const createIssue = (issueData) =>
{
    return async (dispatch) =>
    {
        dispatch({ type: actionTypes.CREATE_ISSUE_REQUEST });
        try
        {
            const response = await api.post(`/api/issues`, issueData);
            console.log("created issue ", response.data);
            dispatch({ type: actionTypes.CREATE_ISSUE_SUCCESS, issue: response.data });
        }
        catch(error)
        {
            console.log("error", error.messages);
            dispatch({ type: actionTypes.CREATE_ISSUE_FAILURE, error: error.message });
        }
    };
};


export const deleteIssue = (issueId) =>
{
    return async (dispatch) =>
    {
        dispatch({ type: actionTypes.DELETE_ISSUE_REQUEST });
        try
        {
            const response = await api.delete(`/api/issues/${issueId}`);
            console.log("deleted issue ", response.data);
            dispatch({ type: actionTypes.DELETE_ISSUE_SUCCESS, issueId });
        }
        catch(error)
        {
            console.log("error", error.messages);
            dispatch({ type: actionTypes.DELETE_ISSUE_FAILURE, error: error.message });
        }
    };
};

export const fetchIssues = (id) =>
{
    return async (dispatch) =>
    {
        dispatch({ type: actionTypes.FETCH_ISSUES_REQUEST });
        try
        {
            const response = await api.get(`/api/issues/project/${id}`);
            console.log("fetch issues by project id", response.data);
            dispatch({ type: actionTypes.FETCH_ISSUES_SUCCESS, issues: response.data });
        }
        catch(error)
        {
            console.log("error", error.messages);
            dispatch({ type: actionTypes.FETCH_ISSUES_FAILURE, error: error.message });
        }
    };
};


export const fetchIssueById = (id) =>
{
    return async (dispatch) =>
    {
        dispatch({ type: actionTypes.FETCH_ISSUES_BY_ID_REQUEST });
        try
        {
            const response = await api.get(`/api/issues/${id}`);
            console.log("fetch issue by issue id", response.data);
            dispatch({ type: actionTypes.FETCH_ISSUES_BY_ID_SUCCESS, issue: response.data });
        }
        catch(error)
        {
            console.log("error", error.messages);
            dispatch({ type: actionTypes.FETCH_ISSUES_BY_ID_FAILURE, error: error.message });
        }
    };
};


export const updateIssueStatus = ({ id, status }) =>
{
    return async (dispatch) =>
    {
        dispatch({ type: actionTypes.UPDATE_ISSUE_STATUS_REQUEST });
        try
        {
            const response = await api.put(`/api/issues/${id}/status/${status}`);
            console.log("updated issue", response.data);
            dispatch({ type: actionTypes.UPDATE_ISSUE_STATUS_SUCCESS, issues: response.data });
        }
        catch(error)
        {
            console.log("error", error.messages);
            dispatch({ type: actionTypes.UPDATE_ISSUE_STATUS_FAILURE, error: error.message });
        }
    };
};


export const assignUserToIssue = ({ issueId, userId }) =>
{
    return async (dispatch) =>
    {
        dispatch({ type: actionTypes.ASSIGNED_ISSUE_TO_USER_REQUEST });
        try
        {
            const response = await api.put(`/api/issues/${issueId}/assignee/${userId}`);
            console.log("assigned user ---", response.data);
            dispatch({ type: actionTypes.ASSIGNED_ISSUE_TO_USER_SUCCESS, issue: response.data });
        }
        catch(error)
        {
            console.log("error", error.message);
            dispatch({ type: actionTypes.ASSIGNED_ISSUE_TO_USER_FAILURE, error: error.message });
        }
    };
};