export function Tags({ items }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li key={item} className="rounded-md border border-line px-2 py-0.5 font-mono text-xs text-muted-fg">
          {item}
        </li>
      ))}
    </ul>
  );
}
