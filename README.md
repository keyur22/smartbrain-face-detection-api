# smartbrain-api
The app allows us to detect faces containing in an image. An entry count is available for each user which tells us how many images are being detected by the logged in user. A postgreSQL database is used to keep track of all the user related data.

This rep is the server containing REST APIs to deal with requests from the front end. The database is also connected.
Clarifai is used for face detection in the images.

Technologies Used: NodeJS, Express, postgreSQL
Libraries Used: Knex, Bcrypt
