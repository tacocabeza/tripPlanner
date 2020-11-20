# Inspection - Team *T01* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *reviewing Trip.js* |
| Meeting | *11/20/2020, 11:00 a.m, Microsoft Teams* |
| Checklist | *[University Of Washington's Code Review Check List](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwilifury7TsAhXaGM0KHTllA_oQFjAGegQIARAC&url=https%3A%2F%2Fcourses.cs.washington.edu%2Fcourses%2Fcse403%2F12wi%2Fsections%2F12wi_code_review_checklist.pdf&usg=AOvVaw1FYJUky_S6za5HoAUkwXai)* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| nd0905 | 40 |
| pdunton |  |
| jgarc110 |  |
| suyashh |  |
| ah00t13 | 35 |


### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| Trip.js:103-106 | 4 buttons in a row should make render button function | low | nd0905 |  |
| Trip.js:156,309 | onDrop and removeDestination are extremely similar | low | ah00t13 |  |
| Trip.js:157 | Unused Const | low | nd0905 |  |
| Trip.js:157 | Payload and element are unused | low | ah00t13 |  |
| Trip.js:227 | Multiple buttons should be made in function | low | nd0905 |  |
| Trip.js:235,240 | Move const callback function into onChange directly to save a line | low | ah00t13 |  |
| Trip.js:268,292 | Repeated Logic should be pulled out | low | nd0905 |  |
| Trip.js:373 | Does response ever get changed back to 0.0 | med | nd0905 |  |
| Trip.js:429 | Can the statement within this function be substituted directly where it is called | low | ah00t13 |  |
| Trip.js:450 | Can the error message be more helpful to user | low | nd0905 |  |
| Trip.js:477-487 | Could any of these values be null? | med | nd0905 |  |
| Trip.js:147,159,163,etc. | JSON.parse has no error catching | low | nd0905 |  |
| Trip.js | Move all destinations to new component | low | nd0905 |  |
| Trip.js | Move trip controls to a new sub-component | med | ah00t13 |  |
|  |  |  |  |  |

