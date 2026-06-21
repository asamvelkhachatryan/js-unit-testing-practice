/// <reference types="jest" />
import { validateUserName } from './index';
import { fetchIsUserNameAvailable } from './fetchIsUserNameValid';

jest.mock('./fetchIsUserNameValid');
const mockedFetch = jest.mocked(fetchIsUserNameAvailable);
describe('Task 1: validateUserName', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns false if name has length less than 3 symbols', async () => {
    const result = await validateUserName('ab'); // Only 2 characters
    expect(result).toBe(false);
    expect(mockedFetch).not.toHaveBeenCalled(); // Ensures we didn't waste an API call
  });

  it('returns false if name contains non-alphanumeric symbols or spaces', async () => {
    const resultWithSpace = await validateUserName('User Name');
    const resultWithSymbol = await validateUserName('User@Name');
    expect(resultWithSpace).toBe(false);
    expect(resultWithSymbol).toBe(false);
    expect(mockedFetch).not.toHaveBeenCalled();
  });

  it('returns false if name starts with a number', async () => {
    const result = await validateUserName('1username');
    expect(result).toBe(false);
    expect(mockedFetch).not.toHaveBeenCalled();
  });

  it('returns true if the user name is valid and available', async () => {
    mockedFetch.mockResolvedValueOnce(true);
    const result = await validateUserName('ValidName');
    expect(result).toBe(true);
    expect(mockedFetch).toHaveBeenCalledWith('ValidName');
  });

  it('returns false if the user name is valid but already taken', async () => {
    mockedFetch.mockResolvedValueOnce(false);
    const result = await validateUserName('TakenName');
    expect(result).toBe(false);
    expect(mockedFetch).toHaveBeenCalledWith('TakenName');
  });

  it('returns false if the availability check throws an exception', async () => {
    mockedFetch.mockRejectedValueOnce(new Error('Network error'));
    const result = await validateUserName('ValidName');
    expect(result).toBe(false);
    expect(mockedFetch).toHaveBeenCalledWith('ValidName');
  });
});