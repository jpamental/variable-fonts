# A Variable Fonts Primer for Designers & Developers

**[googlefonts.github.io/variable-fonts](https://googlefonts.github.io/variable-fonts)**

This is a project to create a thorough introduction to the latest font technology, Variable Fonts:
their benefits, use cases, and techniques to adopt them in your own projects.

This project is not an official Google product, and Google provides no support for it.

## Contributing Ideas

If you have any comments, questions or suggestions for this project, please post them as issues on the Github issue tracker, [github.com/googlefonts/variable-fonts/issues](https://github.com/googlefonts/variable-fonts/issues)

## Web Development

If you are a web developer, you can run the static site generator for this project locally with a recent version of Node.js and Ruby installed on your system.

First, clone the project and `cd` into the directory. Then run:

```sh
# Install Jekyll and dependencies
bundler install

# Install front-end dependencies
npm install

# Start the project
npm start
```
Then visit <http://localhost:4000/variable-fonts>

To manually compile the site down to static HTML, CSS, and JavaScript, run:

```sh
npm run build
```

Assets are currently built to the `assets` folder, which are kept as part of the git history for now for the sake of deployment. Then, the Jekyll static site generator builds the final site to the `_site` folder.

## Deployment

The link to view the deployed site is [googlefonts.github.io/variable-fonts](https://googlefonts.github.io/variable-fonts).
