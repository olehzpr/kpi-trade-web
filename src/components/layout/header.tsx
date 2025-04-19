import React from "react";
import { Button } from "../ui/button";
import KpiTradeLogo from "@/components/ui/logo";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

export default function AppHeader() {
  return (
    <div className="w-full p-2 flex justify-center bg-white shadow-sm shadow-neutral-200 sticky top-0 z-50">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/">
            <KpiTradeLogo />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/products/create">
            <Button className="cursor-pointer">
              Додати товар <PlusIcon />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
