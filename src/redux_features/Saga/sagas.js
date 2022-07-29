import { takeEvery, call, put } from "redux-saga/effects";
import axios from 'axios';
import { saveState } from "../localStorage";

export function* watcherSaga() {
    yield takeEvery('login/login', attempt_Login);

  }

async function loginRequest (userCred) {
    let response_val = {}
    await axios({
        method: 'POST',
        url:'http://192.168.6.253:32598/token',
        data: userCred
    }).then(function(response){
        response_val = {
            "token": response.data['access_token'],
            "name": response.data['name'],
            "loginStatus": true,
            "SelectedItem": "Dashboard"
        }
    })
    for (let vals in response_val ){
        saveState(vals, response_val[vals])
    }
    return response_val
}

// async function subscriber_name_query () {

// }

// async function subscriber_ip_query(){

// }

function* attempt_Login(action) {
    try {
        const response = yield call(loginRequest, action.payload);
        yield put({ type: 'login/login_success', response });

    } catch (error) {
        const errorRes = {
            "loginStatus": false,
            "loginRetry": true
        }
        yield put({ type: 'login/login_error', errorRes });
        }
    }

// function* subscriber_query_name(){
    
// }

// function* subscriber_query_ip(){
    
// }