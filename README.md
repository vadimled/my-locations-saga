# my-locations-saga

This is the version of "my-locations" project, but I've used the Redux-Saga middleware in order to separate 
action creator from api calling. 

Practical Exam - Welldone

Notes: 
1. "All data is saved to the locale storage of the browser (an HTML5 feature) for simplicity".

No problem to use the Local storage, but I understood the word "simplicity" like a proposal but not must. So I used the database I've
created on my account in firebase.google.com.

2. "The user can manage (view, add, remove and edit) the list of Categories."

In my project I have not found favor in the "View" button

3. "The user can view all Locations sorted by alphabetical order, grouped or ungrouped by category."

In my project the user can click on category link ( name of some country) and get the list of cities (locations) and sort this locations by alphabet.

4. "When the user clicks on a location, the device will vibrate (via native bridge support)."

This project was implemented with React 16 like single-page application (SPA) but not Hybrid applications are web applications in the native browser
