import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import axios from "axios";

const CreateAccountPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");  // Added display name state
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const createAccount = async () => {
    try {
      if (password !== confirmPassword) {
        setError("Password and confirm password do not match");
        return;
      }

      // Create the user
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Update user profile with display name
      await updateProfile(newUser, { displayName });

      // Send the user data to your backend
      await axios.post("http://localhost:3000/api/user/createUser", {
        userId: email,
        displayName: displayName
      });

      navigate("/dashboard");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Create Account</h1>
      {error && <p className="error">{error}</p>}
      <input
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Re-enter your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <input
        placeholder="Your display name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <button onClick={createAccount}>Create Account</button>
      <Link to="/login">Already have an account? Log in here</Link>
    </>
  );
};

export default CreateAccountPage;
