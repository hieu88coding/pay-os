// components/CheckoutScreen.tsx

"use client"; // This ensures the component is client-side

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
const CheckoutScreen = () => {
  const router = useRouter();

  const jsonProps = {
    orderCode: 123,
    amount: 56000000,
    description: "VQRIO123",
    buyerName: "Nguyen Van A",
    buyerEmail: "buyer-email@gmail.com",
    buyerPhone: "090xxxxxxx",
    buyerAddress: "số nhà, đường, phường, tỉnh hoặc thành phố",
    items: [],
    cancelUrl: "https://your-cancel-url.com",
    returnUrl: "https://your-success-url.com",
    expiredAt: 1696559798,
    signature: "string",
  };

  const sendData = async () => {
    const res = await axios.post("/api/redirect", jsonProps);
    console.log("Phản hồi từ server:", res);
  };

  return (
    <div>
      <button onClick={sendData}>Gửi dữ liệu</button>
    </div>
  );
};

export default CheckoutScreen;
