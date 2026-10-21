import { useEffect, useState } from "react";

// Trả về giá trị sau khi người dùng ngừng thay đổi `delay` ms
export default function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t); // gõ tiếp thì hủy lần hẹn trước
  }, [value, delay]);

  return debounced;
}
