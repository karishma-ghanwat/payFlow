import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-custom px-4 d-flex justify-content-between">

            <h4 className="text-white">PayFlow</h4>

            <div className="d-flex gap-3">

                {/* ✅ FIXED HOME BUTTON */}
                <Link to="/home" className="text-white text-decoration-none">
                    Home
                </Link>

                <Link to="/dashboard" className="text-white text-decoration-none">
                    Dashboard
                </Link>

                <Link to="/transactions" className="text-white text-decoration-none">
                    Transactions
                </Link>

                <button className="btn btn-accent" onClick={handleLogout}>
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;