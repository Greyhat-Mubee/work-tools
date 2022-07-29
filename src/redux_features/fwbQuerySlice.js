import { createSlice } from '@reduxjs/toolkit';
import { loadState, saveState } from './localStorage';
const initialState = {
    query: {
        "subscriber_data": loadState("subscriber_details"),
        "query_status": false,
        "query_retry": false,
    },
}

export const querySubscriber = createSlice({
    name: 'fwb_query',
    initialState,
    reducers:{
        query: state => {
            
        },
        // query_by_name: state => {
        //     state.query.query_status = false
        // },
        // query_by_ip: state => {
        //     state.query.query_status = false
        // },
        query_success: (state, action) => {
            saveState("subscriber_details", action.payload)
            state.query = {
                "subscriber_data": action.payload,
                "query_status": true,
                "query_retry": false
            }
        },
        query_error: (state, payload) => {
            state.query.query_retry = false
        }
    }, 
})

export const {query ,query_success,query_error } = querySubscriber.actions
export default querySubscriber.reducer