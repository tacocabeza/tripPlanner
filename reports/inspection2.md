# Inspection - Team *T01* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *Reviewing Find.js* |
| Meeting | *10/21/2020, 11:00 am, Microsoft Teams* |
| Checklist | *[University Of Washington's Code Review Check List](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwilifury7TsAhXaGM0KHTllA_oQFjAGegQIARAC&url=https%3A%2F%2Fcourses.cs.washington.edu%2Fcourses%2Fcse403%2F12wi%2Fsections%2F12wi_code_review_checklist.pdf&usg=AOvVaw1FYJUky_S6za5HoAUkwXai)* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Jesus | 35 minutes|

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
|Find.java:3| unused import|low|Jesus| | 
|Find.java:9| unused import|low|Jesus| |
|Find.java:28| this keyword is redundant | low| Jesus | |
|Find.java:40| getMatch() is redundant, it is never called in find.java or in RequestFind| low| Jesus| |
 

