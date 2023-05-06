let dataTable;
let dataTableIsInitialized = false;

const dataTableOptions = {
    //scrollX: "2000px",
    lengthMenu: [5, 10, 15, 20, 100, 200, 500],
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6] },
        { orderable: false, targets: [5, 6] },
        { searchable: false, targets: [2] }
        //{ width: "50%", targets: [0] }
    ],
    pageLength: 3,
    destroy: true,
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún usuario encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún usuario encontrado",
        infoFiltered: "(filtrados desde _MAX_ registros totales)",
        search: "Escribe el nombre del Pueblo o la Parroquia ========>:",
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
    if (dataTableIsInitialized) {
        dataTable.destroy();
    }

    await listUsers();

    dataTable = $("#datatable_users").DataTable(dataTableOptions);

    dataTableIsInitialized = true;
};

const listUsers = async () => {
    try {
        const response = await fetch("/users.json");
        const users = await response.json();

        let content = ``;
        users.forEach((user, index) => {
            content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.address.city}</td>
                    <td>${user.name}</td>
                    <td>${user.phone}</td>
                    <td>${user.company.catchPhrase}</td>
                    <td>${user.website}</td>
                    <td>${user.company.bs}</td>
                </tr>`;
        });
        tableBody_users.innerHTML = content;
    } catch (ex) {
        alert(ex);
    }
};

window.addEventListener("load", async () => {
    await initDataTable();
});
