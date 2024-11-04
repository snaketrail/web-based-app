let clients_idsFromTable;

// Fetch client data and populate the table
async function fetchClientsData() {
    try {
        const response = await fetch('/api/clients');
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const clients = await response.json();

        const tableBody = document.getElementById('client-data');
        tableBody.innerHTML = ''; // Clear existing rows

        clients.forEach(client => {
            const row = document.createElement('tr');
            row.dataset.client_ids = client.client_ids || '';
            row.dataset.egn = client.egn_or_data || '';
            row.dataset.ime = client.ime || '';
            row.dataset.prezime = client.prezime_familiq || '';
            row.dataset.telefon = client.telefon || '';
            row.dataset.lk_data = client.lk_data || '';
            row.dataset.knijka_nomer = client.knijka_nomer || '';
            row.dataset.knijka_data1 = client.knijka_data1 || '';
            row.dataset.knijka_mqsto = client.knijka_mqsto || '';
            row.dataset.knijka_data2 = client.knijka_data2 || '';
            row.dataset.adres = client.adres || '';
            row.dataset.nomer_lk = client.nomer_lk || '';
            row.dataset.mqsto_lk = client.mqsto_lk || '';
            row.dataset.cqlo_ime = client.cqlo_ime || '';

            // Populate row with client data
            row.innerHTML = `
                <td>${client.egn_or_data || ''}</td>
                <td>${client.ime || ''}</td>
                <td>${client.prezime_familiq || ''}</td>
                <td>${client.telefon || ''}</td>
            `;

            // Add click event listener to the row to select it
            row.addEventListener('click', () => selectRow(row)); // Pass the clicked row

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching client data:', error);
        alert('Error fetching client data: ' + error.message);
    }
}

// Select a row and display its information
function selectRow(row) {
    // Deselect any previously selected row
    const previouslySelected = document.querySelector('#client-data tr.selected');
    if (previouslySelected) {
        previouslySelected.classList.remove('selected');
    }

    // Select the new row
    row.classList.add('selected');

    // Extract data from the row's dataset
    const selectedRowData = {
        clientIds: row.dataset.client_ids,
        egn: row.dataset.egn,
        ime: row.dataset.ime,
        prezime: row.dataset.prezime,
        telefon: row.dataset.telefon,
        lkData: row.dataset.lk_data,
        knijkaNomer: row.dataset.knijka_nomer,
        knijkaData1: row.dataset.knijka_data1,
        knijkaMqsto: row.dataset.knijka_mqsto,
        knijkaData2: row.dataset.knijka_data2,
        adres: row.dataset.adres,
        nomerLk: row.dataset.nomer_lk,
        mqstoLk: row.dataset.mqsto_lk,
        cqloIme: row.dataset.cqlo_ime,
    };

    // Log the row data to the console (or display it as needed)
    console.log(selectedRowData);
    
    // Optionally display this data in a form or a summary section
    displaySelectedClientInfo(selectedRowData);
}

// Display the selected client's information
// Display the selected client's information
function displaySelectedClientInfo(clientData) {
    // Populate the fields in the form or any other display area
    document.getElementById('idNumber').value = clientData.egn || '';
    document.getElementById('ime').value = clientData.ime || '';
    document.getElementById('prezime').value = clientData.prezime || '';
    document.getElementById('clientPhone').value = clientData.telefon || '';
    
    // Format the date from the ISO string to YYYY-MM-DD
    const formatDate = (isoDate) => {
        if (!isoDate) return ''; // Handle null or undefined
        return isoDate.split('T')[0]; // Get the date part before the 'T'
    };
    
    document.getElementById('idIssuedOn').value = formatDate(clientData.lkData) || '';
    document.getElementById('licenseNumber').value = clientData.knijkaNomer || '';
    document.getElementById("licenseStartDate").value = formatDate(clientData.knijkaData1) || '';
    document.getElementById('licenseLocation').value = clientData.knijkaMqsto || '';
    document.getElementById("licenseEndDate").value = formatDate(clientData.knijkaData2) || '';
    document.getElementById('clientAddress').value = clientData.adres || '';
    document.getElementById('idCardNum').value = clientData.nomerLk || '';
    document.getElementById('idIssuedBy').value = clientData.mqstoLk || '';
    document.getElementById('additionalInfo').value = clientData.cqloIme || '';
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchClientsData);


async function createClient(clientData) {
    console.log('Client data to be sent:', clientData);
    try {
        const response = await fetch('/api/clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientData)
        });

        if (!response.ok) {
            throw new Error('Failed to create client: ' + response.statusText);
        }

        const newClient = await response.json();
        console.log('Client created successfully:', newClient);
        alert('Client created successfully!'); // Show success message
        fetchClientsData(); // Refresh the client data
    } catch (error) {
        console.error('Error creating client:', error);
        alert('Error creating client: ' + error.message); // Show error message
    }
}


async function updateClient(client_ids, clientData) { // Changed clientId to client_ids
    try {
        const response = await fetch(`/api/clients/${client_ids}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientData)
        });

        if (!response.ok) {
            throw new Error('Failed to update client: ' + response.statusText);
        }

        const data = await response.json();
        console.log('Updated successfully:', data);
        fetchClientsData(); // Refresh the client data
        alert('Client edited successfully!'); // Show success message

    } catch (error) {
        console.error('Error updating client:', error);
        alert('Error updating client: ' + error.message); // User-friendly error message
    }
}

async function deleteClient(client_ids) { // Changed clientId to client_ids
    try {
        const response = await fetch(`/api/clients/${client_ids}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete client: ' + response.statusText);
        }
        
        const data = await response.json();
        console.log('Delete successful:', data);
        fetchClientsData(); // Refresh the client data
        alert('Client deleted successfully!'); // Show success message

    } catch (error) {
        console.error('Failed to delete the client:', error);
        alert('Error deleting client: ' + error.message); // User-friendly error message
    }
}
document.getElementById('clientForm1').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    // Display the form
    let formulqr = document.getElementById('clientForm1');
    formulqr.style.display = "block";

    // Collect values from the actual form
    let idNum = document.getElementById('idNumber').value;
    let idCardNum = document.getElementById("idCardNum").value;
    let name = document.getElementById('ime').value;
    let prezimeFam = document.getElementById('prezime').value;
    let tel = document.getElementById('clientPhone').value;
    let lKdata = document.getElementById('idIssuedOn').value;
    let lkMqsto = document.getElementById('idIssuedBy').value;
    let knijkaData1 = document.getElementById('licenseStartDate').value;
    let knijkaData2 = document.getElementById('licenseEndDate').value;
    let knijkaNomer = document.getElementById('licenseNumber').value;
    let knijkaMqsto = document.getElementById('licenseLocation').value;
    let adres = document.getElementById('clientAddress').value;
    let description = document.getElementById('additionalInfo').value;

    // Populate the display form fields
    document.getElementById('idNumber1').value = idNum;
    document.getElementById('ime1').value = name;
    document.getElementById('prezime1').value = prezimeFam;
    document.getElementById('clientPhone1').value = tel;
    document.getElementById('idIssuedOn1').value = lKdata;
    document.getElementById('licenseNumber1').value = knijkaNomer;
    document.getElementById("licenseStartDate1").value = knijkaData1;
    document.getElementById('licenseLocation1').value = knijkaMqsto;
    document.getElementById("licenseEndDate1").value = knijkaData2;
    document.getElementById('clientAddress1').value = adres;
    document.getElementById('idCardNum1').value = idCardNum;
    document.getElementById('idIssuedBy1').value = lkMqsto;
    document.getElementById('additionalInfo1').value = description;

    // Gather form data
    const clientData = {
        egn_or_data: idNum,
        ime: name,
        prezime_familiq: prezimeFam,
        telefon: tel,
        Fat_Adres: null, // Default empty values as needed
        Fat_Sehir: null,
        Fat_V_Dairesi: null,
        Fat_V_No: null,
        Dogum_Yeri: null,
        lk_data: lKdata || null,
        knijka_nomer: knijkaNomer || null,
        knijka_data1: knijkaData1 || null,
        knijka_mqsto: knijkaMqsto || null,
        knijka_data2: knijkaData2 || null,
        adres: adres,
        Ev_Sehir: null, // Default empty values as needed
        nomer_lk: idCardNum || null,
        mqsto_lk: lkMqsto || null,
        Cep_Tel: null, // Default empty values as needed
        Ev_Tel: null, // Default empty values as needed
        Kara_Kutu: description || null,
        cqlo_ime: `${name} ${prezimeFam}`
    };

    // Get the action from the dropdown
    let dropdownOperations = document.getElementById('crudOperations').value;

    // Check for the operation type
    if (dropdownOperations === "add") {
        // No need to select a client when adding a new one
        await createClient(clientData); // Call the createClient function with gathered data
    

    }
     else {
        
        // For update or delete operations, a client must be selected
        const selectedRow = document.querySelector('#client-data tr.selected'); // Assuming the row is marked as selected
        const client_ids = selectedRow ? selectedRow.dataset.client_ids : null; // Use dataset attribute directly

        if (client_ids === null) {
            console.error('No client selected. Please select a client first.');
            alert('Please select a client before proceeding.'); // User-friendly alert
            return; // Exit if no client is selected
        }

        if (dropdownOperations === "edit") {
            await updateClient(client_ids, clientData); // Use the client_ids from the selected row
        } else if (dropdownOperations === "delete") {
            await deleteClient(client_ids); // Use the client_ids from the selected row
        } else {
            console.error('Unknown action: ', dropdownOperations);
            alert('Unknown action: ' + dropdownOperations); // User-friendly alert
            return; // Exit if the action is unknown
        }
    }

    formulqr.style.display = "none"; // Hide the form after operation
});

// Function to handle the click event of the action button
function handleActionButtonClick() {
    // Trigger the click event on the addClientButton1
    document.getElementById('addClientButton1').click();
}

// Add click event listener for the action button
document.getElementById('addClientButton').addEventListener("click", handleActionButtonClick);
