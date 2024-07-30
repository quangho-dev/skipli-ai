*** Structure of project ***
- Front end: client folder, includes:
   + components folder: contains all components.
   + screens folder: contains components display screens.
   + utils folder: contains helper functions.
   + stores: contains all global states of the app.

- Back end: server folder, includes:
   + routes folder: defines API end points.
   + controllers folder: contains all logic to handle requests.
   + models folder: contains all models.
   + server.js file: main file of server.
   + firebase.js file: configure Firebase.
   + geminiAI.js file: contains settings and functions of Gemini AI.


*** How to run the project ***
- Register account and create project on Firebase.
- Register account on Twillio.
- Register account on Google Gemini AI.
- Create a .env file in root level of server folder. That includes the following environment variables, fill the missing values based on your registrations of the above services:
  + PORT=5000
  + HOST=localhost
  + HOST_URL=http://localhost:5000
  + API_KEY=
  + AUTH_DOMAIN=
  + PROJECT_ID=
  + STORAGE_BUCKET=
  + MESSAGING_SENDER_ID=
  + APP_ID=
  + TWILIO_ACCOUNT_SID=
  + TWILIO_AUTH_TOKEN=
  + TWILIO_PHONE_NUMBER=
  + GEMINI_API_KEY=
- Change direction in terminal to the server folder. Run the commands: "npm install" then "npm start", to start the server.
- Change direction in terminal to the client folder. Run the commands: "npm install" then "npm start", to start the frontend.
- On the "Register a phone number" screen. Enter a phone number that you have access to. Or you can open the console of Chrome browser to see the access code. This is because in case you could not receive the sms for some reasons.
