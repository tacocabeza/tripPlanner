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
| Epics | *4* | *count* |
| Tasks |  *46*   | *count* | 
| Story Points |  *74*  | *sum* | 


## Scrums
| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *10/28/2020* | *366, 369,410, 411,418, ...* | *427, ...* | none | 
| *10/30/2020* | *370, 452, 415,425*  | *427,363,323,367,362,372*| none|
| *11/02/2020* | *372, 468,461,458,323,463,427,315,421,426,464,459,321,363,454,362*| *367,435,428,444,409,438*| none|


## Review

### Epics done  

### Epics not done 

### What went well

### Problems encountered and resolutions


## Retrospective

### What we changed this sprint

### What went well

### Potential improvements

### What we will change next time
