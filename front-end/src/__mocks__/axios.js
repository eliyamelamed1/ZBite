const axiosGetRequest = jest.fn();

axiosGetRequest.mockImplementationOnce(async (url) => {
    window.axiosTests = url;
});

exports.get = axiosGetRequest;

const axiosPatchRequest = jest.fn();

axiosPatchRequest.mockImplementationOnce(async (url) => {
    window.axiosTests = url;
});

exports.patch = axiosPatchRequest;

const axiosDeleteRequest = jest.fn();

axiosDeleteRequest.mockImplementationOnce(async (url) => {
    window.axiosTests = url;
});

exports.delete = axiosDeleteRequest;

const axiosPostRequest = jest.fn();

axiosPostRequest.mockImplementationOnce(async (url) => {
    window.axiosTests = url;
});

exports.post = axiosPostRequest;
