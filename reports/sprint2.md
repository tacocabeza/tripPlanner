# Sprint 2 - *01* - *Feather Friends*

## Goal
### Show me the distance

## Sprint Leader: 
### *Nicholas Davidson*

## Definition of Done

* The version in `server/pom.xml` is `<version>2.0</version>`.
* The Product Increment release for `v2.0` created on GitHub.
* The team's web application is deployed on the production server (`black-bottle.cs.colostate.edu`).
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.

## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A or B.
* Minimize code smells and duplication.

### Test Driven Development
* Write tests before code.
* Unit tests are fully automated.

### Processes
* Master is never broken. 
* All pull request builds and tests for Master are successful on Travis-CI.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics

* v2 protocol
	Update and improve the protocol to allow different request types and support more functions.
* Find Distance
	Add the ability to measure distance between two different locations on the map.
* Find Places
	Add the ability to search for a location and get a list of responses that are similar to the search.
* Where am I?
	Displays the current location of the user on startup. Will also allow user to return to current location after changing the map view.
* Where is?
	Allows the user to find any location on the map using longitude and latitude coordinates.


## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 5 | *5* |
| Tasks |  24   | *24* | 
| Story Points |  50  | *50* | 

## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *09/16/20* | *0* | *5* | *None* | 
| *09/18/20* | *3* | *5* | *None* |
| *09/21/20* | *4* | *5* | *Code Climate is not working* |
| *09/23/20* | *5* | *3* | *None* |
| *09/25/20* | *6* | *4* | *None* |
| *09/28/20* | *5* | *3* | *None* |
| *09/30/20* | *8* | *0* | *Distance broken* |

## Review

### Epics done  

* v2 protocol
* Find Distance
* Find Places
* Where am I?
* Where is?

### Epics not done 

* Feeling Lucky
* Distance Units

### What went well

The team consistently met and worked through the tasks at a steady pace. When we ran into issues we worked hard as a team to get the issues resolved.
This was clearly seen at the end of the sprint when we realized there were massive issues that had to be resolved in a day.

### Problems encountered and resolutions

During the last week of the sprint we realized that our server could not interconnect with other servers, and we resolved that by having a quick meeting to figure out the issue at hand. 
Another issue we ran into was a misunderstanding of how difficult a task was. The final task we finshed was supposed to be easy but ended up taking much more time and a team effort to get it done.

## Retrospective

### What we changed this sprint

In terms of work flow we did not change that much.
For the product there was a lot changed. We have included a recenter button that brings you back to the current geolocation that was set when user navigates to the webpage. 
We also added the ability to search for locations and add them to the map. Finally, we added the ability to find the distance between two points that have a red line between them.

### What went well

We seemed to work as a team well. We are starting to get our tasks done quickly and look to the team for help.
We did a good job planning because at the end of the sprint we finished all of our tasks and had time for fixing all the bugs and code smell that came up during the sprint.

### Potential improvements

We could change our planning to make smaller tasks that combine to a larger task. This would allow us to have a more cohesive codebase.
Another improvement we could make is spending more time team coding so there is less confusion when we add code later.
A final improvement would be to increase the amount of testing we do.

### What we will change next time

In the future we will work harder on planning to break down three point tasks to one or two points so we can spread work out with out whole team.
For the next sprint we will work on fixing some bugs and fixing code smell. The improvements will fix some rushed code to fit better within the clean code guides.
When closing tasks and doing pull requests we will work harder to find and fix bugs before they are pushed.