# API Automation with Cypress
This is a test suite in Cypress, for restful-booker API

## Run tests
To run via Docker:
1. Clone the repo
2. Create .env file following "env README.txt" directions
3. Navigate into the restful-booker root folder
4. Start Docker Desktop
5. Run ```docker-compose build```   
6. Run ```docker-compose up```
7. APIs are exposed on http://localhost:3001
8. Run tests from src folder:  
    `npx cypress open` for test runner  
    `npx cypress run` for headless mode

## Test cases
![screenshot](https://github.com/egaraujo/restful-booker-api-automation/blob/main/screenshot.jpg)
• Should be up and running  
• Should create a new token  
• Should return ten bookings initially  
• Should create a new booking  
• Should perform partial booking update  
• Should perform full booking update  
• Should delete a booking  

## Links
Restful Booker API Doc: https://restful-booker.herokuapp.com/apidoc/index.html  
Restful Booker Repo: https://github.com/mwinteringham/restful-booker
