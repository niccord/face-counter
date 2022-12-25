The requirement for this software were to:

> Create a simple web app using any face detection library to count faces (i.e. https://www.npmjs.com/package/face-recognition or Google Vision, Amazon Recognition, Clarify ).

# FLOW

## Regular User flow

- As a regular user I can sign in specifying just my user name (no real authentication). The app is expected to issue a JWT to me expiring in 30 mins. No duplicate usernames allowed for new users.
- The main and the only app page should be a list of my requests. I can create a request to the app, where i am expected to upload an image and provide some annotation (1 text field - to name the item)
- When my image is uploaded I will see a new entry in the list with its name and current status (enqueued, progress, ready, or progres bar)
- When processing is finished, processing results should appear in the corresponding line (without reloading the page): number of detected faces, any additional information (depends on the recognition library you use, you can even show face thumbnails)

## Admin User Flow

As an admin user, when I log in, I expect to see a summary page showing statistics: a list of users with an aggregated number of images and face detections (per user). This information should be updated without refreshing the page.

# Specifications

- There is no need to use DB on the backend, it can store data in memory in a simple form.
- Admin user credentials are expected to be predefined on the backend as a part of configuration.
- Artificially slow down processing time to more than 5 seconds (just wait for 5 seconds before processing an image)

# Tech requirements
- Vue.js on the frontend
- Node.js on the backend
- Runnable with docker-compose up
- Published on Github