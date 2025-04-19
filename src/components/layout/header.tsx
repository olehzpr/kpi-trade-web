import React from "react";
import { Button } from "../ui/button";
import KpiTradeLogo from "@/components/ui/logo";
import Link from "next/link";

export default function AppHeader() {
  return (
    <div className="w-full p-2 flex justify-center shadow-md">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/">
            <KpiTradeLogo />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary">Увійти</Button>
        </div>
      </div>
    </div>
  );
}
