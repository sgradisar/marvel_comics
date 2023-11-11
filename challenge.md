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

- Implemention of the filters was a slight challenge as "formats" of the Comics are only being fetched every time I make a call to the API and Marvel API does not provide an option to call all the available filters for the comics in advance. I got around this by adding filter options "as they fetch".
- I constantly got some duplicate items in api calls when setting limit to 20 items and offsetting by 20. I later figured out that this must be some sort of api issue as the problem persisted in Marvel API testing tool (when setting limit to 20/24/30 and offsetting by 20/24/30). Things are working fine when setting limit to 40 and offsetting by 40. After consulting, I first left left it at 20/20, but later changed to 24/24 because this is dividable by 4/3/2 (responsive layout).
- because the focDate in the API is very inconsistent I opted to output the focDate where it is available and is in readable format. Where it was unavailable or in non-readable format I opted to outputting the release year extracted from the comic title. In cases where even this is unavailable, I output "Not specified" as a year of release.
