import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Profile() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {

            const { data } = await API.get("/auth/profile");

            setUser(data.user);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Failed to load profile"
            );

        } finally {

            setLoading(false);

        }
    };


    // Loading state
    if (loading) {
        return (
            <>
                <Navbar />

                <div className="profile-page">
                    <div className="profile-card">
                        <h3>Loading Profile...</h3>
                    </div>
                </div>
            </>
        );
    }


    // Error state
    if (error) {
        return (
            <>
                <Navbar />

                <div className="profile-page">
                    <div className="profile-card">
                        <h3 className="error">
                            {error}
                        </h3>
                    </div>
                </div>
            </>
        );
    }


    return (
        <>
            <Navbar />

            <div className="profile-page">

                <div className="profile-card">

                    {/* PROFILE HEADER */}
                    <div className="profile-header">

                        <div className="profile-avatar">
                            {user?.name
                                ? user.name.charAt(0).toUpperCase()
                                : "U"
                            }
                        </div>

                        <h2>
                            {user?.name}
                        </h2>

                        <p>
                            {user?.email}
                        </p>

                    </div>


                    {/* ACCOUNT INFORMATION */}
                    <div className="profile-section">

                        <h5>
                            Account Information
                        </h5>


                        <div className="profile-info">

                            <div>
                                <span>
                                    Full Name
                                </span>

                                <strong>
                                    {user?.name || "Not available"}
                                </strong>
                            </div>


                            <div>
                                <span>
                                    Email
                                </span>

                                <strong>
                                    {user?.email || "Not available"}
                                </strong>
                            </div>


                            <div>
                                <span>
                                    Phone
                                </span>

                                <strong>
                                    {user?.phone || "Not added"}
                                </strong>
                            </div>


                            <div>
                                <span>
                                    Member Since
                                </span>

                                <strong>
                                    {user?.createdAt
                                        ? new Date(
                                            user.createdAt
                                        ).toLocaleDateString()
                                        : "Not available"
                                    }
                                </strong>
                            </div>


                            <div>
                                <span>
                                    Account Status
                                </span>

                                <strong className="profile-status">
                                    ● Active
                                </strong>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Profile;