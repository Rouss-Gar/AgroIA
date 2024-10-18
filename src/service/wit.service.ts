import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
    providedIn: 'root',
})
export class WitAiService {
    private accessToken = `Bearer I2LQLEEYT346CHYLCONLAKOAGW43P7CP`;
    private apiUrl = 'https://api.wit.ai/message?v=20231001';
    
    async getWitAiResponse(question: string) {
        const encodedQuestion = encodeURIComponent(question);

        if (!this.accessToken) {
            throw new Error('Wit.ai API token is missing.');
        }

        try {
            console.log(`Sending request to Wit.ai: ${this.apiUrl}&q=${encodedQuestion}`);
            const response = await axios.get(`${this.apiUrl}&q=${encodedQuestion}`, {
                headers: {
                    Authorization: this.accessToken,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Response from Wit.ai:', response.data);
            return response.data;

        } catch (error) {
          
            throw error;
        }
    }
}
