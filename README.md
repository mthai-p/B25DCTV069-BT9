# Quản lý sinh viên (Hooks) – LTW Bài 9

Viết lại bài Buổi 8 bằng Function Component + Hooks (không còn Class).

## Chạy dự án
1. Vào https://mockapi.io → tạo project → tạo resource **students** với các trường:
   `name` (string), `email` (string), `major` (string), `gpa` (number).
2. Sao chép Endpoint, ví dụ `https://xxxx.mockapi.io/api/v1/students`.
3. Đổi tên `.env.example` → `.env`, dán Endpoint vào `VITE_API_URL`.
4. `npm install` rồi `npm run dev`.

## Đối chiếu tiêu chí
| Yêu cầu | Nằm ở đâu |
|---|---|
| Viết lại bằng Hooks | `App.jsx`, `StudentForm.jsx`, `StudentList.jsx` – toàn Function Component |
| Dữ liệu từ mockapi qua `useFetch` | `hooks/useFetch.js`, dùng trong `App.jsx` |
| Đủ 3 trạng thái tải | `loading` / `error` (có nút Thử lại) / dữ liệu – `App.jsx` |
| Effect có deps đúng | `useFetch` `[url, reloadKey]`, `useDebounce` `[value, delay]`, `ThemeContext` `[theme]`, focus `[]` |
| ThemeContext sáng/tối | `context/ThemeContext.jsx`, `ThemeToggle.jsx`, biến CSS trong `App.css` |
| Bài tập thêm của Buổi 8 | Tìm theo tên (debounce), GPA 0–4, xóa có xác nhận |

## Gợi ý 3 commit
1. `init: vite + useFetch + hiển thị danh sách từ mockapi`
2. `feat: StudentForm (validate), thêm/xóa sinh viên`
3. `feat: ThemeContext sáng/tối, tìm kiếm debounce`
