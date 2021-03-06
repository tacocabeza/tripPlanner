# Inspection - Team *T01* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *Reviewing Atlas.js* |
| Meeting | *10/16/2020, 11:00 am, Microsoft Teams* |
| Checklist | *[University Of Washington's Code Review Check List](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwilifury7TsAhXaGM0KHTllA_oQFjAGegQIARAC&url=https%3A%2F%2Fcourses.cs.washington.edu%2Fcourses%2Fcse403%2F12wi%2Fsections%2F12wi_code_review_checklist.pdf&usg=AOvVaw1FYJUky_S6za5HoAUkwXai)* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
|Jesus Garcia| 50 min. |
| Alex Hooten | 40 min. |
| Preston Dunton | 45 min. |
| Suyash Hiray | 40 min. |
| Nick Davidson | 40 min. |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| Atlas.js:27 | unused import statement | low | Jesus | 280 |
| Atlas.js:56 | State is getting to a length that makes it difficult to understand | low | Nick | 313 |
| Atlas.js:65 | Is locations always empty? | low | Suyash | 271 |
| Atlas.js:77 | toggleTab does not need the isTab parameter anymore | low | Alex | 314 |
| Atlas.js:135 | Make sure `getLine()` is replaced with `renderDistanceLine()` | low | Preston | 271 |
| Atlas.js:138-146 | We have a render function for control but it is not used for all buttons | low | Nick | 315 |
| Atlas.js:156 | There is a set state to true not needed if there is no way to change | low | Nick | 316 |
| Atlas.js:156-169 | Would renderTripLines ever be false - hardcoded true | low | Suyash | 316 |
| Atlas.js:161-169 | See if map button needs to be rendered separately | low | Suyash | no change |
| Atlas.js:182 | Returning with html tags should be in parens to not loose html | low | Nick | 271 |
|Atlas.js:185| key paramater is possibly redundant| med| Jesus| 271 |
| Atlas.js:188 | Polyline color is not a constant | low | Preston | 317 |
| Atlas.js:201 | setLocation has un-descriptive parameters | low | Alex | 318 |
| Atlas.js:201-210 | `setLocation()` has confusing parameters and logic| med | Preston | 318 |
| Atlas.js:201-210 | `setLocation()` could be passed a location other than options (1,2,3) | low | Preston | 318 |
| Atlas.js:203,213,225,240,245 | setState statements should be grouped | low | Alex | 320 |
|Atlas.js:212| possible unused parameter => name|low|Jesus| 280 |
| Atlas.js:212 | searchListItemClick currently doesn't use the name parameter | low | Alex | 280 |
| Atlas.js:220 | What's up with using `self` instead of `this`? | low | Preston | no change |
| Atlas.js:221,222 | Where is variable `navigator` being initialized? | med | Preston | no change |
| Atlas.js:223 | Parameter `position` could be null | high | Preston | no change |
| Atlas.js:240 | Set map zoom to a constant | low | Suyash | 319 |
| Atlas.js:257-273 | Refactor / rename `checkMapView()` | low | Preston | 321 |
| Atlas.js:257-273 | checkMapView has too many if statements/refactor | low | Suyash | 321 |
|Atlas.js:275| no case handling null places, causing uncaught type error| med | Jesus| 322 |
| Atlas.js:275-308 | Distance request logic should be in `DistanceForm.js` | med | Preston | 323 |
|Atlas.js:292| hard coded earthRadius|low |Jesus| 324 |
| Atlas.js:general (236,253) | establish consistency with using semicolons or not| low | Alex | to be fixed as found |
| Atlas.js:general | reorder functions to be grouped by relation to each other | low | Alex | 325 |
| Atlas.js:general | Replace `location1` and `location2` with a queue data structure.  Enforce pushes and peeks to clean code| med | Preston | no change |
| Atlas.js:general | Raise test coverage| high | Preston | generally fix when working |
| Atlas.js:general | Locations is always empty | low | Suyash | 271 |
| Atlas.js:general | No error handling/checking of multiple methods - locations nad geolocation | low | Suyash | 326 |
| Atlas.js:general | Lots of if statements with no else can cause unknown issues from calling function | low | Nick | 326 |
| Atlas.js:general | Spacing between sections of code is not consistant | low | Nick | to be fixed as found |

