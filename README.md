# A Variable Fonts Design & Development Primer site

## Getting started

To run the static site generator for this project locally, you’ll need to have a recent version of Node.js and Ruby installed on your system.

First, clone the project and `cd` into the directory. Then run:

```sh
# Install Jekyll and dependencies
bundler install

# Install front-end dependencies
npm install

# Start the project
npm start

# Now serving locally at localhost:4000/typography
```

## Build


To manually compile the site down to static HTML, CSS, and JavaScript, run:

```sh
npm run build
```

Assets are currently built to the `assets` folder, which are kept as part of the git history for now for the sake of deployment. Then, the Jekyll static site generator builds the final site to the `_site` folder.

## Deployment

The link to view the deployed site is [googlefonts.github.io/typography](https://googlefonts.github.io/typography).
