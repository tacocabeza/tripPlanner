# Inspection - Team *T01* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *Reviewing Find.js* |
| Meeting | *10/21/2020, 11:00 am, Microsoft Teams* |
| Checklist | *[University Of Washington's Code Review Check List](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwilifury7TsAhXaGM0KHTllA_oQFjAGegQIARAC&url=https%3A%2F%2Fcourses.cs.washington.edu%2Fcourses%2Fcse403%2F12wi%2Fsections%2F12wi_code_review_checklist.pdf&usg=AOvVaw1FYJUky_S6za5HoAUkwXai)* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Jesus | 35 Minutes|
| Nick | 30 Minutes |
| Preston | 28 Minutes |
| Alex | 30 Minutes |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
|Find.java:3| unused import|low|Jesus| | 
|Find.java:9| unused import|low|Jesus| |
| Find.java:9-10 | unused import and misspelled import | low | Nick | |
|Find.java:19,31| Should `limit` be `final`? | high | Preston | |
|Find.java:25| What happens if `limit < 0`? | med | Preston | |
|Find.java:26| Are we sending back the `match` we received in the request? | high | Preston | |
|Find.java:28| this keyword is redundant | low| Jesus | |
| Find.java:30 | should use `<= 0` to avoid potential negative limits | med | Alex | |
| Find.java:35 | Do we need to validate match on the client side and the server side? | low | Alex |  |
|Find.java:40| getMatch() is redundant, it is never called in find.java or in RequestFind| low| Jesus| |
| Find.java:53-64 | populate places is in twice if its before the if it would be more clear and less redundant | Low | Nick | |
| Find.java:53-64 | Ordering and limiting logic should be done with SQL if possible | low | Preston | |
| Find.java:54 | Unnecessary `== true` | low | Preston | |
| Find.java:54 | Don't need `== true` here | low | Alex |  |
| Find.java:56 | We should use SQL `order by RANDOM` instead of Collections.shuffle | med | Preston | |
| Find.java:57 | Loop not certain to terminate | med | Preston | |
| Find.java:57 | Use `>` instead of `!=` to avoid potential infinite loop | med | Alex |  |
| Find.java:61 | Populate places never gets limited on size could lead to issues | med | Nick | |
| Find.java:80 | Buffer overflow on our sql querry? Char limit on search bar! | med | Preston | |
| Find.java:92 | Unnecessary `== true` | low | Preston | |
| Find.java:92 | Don't need `== true` here | low | Alex |  |
| Find.java:93 | Lucky limit is 100 hardcoded instead of max limit or variable limits | med | Nick | |
| Find.java:93 | Lucky limit is 100 hardcoded instead of max limit or variable limits | med | Preston | |
| Find.java:95 | Limiting logic should be grouped with logic in `getPlaces()` or done with SQL if possible | med | Preston | |
| Find.java:95 | Don't need to explicitly declare `ArrayList<Places>` | low | Alex |  |
| Find.java:103-105 | Values in db columns `latitude`, `longitude`, and `altitude` are technically Strings | med | Preston | |
 

