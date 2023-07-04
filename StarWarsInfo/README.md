
# Star Wars information page.
<img alt="Static Badge" src="https://img.shields.io/badge/StarWars-%2303289f"> <img alt="Static Badge" src="https://img.shields.io/badge/SWAPI%20app-%23fca311">

This project was created as a summary after learning about callback module and promises (without async function) using fetch module.

The project is an html mask for displaying data from SWAPI (Star Wars Uniwerse App). 

## More Information

This project was created based on special principles:
 - [x] Display the data received from the SWAPI application. 
 - [x] Provide additional information about objects, i.e. their names, weight, etc.
 - [x] A double request had to be made due to the generation of data regarding the home planet.
 - [x] Added pagination of pages so that data is displayed as clearly as possible.
 - [x] In addition, an element responsible for displaying more parent planet data was added. 

## Guide

As a user, you have the option to leave the interstellar space, which allows you to see the first 10 characters from the Star Wars saga that are in the SWAPI application. 


You will then be able to click the NEXT button to generate up to another 10 characters, if any exist in this data space. From this point on, you will also be able to retrieve previous data - created with the PREV button.

![image](https://github.com/Cysiek96/Z2J/assets/113532109/973b6d0f-8371-40b2-977b-16c0af91ed2b)

Each click on the NEXT button will generate the next 10 items from the SWAPI application, also clicking PREV will generate the previous 10.

If you reach the end of the data, you will be informed by the disappearance of the NEXT button, which is also implemented for the PREV button.

That's not all, because if you want to know more about the parent planet, you'll be able to click on the name of the planet you want, and a script will run that will create a dynamically populated information card containing data about that planet, such as population or diameter.

![image](https://github.com/Cysiek96/Z2J/assets/113532109/fce16069-34e2-401f-bd56-216a1db43328)


## To Do:

 - [ ] Create a fully responsive version 


## [LIVE PREVIEW](https://codepen.io/Cychu1996/full/gOQxbQx)

