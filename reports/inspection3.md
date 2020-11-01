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

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| Trip.js:12-17 | Many hardcode values in css const  | low | nd0905 | |
| Trip.js:28&36| not very DRY, object can be created in constants and be imported| low | jgarc110| |
| Trip.js:37-38 | Naming is confusing total or round trip | med | nd0905 | |
| Trip.js:92-113&204-213| Deleting a destination causes destinations to be duplicated and not deletable| med|jgarc110| |
| Trip.js:96 | Key not needed in the div | low | nd0905 | |
| Trip.js:115 | Check map update should not be in destination model | low | nd0905| |
| Trip.js:223 | should the to sendTripRequest really be in the setState ?| low| jgarc110| |
| Trip.js:231-239| we could create this in constants and import it, keeping things dry 💧💧| low | jgarc110| |
| Trip.js:234 | Earth Radius is hard coded | med | nd0905 | |
| Trip.js:270 | var instead of let | low | nd0905 | |
|  |  |  |  | |
|  |  |  |  | |
