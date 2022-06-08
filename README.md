# survey
Standalone survey setup

-- in development --


### Surveys by email
Personal data only by email, no database.

##### Goal
Survey participants receive an email with a startup question. On answer the participant is send to the online survey page to finish the survey. The encrypted data (participant name, emailadress and survey data) is used on the server side only to check the unique survey id and to send the complete survey data by email back to the survey sender and the participant. The admin configurations and survey data is stored as encrypted json.

Technical parts
- [x] Send html email with ajax and php
- [x] Create link with encrypted data for answer from within email
- [x] Store and edit encrypted json data with ajax and php
