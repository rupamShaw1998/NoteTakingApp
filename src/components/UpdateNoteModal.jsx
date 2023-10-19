import axios from "axios";
import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const UpdateNoteModal = ({ noteId, defaultTitle, defaultContent, updateEditedNotesUI }) => {

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(defaultTitle);
  const [updateText, setUpdateText] = useState(defaultContent);

  const handleEditNote = async (noteId) => {
    setConfirmLoading(true);
    await editNote(noteId);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    console.log("cancelled...");
    setOpen(false);
  };

  const editNote = async (noteId) => {
    try {
      const response = await axios.patch(`https://note-taking-app-33zm.onrender.com/api/update/${noteId}`, {title: updateTitle, content: updateText});
      updateEditedNotesUI(response.data);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <EditOutlined key="edit" onClick={() => setOpen(true)} />
      <Modal
        title="Edit your note :)"
        open={open}
        onOk={() => handleEditNote(noteId)}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            disabled={!updateText && !updateTitle}
            loading={confirmLoading}
            onClick={() => handleEditNote(noteId)}
          >
            Update
          </Button>,
        ]}
      >
        <br />
        <Input 
            placeholder="your updated note title...✍️"
            allowClear
            defaultValue={defaultTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
        />
        <br /><br />
        <TextArea
          rows={5}
          placeholder="your updated note content...✍️"
          allowClear
          defaultValue={defaultContent}
          onChange={(e) => setUpdateText(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default UpdateNoteModal;
