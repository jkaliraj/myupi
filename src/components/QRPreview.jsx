import React, { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import gpayLogo from "../assets/logos/gpay.svg";
import phonepeLogo from "../assets/logos/phonepe.svg";
import paytmLogo from "../assets/logos/paytm.png";
import bhimLogo from "../assets/logos/bhim.svg";

export default function QRPreview({ upiData = {}, onOpenPayment }) {
  const ref = useRef(null);
  const qrRef = useRef(null);

  const size = 225;

  useEffect(() => {
    if (!qrRef.current) {
      qrRef.current = new QRCodeStyling({
        width: size,
        height: size,
        margin: 10,
        qrOptions: { typeNumber: 0, mode: "Byte" },
        imageOptions: { crossOrigin: "anonymous", margin: 5 },
        dotsOptions: { type: "square", color: "#000" },
        backgroundOptions: { color: "#fff" },
      });
    }

    const link = buildLink(upiData);
    qrRef.current.update({ data: link });

    if (ref.current) {
      ref.current.innerHTML = "";
      qrRef.current.append(ref.current);
    }
  }, [upiData.pa, upiData.pn, upiData.am, upiData.tn]);

  function buildLink(d) {
    const pa = d.pa || "";
    const pn = d.pn || "";
    const am = d.am || "";
    const tn = d.tn || "";
    return `upi://pay?pa=${encodeURIComponent(pa)}&pn=${encodeURIComponent(
      pn
    )}&am=${encodeURIComponent(am)}&cu=INR&tn=${encodeURIComponent(tn)}`;
  }

  const download = () => {
    if (qrRef.current)
      qrRef.current.download({ name: "upi-qrcode", extension: "png" });
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col md:flex-row items-start gap-6 w-full">
        {/* Left: form preview area reserved by parent, right: device mock */}
        <div className="hidden md:block" />

        <div className="relative flex flex-col justify-center h-[680px] w-[315px] border-[5px] border-black rounded-2xl">
          <div className="gap-y-2 pt-10 pb-6 px-6 flex flex-col items-center justify-center">
            <div className="flex justify-center">
              <div
                ref={ref}
                className="rounded-md bg-white z-0 relative"
                style={{
                  width: 225,
                  height: 225,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  position: "relative",
                  zIndex: 0,
                }}
              />
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">You are paying</p>
              <p className="text-sm font-medium text-black mt-1 break-all">
                {upiData.pa || "--"}
              </p>
            </div>

            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">Amount</p>
              <p className="text-sm font-medium text-black mt-1">
                {upiData.am || "--"}
              </p>
            </div>

            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">For</p>
              <p className="text-sm font-medium text-black mt-1 break-all">
                {upiData.tn || "--"}
              </p>
            </div>

            <div className="flex gap-x-4 p-2 items-center justify-center">
              <a
                className="app-icon"
                href={`gpay://upi/pay?pa=${encodeURIComponent(
                  upiData.pa || ""
                )}&am=${encodeURIComponent(
                  upiData.am || ""
                )}&tn=${encodeURIComponent(upiData.tn || "")}`}
              >
                <img alt="Google Pay" width="43" height="43" src={gpayLogo} />
              </a>
              <a
                className="app-icon"
                href={`phonepe://pay?pa=${encodeURIComponent(
                  upiData.pa || ""
                )}&am=${encodeURIComponent(
                  upiData.am || ""
                )}&tn=${encodeURIComponent(upiData.tn || "")}`}
              >
                <img alt="PhonePe" width="43" height="43" src={phonepeLogo} />
              </a>
              <a
                className="app-icon"
                href={`paytmmp://pay?pa=${encodeURIComponent(
                  upiData.pa || ""
                )}&am=${encodeURIComponent(
                  upiData.am || ""
                )}&tn=${encodeURIComponent(upiData.tn || "")}`}
              >
                <img alt="Paytm" width="43" height="43" src={paytmLogo} />
              </a>
              <a
                className="app-icon"
                href={`upi://pay?pa=${encodeURIComponent(
                  upiData.pa || ""
                )}&am=${encodeURIComponent(
                  upiData.am || ""
                )}&tn=${encodeURIComponent(upiData.tn || "")}`}
              >
                <img alt="BHIM" width="43" height="43" src={bhimLogo} />
              </a>
            </div>

            <div className="text-center mt-4">
              <a
                className="text-sm text-gray-500"
                href={window.location.origin}
              >
                Create UPI payment links using{" "}
                <span className="font-semibold text-black underline underline-offset-2">
                  MyUpi
                </span>
              </a>
            </div>
          </div>

          <span className="phone-dot" />
          <span className="absolute -right-2 top-20 border-4 border-black h-10 rounded-md" />
          <span className="absolute -right-2 top-44 border-4 border-black h-24 rounded-md" />
        </div>
      </div>
    </div>
  );
}
