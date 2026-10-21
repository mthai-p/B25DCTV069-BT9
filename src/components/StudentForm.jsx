import { useEffect, useRef, useState } from "react";

const MAJORS = ["CNTT", "ATTT", "ĐTVT", "Marketing"];
const EMPTY = { name: "", email: "", major: "CNTT", gpa: "" };

function validate(form) {
  const e = {};
  if (form.name.trim().length < 3) e.name = "Họ tên tối thiểu 3 ký tự";
  if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email không hợp lệ";
  const gpa = Number(form.gpa);
  if (form.gpa === "" || Number.isNaN(gpa) || gpa < 0 || gpa > 4)
    e.gpa = "GPA phải từ 0 đến 4";
  return e;
}

export default function StudentForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const nameRef = useRef(null);

  // Focus ô họ tên khi mở trang
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  // Một hàm cho nhiều ô (state object phải spread, useState không tự gộp)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    setApiError(null);
    try {
      await onAdd({ ...form, name: form.name.trim(), gpa: Number(form.gpa) });
      setForm(EMPTY);
      nameRef.current.focus();
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit} noValidate>
      <h2>Thêm sinh viên</h2>

      <label>
        Họ tên
        <input ref={nameRef} name="name" value={form.name} onChange={handleChange} />
        {errors.name && <p className="error">{errors.name}</p>}
      </label>

      <label>
        Email
        <input name="email" value={form.email} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}
      </label>

      <div className="row">
        <label>
          Ngành
          <select name="major" value={form.major} onChange={handleChange}>
            {MAJORS.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </label>

        <label>
          GPA (0–4)
          <input name="gpa" type="number" step="0.01" value={form.gpa} onChange={handleChange} />
          {errors.gpa && <p className="error">{errors.gpa}</p>}
        </label>
      </div>

      {apiError && <p className="error">Lỗi khi lưu: {apiError}</p>}

      <button className="btn" type="submit" disabled={submitting}>
        {submitting ? "Đang lưu..." : "Thêm"}
      </button>
    </form>
  );
}
