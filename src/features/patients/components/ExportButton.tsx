"use client";

import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

interface ExportButtonProps {
  documentTitle?: string;
}

export default function ExportButton({ documentTitle }: ExportButtonProps) {
  const handleExport = () => {
    const prevTitle = document.title;
    if (documentTitle) document.title = documentTitle;
    window.print();
    document.title = prevTitle;
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-lg hover:shadow-blue-300 transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <ArrowDownTrayIcon className="h-5 w-5" />
      Exportar a PDF
    </button>
  );
}
