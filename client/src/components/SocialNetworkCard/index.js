import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const SocialNetworkCard = ({ name, subText, icon }) => {
  const navigate = useNavigate();

  const handleClickSocialNetwork = () => {
    navigate("/choose-topic-and-tone", {
      state: {
        socialNetworkName: name,
      },
    });
  };

  return (
    <Card sx={{ cursor: "pointer" }} onClick={handleClickSocialNetwork}>
      <CardContent>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Box>{icon}</Box>

          <Box>
            <Typography variant="h5">{name} post</Typography>
            <Typography variant="body1">{subText}</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SocialNetworkCard;
