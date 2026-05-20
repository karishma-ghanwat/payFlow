import Navbar from "../components/Navbar";

function Success() {
    return (
        <>
            <Navbar />
            <div className="status-page">
                <h1 className="success-text">Payment Successful</h1>
            </div>
        </>
    );
}

export default Success;