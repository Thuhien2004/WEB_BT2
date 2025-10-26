document.getElementById("searchForm").addEventListener("submit", function(e){
    e.preventDefault();

    let keyword = document.getElementById("fullnameInput").value.trim();
    if(!keyword) return;

    // Dummy JSON
    let dummyData = [
        {id:1, fullname:"Nguyễn Thị Thu Hiền", email:"thuhienk2k4@gmail.com", created_at:"2025-01-01"},
        {id:2, fullname:"Phương Thu Nguyệt", email:"nguyet@gmail.com", created_at:"2025-01-02"}
      
    ];

    let results = dummyData.filter(u => u.fullname.toLowerCase().includes(keyword.toLowerCase()));

    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if(results.length === 0){
        resultsDiv.innerHTML = "<p>Không tìm thấy kết quả.</p>";
    } else {
        results.forEach(u => {
            let div = document.createElement("div");
            div.className = "user-card";
            div.innerHTML = `
                <strong>${u.fullname}</strong> (<em>${u.email}</em>)<br>
                Ngày tạo: ${u.created_at}
            `;
            resultsDiv.appendChild(div);
        });
    }
});
