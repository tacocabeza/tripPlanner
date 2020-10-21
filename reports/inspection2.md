# Inspection - Team *T01* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *Reviewing Find.js* |
| Meeting | *10/21/2020, 11:00 am, Microsoft Teams* |
| Checklist | *[University Of Washington's Code Review Check List](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwilifury7TsAhXaGM0KHTllA_oQFjAGegQIARAC&url=https%3A%2F%2Fcourses.cs.washington.edu%2Fcourses%2Fcse403%2F12wi%2Fsections%2F12wi_code_review_checklist.pdf&usg=AOvVaw1FYJUky_S6za5HoAUkwXai)* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| jgarc110 | 35 Minutes|
| nd0905 | 30 Minutes |
| pdunton | 28 Minutes |
| suyashh | 30 Minutes |
| ah00t13 | 30 Minutes |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
|Find.java:3| unused import|low|jgarc110| 362| 
|Find.java:9| unused import|low|jgarc110| 362|
| Find.java:9-10 | unused import and misspelled import | low | nd0905 |362 |
|Find.java:19,31| Should `limit` be `final`? | high | pdunton | |
|Find.java:25| What happens if `limit < 0`? | med | pdunton | 363|
|Find.java:26| Are we sending back the `match` we received in the request? | high | pdunton | 364|
|Find.java:28| this keyword is redundant | low| jgarc110 | 365|
| Find.java:30 | Is there a better way to do this - change limit? | low | suyashh | | 
| Find.java:30 | should use `<= 0` to avoid potential negative limits | med | ah00t13 | 363|
| Find.java:35 | Do we need to validate match on the client side and the server side? | low | ah00t13 |  |
|Find.java:40| getMatch() is redundant, it is never called in find.java or in RequestFind| low| jgarc110| 366|
| Find.java:49 | getFound is once again populating places | medium | suyashh | | 
| Find.java:53-64 | populate places is in twice if its before the if it would be more clear and less redundant | Low | nd0905 | 368|
| Find.java:53-64 | Ordering and limiting logic should be done with SQL if possible | low | pdunton | 368|
| Find.java:53 | Confusing if statements to change places() | low | suyashh | | 
| Find.java:54 | Unnecessary `== true` | low | pdunton | 369|
| Find.java:54 | Don't need `== true` here | low | ah00t13 | 369 |
| Find.java:56 | We should use SQL `order by RANDOM` instead of Collections.shuffle | med | pdunton |372 |
| Find.java:57 | Loop not certain to terminate | med | pdunton | 370|
| Find.java:57 | Use `>` instead of `!=` to avoid potential infinite loop | med | ah00t13 | 370|
| Find.java:61 | Populate places never gets limited on size could lead to issues | med | nd0905 | |
| Find.java:80 | Buffer overflow on our sql querry? Char limit on search bar! | med | pdunton | 371 |
| Find.java:92 | Unnecessary `== true` | low | pdunton | 369|
| Find.java:92-94 | Might be redundant | low | suyashh | 368| 
| Find.java:92 | Don't need `== true` here | low | ah00t13 |  369|
| Find.java:93 | Lucky limit is 100 hardcoded instead of max limit or variable limits | med | nd0905 | 373|
| Find.java:93 | Lucky limit is 100 hardcoded instead of max limit or variable limits | med | pdunton |373 |
| Find.java:95 | Limiting logic should be grouped with logic in `getPlaces()` or done with SQL if possible | med | pdunton |368 |
| Find.java:95 | Don't need to explicitly declare `ArrayList<Places>` | low | ah00t13 |  |
| Find.java:103-105 | Values in db columns `latitude`, `longitude`, and `altitude` are technically Strings | med | pdunton | |
 

