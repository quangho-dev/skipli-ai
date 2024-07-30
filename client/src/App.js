import { CssBaseline } from "@mui/material";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPhoneNumberScreen from "./screens/RegisterPhoneNumberScreen";
import VerifyAccessCodeScreen from "./screens/VerifyAccessCodeScreen";
import DashboardScreen from "./screens/DashboardScreen";
import ChooseSocialNetworkScreen from "./screens/ChooseSocialNetworkScreen";
import ChooseTopicAndToneScreen from "./screens/ChooseTopicAndToneScreen";
import ProfileScreen from "./screens/ProfileScreen";
import GetInspiredScreen from "./screens/GetInspiredScreen";
import GenerateCaptionsFromAIIdeas from "./screens/GenerateCaptionsFromAIIdeas";

function App() {
  return (
    <Router>
      <div className="page-container">
        <div className="content-wrap">
          <CssBaseline />
          <Routes>
            <Route path="/" element={<RegisterPhoneNumberScreen />} />
            <Route
              path="/verify-access-code"
              element={<VerifyAccessCodeScreen />}
            />
            <Route path="/dashboard" element={<DashboardScreen />} />
            <Route
              path="/choose-a-social-network"
              element={<ChooseSocialNetworkScreen />}
            />
            <Route
              path="/choose-topic-and-tone"
              element={<ChooseTopicAndToneScreen />}
            />

            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/get-inspired" element={<GetInspiredScreen />} />
            <Route
              path="/generate-captions-from-AI-ideas"
              element={<GenerateCaptionsFromAIIdeas />}
            />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
