# crash-reporting

A Crash Reporting library and application

## Prereqs

You should have both `yarn` and `lerna` shimmed into your `asdf` installation of `nodejs`.

This can be done via the following steps...

```shell
npm install -g yarn
```

```shell
npm install -g lerna
```

Typing `which yarn` and `which lerna` should reveal something like the following...

```
~/.asdf/shims/[MODULE_NAME]
```

## Setup

```shell
git clone git@github.com:stdout-reach/crash-reporting.git && cd ./crashing-reporting
```

```shell
yarn install
```

```shell
yarn bootstrap
```

```shell
yarn start
```

### Reports

Reports are fetched from Rollbar using RQL
A standard query to run could be...

```sql
SELECT *
FROM item_occurrence
WHERE person.email = "name@email.com" AND item.title = "Title to look for"
ORDER BY timestamp DESC
```

This repo does not support programmatic searches so a manual query must be run in the Rollbar dashboard, from there a JSON file may be copy/pasted into the `cypress/reports` directory.
