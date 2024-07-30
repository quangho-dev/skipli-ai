import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import SideMenu from "../components/SideMenu";
import SocialNetworkCard from "../components/SocialNetworkCard";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";

const ChooseSocialNetworkScreen = () => {
  const socialNetworks = [
    {
      name: "Facebook",
      subText: "Generate caption for a post",
      icon: <FacebookIcon sx={{ fontSize: "3em" }} />,
    },
    {
      name: "Instagram",
      subText: "Generate caption for a post",
      icon: <InstagramIcon sx={{ fontSize: "3em" }} />,
    },
    {
      name: "X",
      subText: "Generate caption for a post",
      icon: <XIcon sx={{ fontSize: "3em" }} />,
    },
  ];

  return (
    <Stack direction="row">
      <SideMenu />

      <Box flex={8} padding={"2rem 0 0 3rem"}>
        <Typography variant="h4">
          Generate unique captions from scratch
        </Typography>

        <Typography variant="='body1">
          Choose the type of post you want a caption for, and let SkipliAI write
          it for you
        </Typography>

        <Typography variant="body1">
          What kind of post do you want a caption for?{" "}
        </Typography>

        <Stack spacing={2} maxWidth={"30%"} marginTop={'5rem'}>
          {socialNetworks.map((network) => (
            <SocialNetworkCard
              key={network.name}
              name={network.name}
              subText={network.subText}
              icon={network.icon}
            />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export default ChooseSocialNetworkScreen;
