import express from 'express';
import * as dotenv from "dotenv";
import fs from 'fs';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

//REST API Endpoints
app.get("/", (req, res) => {
    res.send("Welcome To nodejs-filesystem REST API");
});

//REST API EndPoint to Create File with current date time in Backup Folder
app.get("/backup/create", (req, res) => {
    const dt = Date.now(); // to get current date in timestamp
    const date = new Date(); // create date object with current date 
        
        try {
            fs.writeFileSync(`./backup/${date.toJSON().slice(0, 19).replace(/:/g,"-")}.txt`,dt.toString());
            res.send({"result":`${date.toJSON().slice(0, 19).replace(/:/g,"-")}.txt is created successfully in backup`});
          } catch (err) {
            res.send({"err":err}); // send error if some err occured 
          }
    
});

//API endpoint to get AlL files in backup directory
app.get("/backup", (req, res) => {
    try {
            const files = fs.readdirSync("./backup");
            res.send({"Files": files}); // send list of files in array format from backup directory
          } catch (err) {
            res.send({"err":err});  // send error if some err occured 
          }
});

// below code is to make sure server is running in given PORT
app.listen(PORT, () => console.log("Server started on the port", PORT));