"use client";

import HeaderScreen from "../header/header.screen";
import "./qr-screen.scss";
import { useState, useEffect } from "react";
import { Button } from "antd";
import axios from "axios";
import PaymentDetails from "./payment-details";
import QRCode from "react-qr-code";
// export const getServerSideProps = async (context: any) => {
//   const res = await axios.get("http://localhost:3000/api/redirect");

//   const paymentData = res.data;

//   const parsedProps = JSON.parse(paymentData);

//   try {
//     const response = await axios.post(
//       `https://api-merchant.payos.vn/v2/payment-requests/`
//     );
//     const data = response.data;

//     return {
//       props: {
//         data,
//         jsonProps: parsedProps,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return {
//       props: {
//         data: null,
//         jsonProps: parsedProps,
//       },
//     };
//   }
// };

type qrResponse = {
  qrCode: string;
  billCode: string;
};
type Props = {
  data: any;
  jsonProps: {
    transactionId: string;
    orderDetails: string;
    amount: number;
  };
  qrResponse: {
    qrCode: string;
    billCode: string;
  };
};

const QRScreen = () => {
  const [qrCode, setQrCode] = useState<qrResponse>({
    qrCode: "",
    billCode: "",
  });
  const fetchQrCode = async () => {
    try {
      const res = await axios.get(
        "http://172.16.20.14:30904/viet_qr/mb/createQr?amount=100000&key=hyperapikey&billCode=C017"
      );
      console.log(res);

      if (res.status === 200) {
        setQrCode(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkResult = async () => {
    if (qrCode.billCode.length !== 0) {
      let value = 2;

      const fetchResultStatus = async () => {
        try {
          const response = await axios.get(
            `http://172.16.20.14:30904/viet_qr/mb/checkLP?referenceLabelCode=${qrCode.billCode}`
          );
          value = response.data.status;

          if (value === 2) {
            console.log("Giá trị đã trả về Y:", value);
          } else {
            console.log("Giá trị hiện tại:", value);
            fetchResultStatus();
          }
        } catch (error) {
          console.error("Lỗi khi gọi API:", error);
        }
      };
      fetchResultStatus();
    }
  };

  useEffect(() => {
    fetchQrCode();
  }, []);
  useEffect(() => {
    checkResult();
  }, [qrCode]);
  return (
    <div>
      <HeaderScreen />
      <div className="payment">
        <div className="paymentContainer">
          <PaymentDetails />
          <div className="paymentQR">
            <div className="paymentTitle">
              Mở App Ngân hàng bất kỳ để <b>quét mã VietQR</b> hoặc{" "}
              <b> chuyển khoản</b> chính xác số tiền bên dưới
            </div>
            <div className="qrContainer">
              <div className="qrCode">
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "60%", width: "100%" }}
                  value={qrCode.qrCode}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <div className="qrInfo">
                <div className="infoBank">
                  <div className="infoLogo">
                    <img
                      alt="Bank logo"
                      loading="lazy"
                      src="https://img.bankhub.dev/rounded/mbbank.png"
                    />
                  </div>
                  <div className="infoDiv">
                    <div className="infoTitle">Ngân hàng</div>
                    <div className="infoContent">Ngân hàng TMCP Quân đội</div>
                  </div>
                </div>
                <div className="infoContainer">
                  <div className="infoItem">
                    <div className="infoTitle">Chủ tài khoản</div>
                    <div className="infoContent">BUI TIEN LOC</div>
                  </div>
                </div>
                <div className="infoContainer">
                  <div className="infoItem">
                    <div className="infoTitle">Số tài khoản</div>
                    <div className="infoContent">VQRQ00036rqt8</div>
                  </div>
                  <div className="infoButton">
                    <Button>Sao chép</Button>
                  </div>
                </div>
                <div className="infoContainer">
                  <div className="infoItem">
                    <div className="infoTitle">Số tiền</div>
                    <div className="infoContent">2,000 vnd</div>
                  </div>
                  <div className="infoButton">
                    <Button>Sao chép</Button>
                  </div>
                </div>
                <div className="infoContainer">
                  <div className="infoItem">
                    <div className="infoTitle">Nội dung</div>
                    <div className="infoContent">Thanh toan don hang</div>
                  </div>
                  <div className="infoButton">
                    <Button>Sao chép</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="paymentFooter">
              <div className="footerBtn">
                <Button>Hủy</Button>
              </div>
              <div className="footerWarning">
                Lưu ý : Nhập chính xác số tiền 2,000 khi chuyển khoản
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScreen;
