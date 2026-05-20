import Navbar from "../components/Navbar";

function Failure() {
    return (
        <>
            <Navbar />
            <div className="status-page">
                <h1 className="error-text">Payment Failed</h1>
            </div>
        </>
    );
}

export default Failure;