/**
 * sessionStorage 存储
 */

import {isObject, isArray, isString} from './dataType'

export default {
    put (key, val) {
        window.localStorage.setItem(key, (isObject(val) || isArray(val)) ? `{"_OBJECT_ARRAY_": ${JSON.stringify(val)}}` : val);
    },
    get (key) {
        const result = window.localStorage.getItem(key);
        return isString(result) && result.includes("_OBJECT_ARRAY_") ? JSON.parse(result)["_OBJECT_ARRAY_"] : result;
    },
    clear (key) {
        if(isString(key)){
            window.localStorage.removeItem(key);
        }else{
            window.localStorage.clear();
        }
    }
}
