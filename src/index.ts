type APIResponse = {
    status: 'OK' | 'ERROR';
    redirectUrl?: string;
    errors?: string[];
}

export const parser = async (input: any): Promise<APIResponse> => {
    throw new Error('Not Implemented')
}

