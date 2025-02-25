# Netlify Project

This project uses Jekyll to build static sites. The `Gemfile` specifies the necessary gems for the project.

## Setup

1. Install [Bundler](https://bundler.io/):

   ```sh
   gem install bundler
   ```

2. Install the gems specified in the `Gemfile`:

   ```sh
   bundle install
   ```

3. Build the site:

   ```sh
   bundle exec jekyll build
   ```

4. Serve the site locally:

   ```sh
   bundle exec jekyll serve
   ```

## Deployment

This project is configured to be deployed on [Netlify](https://www.netlify.com/).
