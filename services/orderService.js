const generateTrackingHistory = () => {
  return [
    {
      status: "pending",
      note: "Order placed successfully",
      date: new Date(),
    },
  ];
};

module.exports = {
  generateTrackingHistory,
};
