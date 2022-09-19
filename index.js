import * as fs from "fs";
import express from "express";
import mongoose from "mongoose";
import multer from "multer";

import { registerValidation, loginValidation, postCreateValidation } from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

mongoose
  .connect( "mongodb+srv://admin:Blin-1987@cluster0.bem0i2q.mongodb.net/blog?retryWrites=true&w=majority" )
  .then( () => console.log( "db ok" ) )
  .catch( ( error ) => console.log( "db error", error ) );

const app = express();

const storage = multer.diskStorage( {
  destination: ( _, __, cb ) => {
    if( !fs.existsSync( "uploads" ) ) {
      fs.mkdirSync( "uploads" );
    }
    cb( null, "uploads" );
  },
  filename: ( _, file, cb ) => {
    cb( null, file.originalname );
  },
} );

const upload = multer( { storage } );
app.use( express.json() );
app.use( "/uploads", express.static( "uploads" ) );

app.get( "/", ( req, res ) => {
  res.send( "good" );
} );
app.get( "/auth/me", checkAuth, UserController.getMe );
app.post( "/auth/login", loginValidation, UserController.login );
app.post( "/auth/register", registerValidation, UserController.register );

app.post( "/upload", checkAuth, upload.single( "image" ), ( req, res ) => {
  res.json( {
    url: `/uploads/${ req.file.originalname }`,
  } );
} );


app.get( "/posts", PostController.getAll );
app.get( "/posts/:id", PostController.getOne );
app.post( "/posts", checkAuth, postCreateValidation, PostController.create );
app.delete( "/posts/:id", checkAuth, PostController.remove );
app.patch( "/posts/:id", checkAuth, postCreateValidation, PostController.update );

app.listen( 4444, err => {
  if( err ) console.log( err );
  console.log( "server ok" );
} );
