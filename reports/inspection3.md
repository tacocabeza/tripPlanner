# Inspection - Team *T01* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *reviewing Trip.js* |
| Meeting | *11/02/2020, 11:00 a.m, Microsoft Teams* |
| Checklist | *[University Of Washington's Code Review Check List](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwilifury7TsAhXaGM0KHTllA_oQFjAGegQIARAC&url=https%3A%2F%2Fcourses.cs.washington.edu%2Fcourses%2Fcse403%2F12wi%2Fsections%2F12wi_code_review_checklist.pdf&usg=AOvVaw1FYJUky_S6za5HoAUkwXai)* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| nd0905 | 30 Minutes |
| jgarc110 | 45 Minutes |
| pdunton | 45 Minutes |
| ah00t13 | 40 Minutes |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| Trip.js:12-17 | Many hardcode values in css const  | low | nd0905 | |
| Trip.js:12-17 | unused CSS const should be removed | low | ah00t13 | |
| Trip.js:28&36| not very DRY, object can be created in constants and be imported| low | jgarc110| |
| Trip.js:37-38 | Naming is confusing total or round trip | med | nd0905 | |
| Trip.js:92-113&204-213| Deleting a destination causes destinations to be duplicated and not deletable| med|jgarc110| |
| Trip.js:96 | Key not needed in the div | low | nd0905 | |
| Trip.js:115 | Check map update should not be in destination model | low | nd0905| |
| Trip.js:164, 182-185 | Would it be easier to have `tripNewLocation` just initialize to `null`?  | med | pdunton | |
| Trip.js:165 | Is checking `newPlace.location` redundant? | med | pdunton | |
| Trip.js:165 | check only for newPlace.location, checking both is redundant | low | ah00t13 | |
| Trip.js:166, 174, 175 | Can we access object data with `.latitude` and `.longitude`?  | med | pdunton | |
| Trip.js:166 | Value should be set in an else in `if` below.  | low | pdunton | |
| Trip.js:182 | Why do we need to check if both are `null`? | low | pdunton | |
| Trip.js:182 | checking both of these is redundant | low | ah00t13 | |
| Trip.js:190 | String equality.  What if `name` is `null`?  | low | pdunton | |
| Trip.js:215 | String equality.  What if `this.state.newItem.latitude` is `null`?  | low | pdunton | |
| Trip.js:210, 222 | Do we need parentheses? | low | pdunton | |
| Trip.js:210 | remove parentheses | high | ah00t13 | |
| Trip.js:215 | What is this checking?  Does it really have anything to do with `latitude`? | med | pdunton | |
| Trip.js:223 | should the to sendTripRequest really be in the setState ?| low| jgarc110| |
| Trip.js:229 | We should check `this.state.destinations.length > 0` instead | low | pdunton | |
| Trip.js:231-239| we could create this in constants and import it, keeping things dry 💧💧| low | jgarc110| |
| Trip.js:234 | Earth Radius is hard coded | med | nd0905 | |
| Trip.js:234 | Earth Radius not a constant | low | pdunton | |
| Trip.js:270 | var instead of let | low | nd0905 | |
| Trip.js:281 | Do we have error checking here? | high | pdunton | |
| UI | When adding destinations, clicking a search result will directly add to trip, bypassing the "new item" | low | pdunton | |