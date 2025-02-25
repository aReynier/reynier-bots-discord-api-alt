import { test, expect } from '@playwright/test';
import { CreateAnswerQuestionDto } from '../src/answers/dto/create-answer-question.dto';

test.describe('Answers API E2E Tests', () => {
  const API_URL = process.env.API_URL || 'http://localhost:3000';
  
  const testAnswer: CreateAnswerQuestionDto = {
    content: 'Test answer content',
    uuidQuestion: '123e4567-e89b-12d3-a456-426614174000'
  };

  let createdAnswerUuid: string;

  test.beforeAll(async ({ request }) => {
    console.log('Starting API availability check...');
    console.log(`Testing API URL: ${API_URL}`);
    
    let retries = 5;
    let apiReady = false;
    
    while (retries > 0 && !apiReady) {
      try {
        console.log(`Attempting to connect to API (${retries} retries left)...`);
        const checkResponse = await request.get(`${API_URL}/answers`);
        console.log(`Response status: ${checkResponse.status()}`);
        
        if (checkResponse.status() === 200 || checkResponse.status() === 404) {
          console.log('API endpoint found!');
          apiReady = true;
          break;
        }

        const responseText = await checkResponse.text();
        console.log(`Response body: ${responseText}`);
        
      } catch (error) {
        console.log(`Error connecting to API:`, error.message);
        await new Promise(resolve => setTimeout(resolve, 2000));
        retries--;
      }
    }

    if (!apiReady) {
      throw new Error('API is not ready after maximum retries');
    }
  });
});
