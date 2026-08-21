# enpServices

A modern React and Vite web application for showcasing services and products. The application provides a responsive user interface, service listings, product catalogs, contact functionality, and client-side routing for a seamless user experience.

## Features

* Built with React 19 and Vite
* Fast development environment with Hot Module Replacement (HMR)
* Responsive and modern user interface
* Client-side routing with React Router
* Modular and maintainable component architecture
* Dedicated service and product showcase pages
* Contact form functionality
* Lightweight client-side cart state management
* GitHub Pages deployment support

## Technology Stack

* React 19
* Vite
* React Router DOM
* JavaScript (ES6+)
* CSS3

## Project Structure

```text
enpServices/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
├── scripts/
├── package.json
└── vite.config.js
```

## Installation

Clone the repository and install the project dependencies:

```bash
git clone <repository-url>
cd enpServices
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

Once the server is running, the application will be available at:

```text
http://localhost:5173
```

## Production Build

Create an optimized production build using:

```bash
npm run build
```

The resulting production files will be generated in the `dist/` directory.

## Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Deployment

The project supports deployment to GitHub Pages.

```bash
npm run deploy
```

Before deploying, ensure that the repository configuration, GitHub Pages settings, and application homepage/base path are correctly configured.

## Available Scripts

| Command                  | Description                                     |
| ------------------------ | ----------------------------------------------- |
| `npm run dev`            | Starts the Vite development server              |
| `npm run build`          | Creates an optimized production build           |
| `npm run preview`        | Serves the production build locally for testing |
| `npm run deploy`         | Deploys the application to GitHub Pages         |
| `npm run lint`           | Runs ESLint to identify code quality issues     |
| `npm run contact-server` | Starts the contact service endpoint             |

## Application Components

The application includes the following primary components and features:

* Navigation Bar
* Hero Section
* Services Section
* Products Page
* AMC Plans Page
* Contact Form
* Footer
* Custom Hooks for application state management

## Requirements

The project requires a supported version of Node.js:

```text
Node.js 20.19+ or Node.js 22+
```

Check your installed Node.js version with:

```bash
node -v
```

If your version does not meet the requirements, upgrade Node.js before installing dependencies or running the application.

## Troubleshooting

### Missing Dependencies

If dependencies are missing or the project fails to start, reinstall them with:

```bash
npm install
```

### Node.js Version Issues

If Vite reports that your Node.js version is unsupported, verify your current version:

```bash
node -v
```

Upgrade to Node.js 20.19 or later, or use Node.js 22 or later.

### Linting

Run the linter with:

```bash
npm run lint
```

Address any reported issues before submitting changes or creating a production build.

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository.
2. Create a dedicated feature branch.
3. Implement and test your changes.
4. Commit your changes with a clear and descriptive message.
5. Push the branch to your fork.
6. Open a Pull Request for review.


## Author

Developed and maintained by the repository owner.
