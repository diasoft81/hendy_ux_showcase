const isPostsPage = location.pathname.includes("posts.html");
const isReportsPage = location.pathname.includes("reports.html");
const API_URL = "https://jsonplaceholder.typicode.com/posts";
let allPosts = [];

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    allPosts = data;
    if (isPostsPage) renderPosts(allPosts.slice(0, 10));
    else if (isReportsPage) renderReports(allPosts);
});

function renderPosts(postsSubset) {
  const searchInput = document.getElementById("search");
  const tableBody = document.getElementById("posts-table");
  const loadMoreBtn = document.getElementById("load-more");
  const commentPanel = document.getElementById("comment-panel");
  const commentBody = commentPanel.querySelector(".body");
  let currentIndex = postsSubset.length;

  function render(posts) {
    posts.forEach(post => {
      const tr = document.createElement("tr");
      if (post.body.includes("rerum")) tr.classList.add("rerum-highlight");

      tr.innerHTML = `
        <td>${post.userId}</td>
        <td>${post.title}</td>
        <td>${post.body}</td>
        <td class="comment-icon" title="View comments">🗨️</td>
      `;

      tr.querySelector(".comment-icon").addEventListener("click", (e) => {
        e.stopPropagation();
        fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
          .then(res => res.json())
          .then(comments => {
            commentBody.innerHTML = comments.map(c => `<p><strong>${c.email}:</strong> ${c.body}</p>`).join("");
            commentPanel.style.display = "flex";
          });
      });

      tr.addEventListener("mouseenter", () => {
        if (!commentPanel.contains(document.activeElement)) {
          commentPanel.style.display = "none";
        }
      });

      tableBody.appendChild(tr);
    });
  }

  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const filtered = allPosts.filter(p =>
      p.title.toLowerCase().includes(keyword) ||
      p.body.toLowerCase().includes(keyword)
    );
    tableBody.innerHTML = "";
    render(filtered.slice(0, currentIndex));
  });

  loadMoreBtn.addEventListener("click", () => {
    const nextPosts = allPosts.slice(currentIndex, currentIndex + 10);
    render(nextPosts);
    currentIndex += 10;
    if (currentIndex >= allPosts.length) {
      loadMoreBtn.style.display = "none";
    }
  });

  document.getElementById("close-comments").addEventListener("click", () => {
    commentPanel.style.display = "none";
  });

  render(postsSubset);
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
