import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function Transactions() {

    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const { data } = await API.get("/orders");
        setOrders(data.orders || []);
    };

    const filtered = orders.filter(o =>
        o.orderId.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Navbar />

            <div className="layout">
                <Sidebar />

                <div className="main-content">

                    <h2 className="page-title">Transactions</h2>

                    {/* SEARCH BAR */}
                    <div className="card mb-3 p-3">
                        <input
                            type="text"
                            placeholder="Search by Order ID"
                            className="form-control"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* TABLE */}
                    <div className="card">

                        <table className="table table-dark table-hover">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Amount</th>
                                    <th>Date & Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filtered.map(o => (
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

export default Transactions;
