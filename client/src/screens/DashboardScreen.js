import React from "react";
import SideMenu from "../components/SideMenu";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DashboardScreen = () => {
  const navigate = useNavigate();

  const handleClickStartFromScratch = () => {
    navigate("/choose-a-social-network");
  };

  const handleClickInspired = () => {
    navigate("/get-inspired");
  };

  return (
    <Stack direction="row">
      <SideMenu />

      <Box flex={8} padding={"2rem 0 0 3rem"}>
        <Typography variant="h4">
          Generate post ideas and captions in seconds
        </Typography>

        <Card
          style={{ maxWidth: "40%", marginTop: "3rem", cursor: "pointer" }}
          onClick={handleClickStartFromScratch}
        >
          <CardContent>
            <Stack spacing={"0.5em"}>
              <Typography display="inline" variant="h5">
                Start from scratch
              </Typography>

              <Typography display="inline">
                Generate new captions to engage, delight, or sell
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card
          style={{ maxWidth: "40%", marginTop: "2rem", cursor: "pointer" }}
          onClick={handleClickInspired}
        >
          <CardContent>
            <Stack spacing={"0.5em"}>
              <Typography display="inline" variant="h5">
                Get inspired
              </Typography>

              <Typography display="inline">
                Generate post ideas and captions for a topic
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
};

export default DashboardScreen;
