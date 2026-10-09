
import { useEffect, useRef, useState } from "react";

import PhoneImage from '../assets/phone-image.png'

import {
  ArrowRight,
  Check,
  CheckCircle2,
  CircleAlert,
  Code2,
  Download,
  FileArchive,
  Globe,
  Layers3,
  LockKeyhole,
  Package,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
  LoaderCircle,
} from "lucide-react";

import Header from "../components/Header";
import LogoUpload from "../components/LogoUpload";
import BuildProgress from "../components/BuildProgress";
import DownloadCard from "../components/DownloadCard";

import {
  analyzeWebsite,
  createConversion,
  getBuildStatus,
  getDownloadUrl,
} from "../services/api";

function normalizeUrl(value) {
  let result = String(value || "").trim();

  const markdown = result.match(
    /^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/
  );

  if (markdown) result = markdown[2];

  if (result && !/^https?:\/\//i.test(result)) {
    result = `https://${result}`;
  }

  return result;
}

function isValidUrl(value) {
  try {
    const parsed = new URL(value);

    return (
      ["http:", "https:"].includes(parsed.protocol) &&
      parsed.hostname.includes(".")
    );
  } catch {
    return false;
  }
}

function SectionLabel({ children }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
      {children}
    </p>
  );
}

function Feature({ icon: Icon, title, description }) {
  return (
    <div className="flex gap-4 border border-slate-200 bg-white p-5 transition hover:border-blue-300">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-blue-50 text-blue-700">
        <Icon size={21} />
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-950">
          {title}
        </h3>

        <p className="mt-2 text-xs leading-5 text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
}

function Step({ number, title, description, last = false }) {
  return (
    <div className="relative flex gap-4">
      <div className="relative flex flex-col items-center">
        <div className="z-10 flex h-9 w-9 shrink-0 items-center justify-center border border-blue-200 bg-blue-50 text-sm font-bold text-blue-700">
          {number}
        </div>

        {!last && (
          <div className="absolute top-9 h-full w-px bg-slate-200" />
        )}
      </div>

      <div className="pb-7">
        <h3 className="text-sm font-bold text-slate-950">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
}

function BuildPreview({ progress, message }) {
  const items = [
    { title: "Prepare Android project", limit: 25 },
    { title: "Configure app settings", limit: 40 },
    { title: "Compile APK package", limit: 70 },
    { title: "Generate AAB bundle", limit: 95 },
    { title: "Finalize build files", limit: 100 },
  ];

  return (
    <div className="border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center bg-blue-600 text-white">
            <Layers3 size={20} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-950">
              Build overview
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Android compilation pipeline
            </p>
          </div>
        </div>

        <span className="border border-blue-100 bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700">
          {progress >= 100 ? "Ready" : "Live"}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-end justify-between gap-3">
          <span className="text-sm font-semibold text-slate-700">
            Build progress
          </span>

          <span className="text-2xl font-black tabular-nums text-blue-700">
            {Math.max(0, Math.min(100, progress))}%
          </span>
        </div>

        <div className="mt-3 h-2 bg-slate-100">
          <div
            className="h-full bg-blue-600 transition-all duration-500"
            style={{
              width: `${Math.max(0, Math.min(100, progress))}%`,
            }}
          />
        </div>

        <p className="mt-3 text-xs leading-5 text-slate-600">
          {message}
        </p>

        <div className="mt-7 space-y-5">
          {items.map((item) => {
            const complete = progress >= item.limit;

            return (
              <div key={item.title} className="flex items-center gap-3">
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center border ${
                    complete
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-white text-slate-400"
                  }`}
                >
                  {complete ? (
                    <Check size={15} />
                  ) : (
                    <span className="h-2 w-2 bg-current" />
                  )}
                </div>

                <span
                  className={`text-xs font-medium ${
                    complete ? "text-slate-900" : "text-slate-500"
                  }`}
                >
                  {item.title}
                </span>

                {complete && (
                  <CheckCircle2
                    size={15}
                    className="ml-auto text-emerald-600"
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <div className="border border-slate-200 p-4">
            <Smartphone size={22} className="text-blue-700" />

            <p className="mt-3 text-sm font-bold text-slate-950">
              APK package
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Android installation
            </p>
          </div>

          <div className="border border-slate-200 p-4">
            <Package size={22} className="text-blue-700" />

            <p className="mt-3 text-sm font-bold text-slate-950">
              AAB bundle
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Play Console upload
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [url, setUrl] = useState("");
  const [appName, setAppName] = useState("");
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [permission, setPermission] = useState(false);

  const [phase, setPhase] = useState("form");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(
    "Waiting for your build to start..."
  );

  const [buildId, setBuildId] = useState(null);
  const [apkUrl, setApkUrl] = useState("");
  const [aabUrl, setAabUrl] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const pollingRef = useRef(null);
  const pollingBusyRef = useRef(false);

  useEffect(() => {
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }

      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  function handleLogoChange(file) {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Logo size must not exceed 5 MB.");
      return;
    }

    if (
      !["image/png", "image/jpeg", "image/webp"].includes(file.type)
    ) {
      setError("Please upload a PNG, JPG or WebP logo.");
      return;
    }

    setError("");

    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
    }

    setLogo(file);
    setLogoPreview(URL.createObjectURL(file));
  }

  function removeLogo() {
    if (logoPreview) URL.revokeObjectURL(logoPreview);

    setLogo(null);
    setLogoPreview("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) return;

    setError("");

    const finalUrl = normalizeUrl(url);
    const finalName = appName.trim();

    if (!finalUrl || !isValidUrl(finalUrl)) {
      setError("Enter a valid website URL, for example https://example.com.");
      return;
    }

    if (finalName.length < 2) {
      setError("App name must contain at least 2 characters.");
      return;
    }

    if (!permission) {
      setError("Confirm that you own or have permission to convert this website.");
      return;
    }

    try {
      setLoading(true);
      setAnalyzing(true);
      setProgress(0);
      setMessage("Analyzing website...");
      setBuildId(null);
      setApkUrl("");
      setAabUrl("");

      await analyzeWebsite(finalUrl);

      setAnalyzing(false);

      const result = await createConversion({
        url: finalUrl,
        appName: finalName,
        permission,
        logo,
      });

      const id =
        result?.buildId ||
        result?.jobId ||
        result?.build?.id ||
        result?.data?.buildId ||
        result?.data?.id;

      if (!id) {
        throw new Error("The server did not return a build ID.");
      }

      setBuildId(id);
      setPhase("building");
      setProgress(5);
      setMessage("Build queued. Preparing Android project...");

      startPolling(id);
    } catch (err) {
      console.error("Conversion error:", err);

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Could not start the build. Check that your backend is running."
      );

      setLoading(false);
      setAnalyzing(false);
    }
  }

  function startPolling(id) {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }

    pollingBusyRef.current = false;

    async function checkBuild() {
      if (pollingBusyRef.current) return;

      pollingBusyRef.current = true;

      try {
        const result = await getBuildStatus(id);
        const build = result?.build || result?.data || result;

        const status = String(
          build?.status || result?.status || "building"
        ).toLowerCase();

        const currentProgress = Number(
          build?.progress ?? result?.progress ?? 0
        );

        const currentMessage =
          build?.message ||
          result?.message ||
          "Building your Android application...";

        setProgress(Math.max(0, Math.min(100, currentProgress)));
        setMessage(currentMessage);

        if (["completed", "success", "done"].includes(status)) {
          clearInterval(pollingRef.current);
          pollingRef.current = null;

          setProgress(100);
          setMessage("APK and AAB generated successfully.");
          setApkUrl(getDownloadUrl(id, "apk"));
          setAabUrl(getDownloadUrl(id, "aab"));
          setPhase("ready");
          setLoading(false);
        }

        if (["failed", "error"].includes(status)) {
          clearInterval(pollingRef.current);
          pollingRef.current = null;

          setPhase("form");
          setLoading(false);
          setError(
            build?.error ||
              result?.error ||
              currentMessage ||
              "Android build failed."
          );
        }
      } catch (err) {
        console.error("Build status error:", err);
      } finally {
        pollingBusyRef.current = false;
      }
    }

    checkBuild();
    pollingRef.current = setInterval(checkBuild, 2000);
  }

  function resetConverter() {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }

    pollingBusyRef.current = false;

    setPhase("form");
    setProgress(0);
    setMessage("Waiting for your build to start...");
    setBuildId(null);
    setApkUrl("");
    setAabUrl("");
    setError("");
    setLoading(false);
    setAnalyzing(false);
  }

  const currentStep =
    phase === "form" ? 1 : phase === "building" ? 3 : 4;

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Header />

      <main>
        {/* Hero */}
       <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
  {/* Background decorative accent */}
  <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 border-55 border-blue-100" />

  {/* Yahan grid-cols-1 se default column rahega, aur md:grid-cols-2 se medium screen par row ban jayega */}
  <div className="relative mx-auto grid grid-cols-1 max-w-7xl items-center gap-12 px-4 py-6 sm:px-6 sm:py-20 md:grid-cols-2 lg:px-8">
    
    {/* Left Column: Content */}
    <div>
  <div className="mb-1 flex flex-wrap gap-2">
    <span className="inline-flex items-center gap-2 border border-blue-200 bg-white px-3 py-1 sm:py-2 text-xs font-bold text-blue-700">
      <Sparkles size={14} />
      Website to Android
    </span>

    <span className=" inline-flex items-center gap-2 border border-slate-200 bg-white px-3 py-1 sm:py-2 text-xs font-bold text-slate-700">
      <ShieldCheck size={14} />
      Secure build flow
    </span>
  </div>

  {/* Yahan text-4xl ko text-3xl kar diya hai taaki mobile par chhota aur neat dikhe */}
  <h1 className="max-w-2xl text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-6xl">
    Your website.
    <br />
    Your Android app.
    <span className="mt-2 block text-blue-600">
      Built in minutes.
    </span>
  </h1>

  <p className="mt-2 max-w-xl text-xs leading-6 text-slate-800 sm:mt-6 sm:text-base sm:leading-7">
    Transform your website into an Android application.
    Customize the app name and icon, then generate APK
    and AAB packages using your Android build engine.
  </p>

  <div className="mt-3 flex flex-wrap gap-3 sm:mt-8">
    <a
      href="#converter"
      className="inline-flex min-h-8 items-center justify-center gap-2 bg-blue-600 px-5 text-xs font-bold text-white transition hover:bg-blue-700 sm:min-h-12 sm:gap-3 sm:px-6 sm:text-sm"
    >
      Build your app
      <ArrowRight size={17} />
    </a>

    <a
      href="#how-it-works"
      className="inline-flex min-h-8 items-center justify-center border border-slate-300 bg-white px-5 text-xs font-bold text-slate-800 transition hover:border-blue-500 hover:text-blue-700 sm:min-h-12 sm:px-6 sm:text-sm"
    >
      How it works
    </a>
  </div>

  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-slate-600 sm:mt-8">
    <span className="flex items-center gap-2">
      <CheckCircle2 size={15} className="text-blue-600" />
      Custom app identity
    </span>

    <span className="flex items-center gap-2">
      <CheckCircle2 size={15} className="text-blue-600" />
      APK + AAB output
    </span>
  </div>
</div>

    {/* Right Column: Phone Mockup Preview */}
   <div className="relative items-center justify-center hidden md:flex">
  
  {/* Background Glow Effect (yeh bhi md: se control ho sakta hai, 
      lekin ise rehne dete hain taaki screen resize hone par turant appear ho) */}
  <div className="absolute inset-0 bg-linear-to-r from-blue-100 to-indigo-50 opacity-60 rounded-3xl -z-10 blur-xl" />

  {/* Responsive Image container */}
  <div className="w-full max-w-xl flex justify-center">
    <img 
      src={PhoneImage} 
      alt="WebToApp Android Converter Mockup" 
      className="w-full h-auto object-contain drop-shadow-2xl"
    />
  </div>
</div>

  </div>
</section>

        {/* Converter */}
        <section
          id="converter"
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        >
          <div className="mb-8 max-w-2xl">
            <SectionLabel>Android build workspace</SectionLabel>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Create your application
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Enter your website details, customize the identity
              and start the build.
            </p>
          </div>

          <div className="grid items-start border border-slate-200 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left */}
            <div className="min-w-0 p-5 sm:p-8 lg:border-r lg:border-slate-200">
              <div className="mb-8 flex items-center gap-2">
                {["Website", "Customize", "Build", "Download"].map(
                  (item, index) => {
                    const stepNumber = index + 1;
                    const active = currentStep >= stepNumber;

                    return (
                      <div
                        key={item}
                        className="flex min-w-0 flex-1 items-center gap-2"
                      >
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center border text-xs font-bold ${
                            active
                              ? "border-blue-600 bg-blue-600 text-white"
                              : "border-slate-200 bg-white text-slate-400"
                          }`}
                        >
                          {phase !== "form" && currentStep > stepNumber ? (
                            <Check size={14} />
                          ) : (
                            `0${stepNumber}`
                          )}
                        </div>

                        <span
                          className={`hidden text-xs font-semibold xl:block ${
                            active ? "text-slate-900" : "text-slate-400"
                          }`}
                        >
                          {item}
                        </span>
                      </div>
                    );
                  }
                )}
              </div>

              {phase === "form" && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="border-b border-slate-200 pb-5">
                    <h3 className="text-lg font-bold">
                      App configuration
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Fields marked with * are required.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="website-url"
                      className="mb-2 block text-sm font-bold"
                    >
                      Website URL <span className="text-blue-600">*</span>
                    </label>

                    <div className="relative">
                      <Globe
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="website-url"
                        type="text"
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                        placeholder="https://yourwebsite.com"
                        className="h-12 w-full border border-slate-300 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="app-name"
                      className="mb-2 flex items-center justify-between text-sm font-bold"
                    >
                      <span>
                        App name <span className="text-blue-600">*</span>
                      </span>

                      <span className="text-xs font-normal text-slate-400">
                        {appName.length}/50
                      </span>
                    </label>

                    <input
                      id="app-name"
                      type="text"
                      value={appName}
                      onChange={(event) => setAppName(event.target.value)}
                      placeholder="My Awesome App"
                      maxLength={50}
                      className="h-12 w-full border border-slate-300 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-bold">
                      App icon
                    </label>

                    <LogoUpload
                      logo={logo}
                      preview={logoPreview}
                      onChange={handleLogoChange}
                      onRemove={removeLogo}
                    />

                    <p className="mt-2 text-xs text-slate-500">
                      PNG, JPG or WebP. Maximum 5 MB.
                    </p>
                  </div>

                  <label className="flex cursor-pointer gap-3 border border-slate-200 p-4 transition hover:border-blue-300">
                    <input
                      type="checkbox"
                      checked={permission}
                      onChange={(event) =>
                        setPermission(event.target.checked)
                      }
                      className="mt-1 h-4 w-4 accent-blue-600"
                    />

                    <div>
                      <p className="flex flex-wrap items-center gap-2 text-sm font-bold">
                        <LockKeyhole
                          size={15}
                          className="text-blue-700"
                        />
                        I own this website or have permission
                      </p>

                      <p className="mt-2 text-xs leading-5 text-slate-600">
                        Confirm you have the right to package this
                        website as an Android application.
                      </p>
                    </div>
                  </label>

                  {error && (
                    <div
                      role="alert"
                      className="flex gap-3 border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
                    >
                      <CircleAlert size={18} className="mt-0.5 shrink-0" />
                      <p>{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex min-h-12 w-full items-center justify-center gap-3 bg-blue-600 px-5 py-4 text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <LoaderCircle size={18} className="animate-spin" />
                        {analyzing
                          ? "Analyzing website..."
                          : "Starting build..."}
                      </>
                    ) : (
                      <>
                        <Rocket size={18} />
                        Convert to Android App
                        <ArrowRight size={17} />
                      </>
                    )}
                  </button>

                  <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Check size={14} className="text-blue-700" />
                      APK output
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Check size={14} className="text-blue-700" />
                      AAB output
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Check size={14} className="text-blue-700" />
                      Custom icon
                    </span>
                  </div>
                </form>
              )}

              {phase === "building" && (
                <BuildProgress
                  progress={progress}
                  message={message}
                  status="building"
                />
              )}

              {phase === "ready" && (
                <div>
                  <div className="mb-6 flex items-start gap-4 border-b border-slate-200 pb-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-emerald-200 bg-emerald-50 text-emerald-700">
                      <CheckCircle2 size={27} />
                    </div>

                    <div>
                      <h3 className="text-xl font-black">
                        Build completed
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Your Android packages are ready.
                      </p>
                    </div>
                  </div>

                  <DownloadCard
                    buildId={buildId}
                    apkUrl={apkUrl}
                    aabUrl={aabUrl}
                  />

                  <button
                    type="button"
                    onClick={resetConverter}
                    className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 border border-slate-300 bg-white px-4 text-sm font-bold transition hover:border-blue-600 hover:text-blue-700"
                  >
                    <Rocket size={17} />
                    Build another application
                  </button>
                </div>
              )}
            </div>

            {/* Right */}
            <aside className="min-w-0 border-t border-slate-200 bg-slate-50 p-5 sm:p-8 lg:border-l-0 lg:border-t-0">
              {phase === "building" ? (
                <BuildPreview progress={progress} message={message} />
              ) : phase === "ready" ? (
                <div className="border border-slate-200 bg-white p-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2
                      size={25}
                      className="text-emerald-600"
                    />

                    <div>
                      <h3 className="text-base font-bold">
                        Your files are ready
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Download your generated packages.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <a
                      href={apkUrl}
                      className="flex items-center gap-3 border border-slate-200 p-4 transition hover:border-blue-400"
                    >
                      <Smartphone size={22} className="text-blue-700" />

                      <div className="flex-1">
                        <p className="text-sm font-bold">Download APK</p>
                        <p className="mt-1 text-xs text-slate-500">
                          Android installation file
                        </p>
                      </div>

                      <Download size={18} className="text-blue-700" />
                    </a>

                    <a
                      href={aabUrl}
                      className="flex items-center gap-3 border border-slate-200 p-4 transition hover:border-blue-400"
                    >
                      <Package size={22} className="text-blue-700" />

                      <div className="flex-1">
                        <p className="text-sm font-bold">Download AAB</p>
                        <p className="mt-1 text-xs text-slate-500">
                          Android App Bundle
                        </p>
                      </div>

                      <Download size={18} className="text-blue-700" />
                    </a>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-7 border-b border-slate-200 pb-5">
                    <SectionLabel>Simple workflow</SectionLabel>

                    <h3 className="mt-3 text-xl font-black">
                      From website to app
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Follow these steps to generate your Android packages.
                    </p>
                  </div>

                  <Step
                    number="01"
                    title="Enter website details"
                    description="Add your website URL and choose the app name."
                  />

                  <Step
                    number="02"
                    title="Customize the identity"
                    description="Upload a logo and confirm website authorization."
                  />

                  <Step
                    number="03"
                    title="Generate Android files"
                    description="The backend runs the Android build process."
                  />

                  <Step
                    number="04"
                    title="Download your packages"
                    description="Get the APK and AAB when the build finishes."
                    last
                  />

                  <div className="mt-2 border border-blue-200 bg-white p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center bg-blue-50 text-blue-700">
                        <ShieldCheck size={21} />
                      </div>

                      <h4 className="text-sm font-bold">
                        Built around your website
                      </h4>
                    </div>

                    <p className="mt-3 text-xs leading-6 text-slate-600">
                      Your app displays your website inside an Android
                      application. Website compatibility and certain
                      native features depend on the site and build setup.
                    </p>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-y border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="mb-8">
              <SectionLabel>Why use the converter?</SectionLabel>

              <h2 className="mt-3 text-2xl font-black sm:text-3xl">
                Everything in one workflow
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Feature
                icon={Smartphone}
                title="Android application"
                description="Create an Android project that loads your website."
              />

              <Feature
                icon={Package}
                title="Two build formats"
                description="Generate an APK for installation and an AAB for publishing workflows."
              />

              <Feature
                icon={ShieldCheck}
                title="Permission first"
                description="Confirm that you are authorized to package the website."
              />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <SectionLabel>How it works</SectionLabel>

              <h2 className="mt-3 text-3xl font-black">
                A straightforward build process
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600">
                Enter your website information, let the build engine
                prepare the Android project, then download the generated files.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Feature
                icon={Globe}
                title="Website URL"
                description="Start with a publicly accessible website."
              />

              <Feature
                icon={Sparkles}
                title="App identity"
                description="Set the app name and upload a logo."
              />

              <Feature
                icon={Zap}
                title="Build engine"
                description="Compile the Android project and packages."
              />

              <Feature
                icon={Download}
                title="Downloads"
                description="Access the generated APK and AAB files."
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center bg-blue-600">
              <Code2 size={20} />
            </div>

            <span className="text-base font-black tracking-tight">
              Web<span className="text-blue-400">ToApp</span>
            </span>
          </a>

          <p className="text-xs leading-5 text-slate-400">
            Website to Android application builder.
          </p>

          <a
            href="#converter"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-300 hover:text-white"
          >
            Start building
            <ArrowRight size={16} />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Home;

