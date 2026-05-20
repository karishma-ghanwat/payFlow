import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function Dashboard() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const { data } = await API.get("/orders");
        setOrders(data.orders || []);
    };

    const totalRevenue = orders
        .filter(o => o.status === "SUCCESS")
        .reduce((sum, o) => sum + o.amount, 0);

    const success = orders.filter(o => o.status === "SUCCESS").length;
    const failed = orders.filter(o => o.status === "FAILED").length;

    const recent = orders.slice(0, 6);

    return (
        <>
            <Navbar />

            <div className="layout">
                <Sidebar />

                <div className="main-content">

                    <h2 className="page-title">Dashboard</h2>

                    {/* KPI CARDS */}
                    <div className="kpi-grid">

                        <div className="kpi">
                            <p>Total Revenue</p>
                            <h3>₹{totalRevenue}</h3>
                        </div>

                        <div className="kpi success">
                            <p>Successful</p>
                            <h3>{success}</h3>
                        </div>

                        <div className="kpi failed">
                            <p>Failed</p>
                            <h3>{failed}</h3>
                        </div>

                    </div>

                    {/* RECENT TABLE */}
                    <div className="card mt-4">

                        <div className="card-header">
                            <h5>Recent Transactions</h5>
                        </div>

                        <table className="table table-dark table-hover">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {recent.map(o => (
                                    <tr key={o._id}>
                                        <td>{o.orderId}</td>
                                        <td>₹{o.amount}</td>
                                        <td>{new Date(o.createdAt).toLocaleString()}</td>
                                        <td>
                                            <span className={`badge status-${o.status.toLowerCase()}`}>
                                                {o.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>

                </div>
            </div>
        </>
    );
}

export default Dashboard;
