import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AIIcon from "../ai.png";

const RegisterPhoneNumberScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  const handleSendVerificationCode = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/createNewAccessCode",
        {
          phoneNumber,
        }
      );

      localStorage.setItem("phoneNumber", phoneNumber);

      console.log("Access code is: ", res.data.accessCode);

      toast.success("Created new account successfully, please check your SMS");

      navigate("/verify-access-code");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <Stack justifyContent="center" alignItems="center" minHeight="100vh">
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Box
              component="img"
              sx={{
                height: 'auto',
                width: 200,
              }}
              alt="A.I icon"
              src={AIIcon}
            />

            <Typography variant="h4">Welcome to Skipli AI</Typography>

            <Typography variant="body1">
              Enter a mobile phone number that you have access to.
              <br />
              This number will be used to login to SkipliAI
            </Typography>

            <TextField
              id="phone-number-field"
              label="Phone number"
              variant="outlined"
              onChange={(event) => setPhoneNumber(event.target.value)}
              value={phoneNumber}
            />

            <Button onClick={handleSendVerificationCode} variant="contained">
              Send verification code
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default RegisterPhoneNumberScreen;
