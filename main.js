let dataTable;
let dataTableIsInitialized = false;

const dataTableOptions = {
    lengthMenu: [5, 10, 15, 20, 100, 200],
    columnDefs: [
        { className: "text-center", targets: [0, 1, 2, 3, 4, 5, 6, 7] },
        { orderable: false, targets: [3, 4, 6, 7] },
        { searchable: false, targets: [2] }
    ],
    pageLength: 5, // Aumentado para mejorar UX
    destroy: true,
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        search: "<h3>Consulta por nombre de pueblo o parroquia:</h3>",
        zeroRecords: "Ningún usuario encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún usuario encontrado",
        infoFiltered: "(filtrados desde _MAX_ registros totales)",
        loadingRecords: "Cargando...",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        }
    }
};

const initDataTable = async () => {
    try {
        await listUsers();

        if (dataTableIsInitialized) {
            dataTable.destroy();
        }

        dataTable = $("#datatable_users").DataTable(dataTableOptions);
        dataTableIsInitialized = true;
    } catch (error) {
        console.error("Error al inicializar la tabla:", error);
    }
};

const listUsers = async () => {
    try {
        const response = await fetch("/users.json");
        const users = await response.json();
        const tableBody = document.getElementById("tableBody_users");

        tableBody.innerHTML = users.map((user, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${user.address.city}</td>
                <td>${user.name}</td>
                <td>${user.phone}</td>
                <td>${user.email}</td>
                <td>${user.company.unidad}</td>
                <td>${user.moderador}</td>
                <td>${user.company.arcipreste}</td>
                <td>${user.address.animador}</td>
            </tr>
        `).join("");

    } catch (error) {
        console.error("Error al cargar usuarios:", error);
    }
};

window.addEventListener("load", initDataTable);
