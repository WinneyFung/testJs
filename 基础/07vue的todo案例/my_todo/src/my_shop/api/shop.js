/**
 * Mocking client-server processing
 */
const _products = [
  { id: 1, title: "iPad 4 Mini", price: 500.01, inventory: 2, max: 2 },
  { id: 2, title: "H&M T-Shirt White", price: 10.99, inventory: 10, max: 10 },
  { id: 3, title: "Charli XCX - Sucker CD", price: 19.99, inventory: 5, max: 5 }
];

export default {
  getProducts(cb) {
    setTimeout(() => cb(_products), 1000);
  },

  buyProducts(products, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      Date.now() % 2 === 0 ? cb() : errorCb();
    }, 1000);
  }
};
