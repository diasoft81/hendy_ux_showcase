const isPostsPage = location.pathname.includes("posts.html");
const isReportsPage = location.pathname.includes("reports.html");
const API_URL = "https://jsonplaceholder.typicode.com/posts";
let allPosts = [];
let filteredPosts = [];
let currentIndex = 0;

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    allPosts = data;
    filteredPosts = [...allPosts];
    if (isPostsPage) {
      renderPosts(filteredPosts.slice(0, 10));
      currentIndex = 10;
    } else if (isReportsPage) {
      renderReports(allPosts);
    }
});

function renderPosts(postsSubset) {
  const searchInput = document.getElementById("search");
  const tableBody = document.getElementById("posts-table");
  const loadMoreBtn = document.getElementById("load-more");
  const commentPanel = document.getElementById("comment-panel");
  const commentBody = commentPanel.querySelector(".body");
  const highlightToggle = document.getElementById("toggle-highlight");

  function render(posts) {
    tableBody.innerHTML = "";
    posts.forEach(post => {
      const tr = document.createElement("tr");
      if (highlightToggle.checked && post.body.includes("rerum")) {
        tr.classList.add("rerum-highlight");
      }

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

  function filterAndRender() {
    const keyword = searchInput.value.toLowerCase();
    filteredPosts = allPosts.filter(p =>
      p.title.toLowerCase().includes(keyword) ||
      p.body.toLowerCase().includes(keyword)
    );
    currentIndex = 10;
    render(filteredPosts.slice(0, currentIndex));
    loadMoreBtn.style.display = currentIndex < filteredPosts.length ? "block" : "none";
  }

  searchInput.addEventListener("input", filterAndRender);
  highlightToggle.addEventListener("change", () => {
    render(filteredPosts.slice(0, currentIndex));
  });

  loadMoreBtn.addEventListener("click", () => {
    currentIndex += 10;
    render(filteredPosts.slice(0, currentIndex));
    if (currentIndex >= filteredPosts.length) {
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
