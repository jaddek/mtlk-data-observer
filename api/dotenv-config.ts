import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Function to check required environment variables
const checkEnvVariables = (variables: string[]): void => {
    variables.forEach((variable) => {
        if (!process.env[variable]) {
            throw new Error(`Missing environment variable: ${variable}`);
        }
    });
};

// Check for required environment variables
checkEnvVariables(['PORT', 'METLINK_TOKEN']);