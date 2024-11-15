import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  welcome(): string {
    return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Crypto Investments API</title>
            <style>
                body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #f4f4f9;
                color: #333;
                }

                .container {
                text-align: center;
                max-width: 800px;
                padding: 20px;
                background-color: #fff;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                border-radius: 10px;
                }

                h1 {
                color: #4caf50;
                }

                p {
                line-height: 1.6;
                margin: 10px 0;
                }

                .btn-docs {
                margin-top: 20px;
                padding: 10px 20px;
                background-color: #4caf50;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
                }

                .btn-docs:hover {
                background-color: #45a049;
                }
            </style>
            </head>
            <body>

            <div class="container">
                <h1>Welcome to the Crypto Insight API</h1>
                <p>This API provides a platform for managing and tracking cryptocurrency investments and financial recommendations.</p>
                <p>Features include user registration, cryptocurrency management, and tracking of investment transactions.</p>
                <p>Our goal is to help you make informed decisions and better manage your crypto portfolio through personalized recommendations.</p>

                <p>To learn more about how to use the API, including detailed documentation on endpoints, methods, and examples, click the button below.</p>

                <a href="/api" class="btn-docs">Read the API Documentation</a>
            </div>

            </body>
            </html>
        `;
  }
}
