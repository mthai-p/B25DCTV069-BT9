import { useMemo, useState } from "react";
import useFetch from "./hooks/useFetch";
import useDebounce from "./hooks/useDebounce";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import ThemeToggle from "./components/ThemeToggle";

const API = import.meta.env.VITE_API_URL;

export default function App() {
  const { data: students, setData, loading, error, refetch } = useFetch(API);
  const [keyword, setKeyword] = useState("");
  const debounced = useDebounce(keyword, 300);
  const [actionError, setActionError] = useState(null);

  // Thêm: POST lên mockapi, thành công thì cập nhật state (dạng hàm, tạo mảng mới)
  const add = async (sv) => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sv),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const created = await res.json();
    setData((prev) => [...prev, created]);
  };

  // Xóa có hỏi xác nhận
  const remove = async (sv) => {
    if (!window.confirm(`Xóa sinh viên "${sv.name}"?`)) return;
    setActionError(null);
    try {
      const res = await fetch(`${API}/${sv.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setData((prev) => prev.filter((s) => s.id !== sv.id));
    } catch (err) {
      setActionError(err.message);
    }
  };

  // Lọc theo tên (giá trị suy ra từ state, không cần state riêng)
  const filtered = useMemo(
    () =>
      students.filter((s) =>
        s.name.toLowerCase().includes(debounced.trim().toLowerCase())
      ),
    [students, debounced]
  );

  return (
    <div className="container">
      <header className="top">
        <h1>Quản lý sinh viên</h1>
        <ThemeToggle />
      </header>

      {!API && (
        <p className="error">
          Chưa cấu hình VITE_API_URL. Xem README để tạo mockapi và file .env.
        </p>
      )}

      <StudentForm onAdd={add} />

      <section className="card">
        <h2>Danh sách ({filtered.length})</h2>
        <input
          className="search"
          placeholder="Tìm theo tên..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        {/* Đủ 3 trạng thái: loading / error / có dữ liệu */}
        {loading && <p className="muted">Đang tải...</p>}
        {error && (
          <p className="error">
            Lỗi: {error}{" "}
            <button className="btn btn-ghost" onClick={refetch}>
              Thử lại
            </button>
          </p>
        )}
        {actionError && <p className="error">Lỗi khi xóa: {actionError}</p>}
        {!loading && !error && (
          <StudentList items={filtered} onRemove={remove} keyword={debounced} />
        )}
      </section>
    </div>
  );
}
