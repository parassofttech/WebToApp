import {
  CheckCircle2,
  ImagePlus,
  Trash2,
  UploadCloud,
} from "lucide-react";

export default function LogoUpload({
  logo,
  preview,
  onChange,
  onRemove,
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700">
          App Logo
        </label>

        <span className="text-[10px] text-slate-600">
          PNG / JPG / WebP · Max 5 MB
        </span>
      </div>

      {!logo ? (
        <label className="group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/10 bg-black/20 px-5 py-8 transition hover:border-indigo-500/40 hover:bg-indigo-500/25">
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];

              if (file) {
                onChange(file);
              }
            }}
          />

          <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
            <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
          </div>

          <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/4 text-slate-500 transition group-hover:border-indigo-500/20 group-hover:bg-indigo-500/10 group-hover:text-indigo-400">
            <ImagePlus size={25} />
          </div>

          <div className="relative text-sm font-semibold text-slate-800">
            Upload app icon
          </div>

          <div className="relative mt-1 text-xs text-slate-600">
            Recommended 1024 × 1024
          </div>

          <div className="relative mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3.5 py-2 text-xs font-medium text-slate-700 transition group-hover:border-indigo-500/20 group-hover:text-indigo-300">
            <UploadCloud size={14} />
            Choose image
          </div>
        </label>
      ) : (
        <div className="flex items-center gap-4 rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.035] p-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-lg">
            {preview && (
              <img
                src={preview}
                alt="App logo preview"
                className="h-full w-full object-cover"
              />
            )}

            <div className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
              <CheckCircle2 size={12} />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-slate-200">
              {logo.name}
            </div>

            <div className="mt-1 text-xs text-slate-600">
              {(logo.size / 1024).toFixed(1)} KB
            </div>

            <div className="mt-2 text-[10px] uppercase tracking-wider text-emerald-400">
              Logo ready
            </div>
          </div>

          <button
            type="button"
            onClick={onRemove}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 text-slate-500 transition hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
