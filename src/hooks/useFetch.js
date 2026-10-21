import { useEffect, useState } from "react";

// Custom hook: tải dữ liệu từ url, trả về đủ 3 trạng thái data / loading / error
export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0); // đổi số này => tải lại

  useEffect(() => {
    let ignore = false; // tránh setState khi component đã gỡ / url đã đổi

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!ignore) setData(json);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();

    return () => {
      ignore = true; // cleanup
    };
  }, [url, reloadKey]);

  const refetch = () => setReloadKey((k) => k + 1);

  // setData được trả ra để cha cập nhật danh sách sau khi thêm/xóa
  return { data, setData, loading, error, refetch };
}
