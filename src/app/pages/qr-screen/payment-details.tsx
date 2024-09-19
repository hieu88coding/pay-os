// components/PaymentDetails.tsx

"use client"; // Client-side directive

import { useState } from "react";
import { Divider } from "antd";

const PaymentDetails = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="paymentDetail">
      <div className="paymentContent">
        <div>Chi tiết đơn hàng</div>
        <div
          className="paymentVisible"
          onClick={() => setIsVisible(!isVisible)}
        >
          {!isVisible ? "Xem" : "Ẩn"}
        </div>
      </div>
      {isVisible && (
        <div className="paymentCart">
          <div className="paymentItem">
            <div className="paymentRow">
              <div className="itemLeft">
                <div className="itemName">Mỳ tôm Hảo Hảo ly</div>
                <div className="itemQuantity">x1</div>
              </div>
              <div className="itemRight">2,000 VND</div>
            </div>
            <Divider />
          </div>
          <div className="paymentTotal">
            <b>Tổng cộng: </b>
            <span> 2,000 VND</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
