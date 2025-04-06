import React from "react";
import { Button } from "../ui/button";

export default function AppHeader() {
  return (
    <div className="w-full p-2 flex justify-center shadow-md">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="container text-2xl text-blue-500 font-bold">
            Kpi trade
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary">Увійти</Button>
        </div>
      </div>
    </div>
  );
}
