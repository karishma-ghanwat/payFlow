import { motion } from "framer-motion";
import { useState } from "react";
import API from "../services/api";

function PaymentCard() {

    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const validate = (value) => {
        if (!value) return "Enter amount";
        if (value <= 0) return "Invalid amount";
        if (value > 100000) return "Limit ₹1,00,000";
        return "";
    };

    const handlePayment = async () => {

        const err = validate(amount);
        if (err) {
            setError(err);
            return;
        }

        try {
            setLoading(true);

            const { data } = await API.post("/orders/create", {
                amount: Number(amount),
            });

            const order = data.razorpayOrder;

            const options = {
                key: "rzp_test_Scth8e9vg1ydM2",
                amount: order.amount,
                currency: order.currency,
                name: "PayFlow",
                description: "Payment",
                order_id: order.id,

                handler: async function (response) {
                    const verify = await API.post("/payment/verify", response);

                    if (verify.data.success) {
                        window.location.href = "/success";
                    } else {
                        window.location.href = "/failure";
                    }
                },
            };

            const rzp = new window.Razorpay(options);

            rzp.on("payment.failed", async () => {
                await API.post("/payment/verify", {
                    razorpay_order_id: options.order_id,
                    razorpay_payment_id: "",
                    razorpay_signature: "invalid"
                });

                window.location.href = "/failure";
            });

            rzp.open();

        } catch (error) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="payment-clean"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
        >

            <p className="brand">PayFlow</p>

            <h1 className="amount">
                ₹{amount || 0}
            </h1>

            <input
                type="number"
                placeholder="Enter amount"
                className="amount-input"
                value={amount}
                onChange={(e) => {
                    setAmount(e.target.value);
                    setError("");
                }}
            />

            {error && <p className="error">{error}</p>}

            <button
                className="pay-btn"
                onClick={handlePayment}
                disabled={!amount || loading}
            >
                {loading ? "Processing..." : "Pay"}
            </button>

        </motion.div>
    );
}

export default PaymentCard;