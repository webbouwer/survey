# Survey - by e-mail
An application to **create and send surveys by email**.
Survey participant encrypted data is only send by email, not stored. All other used data is stored encrypted in a json file.

Build with json, ajax and php, this application is in development and **not for production** use yet.
This code and repository may be suited for personal and educational use.

## Mechanics
Survey participants receive an email with a startup question. On answer the participant is send to the online survey page to finish the survey. The encrypted data (participant name, emailadress and survey data) is used on the server side only to check the unique survey id and to send the data of the completed survey back to the survey sender and the participant by email. The admin configurations and survey data is stored as encrypted json.

In Progress:
- Survey Engine
	- [ ] preview survey email
	- [ ] preview/run survey page
	- [ ] edit survey page
	- [ ] set theme

## Change log
Development End
Version v6.7 is the latest version made during this development trail.
The application succeeded in sending encrypted data back and forth. Allthough a promising project the development of a backoffice with enough data management and feedback funtcions was a bit to much to develop in a short time. This Repository can be used for educational usage.

In [prototype v6](https://github.com/webbouwer/survey/tree/Prototype-v6) preparing styling and survey/profile edit options
- Remake Theming dark/light detect and toggle, variables in single style.css
- Configlist profile management new/edit/copy/delete
- Prepare survey preview and edit mode
- Email form with profile and survey select auto fill

In [prototype v5](https://github.com/webbouwer/survey/tree/Prototype-v5) mailfunction php and styling
- Mail function is replaced with the phpmailer class
- Datalist edit options are extended with json data for the survey edit mode (fields-click-to-edit)
- Theming extended with theme dark/light detect for public and admin views
- Preparing email form for options and settings - to be replaced with phpmailer

In [prototype v4](https://github.com/webbouwer/survey/tree/Prototype-v4) functionalities extended and changed a lot
- login replaced with server side php login including first run and profile login config
- data edit including basic type questions survey json data
- Theming menu slide (interface test)

In [prototype v3](https://github.com/webbouwer/survey/tree/Prototype-v3) a few basic functionalities are in place like
- data edit (inline) with read/write encrypted data including survey json data
- testing file protection
- sending email with ajax and php mail function

In [prototype v2](https://github.com/webbouwer/survey/tree/prototype_v2-ajax_login) testing functionalities like
- login default, testing ajax login - to be replaced with server side php login
- simple php theme for public and admin views
- sending basic email php mail function

In [prototype v1](https://github.com/webbouwer/survey/tree/prototype_1) testing core survey email functions
-   Send html email with ajax and php
-   Create link with encrypted data for answer from within email
-   Store and edit encrypted json data with ajax and php

## Development and todo
- survey edit, view and sending
	- edit screen
	- preview screen
	- send options
- template class is in place but not structured yet
	- depending on template the design can be styled
- field validations will need better testing
	- data mash-up for sending prepared data as email content
- Implement phpmailer (SMTP)
	- prepare fail-save solutions for different and common email problems from servers.

---
© Copyright Webdesign Den Haag™ 2022
All rights reserved Oddsized Interactive©
Webdesign Den Haag™ is a trademark of Oddsized Interactive©.
