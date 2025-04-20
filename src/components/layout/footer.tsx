import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function AppFooter() {
  return (
    <footer className="w-full p-2 py-6 bg-white shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-sm text-gray-600">
        <div className="font-bold text-xl text-foreground w-full sm:w-auto text-center">
          KPI Trade
        </div>
        <Separator className="sm:hidden my-2" />
        <div className="flex flex-col sm:flex-row flex-wrap sm:items-center gap-4">
          <Link
            href="/terms"
            className="text-blue-600 hover:underline flex items-center gap-1"
          >
            <ChevronRight className="sm:hidden" /> Умови користування
          </Link>
          <Link
            href="/privacy"
            className="text-blue-600 hover:underline flex items-center gap-1"
          >
            <ChevronRight className="sm:hidden" /> Політика конфіденційності
          </Link>
          <a
            href="/https://t.me/kpi_trade"
            rel="noopener noreferrer"
            target="_blank"
            className="text-blue-600 hover:underline flex items-center gap-1"
          >
            <ChevronRight className="sm:hidden" /> Телеграм
          </a>
          <a
            href="https://t.me/kpitrade_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline flex items-center gap-1"
          >
            <ChevronRight className="sm:hidden" /> Зворотній звʼязок
          </a>
        </div>
      </div>
    </footer>
  );
}
