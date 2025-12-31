import React from "react";
import gpayLogo from "../assets/logos/gpay.svg";
import phonepeLogo from "../assets/logos/phonepe.svg";
import paytmLogo from "../assets/logos/paytm.png";
import bhimLogo from "../assets/logos/bhim.svg";

export default function UPIAppLogos() {
  return (
    <div className="flex gap-6 items-center justify-center">
      <img alt="Google Pay" width="43" height="43" src={gpayLogo} />
      <img alt="PhonePe" width="43" height="43" src={phonepeLogo} />
      <img alt="Paytm" width="43" height="43" src={paytmLogo} />
      <img alt="BHIM" width="43" height="43" src={bhimLogo} />
    </div>
  );
}
