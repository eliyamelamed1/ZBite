const mockAxios = jest.genMockFromModule('axios');

mockAxios.patch = jest.fn();
mockAxios.delete = jest.fn();
mockAxios.post = jest.fn();
mockAxios.get = jest.fn();
mockAxios.create = jest.fn(() => mockAxios);

export default mockAxios;
