import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SideMenu from "../components/SideMenu";
import axios from "axios";
import { usePostStore } from "../stores/postStore";
import { toast } from "react-toastify";
import ShareModal from "../components/ShareModal";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

const ProfileScreen = () => {
  const [distinctTopics, setDistinctTopics] = useState([]);
  const [groupedPosts, setGroupedPosts] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const removePost = usePostStore((state) => state.removePost);
  const setPosts = usePostStore((state) => state.setPosts);
  const posts = usePostStore((state) => state.posts);

  const handleUnsavePost = async (id) => {
    try {
      removePost(id);

      await axios.post(`http://localhost:5000/api/posts/unsaveContent/${id}`);

      toast.success("Unsaved caption successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    const fetchUserGeneratedContents = async () => {
      const result = await axios.get(
        `http://localhost:5000/api/posts/getUserGeneratedContents/${localStorage.getItem(
          "phoneNumber"
        )}`
      );

      const posts = result.data.contents;

      setPosts(posts);
    };

    fetchUserGeneratedContents();
  }, [setPosts]);

  useEffect(() => {
    const res = Object.groupBy(posts, ({ topic }) => topic);
    setGroupedPosts(res);

    setDistinctTopics(Object.keys(res));
  }, [posts]);

  return (
    <Stack direction="row">
      <SideMenu />

      <Box flex={8} padding={"2rem 0 0 3rem"}>
        <Typography variant="h4" marginBottom={"1em"}>
          Saved Content
        </Typography>

        <Stack spacing={5} paddingBottom={"3rem"}>
          {distinctTopics.map((topic) => (
            <Box key={topic}>
              <Typography variant="h5" marginBottom={"0.5em"}>
                {capitalizeFirstLetter(topic)}
              </Typography>

              <Stack direction={"row"} spacing={2} flexWrap={"wrap"} rowGap={2}>
                {groupedPosts[topic].map((post) => (
                  <Card sx={{ minWidth: "30%", maxWidth: "30%" }} key={post.id}>
                    <CardContent>
                      <Stack spacing={2}>
                        <Typography>{post.data}</Typography>

                        <Box
                          sx={{ marginLeft: "auto" }}
                          alignSelf={"flex-end"}
                          gap={1}
                          display={"flex"}
                        >
                          <Button
                            variant="outlined"
                            onClick={handleOpenModal}
                            size="small"
                            color="secondary"
                          >
                            Share
                          </Button>

                          <Button
                            variant="outlined"
                            onClick={() => handleUnsavePost(post.id)}
                            size="small"
                          >
                            Unsave
                          </Button>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>

      <ShareModal handleCloseModal={handleCloseModal} openModal={openModal} />
    </Stack>
  );
};

export default ProfileScreen;
