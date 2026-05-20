import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Signup() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignup = async () => {

        // ✅ PASSWORD VALIDATION
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{6,}$/;

        if (!passwordRegex.test(form.password)) {
            return alert(
                "Password must be at least 6 characters and include:\n• Letter\n• Number\n• Special character"
            );
        }

        try {
            await API.post("/auth/signup", form);

            alert("Signup successful!");
            navigate("/login");

        } catch (err) {
            alert(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <>
            <Navbar />

            <div className="login-container">
                <div className="login-card">

                    <h2 className="mb-3">Create Account 🚀</h2>

                    <input
                        name="name"
                        placeholder="Name"
                        className="form-control mb-3 login-input"
                        onChange={handleChange}
                    />

                    <input
                        name="email"
                        placeholder="Email"
                        className="form-control mb-3 login-input"
                        onChange={handleChange}
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="form-control mb-3 login-input"
                        onChange={handleChange}
                    />

                    <button className="btn btn-accent w-100" onClick={handleSignup}>
                        Sign Up
                    </button>

                    <p className="text-center mt-3">
                        Already have an account?{" "}
                        <span
                            className="text-accent"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </span>
                    </p>

                </div>
            </div>
        </>
    );
}

export default Signup;