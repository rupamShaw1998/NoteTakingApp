import { Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const NoteDetails = () => {
  const { id } = useParams();
  const authToken = localStorage.getItem("AccessToken");

  const [note, setNote] = useState({});

  useEffect(() => {
    if(id)
        getNote();
  }, []);

  const getNote = async () => {
    try {
      const headers = { Authorization: `Bearer ${authToken}` };
      const response = await axios.get(
        `https://note-taking-app-33zm.onrender.com/api/get-notes/${id}`,
        { headers }
      );
      console.log({response});
      setNote(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log({id});

  return (
    <Card title={note.title} >
        <p>{note.content}</p>
    </Card>
  );
};

export default NoteDetails;
