const formatProductData = (product) => {
  return {
    ...product,
    createdAt: new Date(),
  };
};

module.exports = {
  formatProductData,
};
