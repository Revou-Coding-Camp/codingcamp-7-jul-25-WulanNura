document.addEventListener("DOMContentLoaded", function() {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const dateInput = document.getElementById("date-input");
    const statusInput = document.getElementById("status-input");
    const statusFilter = document.getElementById("status-filter");
    const deleteAllBtn = document.getElementById("delete-all");
    const todoTable = document.getElementById("todo-table-body");

    //Fungsi Tambah Todo
    todoForm.addEventListener("submit", function(e){
        e.preventDefault();

        const task = todoInput.value.trim();
        const date = dateInput.value;
        const status = statusInput.value;

        //cek validasi
        if (task === "" || date === "" || status === "") {
            alert("Isi semua form dulu ya bestie!");
            return;
        }

        //buat elemen <tr>
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td class="p-2">${task}</td>
        <td class="p-2">${date}</td>
        <td class="p-2">${status}</td>
        <td class="p-2 flex gap-2">
            <button class="edit-btn bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500 text-xs">Edit</button>
            <button class="delete-btn bg-pink-500 text-white px-2 py-1 rounded hover:bg-pink-700 text-xs">Hapus</button>
        </td>
        `;

        //Masukkan ke daftar 
        todoTable.appendChild(tr);

        //Bersihkan form input
        todoInput.value = "";
        dateInput.value = "";
        statusInput.value = "On Progress";

        applyFilter(); //auto re-filter setelah tambah
    });

    //aksi : edit dan hapus
    todoTable.addEventListener("click", function(e){
        const target = e.target;
        const row = target.closest("tr");

        if (target.classList.contains("delete-btn")) {
            if(confirm("Yakin mau hapus tugas ini?")) row.remove();
        }

        if (target.classList.contains("edit-btn")) {
            todoInput.value = row.children[0].textContent;
            dateInput.value = row.children[1].textContent;
            statusInput.value = row.children[2].textContent;
            row.remove();
        }

        applyFilter();
    });

    //fungsi hapus semua
    deleteAllBtn.addEventListener("click", function(){
        if (confirm("Yakin mau hapus semua tugas?")) {
            todoTable.innerHTML = "";
        }
    })

    //Auto filter berdasarkan dropdown status
    statusFilter.addEventListener("change", applyFilter);

    //fungsi filter
    function applyFilter(){
        const selected = statusFilter.value.toLowerCase();
        const rows = todoTable.getElementsByTagName("tr");

        Array.from(rows).forEach(function (row) {
            const statusText = row.children[2].textContent.toLowerCase();
            row.style.display = selected === "" || statusText === selected ? "" : "none";
        });
    };
});