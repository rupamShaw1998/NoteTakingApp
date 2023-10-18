import { List } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddNoteModal from "./AddNoteModal";

const Dashboard = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("AccessToken");

  const [notes, setNotes] = useState([]);
  const [signedUser, setSignedUser] = useState({});

  useEffect(() => {
    getNotes();
  }, []);

  const updateNotesUI = (newNote) => {
    setNotes([...notes, newNote]);
  };

  const getNotes = async () => {
    try {
      const headers = { Authorization: `Bearer ${authToken}` };
      const response = await axios.get(
        `https://note-taking-app-33zm.onrender.com/api/get-notes`,
        { headers }
      );
      setNotes(response.data.notes);
      setSignedUser(response.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const signOutHandler = () => {
    navigate("/signIn");
    localStorage.removeItem("AccessToken");
  };

  return (
    <div style={{ width: 450 }}>
      <div style={{ display: "flex" }}>
        <Title level={4} italic style={{ color: "teal" }}>
          Welcome, <span style={{ color: "aqua" }}>{signedUser.name}</span>
        </Title>
        <Button onClick={signOutHandler} style={{ margin: "25px" }}>
          Sign Out
        </Button>
      </div>
      <AddNoteModal signedUser={signedUser} updateUI={updateNotesUI} />
      <List
        size="large"
        bordered
        dataSource={notes}
        renderItem={(note) => (
          <Link to={`/details/${note._id}`}><List.Item key={note._id}>{note.title}</List.Item></Link>
        )}
      />
    </div>
  );
};

export default Dashboard;
