<?php 
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reports</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body class="bg-light">

  
<!-- Top Bar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <span class="navbar-brand mb-0 h1">🔧 JavaScript Development Showcase</span>
  </div>
</nav>

<!-- Status Bar -->
<div class="status-bar text-end px-3 py-2 bg-light border-bottom">
  Status: <span class="text-success">Connected</span> | API: jsonplaceholder.typicode.com
</div>


  <div class="container py-4">
    
<div class="mb-3">
  <a href="../index.html" class="btn btn-secondary">← Back to Home</a>
</div>

    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <h2 class="card-title text-success">📊 Reports</h2>
        <div id="rerum-count" class="alert alert-info mt-3"></div>
      </div>
    </div>
    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title">User Post Count</h5>
        <div class="table-responsive">
          <table class="table table-bordered table-hover align-middle">
            <thead class="table-header-custom">
              <tr><th>User ID</th><th>Post Count</th></tr>
            </thead>
            <tbody id="user-counts"></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <script src="assets/js/main.js"></script>
</body>
</html>
