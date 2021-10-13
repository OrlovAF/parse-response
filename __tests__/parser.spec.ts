import {parser} from "../src";

describe('Parser', () => {
    it('Should parse correctly Type 1 - Success', async () => {
        const response = await parser("login=jfmelo6&member_id=446545545644646&auto=https%3A%2F%2Frocahead.com")

        expect(typeof response === 'object').toBeTruthy();
        expect(response.status).toBe('OK');
        expect(response.redirectUrl).toBe('https://rocahead.com');
        expect(response.errors).toBeUndefined();
    })

    it('Should parse correctly Type 1 - Error', async () => {
        const response = await parser('ERR02: Duplicate')

        expect(typeof response === 'object').toBeTruthy();
        expect(response.status).toBe('ERROR');
        expect(response.redirectUrl).toBeUndefined()
        expect(Array.isArray(response.errors)).toBeTruthy();
        expect(response.errors.length).toBe(1);
        expect(response.errors[0]).toBe('ERR02: Duplicate');
    })

    it('Should parse correctly Type 2 - Success', async () => {
        const response = await parser("https://rocahead.com")

        expect(typeof response === 'object').toBeTruthy();
        expect(response.status).toBe('OK');
        expect(response.redirectUrl).toBe('https://rocahead.com');
        expect(response.errors).toBeUndefined();
    })

    it('Should parse correctly Type 2 - Error', async () => {
        const response = await parser('{"status":6,"result":"E-mail address already exists or format is invalid","value":"exampleemail@gmail.com"}')

        expect(typeof response === 'object').toBeTruthy();
        expect(response.status).toBe('ERROR');
        expect(response.redirectUrl).toBeUndefined()
        expect(Array.isArray(response.errors)).toBeTruthy();
        expect(response.errors.length).toBe(1);
        expect(response.errors[0]).toBe('E-mail address already exists or format is invalid');
    })

    it('Should parse correctly Type 3 - Success', async () => {
        const response = await parser("{\"code\":200,\"message\":\"OK\",\"response\":{\"browser_url\":\"rocahead.com\",\"email_url\":\"rocahead.com\"},\"env\":null}")

        expect(typeof response === 'object').toBeTruthy();
        expect(response.status).toBe('OK');
        expect(response.redirectUrl).toBe('https://rocahead.com');
        expect(response.errors).toBeUndefined();
    })

    it('Should parse correctly Type 3 - Error', async () => {
        const response = await parser('{"code":409,"message":"Conflict","response":{"error":{"code":409,"message":"Email [exampleemail@gmail.com] already exists"}},"env":null}`')

        expect(typeof response === 'object').toBeTruthy();
        expect(response.status).toBe('ERROR');
        expect(response.redirectUrl).toBeUndefined()
        expect(Array.isArray(response.errors)).toBeTruthy();
        expect(response.errors.length).toBe(1);
        expect(response.errors[0]).toBe('Email [exampleemail@gmail.com] already exists');
    })

    it('Should parse correctly Type 4 - Success', async () => {
        const response = await parser("")

        expect(typeof response === 'object').toBeTruthy();
        expect(response.status).toBe('OK');
        expect(response.redirectUrl).toBeUndefined();
        expect(response.errors).toBeUndefined();
    })

    it('Should parse correctly Type 4 - Error', async () => {
        const response = await parser('Failed')

        expect(typeof response === 'object').toBeTruthy();
        expect(response.status).toBe('ERROR');
        expect(response.redirectUrl).toBeUndefined()
        expect(Array.isArray(response.errors)).toBeTruthy();
        expect(response.errors.length).toBe(1);
        expect(response.errors[0]).toBe('Failed');
    })

    it('Should parse correctly Type 5 - Success', async () => {
        const response = await parser("{\"status\":\"ok\",\"errors\":[],\"redirect_url\":\"\/\/rocahead.com\"}")

        expect(typeof response === 'object').toBeTruthy();
        expect(response.status).toBe('OK');
        expect(response.redirectUrl).toBeUndefined();
        expect(response.errors).toBeUndefined();
    })

    it('Should parse correctly Type 5 - Error', async () => {
        const response = await parser('{"status":"error","errors":{"validation":{"username":["Username is already in use"],"email":["This email address is already in use at our website!"]}}}')

        expect(typeof response === 'object').toBeTruthy();
        expect(response.status).toBe('ERROR');
        expect(response.redirectUrl).toBeUndefined()
        expect(Array.isArray(response.errors)).toBeTruthy();
        expect(response.errors.length).toBe(2);
        expect(response.errors[0]).toBe('Username is already in use');
        expect(response.errors[0]).toBe('This email address is already in use at our website!');
    })

    it('Should parse correctly Type 6 - Success', async () => {
        const response = await parser("https://www.OFFERURL.com")

        expect(typeof response === 'object').toBeTruthy();
        expect(response.status).toBe('OK');
        expect(response.redirectUrl).toBe('https://www.OFFERURL.com');
        expect(response.errors).toBeUndefined();
    })

    it('Should parse correctly Type 6 - Error', async () => {
        const response = await parser('E-mail address in use, please choose another. Forgot Password? click here')

        expect(typeof response === 'object').toBeTruthy();
        expect(response.status).toBe('ERROR');
        expect(response.redirectUrl).toBeUndefined()
        expect(Array.isArray(response.errors)).toBeTruthy();
        expect(response.errors.length).toBe(1);
        expect(response.errors[0]).toBe('E-mail address in use, please choose another. Forgot Password? click here');
    })


    it('Should parse correctly Type 7 - Success', async () => {
        const response = await parser("Array ( [Code] => 200 [Status] => 1 [Message] => 85552459 )")

        expect(typeof response === 'object').toBeTruthy();
        expect(response.status).toBe('OK');
        expect(response.redirectUrl).toBeUndefined();
        expect(response.errors).toBeUndefined();
    })

    it('Should parse correctly Type 7 - Error', async () => {
        const response = await parser('Array ( [Code] => 500 [Status] => [Message] => 50001-Unable to save user )')

        expect(typeof response === 'object').toBeTruthy();
        expect(response.status).toBe('ERROR');
        expect(response.redirectUrl).toBeUndefined()
        expect(Array.isArray(response.errors)).toBeTruthy();
        expect(response.errors.length).toBe(1);
        expect(response.errors[0]).toBe('50001-Unable to save user');
    })

    it('Should parse correctly Type 8 - Success', async () => {
        const response = await parser("{\"link\": \"https://redirecturl.com/7tg78gh98gh9g98\", \"bid\": \"0.23\"}")

        expect(typeof response === 'object').toBeTruthy();
        expect(response.status).toBe('OK');
        expect(response.redirectUrl).toBe('https://redirecturl.com/7tg78gh98gh9g98');
        expect(response.errors).toBeUndefined();
    })

    it('Should parse correctly Type 8 - Error', async () => {
        const response = await parser('{"status": "low bid", "bid": "0.20"}')

        expect(typeof response === 'object').toBeTruthy();
        expect(response.status).toBe('ERROR');
        expect(response.redirectUrl).toBeUndefined()
        expect(Array.isArray(response.errors)).toBeTruthy();
        expect(response.errors.length).toBe(1);
        expect(response.errors[0]).toBe('low bid');
    })
})