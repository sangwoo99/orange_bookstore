export const apiReqLog = (apiPath, where, body) => {
    console.log(`[API-REQ][${where}][${apiPath}] body: `, body);
};

export const apiResLog = (apiPath, where, apiResponse) => {
    console.log(`[API-RES][${where}][${apiPath}] apiResponse: `, apiResponse);
};

