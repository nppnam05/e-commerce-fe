interface StockDisplayProps {
  quantity: number;
}

export const StockDisplay = ({ quantity }: StockDisplayProps) => {
  if (quantity === undefined) {
    return (
      <div className="mt-1 text-sm text-amber-500 italic">
        Vui lòng chọn đầy đủ Màu sắc và Kích cỡ để xem số lượng kho.
      </div>
    );
  }
  if (quantity <= 0) {
    return <div className="text-lg font-medium text-red-600">Hết hàng</div>;
  }

  return (
    <div className="flex items-center gap-2 text-lg">
      <span className="text-zinc-500">Còn lại:</span>
      <span
        className={`font-semibold ${quantity <= 10 ? "text-orange-600" : "text-green-600"}`}
      >
        {quantity} sản phẩm
      </span>
      {quantity <= 10 && (
        <span className="text-sm font-medium text-orange-600">(Sắp hết)</span>
      )}
    </div>
  );
};
