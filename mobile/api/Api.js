'use strict';

import {doFetch} from './ApiFetcher'
import qs from 'qs'
import constants from '../constants'
const API_URL_PREFIX = constants.api.URL_PREFIX;


const Api = {
    login: (body) => doFetch(`${API_URL_PREFIX}/publicRouts/login`, 'post', body),
   };

export default Api
