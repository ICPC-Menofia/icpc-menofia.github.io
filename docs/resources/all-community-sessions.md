<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Community Sessions Overview</title>
    <style>
        table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            background-color: white;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 40px;
        }

        th, td {
            padding: 15px 20px;
            text-align: left;
        }

        th {
            background-color: #f0f4f8;
            color: #2c3e50;
            font-weight: 600;
            border-bottom: 2px solid #e0e6ed;
        }

        tr:not(:last-child) {
            border-bottom: 1px solid #eaecef;
        }

        tr:hover {
            background-color: #f8faff;
        }

        a {
            color: #0077cc;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        .coach-section {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
        }

        .coach-section ul {
            list-style: none;
            padding-left: 0;
        }

        .coach-section li {
            margin-bottom: 15px;
        }

        .coach-section strong {
            display: block;
            margin-bottom: 5px;
        }
    </style>
</head>
<body>

    <h1>Community Sessions Overview</h1>

    <table>
        <thead>
            <tr>
                <th>Session Topic</th>
                <th>Training Level</th>
                <th>Coach</th>
                <th>Recording / Material</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Binary Search</td>
                <td>Level 1</td>
                <td><a href="#coach-ahmed">Ahmed Samir</a></td>
                <td><a href="https://example.com/binary-search">View</a></td>
            </tr>
            <tr>
                <td>DFS & BFS</td>
                <td>Level 2</td>
                <td><a href="#coach-khaled">Mohamed Khaled</a></td>
                <td><a href="https://example.com/dfs-bfs">View</a></td>
            </tr>
            <tr>
                <td>Math for CP</td>
                <td>Newcomer</td>
                <td><a href="#coach-amira">Amira Yehia</a></td>
                <td><a href="https://example.com/math-cp">View</a></td>
            </tr>
            <!-- Add more rows here -->
        </tbody>
    </table>

    <h2>Coach References</h2>
    <div class="coach-section">
        <ul>
            <li id="coach-ahmed">
                <strong>Ahmed Samir</strong>
                <a href="https://linkedin.com/in/ahmed-samir" target="_blank">LinkedIn</a> |
                <a href="https://github.com/ahmed-samir" target="_blank">GitHub</a> |
                <a href="https://codeforces.com/profile/ahmed_samir" target="_blank">Codeforces</a>
            </li>
            <li id="coach-khaled">
                <strong>Mohamed Khaled</strong>
                <a href="https://linkedin.com/in/mohamed-khaled" target="_blank">LinkedIn</a> |
                <a href="https://github.com/mohamed-khaled" target="_blank">GitHub</a> |
                <a href="https://codeforces.com/profile/mohamed_khaled" target="_blank">Codeforces</a>
            </li>
            <li id="coach-amira">
                <strong>Amira Yehia</strong>
                <a href="https://linkedin.com/in/amira-yehia" target="_blank">LinkedIn</a> |
                <a href="https://github.com/amira-yehia" target="_blank">GitHub</a> |
                <a href="https://codeforces.com/profile/amira_yehia" target="_blank">Codeforces</a>
            </li>
        </ul>
    </div>

</body>
</html>
