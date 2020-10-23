# Sprint 3 - *t01* - *Feather Friends*

## Goal
### Build a trip!

## Sprint Leader:
### *Preston Dunton*


## Definition of Done

* The version in `server/pom.xml` is `<version>3.0</version>`.
* The Product Increment release for `v3.0` created on GitHub.
* The team's web application is deployed on the production server (`black-bottle.cs.colostate.edu`).
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.


## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap and ReactLeaflet for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Technical Debt Ratio less than 5% (A).
* Minimize code smells and duplication.

### Test Driven Development
* Write tests before code.
* Unit tests are fully automated.
* Code coverage greater than 70%.

### Processes
* Master is never broken. 
* All pull request builds and tests are successful on Travis-CI.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics
- v3 Protocol
- Build a Trip
- Feeling Lucky


## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *3* | *3* |
| Tasks |  *29*   | *75* | 
| Story Points |  *37*  | *99* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *10/7/20* | *4* | *5* | *None* | 
| *10/9/20* | *6* | *10* | *None* | 
| *10/12/20* | *17* | *5* | *None* | 
| *10/14/20* | *30* | *6* | *None* | 
| *10/16/20* | *42* | *5* | *None* | 
| *10/21/20* | *58* | *9* | *None* | 


## Review

### Epics done  
- Feeling Lucky?
- v3 Protocol
- Build a Trip

### Epics not done 
- Modify Trip (not planned for this sprint)

### What went well
We were able to complete all of the epics we had planned.  The product has a number of great improvements, such as the `Create Trip` tab, which holds all information about trips.  We were also able to remove the `Search` tab and put the search bar right on the map.  The map now features new control buttons, such as Hide All Markers, Recenter Map, Show / Hide Distance, and Show All Markers.  This UI sets us up in a good spot for the next sprint.


### Problems encountered and resolutions
There were a few PR's concerning UI that required the whole team to stop and experiment with it.  This was most likely due to a flawed plan of UI, and even blocked some people from working for a while.  To fix this, we tried to accomadate a balence of letting the whole team view a PR and letting the original author keep working.  Frequent communication was our friend here.  

## Retrospective

### What we changed this sprint
We added inspections, obviously, which made us confront some of the code we've been writing as a team.  We've been having shorted meetings after lecture so that we can go work on other things (other homework, jobs, etc). 

### What went well
We prepared very well for our inspections and were able to make those meetings effecient and productive.  We also continued to work steady and communicate about how much work we are getting done.  Our burndown report looks great, and we were very confident in our ability to complete the epics we had planned.  Team morale is getting better everyday also.  When working on calls, we are able to be more productive.  For example, one member was struggling with client testing, so we worked together on a file over a call.

### Potential improvements
We still need work on planning out our sprints.  We were able to propperly decide how many epics we could handle, but we still need to breakdown tasks further and identify other sources of work.  There were also a couple of cases where people on the team were uninformed about code they didn't write, which resulted in some confusion in later tasks.

### What we will change next time
Going into this next sprint we want to have some kind of plan for test coverage, maintainability, defects, and code smells. This could result in new issues, or maybe we just allot more points to our tasks.  We also need a more comprehensive UI plan for new features so that when they are implemented, the team doesn't need to double check each other's work.
