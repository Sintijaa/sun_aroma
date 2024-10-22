// src/components/PaymentForm.js
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false); // Added loading state

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true); // Start loading

        const cardElement = elements.getElement(CardElement);

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                setError(error.message);
                setSuccess(false);
            } else {
                setError(null);
                setSuccess(true);
                console.log('Payment method created:', paymentMethod);
                // Further steps such as sending the payment method to your backend
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            console.error(err);
        }

        setLoading(false); // Stop loading
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || loading}>
                {loading ? 'Processing...' : 'Veikt maksājumu'}
            </button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>Maksājums veiksmīgs!</div>}
        </form>
    );
};

export default PaymentForm;
