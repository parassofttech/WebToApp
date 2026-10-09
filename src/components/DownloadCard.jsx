import {
  CheckCircle2,
  Download,
  FileArchive,
  Smartphone,
} from "lucide-react";

export default function DownloadCard({
  buildId,
  apkUrl,
  aabUrl,
}) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <a
          href={apkUrl}
          download
          className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/2.5 p-5 transition duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-indigo-500/[0.035]"
        >
          <div className="absolute -right-7.5 -top-7.5 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl transition group-hover:bg-indigo-500/20" />

          <div className="relative flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <Smartphone size={21} />
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-600 transition group-hover:border-indigo-500/20 group-hover:text-indigo-400">
              <Download size={15} />
            </div>
          </div>

          <div className="relative mt-5">
            <div className="text-sm font-bold">
              Android APK
            </div>

            <div className="mt-1 text-xs leading-5 text-slate-600">
              Install directly on your Android device.
            </div>

            <div className="mt-4 text-xs font-semibold text-indigo-400">
              Download APK →
            </div>
          </div>
        </a>

        <a
          href={aabUrl}
          download
          className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/2.5 p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:bg-violet-500/[0.035]"
        >
          <div className="absolute -right-7.5 -top-7.5 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl transition group-hover:bg-violet-500/20" />

          <div className="relative flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
              <FileArchive size={21} />
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-600 transition group-hover:border-violet-500/20 group-hover:text-violet-400">
              <Download size={15} />
            </div>
          </div>

          <div className="relative mt-5">
            <div className="text-sm font-bold">
              Android AAB
            </div>

            <div className="mt-1 text-xs leading-5 text-slate-600">
              Upload directly to Google Play Console.
            </div>

            <div className="mt-4 text-xs font-semibold text-violet-400">
              Download AAB →
            </div>
          </div>
        </a>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-emerald-500/10 bg-emerald-500/2.5 px-4 py-3">
        <CheckCircle2
          size={16}
          className="shrink-0 text-emerald-400"
        />

        <div className="min-w-0 flex-1 text-xs text-slate-500">
          Build completed successfully.
        </div>

        <div className="hidden max-w-37.5 truncate font-mono text-[9px] text-slate-700 sm:block">
          {buildId}
        </div>
      </div>
    </div>
  );
}