import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useState } from "react";
import API from "../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const { data } = await API.post("/auth/login", {
                email,
                password,
            });

            // ✅ Save token
            localStorage.setItem("token", data.token);

            // ✅ IMPORTANT FIX
            window.location.href = "/home";

        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <>
            <Navbar />

            <div className="login-container">
                <motion.div className="login-card">

                    <h2 className="mb-3">Welcome Back 👋</h2>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="form-control mb-3 login-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="form-control mb-3 login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="btn btn-accent w-100" onClick={handleLogin}>
                        Login
                    </button>

                    <p className="text-center mt-3">
                        Don't have an account?{" "}
                        <a href="/signup" className="text-accent">Sign up</a>
                    </p>

                </motion.div>
            </div>
        </>
    );
}

export default Login;