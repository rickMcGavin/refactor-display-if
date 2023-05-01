# Refactor Display-If Script

This script automates the refactoring of JSX code that uses the `display-if` prop from the `babel-plugin-jsx-display-if` package. The script removes the `display-if` prop from JSX elements and replaces it with the short-circuit operator (`&&`) for conditional rendering.

## What the script does

Given a JSX element with the `display-if` prop:

```jsx
<div display-if={condition}>Content</div>
```

The script will transform the JSX element into:

```jsx
{
  condition && <div>Content</div>;
}
```

This refactoring ensures that the JSX element is only rendered when the condition is truthy, which is the same behavior as the original `display-if` prop.

## Requirements

To use this script, you will need the following installed on your system:

- Node.js (version 10 or higher)

## Setup

1. Clone this repo to your local machine.

2. Install node modules:

```bash
npm install
```

## Usage

Now you can run the script using the `npm run refactor` command followed by the path to your TypeScript or JavaScript source files:

```bash
npm run refactor <path-to-your-source-files>
```

The transformation will be applied to all the files in the specified folder and its subfolders. _Note_: It is best to choose a path as specific as you can to avoid running the script against unnecessary files. In most cases, the `display-if` prop won't exist outside of your `src` or `components` folder.

Review the changes made by the script and ensure that the refactored code behaves as expected.

## Extremely Important Notes

- This script does not prettify the files. You should run Prettier or ESLint with the `--fix` flag after the files have been modified.
- There may be edge cases that are not covered by this code as they weren't encountered during testing. It's a simple script, and it should be easy to modify to meet your needs if necessary.
