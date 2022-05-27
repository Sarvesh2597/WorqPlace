
import { logoutUser } from '../redux/actions';
import store from '../redux/store';
import { getLoggedInUser } from './authUtils';
/**
 * Fetch data from given url
 * @param {*} url
 * @param {*} options
 */


const fetchJSON = (url, options = { headers: {} }) => {

    const userInfo = getLoggedInUser();
    if (userInfo) {
        options.headers['Authorization'] = `Bearer ${userInfo.token}`
    }
    
    return fetch(url, options)
        .then((response) => {
            if(response.status === 401) {
                store.dispatch(logoutUser(null))
            }
            if (!response.status === 200) {
                throw response.json();
            }
            return response.json();
        })
        .then((json) => {
            return json;
        })
        .catch((error) => {
            throw error;
        });
};

export { fetchJSON };
