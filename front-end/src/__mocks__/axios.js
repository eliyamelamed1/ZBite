const get = jest.fn();

get.mockImplementationOnce(async (url) => {
    window.axiosTests = url;
});

exports.get = get;
