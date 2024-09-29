import { useState } from 'react';

const productsData = [
  { id: 1, name: 'Ring', price: 3500, image: '/picture/แหวน.jpg' },
  { id: 2, name: 'Red Heart Ring', price: 4000, image: '/picture/แหวน2.jpg' },
  { id: 3, name: 'Sun Ring', price: 3900, image: '/picture/แหวน3.jpg' },
  { id: 4, name: 'Necklace', price: 4550, image: '/picture/สร้อยคอ.jpg' },
  { id: 5, name: 'Infinity Sterling silver', price: 3700, image: '/picture/สร้อยคอ2.jpg' },
  { id: 6, name: 'Sparkling Infinity Heart', price: 3900, image: '/picture/สร้อยคอ3.jpg' },
  { id: 7, name: 'Infinity sterling', price: 3350, image: '/picture/ตุ้มหู.jpg' },
  { id: 8, name: 'Star earring', price: 3350, image: '/picture/ตุ้มหู2.jpg' },
  { id: 9, name: 'Silver bracelet', price: 4000, image: '/picture/กำไล.jpg' },
  { id: 10, name: 'Dangle Charm', price: 2600, image: '/picture/ชาร์ม.jpg' },
];

function App() {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');

  const coupons = [
    { code: 'DISCOUNT10', discount: '10%', description: 'ส่วนลด 10% สำหรับการสั่งซื้อที่มากกว่า 3000฿' },
    { code: 'DISCOUNT20', discount: '20%', description: 'ส่วนลด 20% สำหรับการสั่งซื้อที่มากกว่า 3500฿' },
    { code: 'DISCOUNT30', discount: '30%', description: 'ส่วนลด 30% สำหรับการสั่งซื้อที่มากกว่า 4000฿' },
    { code: 'DISCOUNT40', discount: '40%', description: 'ส่วนลด 40% สำหรับการสั่งซื้อที่มากกว่า 5000฿' }
  ];

  const addToCart = (product) => {
    const productInCart = cart.find(item => item.id === product.id);
    if (productInCart) {
      setCart(
        cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(
      cart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleApplyDiscount = (coupon) => {
    if (coupon === 'DISCOUNT10' && total > 3000) {
      setDiscount(0.1);
      setDiscountError('');
    } else if (coupon === 'DISCOUNT20' && total > 3500) { 
      setDiscount(0.2);
      setDiscountError('');
    } else if (coupon === 'DISCOUNT30' && total > 4000) { 
      setDiscount(0.3);
      setDiscountError('');
    } else if (coupon === 'DISCOUNT40' && total > 5000) { 
      setDiscount(0.4);
      setDiscountError('');
    } else {
      setDiscountError('Invalid coupon code.');
    }
  };
  

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalWithShipping = total > 0 ? total + 100 - total * discount : 0;


  return (
    <div className="App max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">JEWELLERY SHOP</h1>

      <div className="product-list grid grid-cols-5 gap-8 p-8 justify-center max-w-full">
        {productsData.map(product => (
          <div key={product.id} className="product-card border p-6 bg-gray-800 text-white flex flex-col items-center">
            <img src={product.image} alt={product.name} className="mb-2 w-36 h-36" />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-lg">Price: {product.price}฿</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 w-3/4"
            >
              เพิ่มลงตะกร้า
            </button>
          </div>
        ))}
      </div>

      <h2 className="custom-heading text-2xl font-bold text-center text-purple-600 mt-12">ตะกร้าสินค้า</h2>

      <div className="cart p-4">
        {cart.length > 0 ? (
          cart.map(item => (
            <div key={item.id} className="flex justify-between border p-2">
              <span>{item.name}</span>
              <span>
                จำนวน: 
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="border w-12 ml-2"
                />
              </span>
              <span>{item.price * item.quantity}฿</span>
              <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white px-2 py-1 ml-2">
                ลบ
              </button>
            </div>
          ))
        ) : (
          <p>ตะกร้าของคุณว่างเปล่า</p>
        )}
        <div className="mt-4">
          <p>ทั้งหมด: {total}฿</p>
          <p>ค่าจัดส่ง: 100฿</p>
          <p>คูปองส่วนลด: {discount * 100}%</p>
          <p className="font-bold">รวมสิ้นค้าและค่าจัดส่ง: {totalWithShipping}฿</p>

          <input
            type="text"
            placeholder="Coupon Code"
            onBlur={(e) => handleApplyDiscount(e.target.value)}
            className="border p-2 mt-2"
          />
          {discountError && <p className="text-red-500">{discountError}</p>}
        </div>
      </div>

    <div className="mt-8">
    <h3 className="text-xl font-bold text-center">คูปองส่วนลดทั้งหมด</h3>
    <table className="min-w-full border mt-4">
      <thead>
        <tr>
          <th className="border p-2">Coupon Code</th>
          <th className="border p-2">Discount</th>
          <th className="border p-2">Description</th>
        </tr>
      </thead>
      <tbody>
        {coupons.map(coupon => (
          <tr key={coupon.code}>
            <td className="border p-2">{coupon.code}</td>
            <td className="border p-2">{coupon.discount}</td>
            <td className="border p-2">{coupon.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
);
}

export default App;
