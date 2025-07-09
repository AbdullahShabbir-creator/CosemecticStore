import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const FAQS = [
  {
    keywords: ['best', 'top', 'popular', 'bestselling', 'featured'],
    answer: 'Our best-sellers include face powders, lipsticks, and eye shadow palettes. Check the Featured and Top Products sections for trending items!'
  },
  {
    keywords: ['order', 'buy', 'purchase', 'checkout', 'place order'],
    answer: 'To place an order, browse our catalog, add products to your cart, and proceed to checkout. Need help? Just ask!'
  },
  {
    keywords: ['shipping', 'delivery', 'free shipping', 'ship'],
    answer: 'We offer free shipping on orders above a certain amount. See our Shipping Policy for details or ask about your area.'
  },
  {
    keywords: ['track', 'tracking', 'order status', 'where is my order'],
    answer: 'You can track your order by going to your profile and clicking on My Orders. We keep you updated every step of the way!'
  },
  {
    keywords: ['payment', 'pay', 'methods', 'credit card', 'cash on delivery'],
    answer: 'We accept cash on delivery, credit/debit cards, and various e-wallets for your convenience.'
  },
  {
    keywords: ['makeup brushes', 'brush', 'face brush', 'eye brush', 'lip brush'],
    answer: 'Yes! We have a wide variety of face, eye, and lip brushes. Check the Brushes category for more.'
  },
  {
    keywords: ['support', 'help', 'contact', 'customer service'],
    answer: 'You can use this chat or visit our Contact Us page for more support options. We’re here to help!'
  },
  {
    keywords: ['category', 'categories', 'product type', 'what do you sell'],
    answer: 'We offer makeup, skincare, brushes, accessories, and more! Browse our categories for the full range.'
  },
  {
    keywords: ['return', 'refund', 'exchange'],
    answer: 'We have a customer-friendly return and exchange policy. Please see our Returns & Exchanges page for details.'
  },
  {
    keywords: ['discount', 'offer', 'promotion', 'sale'],
    answer: 'Check our Special Offers and Featured sections for current discounts and promotions!'
  },
  {
    keywords: ['gift', 'gift card', 'voucher'],
    answer: 'Yes, we offer gift cards and vouchers. You can purchase them from our Gifts section.'
  },
  {
    keywords: ['membership', 'loyalty', 'rewards'],
    answer: 'Join our loyalty program to earn rewards on every purchase. Visit the Rewards page for details.'
  },
  {
    keywords: ['newsletter', 'subscribe', 'updates'],
    answer: 'Subscribe to our newsletter for the latest updates, offers, and beauty tips!'
  },
  {
    keywords: ['cancel order', 'change order'],
    answer: 'To cancel or change your order, please contact our support as soon as possible.'
  },
  {
    keywords: ['expiry', 'expiration', 'product expiry'],
    answer: 'We ensure all products are within their expiry date. You can check the expiry on the product packaging.'
  },
  {
    keywords: ['vegan', 'cruelty free', 'animal testing'],
    answer: 'Many of our products are vegan and cruelty-free. Look for the badge on the product page.'
  },
  {
    keywords: ['ingredients', 'allergy', 'sensitive skin'],
    answer: 'Full ingredient lists are available on each product page. For allergies or sensitive skin, check before purchasing.'
  },
  {
    keywords: ['store location', 'shop near me', 'physical store'],
    answer: 'We are currently online only. For updates about physical stores, subscribe to our newsletter.'
  },
  {
    keywords: ['order confirmation', 'did my order go through'],
    answer: 'You will receive an order confirmation email after successful checkout.'
  },
  {
    keywords: ['international shipping', 'ship abroad'],
    answer: 'Currently, we only ship within Pakistan. Stay tuned for international shipping updates!'
  },
  {
    keywords: ['student discount', 'student offer'],
    answer: 'Yes, we have special discounts for students. Check our Special Offers section.'
  },
  {
    keywords: ['bundle', 'combo', 'set deals'],
    answer: 'Save more with our bundle deals! Visit the Bundle Offers section for details.'
  },
  {
    keywords: ['how to use', 'application tips'],
    answer: 'Each product page includes usage instructions and tips. Need more help? Just ask!'
  },
  {
    keywords: ['order history', 'my orders'],
    answer: 'You can view your order history in your profile under My Orders.'
  },
  {
    keywords: ['track refund', 'refund status'],
    answer: 'Refunds are processed within 7 business days. You can track status in your orders section.'
  },
  {
    keywords: ['wholesale', 'bulk order'],
    answer: 'For wholesale or bulk orders, please contact our sales team via the Contact Us page.'
  },
  {
    keywords: ['phone number', 'call support'],
    answer: 'You can reach our support team by email or live chat. Phone support coming soon!'
  },
  {
    keywords: ['order minimum', 'minimum order'],
    answer: 'There is no minimum order value for shopping with us.'
  },
  {
    keywords: ['out of stock', 'restock'],
    answer: 'If a product is out of stock, you can sign up for restock notifications on the product page.'
  },
  {
    keywords: ['customize', 'personalized', 'engraving'],
    answer: 'We do not currently offer product customization or engraving.'
  },
  {
    keywords: ['invoice', 'bill', 'receipt'],
    answer: 'A digital invoice/receipt is sent to your email after every order.'
  }
];

const SUGGESTIONS = [
  'What are your best-selling products?',
  'How can I place an order?',
  'Do you offer free shipping?',
  'How do I track my order?',
  'What payment methods do you accept?',
  'Do you have makeup brushes?',
  'How do I contact support?',
  'What categories do you have?'
];

const PRODUCT_RECS = {
  lipstick: [
    {
      name: 'Matte Lipstick',
      price: '$24.99',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHNqREEBdWHIvMJnz2jXCrxHU7oi2sl4cjwg&s',
      link: '/products/lipsticks'
    },
    {
      name: 'Glossy Lipstick',
      price: '$29.99',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPOUVA5uyk3Vp_1ufvWp7qQlqxrRmDyzlFeg&s',
      link: '/products/lipsticks'
    }
  ],
  foundation: [
    {
      name: 'Matte Foundation',
      price: '$39.99',
      image: 'https://www.makeupgallery.pk/cdn/shop/files/89oi90.jpg?v=1744216714&width=330',
      link: '/products/foundations'
    }
  ],
  eyeshadow: [
    {
      name: 'Matte Eyeshadow Palette',
      price: '$34.99',
      image: 'https://images.ctfassets.net/wlke2cbybljx/3dREGg2g7ydNpB4X9n2Zr4/882ee53857827b390d9d2ee874309475/BELLASOFIA.jpg',
      link: '/products/eyeshadows'
    }
  ]
};

function getBotResponse(message) {
  const lowerMsg = message.toLowerCase();
  for (let faq of FAQS) {
    for (let keyword of faq.keywords) {
      if (lowerMsg.includes(keyword)) {
        return faq.answer;
      }
    }
  }
  if (lowerMsg.match(/lipstick|lip stick/)) return { text: 'Check out our latest lipsticks below!', products: PRODUCT_RECS.lipstick };
  if (lowerMsg.match(/foundation/)) return { text: 'You can find foundations below!', products: PRODUCT_RECS.foundation };
  if (lowerMsg.match(/blush/)) return 'Our blush collection is available in Makeup > Face.';
  if (lowerMsg.match(/eye shadow|eyeshadow/)) return { text: 'Explore our eye shadow palettes below!', products: PRODUCT_RECS.eyeshadow };
  if (lowerMsg.match(/skin care|skincare|moisturizer|serum/)) return 'We offer a range of skincare products in the Skincare category.';
  return (
    "Sorry, I didn't understand that. You can ask things like: " +
    SUGGESTIONS.map(q => `\n- ${q}`).join('')
  );
}

const QUICK_REPLIES = [
  'Show me lipsticks',
  'Show me foundations',
  'Show me eyeshadow',
  'What are your best-selling products?'
];

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = (e, quickText) => {
    if (e) e.preventDefault();
    const userMsg = quickText || input;
    if (!userMsg.trim()) return;
    setMessages((msgs) => [...msgs, { from: 'user', text: userMsg }]);
    setTimeout(() => {
      const botReply = getBotResponse(userMsg);
      if (typeof botReply === 'string') {
        setMessages((msgs) => [...msgs, { from: 'bot', text: botReply }]);
      } else if (typeof botReply === 'object' && botReply.products) {
        setMessages((msgs) => [...msgs, { from: 'bot', text: botReply.text, products: botReply.products }]);
      }
    }, 600);
    setInput('');
  };

  return (
    <div>
      {!open && (
        <button className="chatbot-bubble" onClick={() => setOpen(true)} title="Chat with us">
          <span role="img" aria-label="chat">💬</span>
        </button>
      )}
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>Chatbot Helper</span>
            <button className="chatbot-close" onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg chatbot-msg-${msg.from}`}>{msg.text}
                {msg.products && (
                  <div className="chatbot-product-recs">
                    {msg.products.map((prod, idx) => (
                      <a key={idx} href={prod.link} className="chatbot-product-card" target="_blank" rel="noopener noreferrer">
                        <img src={prod.image} alt={prod.name} />
                        <div className="chatbot-product-info">
                          <div className="chatbot-product-name">{prod.name}</div>
                          <div className="chatbot-product-price">{prod.price}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form className="chatbot-input-row" onSubmit={handleSend}>
            <input
              className="chatbot-input"
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your question..."
              autoFocus
            />
            <button className="chatbot-send" type="submit">Send</button>
          </form>
          <div className="chatbot-quick-replies">
            {QUICK_REPLIES.map((reply, idx) => (
              <button key={idx} className="chatbot-quick-btn" onClick={() => handleSend(null, reply)}>
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
