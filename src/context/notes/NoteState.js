import React from 'react'
import NoteContext from './NoteContext'
import { useState } from 'react';

const NoteState = (props) => {
  
const InitialNotes = [
    {
      "_id": "63a4b9d0a716d13223e7e08a",
      "user": "63a065379d237c833dc6f461",
      "title": "hello world",
      "description": "first po Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio nisi reprehenderit minus voluptas velit commodi quis, culpa consectetur officia non maxime quibusdam iusto reiciendis pariatur vitae eius consequuntur voluptatibus dicta.st",
      "tag": "this post",
      "date": "2022-12-22T20:10:56.910Z",
      "__v": 0
    },
    {
      "_id": "63a4c599dd6cd2769bd0b956",
      "user": "63a065379d237c833dc6f461",
      "title": "second note",
      "description": "wowowowowow post",
      "tag": "gen",
      "date": "2022-12-22T21:01:13.714Z",
      "__v": 0
    },

    {
      "_id": "63a4b9d0a716d13223e7e08a",
      "user": "63a065379d237c833dc6f461",
      "title": "hello world",
      "description": "first post",
      "tag": "this post",
      "date": "2022-12-22T20:10:56.910Z",
      "__v": 0
    },
    {
      "_id": "63a4c599dd6cd2769bd0b956",
      "user": "63a065379d237c833dc6f461",
      "title": "secoasdnd note",
      "description": "wowowowowow post",
      "tag": "gen",
      "date": "2022-12-22T21:01:13.714Z",
      "__v": 0
    },

    {
      "_id": "63a4b9d0a716d13qeqwe223e7e08a",
      "user": "63a065379d237c833dc6f461",
      "title": "hellasdo world",
      "description": "firasdqwst  post Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio nisi reprehenderit minus voluptas velit commodi quis, culpa consectetur officia non maxime quibusdam iusto reiciendis pariatur vitae eius consequuntur voluptatibus dicta.",
      "tag": "this post",
      
      "date": "2022-12-22T20:10:56.910Z",
      "__v": 0
    },
    {
      "_id": "63a4c599dd6cd2769bd0b956",
      "user": "63a065379d237c833dc6f461",
      "title": "seconddas note",
      "description": "wowoaaswowowow post",
      "tag": "gen",
      "date": "2022-12-22T21:01:13.714Z",
      "__v": 0
    }
  ];

const [notes, setNotes] = useState(InitialNotes);


    
    return(
        <NoteContext.Provider value = {{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;