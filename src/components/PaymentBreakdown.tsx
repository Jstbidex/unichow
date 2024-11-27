import { usePaystackPayment } from "react-paystack";

interface PaymentBreakdownProps {
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  orderId?: string;
  restaurantId: string;
  paystackConfig: {
    key?: string;
    email?: string;
    amount?: number;
    metadata?: any;
    split?: any;
    onSuccess?: (reference: any) => Promise<void>;
    onClose?: () => void;
  };
  onBack: () => void;
}

export default function PaymentBreakdown({
  subtotal,
  deliveryFee,
  serviceFee,
  total,
  paystackConfig,
  onBack
}: PaymentBreakdownProps) {
  const initializePayment = usePaystackPayment({
    publicKey: paystackConfig.key || '',
    email: paystackConfig.email || '',
    amount: paystackConfig.amount || 0,
    metadata: paystackConfig.metadata || { custom_fields: [] },
    split: paystackConfig.split || {
      type: "percentage",
      bearer_type: "account",
      subaccounts: []
    }
  });

  const handlePayment = () => {
    initializePayment({
      onSuccess: (reference: any) => {
        if (paystackConfig.onSuccess) {
          paystackConfig.onSuccess(reference);
        }
      },
      onClose: () => {
        if (paystackConfig.onClose) {
          paystackConfig.onClose();
        }
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm p-4 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₦{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span>₦{deliveryFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Service Fee (10%)</span>
          <span>₦{serviceFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-bold pt-2 border-t">
          <span>Total</span>
          <span>₦{total.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => onBack()}
          className="w-full py-3 rounded-lg border border-gray-300"
        >
          Back
        </button>
        <button
          onClick={handlePayment}
          className="w-full py-3 rounded-lg bg-primary text-zinc-900"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
} 