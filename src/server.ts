import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port =  8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  app.get( "/filteredimage/", 
  async(req, res) => {
    const image_url = req.query.image_url;
      // console.log(typeof(image_url));
      if (!image_url) {
      return res.status(400).send("Url is not a valid url, try another");
    }
    var filtered = await filterImageFromURL(image_url);
    res.status(200).sendFile(filtered,async()=>{
      await deleteLocalFiles([filtered])
    });
   
} );

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET by adding tis to endpoint /filteredimage?image_url={{}}");
  } );

  app.get( "/healthcheck", async ( req, res ) => {
    res.sendStatus(200);
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();