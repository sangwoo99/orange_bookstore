import axios from "axios";
import { BOOK_SERVER } from '../../Config';
import { apiReqLog, apiResLog } from './logHelper';

// 반복되는 API 호출 로그와 호출 실패시 alert 노출을 공통함수로 만듬
export const requestGetAPI = (url, component, queryString, callback) => {
    // 요청 파라미터가 있을 경우 키, 값 구함 by 논리연산자 단축평가
    // let key = (params && params.keys[0]) || 0;
    // let value = (params && params.key) || 0;
    // params = `${key}=${value}`;

    // 그냥 객체가 아닌 queryString으로 바로 받자
    queryString = queryString || '';
    apiReqLog(url, component, queryString);
    axios.get(`${url}?${queryString}`)
        .then(res => {
            apiResLog(url, component, res.data);
            if(res.data.success) {
                callback(res.data);
            } else {
                alert('400 error:', res.data.err);
            }
        })
};

export const requestPostAPI = (url, component, body, callback) => {
    apiReqLog(url, component, body);
    axios.post(`${url}`, body)
        .then(res => {
            apiResLog(url, component, body);
            if(res.data.success) {
                callback();
            } else {
                alert('400 error:', res.data.err);
            }
        })
};