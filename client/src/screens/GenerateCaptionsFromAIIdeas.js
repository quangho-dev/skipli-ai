import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import { toast } from "react-toastify";
import axios from "axios";
import CaptionsList from "../components/CaptionsList";

const GenerateCaptionsFromAIIdeas = () => {
  const [ideaToGenerate, setIdeaToGenerate] = useState("");
  const [captions, setCaptions] = useState([]);

  const location = useLocation();

  const idea = location.state.idea;

  useEffect(() => {
    setIdeaToGenerate(idea);
  }, [idea]);

  const handleCreateCaptions = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts/createCaptionsFromIdeas",
        {
          idea: ideaToGenerate,
        }
      );

      setCaptions(res.data);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Stack direction={"row"}>
      <SideMenu />

      <Box flex={8} padding={"2rem 0 0 3rem"}>
        <Stack spacing={2} maxWidth={"60%"}>
          <Typography variant="h4">Your idea</Typography>

          <TextField
            label="Idea"
            value={ideaToGenerate}
            onChange={(e) => setIdeaToGenerate(e.target.value)}
            sx={{ backgroundColor: "white" }}
            multiline
          />

          <Button
            sx={{ alignSelf: "flex-end" }}
            variant="contained"
            onClick={handleCreateCaptions}
          >
            Create captions
          </Button>
        </Stack>

        {captions.length > 0 && (
          <Box maxWidth={'60%'} marginTop={'2em'}>
            <CaptionsList captions={captions} topic={idea} />
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default GenerateCaptionsFromAIIdeas;
