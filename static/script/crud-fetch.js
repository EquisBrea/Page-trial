// const BASEURL = 'http://127.0.0.1:5000';
const BASEURL = 'https://EquisBrea.pythonanywhere.com'
/**
* Función para realizar una petición fetch con JSON.
* @param {string} url - La URL a la que se realizará la petición.
* @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
* @param {Object} [data=null]- Los datos a enviar en el cuerpo de la petición.
* @returns {Promise<Object>}- Una promesa que resuelve con la respuesta en formato JSON.
*/
// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el
// contenido del DOM ha sido completamente cargado y parseado.

async function fetchData(url, method, data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : null, // Si hay datos, los convierte a JSON y los incluye en el cuerpo
    };
    try {
        const response = await fetch(url, options); // Realiza la petición fetch
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json(); // Devuelve la respuesta en formato JSON
    } catch (error) {
        console.error('Fetch error:', error);
        alert('An error occurred while fetching data. Please try again.');
    }
}

async function showContacts() {
    let contacts = await fetchData(`${BASEURL}/api/contacts/`, 'GET');
    const tableContacts = document.querySelector('#list-table-contacts tbody');
    tableContacts.innerHTML =
        '';
    contacts.forEach((contact, index) => {
        let tr =
            `<tr>
        <td>${contact.apellido}</td>
        <td>${contact.nombre}</td>
        <td>${contact.email}</td>
        <td>${contact.comentario}</td>
        <td>
            <button class="btn-cac" onclick='updateContact(${contact.id})'><i class="fa fa-pencil" ></button></i>
            <button class="btn-cac" onclick='deleteContact(${contact.id})'><i class="fa fa-trash" ></button></i>
        </td>
        </tr>`;
        tableContacts.insertAdjacentHTML("beforeend", tr);
    });
}

async function saveContact() {
    
    const tableContacts = document.querySelector('#list-table-contacts tbody');
    
    const id = document.querySelector('#id-contact').value;
    const apellido = document.querySelector('#apellido').value;
    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const comentario = document.querySelector('#comentario').value;
    //VALIDACION DE FORMULARIO

    if (!apellido || !nombre || !email || !comentario) {
        Swal.fire({
            title: 'Error!',
            text: 'Por favor completa todos los campos.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
        return;
    }

    // Crea un objeto con los datos de la película
    const contactData = {
        apellido: apellido,
        nombre: nombre,
        email: email,
        comentario: comentario,
    };

    let result = null;
    // Si hay un idContact, realiza una petición PUT para actualizar el contacto existente 
    if (id !== "") {
        Swal.fire({
            title: `Esta seguro de actualizar el contacto número ${id}?, con los datos: ${contactData}`,
            showCancelButton: true,
            confirmButtonText: "Confirmar actualización",
        }).then(async (result) => {
            if (result.isConfirmed) {
                result = await fetchData(`${BASEURL}/api/contacts/${id}`, 'PUT', contactData);
                tableContacts && showContacts();
                Swal.fire(result.message,"", "success");
            } 
        });
    } else {
        // Si no hay id de contacto recibido, realiza una petición POST para crear una nueva película
        result = await fetchData(`${BASEURL}/api/contacts/`, 'POST', contactData);
    }

    const formContact = document.querySelector('#form-contactos-recibidos');
    formContact.reset();

    Swal.fire({
        title: 'Exito!',
        text: result.message,
        icon: 'success',
        confirmButtonText: 'Cerrar'
    })
    tableContacts && showContacts();
}

/**
* Function que permite eliminar una pelicula del array del localstorage
* de acuedo al indice del mismo
* @param {number} id posición del array que se va a eliminar
*/
function deleteContact(id) {
    const tableContacts = document.querySelector('#list-table-contacts tbody');
    Swal.fire({
        title: `Esta seguro de eliminar el contacto número ${id}?`,
        showCancelButton: true,
        confirmButtonText: "Eliminar",
    }).then(async (result) => {
        if (result.isConfirmed) {
            let response = await fetchData(`${BASEURL}/api/contacts/${id}`,'DELETE');
            tableContacts && showContacts();
            Swal.fire(response.message,"", "success");
        }
    });
}

/**
* Function que permite cargar el formulario con los datos de la pelicula
* para su edición
* @param {number} contact_id Id de la pelicula que se quiere editar
*/
async function updateContact(contact_id) {
    //Buscamos en el servidor la pelicula de acuerdo al id
    let response = await fetchData(`${BASEURL}/api/contacts/${contact_id}`, 'GET');


    const idContact = document.querySelector("#id-contact");
    const apellido = document.querySelector('#apellido');
    const nombre = document.querySelector('#nombre');
    const email = document.querySelector('#email');
    const comentario = document.querySelector('#comentario');

    idContact.value = response.id;
    apellido.value = response.apellido;
    nombre.value = response.nombre;
    email.value = response.email;
    comentario.value = response.comentario;
    

}
async function showWarning () {
    Swal.fire({
        title: `Esta seguro de eliminar el contacto número ${id}?`,
        showCancelButton: true,
        confirmButtonText: "Eliminar",
    })
}
document.addEventListener('DOMContentLoaded', function () {
    const tableContacts = document.querySelector('#list-table-contacts tbody');
    const btnSaveContact = document.querySelector('#btn-save-contact');
    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveContact.addEventListener('click', showWarning);
    btnSaveContact.addEventListener('click', saveContact);
    tableContacts && showContacts();
});
