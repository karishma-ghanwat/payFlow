import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function RevenueChart({ orders }) {

    // group by date
    const grouped = {};

    orders.forEach(o => {
        if (o.status !== "SUCCESS") return;

        const date = new Date(o.createdAt).toLocaleDateString();

        grouped[date] = (grouped[date] || 0) + o.amount;
    });

    const data = Object.keys(grouped).map(date => ({
        date,
        revenue: grouped[date]
    }));

    return (
        <div className="chart-card p-3 mt-4">
            <h5 className="mb-3">Revenue Trend</h5>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#F68537" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default RevenueChart;