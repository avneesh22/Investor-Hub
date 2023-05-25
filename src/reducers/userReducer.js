import { SET_USER, SET_USERS, SET_USER_ROLE, SET_AADHAR, SET_AUTH_LOADING_STATUS, SET_SELECTED_USER, SET_NOTIFICATIONS, SET_REQUESTS, SET_CHATLIST } from '../actions/actionType';

const INITIAL_STATE = {
    user: null,
    loading: false,
    isAadharVerified: false,
    allUsers: [],
    role:null,
    selectedUser:[],
    notifications:[],
    requests:[],
    chats:{}
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user,
            }
        case SET_AUTH_LOADING_STATUS:
            return {
                ...state,
                loading: action.status,
            };
        case SET_AADHAR:
            return {
                ...state,
                isAadharVerified: action.status,
            };
        case SET_USERS:
            return {
                ...state,
                allUsers: action.data,
            };
        case SET_USER_ROLE:
            return {
                ...state,
                role:action.role
            }
        case SET_SELECTED_USER:
            return {
                ...state,
                selectedUser:action.data
            }
        case SET_NOTIFICATIONS:
            return {
                ...state,
                notifications:action.data
            }
        case SET_REQUESTS:
            return {
                ...state,
                requests:action.data
            }
        case SET_CHATLIST:
            return {
                ...state,
                chats:action.data
            }
        default:
            return state;
    }
};

export default userReducer;