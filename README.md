# WebRTC Signalling server
Backend server created for my bachelor project using websockets to create a signalling server for establishing a WebRTC connection between a robot and a user. 

Besides signalling is uses express for creating simple REST api endpoints, for getting information about connected robots and for letting robot notify the user through Firebase Cloud Messaging. It utilizes a MongoDB server for storing information of connected robots. 

# Dependencies
[Node.js](https://nodejs.org/)

# Usage
1. Clone or download repository
2. create a .env file at the root of the project containing your mongodb information

   DB_CONN_STRING="mongo db url"  
   DB_NAME="database name"  
   ROBOT_COLLECTION_NAME="collection name "

3. add information for your firebase service account to the .env file

   PROJECT_ID="project id"  
   PRIVATE_KEY_ID="private key id"  
   PRIVATE_KEY="private key"  
   CLIENT_EMAIL="client email"  

4. run `npm install`
5. run `npm run start:dev` to use Nodemon or run `npm run start` to run it normally