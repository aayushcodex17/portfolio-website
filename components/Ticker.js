import { ticker } from "@/data/portfolio";

function Items({ copy }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={copy || undefined}>
      {ticker.map((item) => (
        <li key={item.symbol} className="flex items-center gap-2 px-5 font-mono text-xs whitespace-nowrap">
          <span className="text-muted-fg">{item.symbol}</span>
          <span className="font-medium text-fg">{item.value}</span>
          {item.dir && <span className="text-[10px] text-accent">{item.dir === "up" ? "▲" : "▼"}</span>}
          <span className="pl-3 text-line" aria-hidden="true">
            /
          </span>
        </li>
      ))}
    </ul>
  );
}

// Stock-ticker strip of resume highlights; the list is doubled so the loop is seamless.
export default function Ticker() {
  return (
    <div className="ticker flex overflow-hidden border-t border-dashed border-line py-2.5 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div className="ticker-track flex w-max">
        <Items />
        <Items copy />
      </div>
    </div>
  );
}
