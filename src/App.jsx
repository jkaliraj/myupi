import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useSearchParams,
  Navigate,
} from "react-router-dom";
import UPIForm from "./components/UPIForm";
import QRPreview from "./components/QRPreview";
import PaymentScreen from "./components/PaymentScreen";

function Home() {
  const [screen, setScreen] = useState("create");
  const [upiData, setUpiData] = useState({ pa: "", pn: "", am: "", tn: "" });
  const navigate = useNavigate();

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
            onOpenPayment={() => {
              const params = new URLSearchParams();
              Object.entries(upiData).forEach(([k, v]) => params.set(k, v));
              navigate(`pay?${params.toString()}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Pay() {
  const [searchParams] = useSearchParams();
  const upiData = {
    pa: searchParams.get("pa") || "",
    pn: searchParams.get("pn") || "",
    am: searchParams.get("am") || "",
    tn: searchParams.get("tn") || "",
  };

  return <PaymentScreen upiData={upiData} />;
}

function App() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const path = urlParams.get("path");
    if (path) {
      history.replaceState(null, "", path);
    }
  }, []);

  const basename = import.meta.env.BASE_URL;

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
