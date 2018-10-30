import {AsyncStorage} from 'react-native';
import errorsHandler from './ErrorsHandler';

export function doFetch(url, method, data, headers, rawBody = false) {

        let params = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // console.log('url', url);
        // console.log('body', data);
        // console.log('params', params);

        let obj = Object.assign(params, (method !== 'get') ? {body: data ? JSON.stringify({data : data}): ''} : {});
        // console.log('obj', obj)

        return fetch(url, obj)
            .then(errorsHandler)

            .then(response => response.json()
                .then(res =>{
                    // console.log('res', res);
                  return  res
                } ))




}
