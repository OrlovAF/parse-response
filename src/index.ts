import { reqexp } from './reqexp'

type APIResponse = {
    status: 'OK' | 'ERROR';
    redirectUrl?: string;
    errors?: string[];
}

const responseBuilder = ({ redirectUrl , errors }: Partial<APIResponse>): APIResponse => {
    const response: APIResponse = {
        status: errors === undefined ? 'OK' : 'ERROR',
    };

    if (redirectUrl !== undefined) {
        response.redirectUrl = redirectUrl;
    }

    if (errors !== undefined) {
        response.errors = errors;
    }

    return response;
}

export const parser = async (input: any): Promise<APIResponse> => {
    try {
        const obj = JSON.parse(input);
        return parseJSON(obj);
    } catch(err) {
        return parseString(input);
    }
}

const parseJSON = (data: Record<string, any>) => {
    const { status, errors, response, code, result, link, bid, redirect_url, message } = data;

    if (status === 6 && result === 'E-mail address already exists or format is invalid') {
        return responseBuilder({errors: [result]});
    }

    if (response && code === 200 && message === "OK") {
        return responseBuilder({redirectUrl: `https://${response.browser_url}`});
    }

    if (response?.error && data.code === 409 && data.message === "Conflict") {
        const { error } = response;
        return responseBuilder({errors: [error.message]});
    }

    if (status === 'ok' && Array.isArray(errors) && !errors.length && redirect_url) {
        return responseBuilder({});
    }

    if (status === 'error' && errors?.validation) {
        const { username, email } = errors.validation;
        return responseBuilder({errors: [...username, ...email]});
    }

    if (link && bid) {
        return responseBuilder({redirectUrl: link});
    }

    if (status && bid) {
        return responseBuilder({errors: [status]});
    }

    throw new Error('Not Implemented')
}

const parseString = (str: string) => {
    if (str === '') {
        return responseBuilder({});
    }

    if (/Failed/.test(str)) {
        return responseBuilder({errors: [str]});
    }

    if (reqexp.queryParams.test(str)) {
        const [, auto] = str.match(reqexp.queryParams);
        const [, value] = auto.split('=');
        return responseBuilder({redirectUrl: decodeURIComponent(value)});
    }

    if (reqexp.errorDuplicate.test(str)) {
        return responseBuilder({errors: [str]});
    }

    if (reqexp.url.test(str)) {
        return responseBuilder({redirectUrl: str});
    }

    if (reqexp.anotherEmail.test(str)) {
        return responseBuilder({errors: [str]});
    }

    if (reqexp.arrayStringSuccess.test(str)) {
        return responseBuilder({});
    }

    if (reqexp.arrayStringError.test(str)) {
        const [, message] = str.match(reqexp.arrayStringError);
        return responseBuilder({errors: [message.trim()]});
    }

    throw new Error('Not Implemented')
}