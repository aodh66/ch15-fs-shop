import Stripe from "stripe";
// import sgMail from "@sendgrid/mail";
import nodemailer from "nodemailer";
import { getSession } from "@auth0/nextjs-auth0";

import {
  empty,
  getUserBasketQuery,
} from "@/lib/api-functions/server/baskets/queries";

import { add } from "@/lib/api-functions/server/orders/queries";

const { STRIPE_SECRET_KEY, ADMIN_EMAIL, SENDGRID_API_KEY } = process.env;

// sgMail.setApiKey(SENDGRID_API_KEY);

const stripe = new Stripe(STRIPE_SECRET_KEY);

const handler = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Wrong Method. Only POST allowed" });
  }

  const { name, email, token, amount } = req.body;

  let rejectionMessage = "";
  // validate the form
  if (!name) {
    rejectionMessage = "Name not provided";
  } else if (!email) {
    rejectionMessage =
      "Maintainer Issue: Email not provided. Please contact us directly";
  } else if (!token) {
    rejectionMessage =
      "Maintainer Issue: Token not provided. Please contact us directly";
  } else if (!amount) {
    rejectionMessage =
      "Maintainer Issue: Amount not provided. Please contact us directly";
  }

  if (rejectionMessage) {
    return res.status(400).json({
      message: rejectionMessage,
    });
  }

  let charge = {};

  try {
    const customer = await stripe.customers.create({
      source: token,
      email,
    });
    console.log("customer", customer);
    console.log("amount", amount);
    charge = await stripe.charges.create({
      amount,
      currency: "GBP",
      customer: customer.id,
    });
    console.log('charge', charge);
  } catch (err) {
    console.log("err doing stripe", err);
    return res.status(500).json({
      message: "Internal Server Error: " + err,
    });
  }

  try {
    const session = await getSession(req, res);
    req.user = session.user;
  } catch (err) {
    console.log(`Couldn't get user`, err);
  }
  let basket = { items: [] };
  try {
    basket = await getUserBasketQuery(req.user.sub);
    for (const item of basket.items) {
      item.quantity -= 1;
      await item.save();
    }
  } catch (err) {
    console.log(`Couldn't decrement items`, err);
  }

  try {
    add({
      owner: req.user.sub,
      items: basket.items,
      receiptURL: charge.receipt_url,
    });
  } catch (err) {
    console.log(`Couldn't save order`, err);
  }

  try {
    await empty(req.user.sub);
  } catch (err) {
    console.log(`Couldn't empty basket`, err);
  }

  const msg = {
    to: email,
    from: ADMIN_EMAIL,
    cc: ADMIN_EMAIL,
    replyTo: ADMIN_EMAIL,
    subject: `Order confirmation`,
    text: `Thank you ${name} for your order!\n\nYou can see a receipt here: ${charge.receipt_url}`,
    html: `<p>Thank you ${name} for your order!</p><p>You can see a receipt <a href="${charge.receipt_url}" target="_blank">here</a></p>`,
  };

  try {
    let info = await transporter.sendMail(msg);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.status(201).json({ message: "Confirmation email sent", id: info.messageId, receiptURL: charge.receipt_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send order confirmation email" });
  }
};

export default handler;

/*
customer {
  id: 'cus_NrmEqXVNrBEXsZ',
  object: 'customer',
  address: null,
  balance: 0,
  created: 1683685354,
  currency: null,
  default_source: 'card_1N62fjIHFDw3t0oYitbVZ6aW',
  delinquent: false,
  description: null,
  discount: null,
  email: 'james.sherry@thejump.tech',
  invoice_prefix: '34CF648B',
  invoice_settings: {
    custom_fields: null,
    default_payment_method: null,
    footer: null,
    rendering_options: null
  },
  livemode: false,
  metadata: {},
  name: null,
  phone: null,
  preferred_locales: [],
  shipping: null,
  tax_exempt: 'none',
  test_clock: null
}
amount 200
charge {
  id: 'ch_3N62fnIHFDw3t0oY1ySv88tq',
  object: 'charge',
  amount: 200,
  amount_captured: 200,
  amount_refunded: 0,
  application: null,
  application_fee: null,
  application_fee_amount: null,
  balance_transaction: 'txn_3N62fnIHFDw3t0oY14KpTRZI',
  billing_details: {
    address: {
      city: 'London',
      country: 'United Kingdom',
      line1: 'Flat 18, Brunel House, 1c Hainault Road, Waltham Forest',
      line2: null,
      postal_code: 'E11 1ED',
      state: null
    },
    email: null,
    name: 'James Sherry',
    phone: null
  },
  calculated_statement_descriptor: 'WWW.THEJUMP.TECH',
  captured: true,
  created: 1683685355,
  currency: 'gbp',
  customer: 'cus_NrmEqXVNrBEXsZ',
  description: null,
  destination: null,
  dispute: null,
  disputed: false,
  failure_balance_transaction: null,
  failure_code: null,
  failure_message: null,
  fraud_details: {},
  invoice: null,
  livemode: false,
  metadata: {},
  on_behalf_of: null,
  order: null,
  outcome: {
    network_status: 'approved_by_network',
    reason: null,
    risk_level: 'normal',
    risk_score: 32,
    seller_message: 'Payment complete.',
    type: 'authorized'
  },
  paid: true,
  payment_intent: null,
  payment_method: 'card_1N62fjIHFDw3t0oYitbVZ6aW',
  payment_method_details: {
    card: {
      brand: 'visa',
      checks: [Object],
      country: 'US',
      exp_month: 12,
      exp_year: 2034,
      fingerprint: 'j4Ks7Dc878Re9de0',
      funding: 'credit',
      installments: null,
      last4: '4242',
      mandate: null,
      network: 'visa',
      network_token: [Object],
      three_d_secure: null,
      wallet: null
    },
    type: 'card'
  },
  receipt_email: null,
  receipt_number: null,
  receipt_url: 'https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTjJmMFRJSEZEdzN0MG9ZKOz_66IGMgYrUpDvwpI6LBawguHnHNqDBGtBZYDtBYXz8-rO8EjhlVYb6aXLXvNwB1ybshygvxR9__KW',
  refunded: false,
  review: null,
  shipping: null,
  source: {
    id: 'card_1N62fjIHFDw3t0oYitbVZ6aW',
    object: 'card',
    address_city: 'London',
    address_country: 'United Kingdom',
    address_line1: 'Flat 18, Brunel House, 1c Hainault Road, Waltham Forest',
    address_line1_check: 'pass',
    address_line2: null,
    address_state: null,
    address_zip: 'E11 1ED',
    address_zip_check: 'pass',
    brand: 'Visa',
    country: 'US',
    customer: 'cus_NrmEqXVNrBEXsZ',
    cvc_check: 'pass',
    dynamic_last4: null,
    exp_month: 12,
    exp_year: 2034,
    fingerprint: 'j4Ks7Dc878Re9de0',
    funding: 'credit',
    last4: '4242',
    metadata: {},
    name: 'James Sherry',
    tokenization_method: null,
    wallet: null
  },
  source_transfer: null,
  statement_descriptor: null,
  statement_descriptor_suffix: null,
  status: 'succeeded',
  transfer_data: null,
  transfer_group: null
}
*/