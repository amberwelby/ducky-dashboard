# Welcome to Ducky Dashboard!
![Yellow cartoon rubber duck named Tony](public/tony.png) 

Ducky Dashboard is here to be your quick, one-stop shop for checking in on little daily details. And realistically, cut down on how much time I spend checking these things every morning. 

## Goals
* Styling...!
* More APIs! As you can see, the framework for a stock dashboard is built but it's not actually connected yet. Mostly because I haven't found the right one yet, but it's coming soon!
* Customizable! Rather than hardcoding information into the dashboard, I'm working on ways to easily configure and customize the dashboard

## Setup
This dashboard is intended for personal use and to run locally on your device. From the commandline, navigate into the directory and run `npm run dev` :)

## Sources
### Design
Design inspiration for some elements from [Howard Lee](https://dribbble.com/shots/11431746-Daily-Dashboard).

### Weather
Weather data comes from [OpenMeteo](https://open-meteo.com/en/docs), which is free to use non-commercially and does not require an API key. 
When entering lat/long information, keep in mind that the API is expecting decimal format. ie, North and East values are positive, while South and West values are negative.