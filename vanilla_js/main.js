const isPostsPage = location.pathname.includes("posts.html");
const isReportsPage = location.pathname.includes("reports.html");
const API_URL = "https://jsonplaceholder.typicode.com/posts";

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    if (isPostsPage) renderPosts(data);
    else if (isReportsPage) renderReports(data);
});

function renderPosts(posts) {
  const searchInput = document.getElementById("search");
  const tableBody = document.getElementById("posts-table");

  function render(filteredPosts) {
    tableBody.innerHTML = "";
    filteredPosts.forEach(post => {
      const tr = document.createElement("tr");
      if (post.body.includes("rerum")) tr.classList.add("rerum-highlight");
      tr.setAttribute("data-bs-toggle", "tooltip");
      tr.setAttribute("data-bs-html", "true");
      tr.setAttribute("data-bs-placement", "top");
      tr.setAttribute("title", "Loading comments...");

      fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
        .then(res => res.json())
        .then(comments => {
          const commentHtml = comments.map(c => `<strong>${c.email}:</strong> ${c.body}`).slice(0, 3).join("<br>");
          tr.setAttribute("title", commentHtml);
          new bootstrap.Tooltip(tr); // re-init tooltip
        });

      tr.innerHTML = `<td>${post.userId}</td><td>${post.title}</td><td>${post.body}</td>`;
      tableBody.appendChild(tr);
    });
  }

  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const filtered = posts.filter(p => 
      p.title.toLowerCase().includes(keyword) || 
      p.body.toLowerCase().includes(keyword));
    render(filtered);
  });

  render(posts);
}

function renderReports(posts) {
  const rerumCount = posts.filter(p => p.body.includes("rerum")).length;
  document.getElementById("rerum-count").textContent = `Posts containing "rerum": ${rerumCount}`;

  const userMap = {};
  posts.forEach(p => {
    userMap[p.userId] = (userMap[p.userId] || 0) + 1;
  });

  const tableBody = document.getElementById("user-counts");
  Object.entries(userMap).forEach(([uid, count]) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${uid}</td><td>${count}</td>`;
    tableBody.appendChild(tr);
  });
}
