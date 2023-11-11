# Sebastian Gradišar

### Project Setup

To set up the project, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the project dependencies.
4. Run `npm start` to start the development server.
5. To build the application for production, run `npm run build`. The built files will be located in the `build` directory.

### List of requirements I could not implement:

#### /

### Issues faced during the implementation:

- I constantly got some duplicate items in api calls when setting limit to 20 items and offsetting by 20. I later figured out that this must be some sort of api issue as the problem persisted in Marvel API testing tool (when setting limit to 20/24/30 and offsetting by 20/24/30). Things are working fine when setting limit to 40 and offsetting by 40. After consulting, I first left left it at 20/20, but later changed to 24/24 because this is dividable by 4/3/2 (responsive layout).
