function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) { 
  if (quantity <= 0) {
    throw new RangeError('Invalid quantity');
  }
  if (quantity > product.stock) {
    throw new RangeError('Invalid quantity');
  }
  const existingProduct = cart.find(
    (item) => item.id === product.id
  );
  if (existingProduct) {
    if (existingProduct.quantity + quantity > product.stock){
      throw new RangeError('Invalid quantity');
    }
    const updatedProduct = {
      ...existingProduct,
      quantity: existingProduct.quantity + quantity
    };
    return cart.map((item) => {
      if (item.id === product.id) {
        return updatedProduct;
      }
    
      return item;
    });
  } 
  return [...cart, {...product, quantity}] 
}
function changeQuantity(cart, productId, quantity) { 
   
    const existingProduct = cart.find((item) => item.id === productId);
    if (!existingProduct) {
      return cart;
    }
    if (quantity <= 0) {
      throw new RangeError('Invalid quantity');
    }
    if (quantity > existingProduct.stock) {
      throw new RangeError('Invalid quantity');
    }
    const updatedProduct = {
      ...existingProduct,
      quantity
    };
    return cart.map((item) => {
      if (item.id === productId) {
        return updatedProduct
      }
    
      return item;
    });
}
function removeFromCart(cart, productId) { 

  return cart.filter((item) => {
    return item.id !== productId
  });
}
function calculateCartSubtotal(cart) { 
  return cart.reduce((sum, item) => {
   return sum + item.quantity * item.price
  }, 0)
}
function calculateOrderTotal(cart, promoCode) { 
  let delivery = 0;
  let discount = 0;
  const subtotal = calculateCartSubtotal(cart);
  if (subtotal < 50000) {
    delivery = 30000
  } 
  if (promoCode === 'SAVE10' && subtotal >= 20000) {
    discount = subtotal * 0.1
  }
   const total = subtotal - discount + delivery
   return {
    subtotal,
    discount,
    delivery,
    total}
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
