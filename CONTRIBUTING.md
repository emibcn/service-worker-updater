# Contribution Guidelines

**emibcn/service-worker-updater** is powered by the community, so feel free to contribute in any way you can to help us!

## How you can help
- Open issues for things you want to see added, modified, discuss ideas or help out with existing issues.
- Issues related to community organization, coding guidelines, best practices, tooling, etc. are also welcome.
- If you found a security issue, follow the [security guidelines](https://github.com/emibcn/service-worker-updater/blob/master/SECURITY.md).
- Apply for an open issue if you think you can solve it by commenting on it, even if only partially.
- Submit pull requests with your code ([see guidelines below](#coding-guidelines)) or other updates (tags, descriptions, explanations, typos, examples, documentation, etc).

## Ground rules
Breaking any of the rules will result in your issue or pull request being closed.
Please follow the [**Code of Conduct** guidelines](https://github.com/emibcn/service-worker-updater/blob/master/CODE_OF_CONDUCT.md) above all else.

## Development environment
Before you begin contributing, you should fork and download the repo, and then install the dependencies described in `package.json`:

- Fork this repository to your account.
- Clone your copy to your local machine:
```sh
git clone git@github.com:[YOUR USER HERE]/service-worker-updater.git
```
- Install the dependencies:
```sh
cd service-worker-updater
yarn install
```

## Coding guidelines
- Update your forked repository with the issue/PR related code changes.
- Avoid space and indent changes in the code you are not changing. If you think you can fix indentation, do a dedicated PR for that (unless it only relates the code you are writing/changing). This makes PR review easier.
- The indentation for this project is the JavaScript standard: 2 spaces (automatic linting rule check is a Work In Progress).
- If you need to add any JavaScript dependency to `package.json`, use `yarn` (default for Create React App) instead of `npm`. Using more than one package manager in the same project is a bad idea. Remember to commit `yarn.lock`, too.
- Try to maintain logical concepts and components in separated files, easing its maintanability and reusability.
- If a file gets too big (1-2 pages), try to separate logic into different functions/classes/components ([composition](https://reactjs.org/docs/components-and-props.html#extracting-components), [HOC](https://reactjs.org/docs/higher-order-components.html), externalize non-React code, ...). There are already some files too big. They are in the TODO list.
- Add or adapt the tests to reflex what you have done, or open a new issue asking for help on that. Currently, tests are a Work In Progress, but highly desired. Looks boring, but tests rules :+1: !
- Run the tests before commiting changes.

## Library details
This is a [React](https://reactjs.org/) component, Typescript compatible.

#### Service worker
One of the most important things about PWAs is that the first time a user downloads the web app, it installs a service worker which controls when the app files (the non data assets, like JS, CSS and SVG ones) need to be updated: it will periodically (some days in betwwen retries) check if the Manifest have been updated. If an update is needed, it downloads all the assets, but instead of automatically "executing" them, informs the user about the update and shows a button to perform the update.

#### Installability
When a modern browser detects that an app complies with PWA standards, the user receives a notification, asking to install the webapp into the device as a new app (PC, mobile, etc). This allows fast access to it (no need to look into browser tabs and other facilities) and the service worker checking for updates from time to time.

### Lighthouse
Use your Chrome/Chromium Lighthouse tool to verify everything is working acceptably fine in the example app.

### Performance
- Use the performance testing tools of yuor browser to reduce memory leaks, UI blocks, CPU and memory hogging, etc.
- Use `React.memo` and `React.memoize` wisely: add explicit dependencies and reduce them to the minimum ones.
