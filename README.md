# HW#4 RandomNumbersStream and sportloto usage application
## RandomNumbersStream class in a separate module
### generates stream of the random integer numbers
### constructor takes
#### amount of the streamed numbers
#### minimal value (optional with default minimal integer value) 
#### maximal value (optional with default maximal integer value)
#### isUnique - boolean optional parameter with default false
##### true value means that stream should contain only unique numbers
##### false value means that no requirement of the unique numbers exists
## index.ts
### Using RandomNumbersStream for displaying out N unique random numbers in the range [min, max]
### N, min, max are defined into config file with default values N = 7, min = 1, max = 49
