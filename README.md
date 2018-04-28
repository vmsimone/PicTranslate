# PicTranslate
Live Version:
https://vmsimone.github.io/PicTranslate/

Multi-API app used for translating words or short phrases into words in other languages. Unlike a standard translator, this app also includes images to help aid understanding.

# Background
I lived abroad for two years and was constantly using translation apps and dictionaries to try and better communicate with other people. However, many words have more than one meaning or are hard to explain, and I found that the easiest way to explain a word's meaning was to show the person a picture of it. 

# Screenshots and Description

The user can select languages using various country flags and enter a word to be translated.

![Screenshot of main UI](PicTranslate/Screenshot1.PNG "Main user interface")

After submitting, the user will get feedback containing the word they entered, a translation of the word into the language they selected provided by Google's translation API, and two images obtained through a custom Google Search API. The first will be the return of a search prioritizing results in the country of the first language selected, and teh second will have been conducted in the country of the second selected language, ideally allowing the user to verify that the word was translated correctly.

![Screenshot of user feedback](PicTranslate/Screenshot2.PNG "Main user interface")

# Built With
* HTML
* CSS
* jQuery
* javaScript
