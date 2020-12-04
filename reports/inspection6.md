# Inspection - Team *T01*

| Inspection | Details |
| ----- | ----- |
| Subject | *reviewing OptimizeTrip.java* |
| Meeting | *12/04/2020, 11:00 a.m, Microsoft Teams* |
| Checklist | *[University Of Washington's Code Review Check List](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwilifury7TsAhXaGM0KHTllA_oQFjAGegQIARAC&url=https%3A%2F%2Fcourses.cs.washington.edu%2Fcourses%2Fcse403%2F12wi%2Fsections%2F12wi_code_review_checklist.pdf&usg=AOvVaw1FYJUky_S6za5HoAUkwXai)* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| ah00t13 | 25 |
| pdunton | 25 |
| jgarc110 |  30 |
| nd0905 | 30 |
|  |  |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| OptimizeTrip.java:32,42 | Need a 0.5 second reduction in these time checks | hi | ah00t13 |  |
| OptimizeTrip.java:31-41 | Can this be split into its own function? | low | ah00t13 |  |
| OptimizeTrip.java:12 | Why are we using `HashMap<String, String>`.  Do we want to use `Place`s? | low | pdunton | |
| OptimizeTrip.java:17 | `begin` should either be put as the first statement in function, or lower down | hi | pdunton | |
| OptimizeTrip.java:22 | If we change `unvisitedCities` to `visitedCities`, the default is `boolean[false]` and we can remove line 23 | hi | pdunton | |
| OptimizeTrip.java:25 | k as a variable is confusing and unknown what it represents | med | nd0905 | |
| OptimizeTrip.java:31 | `unvisited` is unused.  Why not loop with `k`? | hi | pdunton | |
| OptimizeTrip.java:32,42 | Ending time should be captured in a variable to be readable, save time | med | pdunton | |
| OptimizeTrip:32,42| Say we were to optimize in less than 1.0 second. >= means that we could already be at a second, thus we take longer than 1.0.| med | jgarc110| |
| OptimizeTrip.java:42 | Why are we checking time twice? | med | pdunton | |
| OptimizeTrip.java:75 | Save time by putting `unvistedCities[i]` as first condition | hi | pdunton | |
| OptimizeTrip.java:75 | the variable best is not needed | low | nd0905 | |
| OptimizeTrip.java | Save time by putting `places.size()` in a variable `n`.  Saves function calls. | hi | pdunton | |
| OptimizeTrip.java | Why are we using `ArrayList()<>`?  We know the size of our structure.  Can we use arrays, or quicker? | hi | pdunton | |
| OptimizeTrip.java:all | Many index variables not clear as they are indexes | low | nd0905 | |
|  | | | | |
