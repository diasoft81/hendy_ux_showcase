# Hendy UX Showcase

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Tech: Multi-Stack](https://img.shields.io/badge/Tech-Vanilla%20JS%20%7C%20React%20%7C%20Blazor-blueviolet.svg)
![Focus: UX](https://img.shields.io/badge/Focus-User%20Experience-orange.svg)
![Owner: diasoft81](https://img.shields.io/badge/GitHub-diasoft81-lightgrey.svg)

A personal frontend engineering showcase featuring multiple implementations (Vanilla JS, React, and Blazor WASM) of clean, user-focused UI/UX for interacting with public RESTful APIs.

---

## 🗂 Project Structure

```
/hendy_ux_showcase
├── vanilla_js/     # Pure HTML/CSS/JS version (no frameworks)
├── react_demo/     # Future implementation using React
└── blazor_demo/    # Future implementation using Blazor WebAssembly
```

Each folder demonstrates the same frontend logic and interface goal, built with different technologies for cross-stack comparison and skill showcasing.

---

## 🌐 Use Case – JSONPlaceholder API

All implementations consume data from the free fake REST API:  
📎 https://jsonplaceholder.typicode.com

### Endpoint Used

**Posts:**  
`GET https://jsonplaceholder.typicode.com/posts`

Each post has the following structure:

```json
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati",
  "body": "quia et suscipit suscipit recusandae consequuntur..."
}
```

### Additional Data for Bonus Feature

Each post can also return comments:  
`GET https://jsonplaceholder.typicode.com/posts/{postId}/comments`

Example structure for comments:

```json
{
  "postId": 1,
  "id": 1,
  "name": "commenter name",
  "email": "commenter@example.com",
  "body": "comment content..."
}
```

---

## ✨ Featured UX Tasks

### ✅ Vanilla JS Version
Located in `/vanilla_js/`, includes:
- Search & highlight posts containing the word `"rerum"` in `body`
- Table rendering from REST API
- Bonus: On-click show post’s comments
- Summary reports:
  - Total posts with `"rerum"` in body
  - Count of posts per `userId`

---
#### ✨ Features

##### Page 1 – Post Viewer
- Fetch and display posts from `/posts` endpoint.
- Search posts by keyword (real-time filtering).
- Highlight rows containing the word `"rerum"` in the `body`.
- Bonus: Clickable posts to fetch and show related `/comments`.

##### Page 2 – Reports Dashboard
- Report #1: Count of posts containing `"rerum"` in `body`.
- Report #2: Posts count by User ID in a responsive table.

#### 🎨 Tech Stack

- **HTML5 + CSS3**
- **Vanilla JavaScript (ES6+)**
- **Bootstrap 5** for responsive and elegant UI
- **Fetch API** for REST calls

#### 🧠 Architecture & Best Practices

- Clean separation of logic and presentation (modular functions).
- Responsive and accessible UX.
- No external table libraries (as per requirements).
- Fully commented and maintainable code structure.
- Scalable for future enhancements (e.g. other APIs, frameworks, etc.)

#### 🧪 How to Run (Vanilla JS Version)

1. **Clone the repository**

```bash
git clone https://github.com/diasoft81/hendy_ux_showcase.git
cd hendy_ux_showcase/vanilla_js
```

2. **Open with VS Code or your favorite editor**

```bash
code .
```

3. **Open the `index.html` file in your browser**

- You can open `index.html` directly by right-clicking → `Open with Live Server` (recommended if using VS Code with Live Server extension), or just open it from file explorer.

4. **Done!**

No build tools or dependencies required.

---

## 📜 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 🙌 Author

Built with ❤️ by [Hendy Wibowo](https://github.com/diasoft81)
