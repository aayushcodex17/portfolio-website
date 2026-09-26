// Renders **bold** and [label](url) inside plain strings from data/portfolio.js.
const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

export function rich(text) {
  return text.split(TOKEN).map((part, i) => {
    if (part.startsWith("**")) {
      return (
        <strong key={i} className="font-medium text-fg">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a key={i} href={link[2]} className="font-medium text-accent underline-offset-4 hover:underline">
          {link[1]}
        </a>
      );
    }
    return part;
  });
}
