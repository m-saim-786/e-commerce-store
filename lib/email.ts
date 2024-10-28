import nodemailer from 'nodemailer';
import { Order, OrderItem, User } from '@prisma/client';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOrderConfirmation(order: Order & { items: OrderItem[], user: User }) {
  const itemsList = order.items
    .map(
      (item) =>
        `${item.quantity}x ${item.product.name} - $${(item.price * item.quantity).toFixed(2)}`
    )
    .join('\n');

  const html = `
    <h1>Order Confirmation</h1>
    <p>Thank you for your order, ${order.user.name}!</p>
    <h2>Order Details</h2>
    <p>Order ID: ${order.id}</p>
    <p>Status: ${order.status}</p>
    <h3>Items:</h3>
    <pre>${itemsList}</pre>
    <p><strong>Total: $${order.total.toFixed(2)}</strong></p>
    <p>Delivery Address:</p>
    <p>${order.address}</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: order.user.email,
    subject: `Order Confirmation #${order.id}`,
    html,
  });
}

export async function sendOrderNotificationToAdmin(order: Order & { items: OrderItem[], user: User }) {
  const html = `
    <h1>New Order Received</h1>
    <p>Order ID: ${order.id}</p>
    <p>Customer: ${order.user.name} (${order.user.email})</p>
    <p>Total: $${order.total.toFixed(2)}</p>
    <a href="${process.env.NEXT_PUBLIC_URL}/admin/orders/${order.id}">View Order</a>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Order #${order.id}`,
    html,
  });
}