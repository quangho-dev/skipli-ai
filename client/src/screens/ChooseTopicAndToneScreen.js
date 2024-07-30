import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import CaptionsList from "../components/CaptionsList";
import { toast } from "react-toastify";

const ChooseTopicAndToneScreen = () => {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("");
  const [captions, setCaptions] = useState([]);

  const location = useLocation();
  const { socialNetworkName } = location.state;

  const tones = [
    "Friendly",
    "Luxury",
    "Relaxed",
    "Professional",
    "Bold",
    "Adventurous",
    "Witty",
    "Persuasive",
    "Empathetic",
  ];

  const handleGenerateCaptions = async () => {
    if (!topic) {
      toast.error("Please enter a topic");
      return;
    } else if (!tone) {
      toast.error("Please select a tone");
      return;
    }

    const res = await axios.post(
      "http://localhost:5000/api/posts/generatePostCaptions",
      {
        socialNetwork: socialNetworkName,
        subject: topic,
        tone,
      }
    );

    setCaptions(res.data);
  };

  return (
    <Stack direction="row">
      <SideMenu />

      <Box flex={8}>
        <Stack spacing={3} padding={"2rem 0 0 3rem"} maxWidth={"50%"}>
          <Typography variant="h4">{socialNetworkName} post</Typography>

          <Typography variant="='body1">
            What topic do you want a caption for?
          </Typography>

          <TextField
            value={topic}
            label="Topic"
            variant="outlined"
            onChange={(e) => setTopic(e.target.value)}
            sx={{ backgroundColor: "white" }}
            required
            error
          />

          <Typography variant="body1">
            What should your caption sound like?
          </Typography>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tone</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={tone}
              label="Tone"
              onChange={(e) => setTone(e.target.value)}
              sx={{ backgroundColor: "white" }}
              required
            >
              {tones.map((tone) => (
                <MenuItem key={tone} value={tone}>
                  {tone}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            sx={{ alignSelf: "flex-end" }}
            onClick={handleGenerateCaptions}
          >
            Generate captions
          </Button>

          {captions.length > 0 && <CaptionsList captions={captions} topic={topic} />}
        </Stack>
      </Box>
    </Stack>
  );
};

export default ChooseTopicAndToneScreen;
