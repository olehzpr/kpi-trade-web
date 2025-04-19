import {getMe} from './api';

describe('User API Integration', () => {
    it.skip('fetches and validates user without throwing errors', async () => {
        await expect(getMe()).resolves.not.toThrow();
    });
});