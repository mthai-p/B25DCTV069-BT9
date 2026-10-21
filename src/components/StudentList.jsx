export default function StudentList({ items, onRemove, keyword }) {
  if (items.length === 0)
    return (
      <p className="muted">
        {keyword ? `Không tìm thấy sinh viên “${keyword}”` : "Chưa có sinh viên"}
      </p>
    );

  return (
    <ul className="list">
      {items.map((sv) => (
        <li key={sv.id}>
          <span>
            <strong>{sv.name}</strong> – {sv.major} · GPA {sv.gpa}
            <br />
            <small className="muted">{sv.email}</small>
          </span>
          <button className="btn btn-danger" onClick={() => onRemove(sv)}>
            Xóa
          </button>
        </li>
      ))}
    </ul>
  );
}
