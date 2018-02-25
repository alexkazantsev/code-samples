##Kids Fund  web application
####Tech stack:
    Next.js, React.js, Redux

###Prepare to start:
    $ git clone git@gitlab.com:s-pro/kidsfunds/admin.git
    $ cd admin

###Development:
    $ npm install
    $ npm run dev

##Project rules
####Flag code:

```
#!javascript
//@ TODO: { programmer }:{ comment }.

//@ NOTE: { programmer }:{ comment }.
```

####ESLinter:
###### ESLint run to check before push origin:

    $ node_modules/.bin/eslint {folder/file to check}.

###### ESlint ignore line:
```
#!javascript
// eslint-disable-line
```
###### ESLint ignore block:

```
#!javascript
/* eslint-disable */
{ code }
/* eslint-enable */
```

####Branches:
```
#!javascript

Name: { type }/{ jira-task-number }/{ jura-task-description }.

Commit: { jira-task-number }/{ commit-description }.
```
