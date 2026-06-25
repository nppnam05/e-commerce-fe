export const STATUS = {
  PND: "PENDING",
  REJ: "REJECTED",
  SHP: "SHIPPED",
  COM: "COMPLETED",
  CNL: "CANCELLED",
} as const;

export const STATUS_TEXT = {
  PND: "Đang chờ xử lý",
  REJ: "Đã bị từ chối",
  SHP: "Đang vận chuyển",
  COM: "Đã giao hàng",
  CNL: "Đã hủy",
};
