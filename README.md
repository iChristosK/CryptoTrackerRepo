# CryptoTrackerRepo

## Instructions to Install
1. Clone the Repository: Use the git clone command followed by the URL of the repository you want to clone. In this case, the URL is https://github.com/iChristosK/CryptoTrackerRepo.git. So, you would use the following command:

`git clone https://github.com/iChristosK/CryptoTrackerRepo.git`

2. Navigate to the repository
`cd CryptoTrackerRepo`

3. Navigate to the app
`cd CryptoCoinTrackerApp`

4. Install Dependencies: React Native projects typically require dependencies to be installed. Use a package manager like npm or yarn to install the required dependencies. Run either of the following commands
`npm install` or `yarn install`

5. Run the Project: Once the dependencies are installed, you can run the React Native project using the appropriate command. If the project has been set up with React Native CLI, you can use:
To start the metro expo server run - `expo start`
To run on android ->`expo start --android`
To run on ios -> `expo start --ios`

# DOCUMENTATION
### 1. (DONE) Fetch and display a list of the top 10 cryptocurrencies by market cap. You can use the CoinGecko API ([https://www.coingecko.com/api/documentation/v3](https://www.coingecko.com/en/api/documentation)) or any other public API of your choice. 
### 2. (DONE) Display the following information for each cryptocurrency in the list:
    - Name
    - Symbol
    - Current price in USD
    - Market cap rank
    - 24-hour price change percentage
    - 7-day price change percentage
### 3. (DONE) Allow users to tap on a cryptocurrency to view more detailed information, such as:
    - Price in multiple currencies (USD, EUR, GBP, etc.)
    - Market cap
    - 24-hour trading volume
    - Circulating supply
    - Total supply (if available)
    - All-time high price
    - All-time low price
    - Price chart (last 30 days)
### 4. (DONE) Implement a search functionality that allows users to search for a specific cryptocurrency by name or symbol. The search results should display the same information as the top 10 list, and tapping on a result should show the detailed information view.
### 5. (DONE) Optimize the performance of the application by implementing efficient data fetching, caching, and state management techniques.
### 6. (DONE) Ensure the application works on both iOS and Android platforms.
### 7. (DONE) Write clean, modular, and well-documented code.
### 8. Include unit tests to cover critical parts of the application.
* For more information for the graph -> https://gifted-charts.web.app/areachart
   
   **Bonus:**

### DONE 1. Implement pagination or infinite scrolling to load more cryptocurrencies as the user scrolls down the list.
### DONE 2. Add a feature for users to mark their favorite cryptocurrencies and view them in a separate list.
### DONE 3. Make the application responsive to work on iPad and smartphone.

Architectural description of the components found this project:

Architectural description of the components  found in a CryptoCoinTracker React Native app:

Components:
--CoinView
--Icons
--Search
Reusable UI elements forming the app's interface.
Organized into folders based on functionality or usage.
Assets:
Contains static resources like images and fonts.
Organized into subfolders for better management.
Constants:
Holds static values such as API endpoints and configuration settings.
Centralizes configuration for easy updates.
Navigation:
--Stack
Manages flow between app screens.
Implemented using navigation libraries like React Navigation.
Screens:
Represents app screen.
Implemented as React components.
Store:
Manages app's global state using state management libraries like Redux.
Stores actions and reducers define state changes.
Types:
Type definitions (TypeScript/Flow) for enforcing type safety.
Defines structure of data objects, function parameters, etc.
Utils:
Contains helper functions used across the app.
Enhances code organization and reusability.