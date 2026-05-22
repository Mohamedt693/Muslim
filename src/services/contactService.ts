import axios from 'axios';

export interface ContactData {
    name: string;
    email: string;
    message: string;
}

export interface FormspreeResponse {
    next: string;
    ok: boolean;
}

export interface ContactService {
    sendForm: (data: ContactData) => Promise<FormspreeResponse>;
}

export const contactService: ContactService = {
    sendForm: async (data: ContactData): Promise<FormspreeResponse> => {
        const response = await axios.post<FormspreeResponse>(
            "https://formspree.io/f/mjgzyzyv", 
            data,
            { 
                headers: { 'Accept': 'application/json' },
                signal: AbortSignal.timeout(10000) 
            }
        );

        if (!response.data || !response.data.ok) {
            throw new Error('فشل في إرسال الرسالة');
        }

        return response.data;
    }
};