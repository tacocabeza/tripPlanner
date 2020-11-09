# Inspection - Team *T01* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *reviewing Search.js* |
| Meeting | *11/09/2020, 11:00 a.m, Microsoft Teams* |
| Checklist | *[University Of Washington's Code Review Check List](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwilifury7TsAhXaGM0KHTllA_oQFjAGegQIARAC&url=https%3A%2F%2Fcourses.cs.washington.edu%2Fcourses%2Fcse403%2F12wi%2Fsections%2F12wi_code_review_checklist.pdf&usg=AOvVaw1FYJUky_S6za5HoAUkwXai)* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| nd0905 | 20 |
| pdunton | 30 |
| suyashh | 20 |


### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| Search.js:3 | `InputGroup` and `ListGroup` should be imported from `reactstrap` on line 2 | low | pdunton |  |
| Search.js:18 | That function does not need to be bound to this | low | nd0905 |  |
| Search.js:29 | Do we want to put the empty find request in the `constants.js` file like we have for `EMPTY_TRIP`? | low | pdunton |  |
| Search.js:51-58 | multi-line return should be contained in parenthesis | low | nd0905 |  |
| Search.js:78 | style hard coded instead of in css class | low | nd0905 |  |
| Search.js:91 | if statement should have === "" not == "" | low | nd0905 |  |
| Search.js:93 | style hard coded instead of in css class | low | nd0905 |  |
| Search.js:94 | Listgroup.item should have unique key element | low | nd0905 |  |
| Search.js:102 | do we need error checking on the coords | low | suyashh |  |
| Search.js:103 | request version is hardcoded and out of date | low | nd0905 |  |
| Search.js:103 | request version is not constant | low | suyashh |  |
| Search.js:103 | Is request version correct? | low | pdunton |  |
| Search.js:111 | if statement should have !== "" not != "" | low | nd0905 |  |
| Search.js:112 | limit is not constant | low | suyashh |  |
| Search.js:121 | An empty `inputText` should clear the previous `this.state.results` | med | pdunton |  |
| UI | Clicking on the scrollbar closes the searchbar | med | pdunton |  |
|  |  |  |  |  |
