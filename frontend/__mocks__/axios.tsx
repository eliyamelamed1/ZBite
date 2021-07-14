// TODO - understand code

// const axiosGetRequest = jest.fn();

// axiosGetRequest.mockImplementationOnce(async (url) => {
//     window.axiosTests = url;
// });

// exports.get = axiosGetRequest;

// const axiosPatchRequest = jest.fn();

// axiosPatchRequest.mockImplementationOnce(async (url) => {
//     window.axiosTests = url;
// });

// exports.patch = axiosPatchRequest;

// const axiosDeleteRequest = jest.fn();

// axiosDeleteRequest.mockImplementationOnce(async (url) => {
//     window.axiosTests = url;
// });

// exports.delete = axiosDeleteRequest;

// const axiosPostRequest = jest.fn();

// axiosPostRequest.mockImplementationOnce(async (url) => {
//     window.axiosTests = url;
// });

// exports.post = axiosPostRequest;

exports.post = jest.fn();
exports.get = jest.fn();
exports.patch = jest.fn();
exports.delete = jest.fn();
