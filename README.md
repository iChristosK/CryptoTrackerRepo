# CryptoTrackerRepo

## Instructions to Install
1. Clone the Repository: Use the git clone command followed by the URL of the repository you want to clone. In this case, the URL is https://github.com/iChristosK/CryptoTrackerRepo.git. So, you would use the following command:

git clone https://github.com/iChristosK/CryptoTrackerRepo.git

2. Navigate to the repository
cd CryptoTrackerRepo

3. Navigate to the app
cd CryptoCoinTrackerApp

4. Install Dependencies: React Native projects typically require dependencies to be installed. Use a package manager like npm or yarn to install the required dependencies. Run either of the following commands
npm install or yarn install 

5. Run the Project: Once the dependencies are installed, you can run the React Native project using the appropriate command. If the project has been set up with React Native CLI, you can use:
To start the metro expo server run - expo start
To run on android -> expo start --android
To run on ios -> expo start --ios 


* For more information for the graph -> https://gifted-charts.web.app/areachart
   

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