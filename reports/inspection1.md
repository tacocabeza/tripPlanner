# Inspection - Team *T01* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *Reviewing Atlas.js* |
| Meeting | *10/16/2020, 11:00 am, Microsoft Teams* |
| Checklist | *[University Of Washington's Code Review Check List](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwilifury7TsAhXaGM0KHTllA_oQFjAGegQIARAC&url=https%3A%2F%2Fcourses.cs.washington.edu%2Fcourses%2Fcse403%2F12wi%2Fsections%2F12wi_code_review_checklist.pdf&usg=AOvVaw1FYJUky_S6za5HoAUkwXai)* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
|Jesus Garcia| 50 minutes |
| Alex Hooten | 40 min. |
| Nick Davidson | 40 Minutes |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
|Atlas.js:292| hard coded earthRadius|low |Jesus| |
|Atlas.js:275| no case handling null places, causing uncaught type error| med | Jesus| |
|Atlas.js:212| possible unused parameter => name|low|Jesus||
|Atlas.js:27 | unused import statement | low | Jesus | |
|Atlas.js:185| key paramater is possibly redundant| med| Jesus||
| Atlas.js:77 | toggleTab does not need the isTab parameter anymore | low | Alex |  |
| Atlas.js:201 | setLocation has un-descriptive parameters | low | Alex | |
| Atlas.js:212 | searchListItemClick currently doesn't use the name parameter | low | Alex | |
| Atlas.js:203,213,225,240,245 | setState statements should be grouped | low | Alex | |
| Atlas.js:general | establish consistency with using semicolons or not | low | Alex | |
| Atlas.js:general | reorder functions to be grouped by relation to each other | low | Alex | |
| Atlas.js:56 | State is getting to a length that makes it difficult to understand | low | Nick |  |
| Atlas.js:138-146 | We have a render function for control but it is not used for all buttons | low | Nick |  |
| Atlas.js:156 | There is a set state to true not needed if there is no way to change | low | Nick |  |
| Atlas.js:182 | Returning with html tags should be in parens to not loose html | low | Nick |  |
| Atlas.js:general | Lots of if statements with no else can cause unknown issues from calling function | low | Nick |  |
| Atlas.js:general | Spacing between sections of code is not consistant | low | Nick |  |

