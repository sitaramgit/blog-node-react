import { apiEndPoints } from "./apiEndPoints";

export const API_REQUESTS = {
    USER_REGISTER: {
        METHOD: 'POST',
        URL: apiEndPoints.auth.register,
        PAYLOAD: {}
    },
    USER_LOGIN: {
        METHOD: 'POST',
        URL: apiEndPoints.auth.login,
        PAYLOAD: {}
    },
    SOCIAL_LOGIN: {
        METHOD: 'POST',
        URL: apiEndPoints.auth.googleLogin,
        PAYLOAD: {}
    },
    CREATE_POST: {
        METHOD: 'POST',
        URL: apiEndPoints.posts.createPost,
        PAYLOAD: {},
        HEADERS: {
            'Content-Type': 'multipart/form-data',
          }
    },
}