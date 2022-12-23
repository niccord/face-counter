const { formatdate, authenticateToken } = require("../utilities");

test('Check formatdate', () => {
    d = new Date(2000, 0, 1, 2, 3, 9);
    expect(formatdate(d)).toBe('20000101020309')
});


let mockRequest;
let mockResponse;
let nextFunction = jest.fn();

describe('authenticate token', () => {

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            sendStatus: jest.fn((idn) => idn)
        };
    });

    test('without headers', () => {
        const errStatusCode = authenticateToken(mockRequest, mockResponse, nextFunction);
        expect(errStatusCode).toBe(400)
    });

    test('without authorization header', () => {
        mockRequest = {
            headers: {
            }
        }
        const errStatusCode = authenticateToken(mockRequest, mockResponse, nextFunction);
        expect(errStatusCode).toBe(400);
    });

    test('with wrong token', async () => {
        mockRequest = {
            headers: {
                'authorization': 'Bearer abc'
            }
        }
        const errStatusCode = authenticateToken(mockRequest, mockResponse, nextFunction);
        expect(errStatusCode).toBe(401);
    });

    test('with right token', async () => {
        const jwt = require('jsonwebtoken');
        const username = 'username'
        const token = jwt.sign({username}, process.env.JWT_TOKEN_SECRET, { expiresIn: '30m' })
        mockRequest = {
            headers: {
                'authorization': 'Bearer ' + token
            }
        }
        authenticateToken(mockRequest, mockResponse, nextFunction);
        expect(nextFunction).toBeCalledTimes(1);
    });
})