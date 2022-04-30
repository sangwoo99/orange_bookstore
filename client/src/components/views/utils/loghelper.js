export const apiReqLog = (apiPath, where, input) => {
    console.log(`[API-REQ][${where}][${apiPath}] input: `, input);
};

export const apiResLog = (apiPath, where, result) => {
    console.log(`[API-RES][${where}][${apiPath}] result: `, result);
};

