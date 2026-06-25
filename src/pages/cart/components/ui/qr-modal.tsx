import QRCode from "react-qr-code";

interface QRModalProps {
  isOpen: boolean;
  qrCode: string | null;
  onClose: (e?: React.MouseEvent) => void;
}

export const QRModal = ({ isOpen, qrCode, onClose }: QRModalProps) => {
  if (!isOpen || !qrCode) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-white p-8">
        <h2 className="text-xl font-bold">Quét QR để thanh toán</h2>
        <QRCode value={qrCode} size={256} />
        <p className="text-sm text-gray-500">
          Mở app ngân hàng và quét mã QR để hoàn tất thanh toán
        </p>
        <button
          onClick={onClose}
          className="rounded-xl bg-gray-100 px-6 py-2 text-sm hover:bg-gray-200"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};
