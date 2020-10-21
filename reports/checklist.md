# Inspection Checklist for t01

The goal of an Inspection is to file defects.
This checklist is our guide to help us look for defects.
The checklist will be updated as we identify new faults in our code that we wish to prevent in future inspections.


### Data faults
* Are all program variables initialized before their values are used?
* Have all constants been named?
* Should the upper bound of arrays be equal to the size of the array or size-1?
* If character strings are used, is a delimiter explicitly assigned?
* Is there any possibility of a buffer overflow?
* Are there any variables that should be made local?
* Are there any variables or methods that should/should not be static?
* Is there no division by 0?

### Control faults
* For each conditional statement, is the condition correct?
* Is each loop certain to terminate?
* Are compound statements correctly bracketed?
* In case statements, are all possible cases accounted for?
* If a break is required after each case in case statements, has it been included?
* Does the render continually loop?

### Parameter faults
* Are all input variables used?
* Are values assigned to all output variables before they are output?
* Can unexpected inputs cause corruption?
* Are parameters the correct type?
* Are outputs returning the correct type?

### Interface faults
* Do all functions and methods have the correct number of parameters?
* Do formal and actual parameter types match?
* Are the parameters in the right order?
* Are variables correctly designated as part of the state or local?
* Is code being put in the right location? (Is our structure efficient?)

### Storage faults
* If a linked structure is modified, have all links been correctly diagnosed?

### Exception faults
* Have all possible error conditions been considered?
* Are there tests for both correct and incorrect possibilites?
