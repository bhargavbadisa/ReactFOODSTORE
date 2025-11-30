import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClearCart, OrderDetails, IncCart, DecCart, RemoveCart } from './store';
import './CartComponent.css';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import emailjs from '@emailjs/browser';


function CartComponent() {
  const cartObjects = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [couponCode, setCouponCode] = useState('');
  const couponCodeRef = useRef();

  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [couponDiscountPercentage, setCouponDiscountPercentage] = useState(0);

  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('qr');
  const [customerEmail, setCustomerEmail] = useState('');

  const handleCouponApply = () => {
    const codeValue = couponCodeRef.current.value.trim().toUpperCase();
    setCouponCode(codeValue);

    switch (codeValue) {
      case 'SAM123':
        setCouponDiscountPercentage(10);
        break;
      case 'SAM234':
        setCouponDiscountPercentage(20);
        break;
      case 'SAM143':
        setCouponDiscountPercentage(30);
        break;
      default:
        alert('❌ Invalid Coupon Code');
        setCouponDiscountPercentage(0);
    }
    couponCodeRef.current.value = '';
  };

  const calculateAmounts = () => {
    let totalPrice = cartObjects.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let discountAmount = (discountPercentage / 100) * totalPrice;
    let afterDiscount = totalPrice - discountAmount;
    let couponDiscount = (couponDiscountPercentage / 100) * afterDiscount;
    let afterCoupon = afterDiscount - couponDiscount;
    let shipping = 30;
    let tax = (afterCoupon * 5) / 100;
    let finalAmount = afterCoupon + tax + shipping;
    return { totalPrice, discountAmount, couponDiscount, tax, shipping, finalAmount };
  };

  const { totalPrice, discountAmount, couponDiscount, tax, shipping, finalAmount } = calculateAmounts();

  const cartListItems = cartObjects.map((item, index) => (
    <li key={index} className="cart-item">
      <img className="cart-img" src={item.image} alt={item.name} />
      <span className="item-name">{item.name}</span>
      <span className="item-price">₹{item.price}</span>
      <div className="quantity-box">
        <button onClick={() => {
          dispatch(DecCart(item));
          toast.warn('Product Quantity decreased');
        }}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => {
          dispatch(IncCart(item));
          toast.success('Product added');
        }}>+</button>
      </div>
      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
      <div className="item-actions">
        <button className="btn-remove" onClick={() => {
          dispatch(RemoveCart(item));
          toast.error('Product removed');
        }}>Remove</button>
      </div>
    </li>
  ));

  const handlePaymentSuccess = () => {
    const purchaseDateTime = new Date().toLocaleString();
    const orderId = 'ORD-' + new Date().getTime();

    const orderDetailsObject = {
      orderId,
      purchaseDateTime,
      items: [...cartObjects],
      finalAmount,
    };

    const formattedOrders = cartObjects.map(item => 
  `Product: ${item.name}\nQuantity: ${item.quantity}\nPrice: ₹${(item.price * item.quantity).toFixed(2)}\n`
).join('\n');

const templateParams = {
  orderId: orderDetailsObject.orderId,
  orders: formattedOrders,   // <-- Pass string, NOT array/objects
  cost: {
    shipping: shipping.toFixed(2),
    tax: tax.toFixed(2),
    total: finalAmount.toFixed(2)
  },
  email: customerEmail
};


    dispatch(ClearCart());
    dispatch(OrderDetails(orderDetailsObject));

    emailjs.send(
      'service_gpf51r6',
      'template_mvodyxc',
      templateParams,
      '3fdwX5yce4wQUGq0l'
    )
      .then((response) => {
        console.log('✅ Email sent!', response.status, response.text);
      })
      .catch((error) => {
        console.error('❌ Email failed:', error);
      });

    setPaymentSuccessful(true);

    setTimeout(() => {
      navigate("/orders");
    }, 5000);
  };

  useEffect(() => {
    if (cartObjects.length === 0 && paymentSuccessful && countdown > 0) {
      const interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [cartObjects.length, paymentSuccessful, countdown]);

  return (
    <div className="cart-container">
      <h1 className="cart-title">🛒 Cart Summary</h1>

      {cartObjects.length > 0 ? (
        <>
          <div className="cart-list">
            <div className="cart-header">
              <span>Image</span>
              <span>Product</span>
              <span>Price (₹)</span>
              <span>Quantity</span>
              <span>Total (₹)</span>
              <span>Actions</span>
            </div>
            {cartListItems}
          </div>

          <div className="summary-section">
            <h3>💰 Total Price: ₹{totalPrice.toFixed(2)}</h3>
            <div className="discount-buttons">
              <button onClick={() => setDiscountPercentage(10)}>🏷️ Apply 10% Discount</button>
              <button onClick={() => setDiscountPercentage(20)}>🏷️ Apply 20% Discount</button>
              <button onClick={() => setDiscountPercentage(30)}>🏷️ Apply 30% Discount</button>
            </div>

            <h4> 🎉 Discount Amount: -₹{discountAmount.toFixed(2)}</h4>
            <div className="coupon-section">
              <input type="text" ref={couponCodeRef} placeholder="Enter Coupon Code" />
              <button onClick={handleCouponApply}>Apply Coupon</button>
            </div>
            <h4> 🎟️ Coupon ({couponCode}): -₹{couponDiscount.toFixed(2)}</h4>
            <h4>🧾 Tax (5%): +₹{tax.toFixed(2)}</h4>
            <h4>🚚 Shipping: +₹{shipping.toFixed(2)}</h4>
            <h3>💵 Final Amount: ₹{finalAmount.toFixed(2)}</h3>

            <div className="email-section">
              <h4>📧 Enter your email to receive the order details:</h4>
              <input
                type="email"
                placeholder="Enter your email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>

            <div className="payment-method">
              <h3>💳 Select Payment Method:</h3>
              <button onClick={() => setPaymentMethod('qr')}>📱 QR Code</button>
              <button onClick={() => setPaymentMethod('card')}>💳 Card</button>
            </div>

            {paymentMethod === 'qr' && !paymentSuccessful && (
              <div className="qr-section">
                <h4>Scan UPI QR to Pay ₹{finalAmount.toFixed(2)}</h4>
                <QRCode value={`upi://pay?pa=6281022488-2@ibl&pn=MyStore&am=${finalAmount.toFixed(2)}&cu=INR`} />
                <p>UPI ID:6281022488-2@ibl</p>
                <button onClick={handlePaymentSuccess} className="confirm-payment-btn">
                  ✅ I've Completed Payment
                </button>
              </div>
            )}

            {paymentMethod === 'card' && !paymentSuccessful && (
              <div className="card-section">
                <h4>Enter Card Details</h4>
                <input type="text" placeholder="Card Number" />
                <input type="text" placeholder="Cardholder Name" />
                <input type="text" placeholder="Expiry Date (MM/YY)" />
                <input type="text" placeholder="CVV" />
                <button onClick={handlePaymentSuccess} className="confirm-payment-btn">
                  ✅ I've Completed Payment
                </button>
              </div>
            )}
          </div>
        </>
      ) : paymentSuccessful ? (
        <div>
          <h2 className="thank-you-message">✅ Payment Successful! Redirecting to orders page... </h2>
          <p style={{ textAlign: 'center' }}>➡️ Redirecting to your Orders page in {countdown} seconds...</p>
        </div>
      ) : (
        <div>
          <h2>Your cart is Empty! 🛒</h2>
          <p style={{ textAlign: 'center' }}>Your cart is empty, please add some products...</p>
        </div>
      )}
    </div>
  );
}

export default CartComponent;
