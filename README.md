# Docksal Gatsby-Drupal Starterkit

This is the repository for a Docksal starterkit using Drupal and Gatsby. The project will be hosted on Acquia (Drupal) and Netlify (Gatsby), and local development will use Docksal. If you do not currently have Docksal on your local machine, I suggest following the instructions at [Docksal.io](https://docs.docksal.io) since they cover pretty much everything you may need to know.

We are using the Acquia stack in Docksal to simulate the Acquia system setup and match versions in use on Acquia. Gatsby lives on its own container to simulate a 2-server setup. To run a command in the gatsby container that is not already a custom command in this repo, you will need to use the following format until Docksal releases the ability to define which containers to use `bash` in other than `cli`.

To run a command in the `gatsby` container:

```bash
container_user="-u docker" fin exec --in=gatsby bash -lc "<your command here">
```

To shell into the `gatsby` container

```bash
container_user="-u docker" fin exec --in=gatsby bash -i
```

Consider aliasing these commands to your `.*rc` or `.*_profile` files for easier usage

```bash
Equivalent of `fin bash`:
alias fgb="container_user='-u docker' fin exec --in=gatsby bash -i"

Equivalent of `fin exec`
alias fg="container_user='-u docker' fin exec --in=gatsby bash -lc"
```

and run the command from your host machine, surrounding the command in quotes.

Example: `fg "npm i"`

**NOTE**: This is completely optional and not necessary for the local install to work.

## Project versions

* PHP 7.3.x
* Drupal 8.7.8
* Node 10.16.3
* NPM 6.9.0
* Gatsby 2.15.35

## Project dependencies

* [git](https://git-scm.com/)
* [docker](https://www.docker.com/)
* [docksal](https://docksal.io)

## Project setup

### Clone repository

```bash
$ git clone git@github.com:JDDoesDev/docksal-decoupled-starterkit.git
```

### Copy .env file

```bash
$ cd gatsby
$ cp .env.default .env.development
$ cp .env.default .env.production
```

The `.env` files keep environment variables specific to the environment that is being worked on. The non-default files should not be committed to the repo.

### Start containers and project

```bash
$ fin init
```

## Begin development

The Drupal side of the setup lives at `http://{PROJECT_ROOT}.docksal` and any Drush or Drupal console commands can be run wrapped in `fin <command> <arguments>`. Other commands are available specific to this project.

### Workspaces

During development, we are going to be utilizing the Yarn Workspaces functionality in order to have access to the `gatsby-theme-drupal` helpful API documentation. To create additional workspaces, place a theme in a folder under `/gatsby/` with its own `package.json`. The name in `package.json` will be the Yarn name of the workspace, but it will be defined in `/gatsby/package.json` by its folder.

Example:

```json
## /gatsby/package.json
{
  "name": "gatsby-starter-theme-workspace",
  "private": true,
  "version": "0.0.1",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build-drupal": "yarn workspace gatsby-theme-drupal build",
    "build-gnorm": "yarn workspace gatsby-theme-gnorm build"
  },
  "workspaces": [
    "gatsby-theme-drupal" // This is the folder where the theme lives.
  ],
  "dependencies": {
    "gatsby-plugin-layout": "^1.1.13",
    "react-html-parser": "^2.0.2"
  }
}

## /gatsby/gatsby-theme-drupal/package.json
{
  "name": "drupal", // This is the name we'll reference when using yarn commands
  "private": true,
  "description": "Extension of gatsby-theme-drupal for use in building components for Gatsby",
  "version": "0.1.0",
  "author": "JD Flynn <jflynn8@gmail.com>",
  ....
}
```

To use workspaces you will have to use this format for yarn commands:

`fin yarn workspace WORKSPACE_NAME COMMAND [ARGS]`

Development workspaces:

* `drupal` - for getting GraphQL queries

### Custom commands

* `fin gatsby-build` -- builds a static version of the site.
    * Note: This requires the `.env.production` file to exist and contain the correct information.
    * Note: Can use a `workspace` as an argument.
    * Example: `fin gatsby-build drupal` builds in the `drupal` workspace. `fin gatsby-build` will build from the `/gatsby/` folder.
* `fin gatsby-dev` -- starts the Gatsby development environment environment, including live-reload and the GraphiQL web-based IDE for developing GraphQL queries.
    * Note: This requires the `.env.development` file to exist and contain the correct information.
    * Note: Can use a `workspace` as an argument.
    * Example: `fin gatsby-dev drupal` starts the development server in the `drupal` workspace. `fin gatsby-dev` will start from the `/gatsby/` folder.
* `fin yarn` -- Run a yarn command in the Gatsby container. Usage `fin yarn <command>`.  Example: `fin yarn install`
* `fin yarn-ws` -- Run a yarn command in a workspace.


