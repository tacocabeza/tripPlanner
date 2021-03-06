# Sprint 4 - *T01* - *Feather Friends*

## Goal
### Shorter Trips!
## Sprint Leader
### *Jesus Garcia*


## Definition of Done

* The version in `server/pom.xml` is `<version>4.0</version>`.
* The Product Increment release for `v4.0` created on GitHub.
* The team's web application is deployed on the production server (`black-bottle.cs.colostate.edu`).
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.


## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap and ReactLeaflet for a consistent user experience (no HTML, CSS, style=, etc.).

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
Here we list the epics we plan to complete this sprint and describe what
kind of work will be done under each epic.

#### V4 Protocol
**V4 Protocol** adds the ability for the user to be able to filter
search results. For example, the user my filter by location **type**(airport, heliport, balloonport,e.g). In addition
to filtering by location **type** the user may also filter by the **where** property. The **where** property can be country name
, region name, or municipality. **Note**: not specifying filters is the same as "filters": {}.

Additionally, V4 protocol will add a **narrow** field in the find request. The narrow field will contain the set of filters
returned by the **config** object. Similarly, as noted above, not specifying narrow is the same as "narrow":{}.

Finally, V4 Protocol will add an optional "response" field to **options** of a trip. If the response is 0.0 or not specified there should
be no optimization. Otherwise, the server is expected to respond in **less** than the specified response time.
#### Shorter
**Shorter** gives the user the ability to ask for optimized(**shorter**). Previously, when a user created a trip there was no efficiency, lines
between locations would cross each other. The larger the trip would get the more chaos would be introduced into the resulting trip in Atlas. As a result,
**Shorter** will always respond to the users trip request less than one second, using heuristic optimization techniques mainly, nearest neighbor, 2-opt, and 3-opt. Finally, with
the help of concurrency we will eb able to reduce the computational overhead from using the methods described above.

##### User Experience
Members of our group will have friends and/or family use and navigate our application **on their own**. We will then ask for their feedback on functionality and 
ease of use. These suggestions will help drive some UI changes in our application in hopes of creating a 
friendlier experience to the user. Additionally, we have already identified some shortcomings in our UI, and
we will be fixing them in this epic.

#### Modify Trip
**Modify Trip** will be giving the user a whole set of new functionality. The user will have the ability to select a new starting location without affecting the order
of the destinations. Individual trip destinations can now be reordered and deleted, and the order of destinations can be reversed from the starting location. Users can now
add notes on their destinations and even modify/correct existing information.

## Metrics
#### Ability
Previously in sprint 3, we planned for 3 epics, and we ended the sprint completing the three
epics, completing 75 tasks and 99 story points. This sprint we planned for 4 epics, 46 tasks and 74 story points nearly double the tasks
and story points than last sprint. That being said, these numbers are the similar to the numbers we got at the end of sprint 3 so, we are 
confident that we will be able to complete our planned epics, story points and tasks.

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *4* | *4* |
| Tasks |  *46*   | *76* | 
| Story Points |  *74*  | *115* | 


## Scrums
| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *10/28/2020* | *5* | *1* | none | 
| *10/30/2020* | *4*  | *6*| none|
| *11/02/2020* | *16*| *6*| none|
| *11/04/2020* | *8* | *4* | none|
| *11/06/2020* | *6* | *3* | none|
| *11/09/2020* | *12*| *5* | none|
| *11/11/2020* | *8* | *8* | none|


## Review

### Epics done  
- V4 Protocol
- Shorter
- Modify Trip
- User Experience

### Epics not done 
All epics that were planned, were finished.
### What went well
Our team really went into resolving defects that we found from our code inspections this sprint.
Additionally, we were able to complete all the epics we planned in a timely manner and not working 
against a time crunch. We were able to implement the nearest neighbor algorithm that gives the user a
more refined/shorter trip. Additionally, we had people use our application and they were able to provide
us good feedback and insights to our application usability. As a result, we gave the user the option to click
a button that will take them to the top of their itinerary, as opposed to scrolling for a long time! Similarly,
also added a button that will take them to the end of their itinerary. We also moved our round trip switch to 
a more appropriate position that makes more sense for the user. We added functionality for the user to be able to 
add and modify notes to their destinations. The user also has the new ability to drag and move destinations
in their itinerary not only that, the user has the ability of "reversing" their trip.
### Problems encountered and resolutions
Some problems we ran into was the complexity of the nearest neighbor algorithm. We 
underestimated the development time that would go into it and thus we were only able to
implement nearest neighbor and not 2-opt or 3-opt. Additionally, our board was *bursting at the seams* with
defects from our code inspections, what we did was dedicate about a day or two to work on them and get them out
of the way before the *real* development would commence. 

## Retrospective

### What we changed this sprint
Something we changed this sprint was instead of leaving dangling defects from our code reviews,
made it a priority to get those out of the way before any *real* development would start. Turns out this
was the right thing to do as we did not end the sprint off with defects in our icebox. 

### What went well

Our planning has become very good now compared to the planning we did in say, sprints 1,2. So we did not have
to create or break up any tasks during the sprint, this was already done in our planning phase. Also, our team has nailed 
writing descriptions on our tasks so there is less confusion now. Our team communication has also peaked, we always check
on how we are doing in slack and in our scrum meetings. Additionally, we offer help to each other when we really need it via
talking through tasks and implementation details. 

### Potential improvements
Some potential improvements we have identified is having more people test our application. We've realized that
we have been designing our application without the user being in mind. Sometimes our application could feel a little too
engineered, if that makes sense. So we could have more people who possibly don't share our field test out our application
so we can improve our applications usability and fluidity. 

### What we will change next time
We try to improve our test coverage and maintainablilitiy as it has stagnated and remained at a B and %70 respectively.
