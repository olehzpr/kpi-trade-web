import Image from "next/image";

export default function KpiTradeLogo() {
  return (
    <div className="flex gap-1">
      <Image
        src="/kpi-trade-logo.jpg"
        width={100}
        height={100}
        alt="Kpi Trade Logo"
        className="h-11 w-auto"
      />
      <div className="flex flex-col justify-between text-foreground">
        <span className="font-medium text-xl leading-none">KPI</span>
        <span className="font-bold text-2xl leading-none">Trade</span>
      </div>
    </div>
  );
}
