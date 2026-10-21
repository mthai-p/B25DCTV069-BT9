import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button type="button" className="btn btn-ghost" onClick={toggle}>
      {theme === "light" ? "🌙 Tối" : "☀️ Sáng"}
    </button>
  );
}
