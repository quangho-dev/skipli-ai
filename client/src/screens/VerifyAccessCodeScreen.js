import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AIIcon from "../ai.png";

const VerifyAccessCodeScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [accessCode, setAccessCode] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const phoneNumberInLocalStorage = localStorage.getItem("phoneNumber");

    if (phoneNumberInLocalStorage) {
      setPhoneNumber(phoneNumberInLocalStorage);
    }
  }, []);

  const handleVerifyAccessCode = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/validateAccessCode",
        {
          phoneNumber,
          accessCode: +accessCode,
        }
      );

      if (res.data.success) {
        toast.success("Verified access code successfully!");

        navigate("/dashboard");
      } else {
        toast.error("Sorry, the provided access code is invalid");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Stack justifyContent="center" alignItems="center" minHeight="100vh">
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Box
              component="img"
              sx={{
                height: "auto",
                width: 200,
              }}
              alt="A.I icon"
              src={AIIcon}
            />

            <Typography variant="h4">Welcome to Skipli AI</Typography>

            <Typography variant="body1">
              SkipliAI has sent an OTP code to: <strong>{phoneNumber}</strong>
            </Typography>

            <TextField
              id="access-code-field"
              label="Access code"
              variant="outlined"
              onChange={(event) => setAccessCode(event.target.value)}
              value={accessCode}
              placeholder="Enter your code here"
            />

            <Button onClick={handleVerifyAccessCode} variant="contained">
              Submit
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default VerifyAccessCodeScreen;
