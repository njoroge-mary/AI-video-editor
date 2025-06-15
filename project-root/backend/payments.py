from flask import Blueprint, request, jsonify
import stripe
import os

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

stripe_bp = Blueprint('stripe_bp', __name__)

@stripe_bp.route('/create-payment-intent', methods=['POST'])
def create_payment_intent():
    data = request.json
    try:
        intent = stripe.PaymentIntent.create(
            amount=data['amount'],  # cents
            currency=data.get('currency', 'usd'),
            payment_method_types=['card'],
            metadata=data.get('metadata', {})
        )
        return jsonify({'clientSecret': intent.client_secret})
    except stripe.error.StripeError as e:
        return jsonify({'error': str(e)}), 400

@stripe_bp.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    data = request.json
    try:
        session = stripe.checkout.Session.create(
            customer_email=data.get('email'),
            payment_method_types=['card'],
            line_items=data['items'],  # [{'price': 'price_xxx', 'quantity':1}]
            mode=data.get('mode', 'payment'),
            success_url=data['success_url'],
            cancel_url=data['cancel_url'],
        )
        return jsonify({'url': session.url})
    except stripe.error.StripeError as e:
        return jsonify({'error': str(e)}), 400