import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SideMenu from "../components/SideMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetInspiredScreen = () => {
  const [topic, setTopic] = useState("");
  const [ideas, setIdeas] = useState([]);

  const navigate = useNavigate();

  const handleGenerateIdeas = async () => {
    try {
      if (!topic) {
        toast.error("Please enter a topic");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/posts/getPostIdeas",
        {
          topic,
        }
      );

      setIdeas(res.data);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleUseThisIdea = (idea) => {
    navigate("/generate-captions-from-AI-ideas", {
      state: {
        idea,
      },
    });
  };

  return (
    <Stack direction={"row"}>
      <SideMenu />

      <Box flex={8} padding={"2rem 0 0 3rem"}>
        <Stack spacing={2} maxWidth={"60%"}>
          <Typography variant="h4">Get inspired</Typography>

          <Typography variant="body1">
            Stick staring at a blank page? Tell us what topic you have in mind
            <br />
            and SkipliAI will generate a list of post ideas and captions for
            you.
          </Typography>

          <Typography variant="body1">
            What topic do you want ideas for?
          </Typography>

          <TextField
            label="Enter a topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            sx={{ backgroundColor: "white" }}
            required
          />

          <Button variant="contained" onClick={handleGenerateIdeas} sx={{ alignSelf: 'flex-end' }}>
            Generate ideas
          </Button>
        </Stack>

        {ideas.length > 0 && (
          <Box sx={{ maxWidth: "60%", padding: "3em 0" }}>
            <Typography variant="h5" marginBottom={"1em"}>
              Generated ideas for you, please choose an idea.
            </Typography>

            <Stack spacing={2}>
              {ideas.map((idea) => (
                <Card>
                  <CardContent>
                    <Stack spacing={2}>
                      <Typography variant="body1">{idea}</Typography>

                      <Button
                        size="small"
                        variant="outlined"
                        sx={{ alignSelf: "flex-end" }}
                        onClick={() => handleUseThisIdea(idea)}
                      >
                        Use this idea
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default GetInspiredScreen;
