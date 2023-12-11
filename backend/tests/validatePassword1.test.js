const bcrypt = require('bcrypt');
const validatePassword = require('./validatePassword'); // Adjust the path as necessary

jest.mock('bcrypt');


describe('validatePassword', () => {
    it('should return true for a valid password', async () => {
        bcrypt.compare.mockResolvedValue(true);

        const result = await validatePassword('correct_password', 'hashed_password');
        expect(result).toBe(true);
    });

    it('should return false for an invalid password', async () => {
        bcrypt.compare.mockResolvedValue(false);

        const result = await validatePassword('wrong_password', 'hashed_password');
        expect(result).toBe(false);
    });
});
