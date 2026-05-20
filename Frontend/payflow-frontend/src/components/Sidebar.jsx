import { Link, useLocation } from "react-router-dom";
import { FaHome, FaExchangeAlt } from "react-icons/fa";

function Sidebar() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="sidebar text-white p-3 d-flex flex-column">

            {/* Logo */}
            <h4 className="mb-4">PayFlow</h4>

            {/* Menu */}
            <ul className="list-unstyled flex-grow-1">

                <li className={`sidebar-item ${isActive("/dashboard") ? "active" : ""}`}>
                    <Link to="/dashboard">
                        <FaHome className="me-2" />
                        Dashboard
                    </Link>
                </li>

                <li className={`sidebar-item ${isActive("/transactions") ? "active" : ""}`}>
                    <Link to="/transactions">
                        <FaExchangeAlt className="me-2" />
                        Transactions
                    </Link>
                </li>

            </ul>

            {/* Footer */}
            <div className="small text-muted">
                © 2026 PayFlow
            </div>

        </div>
    );
}

export default Sidebar;