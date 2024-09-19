"use client";

import Image from "next/image";
import styles from "./page.module.css";
import QRScreen from "./pages/qr-screen/qr-screen";
import CheckoutScreen from "./pages/checkout-screen/checkout-sccreen";
type Props = {
  data: any;
  jsonProps: {
    transactionId: string;
    orderDetails: string;
    amount: number;
  };
};
export default function Home() {
  return (
    <div>
      <QRScreen />
    </div>
  );
}
