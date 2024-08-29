# wally

# Setup Guide

- npm install
- check package.json for devdep and dep files in back/front end

# Commit Rules

1. `build`:

   - **When to Use**: Use this type for changes that affect the build system or external dependencies (e.g., changes to `package.json`, webpack, or build scripts).
   - **Example**: `build: update webpack to version 5`

2. `chore`:

   - **When to Use**: Use this type for routine tasks that don't modify application source code, such as configuration changes, updating packages, or setting up the environment.
   - **Example**: `chore: update npm dependencies`

3. `ci`:

   - **When to Use**: Use this type for changes to your continuous integration configuration files and scripts (e.g., GitHub Actions, Travis, CircleCI). This doesn't affect the source code or tests.
   - **Example**: `ci: add Node.js 16 to the test matrix`

4. `docs`:

   - **When to Use**: Use this type for changes to documentation only. This could be updating a README file, adding documentation comments, or making markdown files.
   - **Example**: `docs: add usage instructions to README`

5. `feat`:

   - **When to Use**: Use this type when adding a new feature or functionality to the codebase. It signifies that new user-facing features have been added.
   - **Example**: `feat: add user login functionality`

6. `fix`:

   - **When to Use**: Use this type for bug fixes. This indicates that the codebase has been modified to fix an issue or bug.
   - **Example**: `fix: correct issue with form validation`

7. `perf`:

   - **When to Use**: Use this type when making changes that improve performance, such as optimizing code, reducing load times, or increasing efficiency.
   - **Example**: `perf: reduce API response time by optimizing queries`

8. `refactor`:

   - **When to Use**: Use this type for code changes that neither fix a bug nor add a feature. Typically, this is for code restructuring, cleaning, or simplifying code.
   - **Example**: `refactor: simplify authentication middleware`

9. `revert`:

   - **When to Use**: Use this type when you need to undo a previous commit. The message should describe the commit being reverted.
   - **Example**: `revert: revert "feat: add user login functionality"`

10. `style`:

    - **When to Use**: Use this type for changes that do not affect the logic of the code but relate to code style, such as formatting, whitespace, and semicolons.
    - **Example**: `style: format code with Prettier`

11. `test`:
    - **When to Use**: Use this type for adding or updating tests, such as creating unit tests, integration tests, or updating existing tests.
    - **Example**: `test: add tests for user login functionality`
