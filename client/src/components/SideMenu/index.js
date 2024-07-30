import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import SpokeIcon from "@mui/icons-material/Spoke";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import { useLocation, useNavigate } from "react-router-dom";

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname;

  const serviceRoutes = [
    "/dashboard",
    "/choose-a-social-network",
    "/choose-topic-and-tone",
    "/get-inspired",
    "/generate-captions-from-AI-ideas",
  ];

  const profileRoutes = ["/profile"];

  const isOnServiceRoutes = serviceRoutes.includes(pathname);

  const isOnProfileRoutes = profileRoutes.includes(pathname);

  return (
    <Box
      minHeight={"100vh"}
      backgroundColor="#444"
      padding={"1rem"}
      color={"white"}
      flex={1}
    >
      <Stack>
        <Typography variant="h4" marginBottom={"0.5em"}>
          SkipliAI
        </Typography>

        <Divider color="white" />

        <Box marginTop={"3rem"}>
          <Stack
            direction={"row"}
            spacing={"0.5em"}
            alignItems={"center"}
            marginBottom={"1em"}
            padding={"0.5em 1em"}
            onClick={() => {
              navigate("/dashboard");
            }}
            style={{ cursor: "pointer" }}
            sx={{
              ...(isOnServiceRoutes && {
                backgroundColor: "#717171",
              }),
            }}
          >
            <SpokeIcon />
            <Typography variant="h6">Services</Typography>
          </Stack>

          <Stack
            direction={"row"}
            spacing={"0.5em"}
            alignItems={"center"}
            marginBottom={"1em"}
            onClick={() => {
              navigate("/profile");
            }}
            style={{ cursor: "pointer" }}
            padding={"0.5em 1em"}
            sx={{
              ...(isOnProfileRoutes && {
                backgroundColor: "#717171",
              }),
            }}
          >
            <FolderSharedIcon />
            <Typography variant="h6">Profile</Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default SideMenu;
