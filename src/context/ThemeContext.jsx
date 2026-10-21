import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext({ theme: "light", toggle: () => {} });

export function ThemeProvider({ children }) {
  // Đọc lại lựa chọn lần trước (nếu có)
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  // Effect có deps [theme]: đồng bộ ra <html data-theme> và localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook tiện dụng để các component gọi gọn: const { theme, toggle } = useTheme();
export const useTheme = () => useContext(ThemeContext);
