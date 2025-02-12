import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const { error: cardError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (cardError) {
            setError(cardError.message);
        } else {
            setError(null);
            setSuccess('Payment successful!');
            // Handle successful payment here, e.g., redirect or update the order
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
            {error && <div>{error}</div>}
            {success && <div>{success}</div>}
        </form>
    );
};

export default CheckoutForm;
