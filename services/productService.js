const formatProductData = (product) => {
  return {
    ...product,
    createdAt: new Date(),
  };
};

module.exports = {
  formatProductData,
};


trackingservice
const createTrackingStep = (
  status,
  note
) => {
  return {
    status,
    note,
    date: new Date(),
  };
};

module.exports = {
  createTrackingStep,
};