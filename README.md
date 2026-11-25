# Enerfip Dashboard

## Description :
  This project is a dynamic dashboard that displays real-time amounts collected by the company Enerfip for the current year (Year N) and the previous year (Year N-1). It also provides a graphical comparison of collected amounts and cumulative amounts between the two years.

## Features :
  - Collected Amount Display: The total amount collected and the amount for the current year are shown, with an animation triggered when the amount reaches a specific threshold.
  - Insured Amount Display: A secondary indicator below the current-year total shows the current year's insured amount from Redash query 1300 (`insured_amount`), refreshed every minute. Missing data or a failed request displays "Amount unavailable", not zero.
  - Graphical Comparison: Two charts are generated:
    - A comparison of the collected amounts by month for the current year and the previous year.
    - A comparison of the cumulative amounts collected for both years.
    - Real-time Update: Data is fetched via an API hosted on Heroku, and the amounts are updated every minute.

## Technologies Used :
  - React: For building the user interface.
  - Vite: For fast bundling and development.
  - Axios: For making HTTP requests to the API.
  - dotenv: For managing environment variables.
  - CanvasJS: For rendering the charts.
  - React-Router-Dom: For handling navigation between pages.

## Installation :

  Clone the project from GitHub and install the dependencies:
  
  `git clone https://github.com/<username>/frontend.git
   cd frontend
   npm install`

## Running the Project in Development Mode : 

`npm run dev`

This will start the application on http://localhost:3000.

Configure `VITE_API_URL` (the Redash base URL) and `VITE_INSURED_AMOUNT_API_KEY`
(the API key for query 1300) in an untracked `.env.local` file. For deployment,
add `VITE_INSURED_AMOUNT_API_KEY` to the repository's GitHub Actions secrets.
Never commit API keys. Vite embeds `VITE_*` values in the browser bundle, so
environment variables keep keys out of source control but do not make them
private from dashboard visitors.

Run the API response tests with `node --test src/enerfip_api/response.test.js`.


## Project Structure : 
    /src

      /assets         # Contains resources like images and audio files
  
      /components     # React components for displaying amounts and charts
  
      /enerfip_api    # Handles the API calls to Enerfip
  
      /pages          # Pages displaying amounts and charts
  
      /utils          # Utility functions, like currency conversion
  
      App.js          # Main entry point for the application
  
      main.js         # React initialization file
  
      index.html      # HTML template
    

## Dependencies : 
  ### Main Dependencies : 
    - @canvasjs/react-charts: For displaying interactive charts.
    - axios: For making HTTP requests to the API.
    - dotenv: For managing API keys through environment variables.
    - react and react-dom: For building the UI.
    - react-router-dom: For routing between pages of the app.
    - react-slot-counter: For displaying animated amounts.

  ### Development Dependencies : 
    - vite: For the development environment setup.
    - eslint: For code analysis and linting.

## Error Handling : 
  The project includes error-handling mechanisms to ensure that data is fetched and formatted correctly. For example, if no data is available, an error will be thrown.


## Known Issues : 
  - The data is updated every 60 seconds.
  - The data is fetched from a third-party API (Heroku), so any downtime of the API may affect the display of amounts.
