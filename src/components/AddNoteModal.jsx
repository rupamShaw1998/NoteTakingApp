import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import axios from "axios";

const { TextArea } = Input;

const AddNoteModal = ({ signedUser, updateUI }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const handleCreateNote = async () => {
    setConfirmLoading(true);
    await createNote();
    setConfirmLoading(false);
    setOpen(false);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const createNote = async () => {
    try {
      const body = { authorId: signedUser._id, title: title, content: text };
      const response = await axios.post(
        "https://note-taking-app-33zm.onrender.com/api/add-notes",
        body
      );
      setText("");
      setTitle("");
      updateUI(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        style={{ margin: "10px" }}
      >
        Create
      </Button>
      <Modal
        title="Create a new note :)"
        open={open}
        onOk={handleCreateNote}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            disabled={!text && !title}
            loading={confirmLoading}
            onClick={handleCreateNote}
          >
            Post
          </Button>,
        ]}
      >
        <br />
        <Input
          placeholder="Enter title..."
          value={title}
          allowClear
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <TextArea
          rows={5}
          placeholder="Write something...🤔"
          allowClear
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default AddNoteModal;
