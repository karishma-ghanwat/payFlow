import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (

        <nav className="navbar navbar-custom px-4 d-flex justify-content-between">

            {/* BRAND */}
            <h4 className="text-white">
                PayFlow
            </h4>


            <div className="d-flex gap-3 align-items-center">

                {/* HOME */}
                <Link
                    to="/home"
                    className="text-white text-decoration-none"
                >
                    Home
                </Link>


                {/* DASHBOARD */}
                <Link
                    to="/dashboard"
                    className="text-white text-decoration-none"
                >
                    Dashboard
                </Link>


                {/* TRANSACTIONS */}
                <Link
                    to="/transactions"
                    className="text-white text-decoration-none"
                >
                    Transactions
                </Link>


                {/* PROFILE */}
                <Link
                    to="/profile"
                    className="text-white text-decoration-none"
                >
                    Profile
                </Link>


                {/* LOGOUT */}
                <button
                    className="btn btn-accent"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;