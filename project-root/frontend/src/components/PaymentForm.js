import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function _PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const { data } = await axios.post('/payments/create-payment-intent', { amount: 500 });
    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: { card: elements.getElement(CardElement), billing_details: { email } }
    });
    if (result.error) console.error(result.error.message);
    else if (result.paymentIntent.status === 'succeeded') alert('Payment successful!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full p-2 border"
      />
      <CardElement className="p-2 border" />
      <button
        type="submit"
        disabled={!stripe}
        className="w-full p-2 bg-purple-600 text-white rounded"
      >
        Pay $5.00
      </button>
    </form>
  );
}

export default function PaymentForm() {
  return (
    <Elements stripe={stripePromise}>
      <_PaymentForm />
    </Elements>
  );
}