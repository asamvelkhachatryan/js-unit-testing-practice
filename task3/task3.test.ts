/// <reference types="jest" />
import { getUtcStringDate } from './index';
import { setupMockDate, MockDateSetup } from './testUtils';

describe('Task 3: Mocking dates', () => {
  let mockDate: MockDateSetup;

  beforeEach(() => {
    mockDate = setupMockDate();
  });

  afterEach(() => {
    mockDate.reset();
  });

  it('uses the current system date and returns it in UTC when no arguments are provided', () => {
    mockDate.set({ isoDate: '2023-10-15T12:00:00.000Z' });
    
    const result = getUtcStringDate();
    expect(result).toBe('2023-10-15T12:00:00.000Z');
  });

  it('accepts a specific Date object and returns it in UTC', () => {
    const specificDate = new Date('2020-05-10T15:30:00.000Z');
    
    const result = getUtcStringDate(specificDate);
    expect(result).toBe('2020-05-10T15:30:00.000Z');
  });

  it('correctly handles dates originating from different time zones', () => {
    mockDate.set({ offset: 180 }); 
    const localDate = new Date(2022, 0, 1, 12, 0, 0); 
    const result = getUtcStringDate(localDate);
    expect(result).toBe('2022-01-01T09:00:00.000Z');
  });
});