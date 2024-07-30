import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ShareModal from "../ShareModal";

const CaptionsList = ({ captions, topic }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const phoneNumber = localStorage.getItem("phoneNumber");

    setPhoneNumber(phoneNumber);
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleSaveCaption = async (caption) => {
    try {
      await axios.post("http://localhost:5000/api/posts/saveGeneratedContent", {
        topic,
        data: caption,
        phoneNumber,
      });

      toast.success("Saved caption successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Box paddingBottom={"3rem"}>
      <Typography marginBottom={"1em"} variant="h5">
        Captions generated for you
      </Typography>
      <Stack spacing={3}>
        {captions.map((caption, index) => (
          <Card key={index}>
            <CardContent>
              <Stack spacing={2}>
                <Typography>{caption}</Typography>

                <Box
                  sx={{ alignSelf: "flex-end", display: "flex", gap: "8px" }}
                >
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={handleOpenModal}
                    color="secondary"
                  >
                    Share
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={() => handleSaveCaption(caption)}
                  >
                    Save
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <ShareModal handleCloseModal={handleCloseModal} openModal={openModal} />
    </Box>
  );
};

export default CaptionsList;
