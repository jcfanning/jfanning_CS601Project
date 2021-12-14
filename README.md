# Final Project

Author: Justin Fanning

Class: CS601: Web Application Development

Date: 2021-12-13



## Short Description:

For my final project I made a site centered around bread baking. It contains some recipes, bread baking tools, resources, and a game to play while waiting on things.

## To Run

Navigate to this url: https://cranky-archimedes-2d86d2.netlify.app/

-- Or --

To access the website, start up your favorite browser and then open the file: <b>"index.html"</b>

Alternatively, double clicking on <b>"index.html"</b> and choosing to open it with a web browser would also work.

## Error Checking Notes
- All pages passed the HTML validator: "https://validator.w3.org/" with "validate by Direct Import"  * see note
- The CSS page Passed the CSS validator: "https://jigsaw.w3.org/css-validator/" with "validate by Direct Import"
- The JSON file passed the JSON validator: "https://jsonlint.com/"
-*Note: there are warnings and errors on the Vue page: hangMan.html, I think it has something to do with it being written for vue, as the attriutes it complains about were things that I saw on numerous tutorials for vue. I could have formatted it as a template in a .js file and they would not have flagged, but it seemed more efficient jsut to code it in html. My inexpereience with vue did not allow me to resolve these


## Additional Notes
- the git link for this project is: https://github.com/jcfanning/jfanning_CS601Project
- Extra credit was listed as including:
    - Adding any ES6 or higher functionality presented in module five.
        - I used a number of features from this module
        - let was used in all JS files to control scope
        - template strings were used create messages - see hangman.js for an example
        - a class was used to hold data in the wkst_starter.js file
    - Connecting to a database or external API to add dynamic functionality to your site. This typically involves being able to submit, retrieve, edit, and delete information from a web form to a database. 
        - the index.js file connects to an APi to gather bread puns
        - the hangman.js file connects to a JSON file to collect possible words
    - Making your site responsive using CSS Flexbox or CSS Grid Layout (no frameworks).
        - the entire site is designed using flexbox to allow for a responsive site
- i also took into account comments made in during the first two homework, and modified the project as suggested