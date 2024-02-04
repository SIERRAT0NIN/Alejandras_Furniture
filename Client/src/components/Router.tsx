import { Route, Routes } from "react-router-dom";
import App from "./App";
import { Login } from "./Login";
import SignUp from "./Signup";

function RouterApp() {
  return (
    <Routes>
      (
      <>
        {/* If user is logged in */}
        <Route path="/" element={<App />} />
      </>
      ) : (
      <>
        {/* If not logged in */}
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </>
      )
    </Routes>
  );
}

export default RouterApp;
