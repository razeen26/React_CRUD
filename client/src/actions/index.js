import streams from "../apis/streams";
import history from "../history";
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS,
    DELETE_STREAM,
    EDIT_STREAM
} from "./types";

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT,
    }
}

// create a stream
export const createStream = (formValues) => {
    return async (dispatch, getState) => {
        const { userId } = getState().auth;
        const response = await streams.post("/streams", { ...formValues, userId });

        dispatch({
            type: CREATE_STREAM,
            payload: response.data
        });

        // programmatic navigation (navigate after code runs)
        history.push("/");
    }
}

// fetch all streams
export const fetchStreams = () => {
    return async function (dispatch) {
        const response = await streams.get("/streams");
        dispatch({
            type: FETCH_STREAMS,
            payload: response.data
        });
    }
}

// fetch one stream
export const fetchStream = (id) => {
    return async function (dispatch) {
        const response = await streams.get(`/streams/${id}`);
        dispatch({
            type: FETCH_STREAM,
            payload: response.data
        });
    }
}

// edit one stream
export const editStream = (id, formValues) => {
    return async function (dispatch) {
        const response = await streams.patch(`/streams/${id}`, formValues);
        dispatch({
            type: EDIT_STREAM,
            payload: response.data
        });
        history.push('/');
    }
}


// delete one stream
export const deleteStream = (id) => {
    return async function (dispatch) {
        const response = await streams.delete(`/streams/${id}`);
        dispatch({
            type: DELETE_STREAM,
            payload: id
        });
        history.push("/");
    }
}