const USER_ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  BUYER: "buyer",
};

const ORDER_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  PROCESSING: "processing",
  CUTTING: "cutting",
  STITCHING: "stitching",
  QUALITY_CHECK: "quality-check",
  PACKAGING: "packaging",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
};

module.exports = {
  USER_ROLES,
  ORDER_STATUS,
};