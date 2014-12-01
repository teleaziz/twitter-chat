twitter-chat
============
A sample app built using the MEAN stack and Socket.io. Deployed to Heroku on: [http://twitter-chat-aziz.herokuapp.com/]( http://twitter-chat-aziz.herokuapp.com/)

- Users can search for each other , chat with the Public chat or send a private chat to each other. 
- Admin can view all the users and edit or delete them.
- The server deployed to Heroku and the DB is on MongoLab.com

##Deploy it on your machine

###Prerequisites: 
Node.js , NPM , Grunt, Bower, MongoDB.


    git clone git@github.com:teleaziz/twitter-chat.git
    cd twitter-chat
    npm install
    bower update
And then to start the server on port 9000: 

    grunt server

