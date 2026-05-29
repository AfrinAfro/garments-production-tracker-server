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