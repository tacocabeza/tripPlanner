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
| *date* | *#task, ...* | *#task, ...* |  | 


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