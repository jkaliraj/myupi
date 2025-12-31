import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import UPIAppLogos from "./UPIAppLogos";

export default function PaymentScreen({ upiData = {}, onBack }) {
  const ref = useRef(null);
  const qrRef = useRef(null);

  useEffect(() => {
    if (!qrRef.current) {
      qrRef.current = new QRCodeStyling({
        width: 225,
        height: 225,
        margin: 10,
        dotsOptions: { type: "square", color: "#000" },
        backgroundOptions: { color: "#fff" },
      });
    }
    const link = `upi://pay?pa=${encodeURIComponent(
      upiData.pa || ""
    )}&pn=${encodeURIComponent(upiData.pn || "")}&am=${encodeURIComponent(
      upiData.am || ""
    )}&cu=INR&tn=${encodeURIComponent(upiData.tn || "")}`;
    qrRef.current.update({ data: link });
    if (ref.current) {
      ref.current.innerHTML = "";
      qrRef.current.append(ref.current);
    }
  }, [upiData]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
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
      <div className="text-center mt-4">
        <div className="text-sm text-gray-500">You're paying</div>
        <div className="text-xl text-black mt-0.5">{upiData.pa || "--"}</div>
        {upiData.am && (
          <div className="text-lg font-medium text-black mt-1">
            ₹{upiData.am}
          </div>
        )}
        {upiData.tn && (
          <div className="text-sm text-gray-600 mt-0.5">{upiData.tn}</div>
        )}
      </div>

      <div className="mt-4">
        <UPIAppLogos />
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        Create UPI payment links using{" "}
        <a
          href={window.location.origin}
          className="font-semibold text-black underline underline-offset-2"
        >
          MyUpi
        </a>
      </div>
    </div>
  );
}
