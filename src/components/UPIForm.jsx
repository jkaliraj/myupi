import React, { useState, useEffect } from "react";

export default function UPIForm({ onGenerate, onLiveChange, initial }) {
  const DEFAULT_NOTE = "❤️";
  const [pa, setPa] = useState(initial?.pa || "");
  const [pn, setPn] = useState(initial?.pn || "");
  const [am, setAm] = useState(initial?.am || "");
  const [tn, setTn] = useState(initial?.tn ?? DEFAULT_NOTE);
  const [error, setError] = useState("");
  const [generated, setGenerated] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (initial) {
      setPa(initial.pa || "");
      setPn(initial.pn || "");
      setAm(initial.am || "");
      setTn(initial.tn ?? DEFAULT_NOTE);
    }
  }, [initial]);

  // send live changes up so QR can update while typing
  useEffect(() => {
    if (onLiveChange) onLiveChange({ pa, pn, am, tn });
  }, [pa, pn, am, tn]);

  const handle = (e) => {
    e.preventDefault();
    if (!pa || pa.trim() === "") return;
    setError("");
    setGenerated(true);
    onGenerate({ pa, pn, am, tn });
  };

  const deepLink = () => {
    const url = new URL(window.location.href);
    url.pathname = "/pay";
    url.searchParams.set("pa", pa);
    url.searchParams.set("pn", pn);
    url.searchParams.set("am", am);
    if (tn && tn.trim() !== "" && tn !== DEFAULT_NOTE) {
      url.searchParams.set("tn", tn);
    }
    return url.toString();
  };

  const copyLink = async (target = "link") => {
    try {
      await navigator.clipboard.writeText(deepLink());
      setCopiedLink(true);
    } catch (e) {
      setCopiedLink(false);
    }
  };

  return (
    <form onSubmit={handle} className="space-y-4">
      <h1 className="text-3xl font-semibold text-black">Create a UPI Link</h1>

      <input
        value={pa}
        onChange={(e) => setPa(e.target.value)}
        placeholder="Enter your UPI ID"
        className="w-full"
        maxLength="50"
      />
      <input
        type="number"
        step="0.01"
        value={am}
        onChange={(e) => setAm(e.target.value)}
        placeholder="Amount"
        className="w-full"
        max="1000000"
      />
      <input
        value={tn}
        onChange={(e) => setTn(e.target.value)}
        placeholder="Note"
        className="w-full"
        maxLength="50"
      />

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!pa || pa.trim() === ""}
          className={`w-full rounded-[5px] ${
            !pa || pa.trim() === ""
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          Generate Link
        </button>
      </div>

      {/* reserved area to prevent layout shift when showing generated link */}
      <div className="mt-2 min-h-[72px]">
        {generated ? (
          <div>
            <label className="font-medium text-black">UPI Link:</label>
            <div className="mt-1">
              <input value={deepLink()} readOnly className="w-full" />
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => copyLink("link")}
                  className="bg-black text-white rounded-[5px] hover:bg-gray-800"
                >
                  {copiedLink ? "Copied!" : "Copy to Clipboard"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="opacity-0">
            {/* invisible placeholder keeps space */}
            <label className="font-medium text-black">UPI Link:</label>
            <div className="mt-1">
              <input value={""} readOnly className="w-full" />
              <div className="mt-2">
                <button
                  type="button"
                  className="bg-black text-white rounded-[5px] hover:bg-gray-800"
                >
                  Copy to Clipboard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
