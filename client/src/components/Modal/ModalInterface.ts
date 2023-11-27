export interface ModalInterface {
    isOpen: boolean;
    onClose: () => void;
    assetName:string
  }
  export interface EmitPaymentInterface {
    type: string;
    destination: string;
    amount: string;
  }
  