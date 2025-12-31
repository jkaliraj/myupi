import React, { useState, useEffect } from "react";
import UPIForm from "./components/UPIForm";
import QRPreview from "./components/QRPreview";
import PaymentScreen from "./components/PaymentScreen";

const getInitialData = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const pa = urlParams.get("pa");
  if (pa) {
    return {
      screen: "payment",
      upiData: {
        pa,
        pn: urlParams.get("pn") || "",
        am: urlParams.get("am") || "",
        tn: urlParams.get("tn") || "",
      },
    };
  }
  return { screen: "create", upiData: { pa: "", pn: "", am: "", tn: "" } };
};

export default function App() {
  const initial = getInitialData();
  const [screen, setScreen] = useState(initial.screen);
  const [upiData, setUpiData] = useState(initial.upiData);

  useEffect(() => {
    const handleUrlChange = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const pa = urlParams.get("pa");
      if (pa) {
        setUpiData({
          pa,
          pn: urlParams.get("pn") || "",
          am: urlParams.get("am") || "",
          tn: urlParams.get("tn") || "",
        });
        setScreen("payment");
      } else {
        setScreen("create");
      }
    };

    window.addEventListener("popstate", handleUrlChange);

    return () => window.removeEventListener("popstate", handleUrlChange);
  }, []);

  if (screen === "payment") {
    return <PaymentScreen upiData={upiData} />;
  }

  return (
    <div className="min-h-screen md:grid md:grid-cols-[40%_60%] gap-0 bg-white">
      <div className="split-left md:min-h-screen flex items-center justify-center p-8 md:p-16 border-0">
        <div className="w-full max-w-lg min-h-[40vh] flex items-center justify-center">
          {(screen === "create" || screen === "preview") && (
            <UPIForm
              initial={screen === "preview" ? upiData : undefined}
              onLiveChange={(data) => setUpiData(data)}
              onGenerate={(data) => {
                setUpiData(data);
                setScreen("preview");
              }}
            />
          )}
        </div>
      </div>

      <div className="split-right min-h-screen flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <QRPreview
            upiData={upiData}
            onOpenPayment={() => setScreen("payment")}
          />
        </div>
      </div>
    </div>
  );
}
