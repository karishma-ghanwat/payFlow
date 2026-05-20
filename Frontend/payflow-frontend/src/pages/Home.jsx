import Navbar from "../components/Navbar";
import PaymentCard from "../components/PaymentCard";
import { motion } from "framer-motion";

function Home() {
    const handlePayment = () => {
        console.log("Payment triggered");
    };

    return (
        <>
            <Navbar />

            {/* HERO SECTION */}
            <div className="container text-center mt-5">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Modern Payments for the Digital World 💳
                </motion.h1>

                <p className="mt-3" style={{ color: "#94A3B8" }}>
                    Fast, secure and reliable payment solution for businesses
                </p>
            </div>

            {/* PAYMENT CARD */}
            <div className="d-flex justify-content-center align-items-center mt-5">
                <PaymentCard onPay={handlePayment} />
            </div>

            {/* FEATURES SECTION */}
            <div className="container mt-5">
                <div className="row text-center">

                    <div className="col-md-4">
                        <h5>⚡ Fast Payments</h5>
                        <p style={{ color: "#94A3B8" }}>
                            Process transactions instantly with high reliability.
                        </p>
                    </div>

                    <div className="col-md-4">
                        <h5>🔒 Secure</h5>
                        <p style={{ color: "#94A3B8" }}>
                            Industry-level encryption and security standards.
                        </p>
                    </div>

                    <div className="col-md-4">
                        <h5>📊 Analytics</h5>
                        <p style={{ color: "#94A3B8" }}>
                            Track your payments with powerful dashboard insights.
                        </p>
                    </div>

                </div>
            </div>

            {/* CTA SECTION */}
            <div className="text-center mt-5 mb-5">
                <h3>Start accepting payments today</h3>
                <button className="btn btn-accent mt-3">
                    Get Started
                </button>
            </div>
        </>
    );
}

export default Home;