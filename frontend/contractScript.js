// Event listeners for the rentee client modal
document.getElementById('renteeSearches').addEventListener('click', openClientModal);
document.getElementById('closeModal').addEventListener('click', closeClientModal);

// Event listeners for the second driver modal
document.getElementById('secondDriverSearches').addEventListener('click', openSecondDriverModal);
document.getElementById('closeSecondDriverModal').addEventListener('click', closeSecondDriverModal);

// Event listeners for the car modal
document.getElementById('search-cars-button').addEventListener('click', openCarModal);
document.getElementById('closeCarModal').addEventListener('click', closeCarModal);

// Event listeners for the company modal
document.getElementById('companyModalButton').addEventListener('click', openCompanyModal);
document.getElementById('closeCompanyModal').addEventListener('click', closeCompanyModal);

// Function to open the rentee client modal
function openClientModal() {
    document.getElementById('clientModal').style.display = 'block';
    fetchClientsData(); // Load client data into the modal
}

// Function to close the rentee client modal
function closeClientModal() {
    document.getElementById('clientModal').style.display = 'none';
}

// Function to open the second driver modal
function openSecondDriverModal() {
    document.getElementById('secondDriverModal').style.display = 'block';
    fetchClientsDataForSecondDriver(); // Load client data into the second driver modal
}

// Function to close the second driver modal
function closeSecondDriverModal() {
    document.getElementById('secondDriverModal').style.display = 'none';
}

// Function to open the car modal
function openCarModal() {
    document.getElementById('carModal').style.display = 'block';
    fetchCarsData(); // Load car data into the modal (if needed)
}

// Function to close the car modal
function closeCarModal() {
    document.getElementById('carModal').style.display = 'none';
}

// Function to open the company modal
function openCompanyModal() {
    document.getElementById('companyModal').style.display = 'block';
}

// Function to close the company modal
function closeCompanyModal() {
    document.getElementById('companyModal').style.display = 'none';
}



// Fetching client data for the rentee modal
async function fetchClientsData() {
    try {
        const response = await fetch('/api/clients');
        if (!response.ok) throw new Error('Network response was not ok: ' + response.statusText);

        const clients = await response.json();
        const tableBody = document.getElementById('client-data');
        tableBody.innerHTML = ''; // Clear existing rows

        clients.forEach(client => {
            const row = document.createElement('tr');

            // Set all required data attributes on each row
            row.dataset.client_ids = client.client_ids || '';
            row.dataset.egn = client.egn_or_data || '';
            row.dataset.ime = client.ime || '';
            row.dataset.prezime = client.prezime_familiq || '';
            row.dataset.telefon = client.telefon || '';
            row.dataset.lk_data = client.lk_data || ''; // Ensure this is populated correctly
            row.dataset.knijka_nomer = client.knijka_nomer || '';
            row.dataset.knijka_data1 = client.knijka_data1 || '';
            row.dataset.knijka_mqsto = client.knijka_mqsto || '';
            row.dataset.knijka_data2 = client.knijka_data2 || '';
            row.dataset.adres = client.adres || '';
            row.dataset.nomer_lk = client.nomer_lk || '';
            row.dataset.mqsto_lk = client.mqsto_lk || '';
            row.dataset.cqlo_ime = client.cqlo_ime || '';

            // Populate row cells with client data
            row.innerHTML = `
                <td>${client.egn_or_data || ''}</td>
                <td>${client.ime || ''}</td>
                <td>${client.prezime_familiq || ''}</td>
                <td>${client.telefon || ''}</td>
            `;

            // Add click event to transfer row data and close the modal
            row.addEventListener('click', () => selectClient(row));

            // Append the row to the table
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching client data:', error);
        alert('Error fetching client data: ' + error.message);
    }
}

// Fetching client data for the second driver modal
async function fetchClientsDataForSecondDriver() {
    try {
        const response = await fetch('/api/clients');
        if (!response.ok) throw new Error('Network response was not ok: ' + response.statusText);

        const clients = await response.json();
        const tableBody = document.getElementById('driver2-data'); // Target the second driver table
        tableBody.innerHTML = ''; // Clear existing rows

        clients.forEach(client => {
            const row = document.createElement('tr');

            // Set required data attributes for the second driver
            row.dataset.egn = client.egn_or_data || '';
            row.dataset.ime = client.ime || '';
            row.dataset.prezime = client.prezime_familiq || '';
            row.dataset.telefon = client.telefon || '';
            row.dataset.knijka_nomer = client.knijka_nomer || '';  // New attribute
            row.dataset.knijka_mqsto = client.knijka_mqsto || '';  // New attribute
            row.dataset.knijka_data1 = client.knijka_data1 || '';  // New attribute
            row.dataset.knijka_data2 = client.knijka_data2 || '';  // New attribute

            // Populate row cells with client data for the second driver
            row.innerHTML = `
                <td>${client.egn_or_data || ''}</td>
                <td>${client.ime || ''}</td>
                <td>${client.prezime_familiq || ''}</td>
                <td>${client.telefon || ''}</td>

            `;

            // Add click event to transfer row data and close the second driver modal
            row.addEventListener('click', () => selectSecondDriver(row));

            // Append the row to the table
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching client data:', error);
        alert('Error fetching client data: ' + error.message);
    }
}


// Filtering function for the rentee modal
function filterTable() {
    const egnFilter = document.getElementById('filter-egn').value.toLowerCase();
    const nameFilter = document.getElementById('filter-name').value.toLowerCase();
    const phoneFilter = document.getElementById('filter-phone').value.toLowerCase();

    const rows = document.querySelectorAll('#client-data tr');

    rows.forEach(row => {
        const egn = row.dataset.egn.toLowerCase();
        const name = (row.dataset.ime + ' ' + row.dataset.prezime).toLowerCase();
        const phone = row.dataset.telefon.toLowerCase();

        // Check if each row meets the filter criteria
        const matchesEgn = egn.includes(egnFilter);
        const matchesName = name.includes(nameFilter);
        const matchesPhone = phone.includes(phoneFilter);

        row.style.display = matchesEgn && matchesName && matchesPhone ? '' : 'none';
    });
}

// Attach filter event listeners for the rentee modal
document.getElementById('filter-egn').addEventListener('input', filterTable);
document.getElementById('filter-name').addEventListener('input', filterTable);
document.getElementById('filter-phone').addEventListener('input', filterTable);

// Filtering function for the second driver modal
function filterSecondDriverTable() {
    const egnFilter = document.getElementById('filter-egn-driver2').value.toLowerCase();
    const nameFilter = document.getElementById('filter-name-driver2').value.toLowerCase();
    const phoneFilter = document.getElementById('filter-phone-driver2').value.toLowerCase();

    const rows = document.querySelectorAll('#driver2-data tr');

    rows.forEach(row => {
        const egn = row.dataset.egn.toLowerCase();
        const name = (row.dataset.ime + ' ' + row.dataset.prezime).toLowerCase();
        const phone = row.dataset.telefon.toLowerCase();

        // Check if each row meets the filter criteria
        const matchesEgn = egn.includes(egnFilter);
        const matchesName = name.includes(nameFilter);
        const matchesPhone = phone.includes(phoneFilter);

        row.style.display = matchesEgn && matchesName && matchesPhone ? '' : 'none';
    });
}

// Attach filter event listeners for the second driver modal
document.getElementById('filter-egn-driver2').addEventListener('input', filterSecondDriverTable);
document.getElementById('filter-name-driver2').addEventListener('input', filterSecondDriverTable);
document.getElementById('filter-phone-driver2').addEventListener('input', filterSecondDriverTable);

// Function to format date
function formatDate(isoDate) {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    
    // Get day, month, and year
    const day = String(date.getDate()).padStart(2, '0'); // Pad single digit days with leading 0
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const year = date.getFullYear();

    return `${year}-${month}-${day}`; // Return formatted date as "YYYY-MM-DD"
}

// Function to select client from rentee modal
function selectClient(row) {
    // Populate rentee information
    document.getElementById('input1-rentee').value = row.dataset.ime || '';
    document.getElementById('input2-rentee').value = row.dataset.egn || '';
    document.getElementById('input3-rentee').value = row.dataset.telefon || '';
    document.getElementById('input4-rentee').value = row.dataset.nomer_lk || '';
    document.getElementById('input5-rentee').value = row.dataset.adres || '';
    document.getElementById('input6-rentee').value = row.dataset.mqsto_lk || '';

    // Parse and format lk_data date for rentee
    document.getElementById('dateInput-rentee').value = formatDate(row.dataset.lk_data);

    // Populate driver information
    document.getElementById('input1-driver').value = row.dataset.ime || '';
    document.getElementById('input2-driver').value = row.dataset.egn || '';
    document.getElementById('input3-driver').value = row.dataset.telefon || '';
    document.getElementById('input4-driver').value = row.dataset.knijka_nomer || '';
    document.getElementById('input5-driver').value = row.dataset.knijka_mqsto || '';

    // Parse and format knijka dates for driver
    document.getElementById('dateInput1-driver').value = formatDate(row.dataset.knijka_data1);
    document.getElementById('dateInput2-driver').value = formatDate(row.dataset.knijka_data2);

    // Close modal after selection
    closeClientModal();
}

function selectSecondDriver(row) {
    // Populate second driver information
    document.getElementById('input1-driver2').value = row.dataset.ime || '';
    document.getElementById('input2-driver2').value = row.dataset.egn || '';
    document.getElementById('input3-driver2').value = row.dataset.telefon || '';
    document.getElementById('input4-driver2').value = row.dataset.knijka_nomer || '';  // New input for knijka_nomer
    document.getElementById('input5-driver2').value = row.dataset.knijka_mqsto || '';  // New input for knijka_mqsto

    // Parse and format knijka dates for driver
    document.getElementById('dateInput1-driver2').value = formatDate(row.dataset.knijka_data1);  // New input for knijka_data1
    document.getElementById('dateInput2-driver2').value = formatDate(row.dataset.knijka_data2);  // New input for knijka_data2

    // Close second driver modal after selection
    closeSecondDriverModal();
}
// Function to fetch and display cars data
// Function to fetch and display cars data
async function fetchCarsData() {
    try {
        const response = await fetch('/api/cars');
        const cars = await response.json();
        console.log(cars); // Log the fetched car data
        const tableBody = document.getElementById('car-data').querySelector('tbody');
        const uniqueClasses = new Set();
        const uniqueBrands = new Set();
        const uniqueModels = new Set();
        
        tableBody.innerHTML = ''; // Clear any existing rows

        // Populate the table with car data and unique values for filters
        cars.forEach(car => {
            uniqueClasses.add(car.classes.trim());
            uniqueBrands.add(car.Marka.trim());
            uniqueModels.add(car.model.trim());

            const row = document.createElement('tr');
            row.dataset.regNum = car.Reg_Num.trim(); 
            row.dataset.classes = car.classes.trim(); 
            row.dataset.marka = car.Marka.trim(); 
            row.dataset.model = car.model.trim(); 

            row.innerHTML = `
                <td>${car.classes}</td>
                <td>${car.Marka}</td>
                <td>${car.model}</td>
                <td>${car.Reg_Num}</td>
            `;

            // Add click event listener to the row
            row.addEventListener('click', () => selectCar(row));
            tableBody.appendChild(row);
        });

        // Populate filter dropdowns
        populateDropdown(document.getElementById('filter-class'), Array.from(uniqueClasses));
        populateDropdown(document.getElementById('filter-brand'), Array.from(uniqueBrands));
        populateDropdown(document.getElementById('filter-model'), Array.from(uniqueModels));

    } catch (error) {
        console.error('Error fetching cars data:', error);
    }
}

// Function to filter cars based on selected filters
function filterCars() {
    const classFilter = document.getElementById('filter-class').value;
    const brandFilter = document.getElementById('filter-brand').value;
    const modelFilter = document.getElementById('filter-model').value;
    const regFilter = document.getElementById('filter-reg').value.toLowerCase();

    const rows = document.querySelectorAll('#car-data tbody tr'); // Ensure you're selecting rows from tbody

    rows.forEach(row => {
        // Log the current row for debugging
        console.log(row); // Check if row has the expected dataset properties
        const carClass = row.dataset.classes ? row.dataset.classes.toLowerCase() : ''; // Check if classes exists
        const carBrand = row.dataset.marka ? row.dataset.marka.toLowerCase() : ''; // Check if marka exists
        const carModel = row.dataset.model ? row.dataset.model.toLowerCase() : ''; // Check if model exists
        const regNum = row.dataset.regNum ? row.dataset.regNum.toLowerCase() : ''; // Check if regNum exists

        // Check if the row matches the filters
        const matchesClass = !classFilter || carClass === classFilter.toLowerCase();
        const matchesBrand = !brandFilter || carBrand === brandFilter.toLowerCase();
        const matchesModel = !modelFilter || carModel === modelFilter.toLowerCase();
        const matchesReg = !regFilter || regNum.includes(regFilter);

        console.log({
            matchesClass,
            matchesBrand,
            matchesModel,
            matchesReg
        }); // Log the matching conditions for debugging

        // Show or hide the row based on the filters
        if (matchesClass && matchesBrand && matchesModel && matchesReg) {
            row.style.display = 'table-row'; // Explicitly set to table-row
        } else {
            row.style.display = 'none'; // Hide the row
        }
    });
}

// Function to populate a dropdown with options
function populateDropdown(selectElement, options) {
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        selectElement.appendChild(opt);
    });
}
// Function to filter cars based on selected filters

// Attach event listeners to filter elements
document.getElementById('filter-class').addEventListener('change', filterCars);
document.getElementById('filter-brand').addEventListener('change', filterCars);
document.getElementById('filter-model').addEventListener('change', filterCars);
document.getElementById('filter-reg').addEventListener('input', filterCars);

// Function to handle car selection and populate input fields
function selectCar(row) {
    document.getElementById('input1-vehicle').value = row.dataset.classes || '';
    document.getElementById('input2-vehicle').value = row.dataset.marka || '';
    document.getElementById('input3-vehicle').value = row.dataset.model || '';
    document.getElementById('input4-vehicle').value = row.dataset.regNum || '';
    document.getElementById('input5-vehicle').value = row.dataset.dailyRate || '';
    document.getElementById('input6-vehicle').value = row.dataset.depositRate || '';

    closeCarModal();

}

// Attach event listener to the search button
document.getElementById('search-cars-button').addEventListener('click', () => {
    document.getElementById('carModal').style.display = 'block'; // Show the car modal
    fetchCarsData(); // Fetch and display car data
});
