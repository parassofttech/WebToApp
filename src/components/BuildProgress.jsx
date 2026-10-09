import {
  Check,
  CheckCircle2,
  Circle,
  Loader2,
  Terminal,
  XCircle,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Preparing project",
    description: "Creating Android project",
  },
  {
    id: 2,
    title: "Configuring app",
    description: "Applying name and package",
  },
  {
    id: 3,
    title: "Generating icon",
    description: "Creating launcher assets",
  },
  {
    id: 4,
    title: "Building APK",
    description: "Compiling Android application",
  },
  {
    id: 5,
    title: "Building AAB",
    description: "Creating Play Store bundle",
  },
  {
    id: 6,
    title: "Finalizing",
    description: "Preparing your downloads",
  },
];

function StepIcon({ status }) {
  if (status === "completed") {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
        <Check size={15} />
      </div>
    );
  }

  if (status === "running") {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20">
        <Loader2
          size={15}
          className="animate-spin"
        />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-400">
        <XCircle size={16} />
      </div>
    );
  }

  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/2.5 text-slate-700">
      <Circle size={15} />
    </div>
  );
}

export default function BuildProgress({
  progress = 0,
  message = "Preparing...",
  status = "building",
}) {
  const currentStep = Math.min(
    6,
    Math.max(1, Math.ceil(progress / 16.67))
  );

  return (
    <div>
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20">
          <Terminal size={27} />
        </div>

        <h2 className="text-2xl font-bold">
          Building your app
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          {message}
        </p>
      </div>

      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Build progress
          </span>

          <span className="font-bold text-indigo-300">
            {Math.round(progress)}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-900">
          <div
            className="relative h-full rounded-full bg-linear-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-all duration-700"
            style={{
              width: `${Math.min(
                100,
                Math.max(0, progress)
              )}%`,
            }}
          >
            <div className="absolute right-0 top-0 h-full w-16 bg-white/20 blur-sm" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.07] bg-black/10 p-3">
        {steps.map((step, index) => {
          let stepStatus = "pending";

          if (
            status === "failed" &&
            step.id === currentStep
          ) {
            stepStatus = "failed";
          } else if (step.id < currentStep) {
            stepStatus = "completed";
          } else if (step.id === currentStep) {
            stepStatus = "running";
          }

          return (
            <div key={step.id}>
              <div className="flex items-center gap-3 rounded-xl px-3 py-3">
                <StepIcon status={stepStatus} />

                <div className="min-w-0 flex-1">
                  <div
                    className={`text-sm font-semibold ${
                      stepStatus === "pending"
                        ? "text-slate-600"
                        : "text-slate-200"
                    }`}
                  >
                    {step.title}
                  </div>

                  <div className="mt-0.5 text-[11px] text-slate-600">
                    {step.description}
                  </div>
                </div>

                {stepStatus === "completed" && (
                  <CheckCircle2
                    size={16}
                    className="text-emerald-500/70"
                  />
                )}

                {stepStatus === "running" && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400">
                    Running
                  </span>
                )}
              </div>

              {index < steps.length - 1 && (
                <div className="ml-7 h-px bg-white/[0.035]" />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-slate-600">
        <Loader2 size={11} className="animate-spin" />
        Please keep this page open while the build is running.
      </div>
    </div>
  );
}