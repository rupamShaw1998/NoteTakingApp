import { Button, List, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddNoteModal from "./AddNoteModal";
import { DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

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
    //   console.log({response});
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

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(`https://note-taking-app-33zm.onrender.com/api/remove/${id}`);
      getNotes();
    } catch (err) {
      console.log(err);
    }
  };

//   console.log({signedUser})

  return (
    <div style={{ width: 375 }}>
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
          <List.Item 
            key={note._id}
            actions={[
              <DeleteOutlined key="delete" onClick={() => deleteNote(note._id)} />,
              
            ]}
          >
            <Link to={`/details/${note._id}`}>{note.title}</Link>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Dashboard;
