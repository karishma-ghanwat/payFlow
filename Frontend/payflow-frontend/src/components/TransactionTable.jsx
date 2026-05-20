function TransactionTable() {
    return (
        <div className="table-card p-3 mt-4">

            <table className="table table-borderless text-white">
                <thead>
                    <tr style={{ color: "#94A3B8" }}>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>#1</td>
                        <td>₹500</td>
                        <td>
                            <span className="badge bg-success">Success</span>
                        </td>
                    </tr>

                    <tr>
                        <td>#2</td>
                        <td>₹300</td>
                        <td>
                            <span className="badge bg-danger">Failed</span>
                        </td>
                    </tr>

                </tbody>
            </table>

        </div>
    );
}

export default TransactionTable;