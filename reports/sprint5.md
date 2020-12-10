# Sprint 5 - *T01* - *Feather Friends*

## Goal
### User Experience

## Sprint Leader
### *Alex Hooten*


## Definition of Done

* The version in `server/pom.xml` is `<version>5.0</version>`.
* The Product Increment release for `v5.0` created on GitHub.
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

#### User Experience
Members of our group will have friends and/or family use and navigate our application **on their own**. We will then ask for their feedback on functionality and 
ease of use. These suggestions will help drive some UI changes in our application in hopes of creating a 
friendlier experience to the user. Additionally, we have already identified some shortcomings in our UI, and
we will be fixing them in this epic.

#### Filter Search
**Filter Search** will allow the user to narrow down the search locations using the **narrow** field in **find**.
This field can accept filters with **where** which narrows by the country, region, or municipality, or **type**,
which narrows by the location type. We will create an advanced search modal to make this filtering possible.

#### File Formats
**File Formats** will allow the user to save their trip in four different file formats using a drop down menu on our
*Save Trip* modal. These four file formats will be JSON, CSV, KML, and SVG. The additional formats
will allow the user to view their trip in external tools after creating it in our app.

#### Distance Units
**Distance Units** will allow the user to choose the units they want to use across the app. They will be able to
select from the default units of miles, kilometers, and nautical miles, as well as use custom units by entering
a custom earth radius and unit name. This UI will be placed on a new *Settings* tab in our app, and will be saved
across sessions with a cookie.

#### Place Details
**Place Details** will implement reverse geocoding so that the user will see an address when they click on a location
on the map. All locations clicked on the map will display an address as the name if one can be found for those
coordinates. This information will be displayed on both the map marker and the trip itinerary.

#### Maps
**Maps** will allow the user to change the map background they see when using our app. Currently only one map style
is available, but we will implement a few additional options, including a satellite and topographical map. The layer
options will be chosen in the *Settings* tab and saved across sessions with a cookie.

#### Markers
**Markers** will allow the user to change the map marker and line styles between a few different options. For markers
they will be able to change the color and size, and for the lines they will be able to change the color and weight.
The interface for this will be on the *Settings* tab and the chosen options will be saved across sessions with a
cookie.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *7* | *0* |
| Tasks |  *17*   | *1* | 
| Story Points |  *44*  | *1* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *11/18/2020* | *2* | *2* | none |
| *11/20/2020* | *0* | *2* | none | 
| *11/30/2020* | *4* | *12* | none | 
| *12/2/2020* | *7* | *11* | none | 
| *12/4/2020* | *3* | *7* | none |
| *12/7/2020* | *16* | *4* | none | 
| *12/9/2020* | *13* | *5* | none | 


## Review

### Epics done
- User Experience
- Filter Search
- File Formats
- Distance Units
- Place Details
- Maps
- Markers 

### Epics not done
All epics that were planned were finished

### What went well
We did a good job of keeping on top of the defects we found in each of our inspections. The team worked
well together with less of a need to ping teammates in Slack in order to get pull requests merged in a timely
manner. We made good use of our time and didn't have a big time crunch at the end of the sprint. The majority
of the work was finished with plenty of time prior to the deadline. We didn't have too many roadblocks in our
implementation of the epics, and even had time to add a couple features of our own to enhance quality of life
such as cookies for trips that keep the most recent trip the user was working on even if they reload the page.

### Problems encountered and resolutions
We put a lot on our plate from the beginning of this sprint with the expectation that some work might get done
during fall break. This ended up not being the case, leaving us with a lot more work to do after the break,
but we pulled together and worked hard to get everything we planned done in time. It did take a good amount of
time and effort, but in the end it proved not to hinder our ability to complete the project as intended.

## Retrospective

### What we changed this sprint
This sprint we put a big focus on working together without the need for as much communication. We got more
work done than in previous sprints and often did it with far fewer slack messages. Team members generally
needed less help from each other in order to complete their tasks. We were all more productive together.

### What went well
We got a large volume of work done in not a whole lot of time. We worked efficiently together and came out
with a very nice UI that we all felt proud of. We also made sure not to leave any loose ends in the project
that could cause problems in the demo by thoroughly testing the application ourselves and trying to find
bugs.

### Potential improvements
We could have done our work in a more linear fashion. We often worked in bursts on the days that we had
scrum meetings rather than working a smaller amount every day. We also could have kept on top of
ballooning file sizes a bit more, as some of our files became very long by the end of the sprint.

### What we will change next time
There won't really be a next time, but I think I can speak for all of us when I say that this course has
greatly helped me to be a better teammate and taught me a lot about Agile and Scrum. With the strategies
learned in this course I hope to be a more productive employee in my future endeavors. Thank you so much
for everything you taught us this semester.