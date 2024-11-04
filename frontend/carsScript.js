// frontend/js/cars.js

// Function to populate select options
function populateSelect(selectElement, options) {
    // Clear existing options (except for the default one)
    selectElement.innerHTML = '<option value="">Изберете</option>';
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        selectElement.appendChild(opt);
    });
}
// Function to fetch cars data and populate the table
async function fetchCarsData() {
    try {
        const response = await fetch('/api/cars');
        const cars = await response.json();

        const classes = new Set();
        const models = new Set();
        const brands = new Set();

        const tableBody = document.getElementById('client-data');
        tableBody.innerHTML = ''; // Clear any existing rows

        // Populate the table with data
        cars.forEach(car => {
            const row = document.createElement('tr');
            row.dataset.regNum = car.Reg_Num.trim(); 
            row.dataset.classes = car.classes.trim();
            row.dataset.marka = car.Marka.trim(); 
            row.dataset.model = car.model.trim();
            row.dataset.fuels = car.fuels.trim();
            row.dataset.godina = car.godina === null ? "" : car.godina;
            row.dataset.gears = car.gears.trim();
            row.dataset.dailyRate = car.prices === null ? "" : car.prices; 
            row.dataset.depositRate = car.Deposit === null ? "" : car.Deposit; 
            row.dataset.color = car.colors === null ? "" : car.colors; 
            row.dataset.glassTires = car.Glass_Tires === null ? "" : car.Glass_Tires; 
            row.dataset.vipProtection = car.VIP_Protection === null ? "" : car.VIP_Protection; 
            row.dataset.greece = car.Greece === null ? "" : car.Greece; 
            row.dataset.romania = car.Romania === null ? "" : car.Romania;
            row.dataset.macedonia = car.Macedonia === null ? "" : car.Macedonia;
            row.dataset.serbia = car.Serbia === null ? "" : car.Serbia; 
            row.dataset.zabelejki = car.Zabelejki === null ? "" : car.Zabelejki; 
            row.dataset.grajdanska = car.Grajdanska === null ? "" : car.Grajdanska; 
            row.dataset.kasko = car.Kasko === null ? "" : car.Kasko; 
            row.dataset.pregled = car.Pregled === null ? "" : car.Pregled; 
            row.dataset.vinetka = car.Vinetka === null ? "" : car.Vinetka; 
            row.dataset.danak = car.Danak === null ? "" : car.Danak; 
            row.dataset.serviz = car.Serviz; 
            row.dataset.servizData = car.Serviz_Data === null ? "" : car.Serviz_Data; 
            console.log(row.dataset.servizData,row.dataset.danak,row.dataset.vinetka,row.dataset.pregled,  row.dataset.kasko, row.dataset.grajdanska );
// Step 1: Define an object with specific keys and date strings as values
const dateData = {
    fees: "2024-10-31T22:00:00.000Z",
    additionalFees: "2024-10-31T22:00:00.000Z",
    miscellaneous: "2024-10-31T22:00:00.000Z",
    insurance: "2024-10-31T22:00:00.000Z",
    inspection: "1899-11-29T22:00:00.000Z"
  };
  
  // Step 2: Parse dates and format them for date inputs
  for (let key in dateData) {
    // Parse each date string into a Date object
    const parsedDate = new Date(dateData[key]);
    
    // Format the date as "YYYY-MM-DD" and store it back in the object
    dateData[key] = parsedDate.toISOString().split('T')[0];
  }
  
  // Step 3: Connect the object properties to the respective date inputs
  Object.keys(dateData).forEach(key => {
    // Find the date input field by its ID
    const datePicker = document.getElementById(key);
    if (datePicker) {
      datePicker.value = dateData[key]; // Set the value of the date input
    }
  });
  
            row.innerHTML = `
                <td>${car.classes}</td>
                <td>${car.Marka}</td>
                <td>${car.model}</td>
                <td>${car.Reg_Num}</td>
                <td>${car.fuels}</td>
                <td>${car.gears}</td>
            `;

            // Add values to the respective Sets
            classes.add(car.classes);
            brands.add(car.Marka);
            models.add(car.model);

            // Add click event listener to the row
            row.addEventListener('click', () => selectRow(car));

            tableBody.appendChild(row);
        });

        // Populate the selects with unique values after the table is filled
        populateSelect(document.getElementById('searchByClass'), Array.from(classes));
        populateSelect(document.getElementById('searchByModel'), Array.from(models));
        populateSelect(document.getElementById('searchByBrand'), Array.from(brands));

    } catch (error) {
        console.error('Error fetching cars data:', error);
    }
}
fetchCarsData();


async function createCar(carData) {
    console.log('Car data to be sent:', carData);
    try {
        const response = await fetch('/api/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carData)
        });

        if (!response.ok) {
            throw new Error('Failed to create car');
        }

        const newCar = await response.json();
        console.log('Car created successfully:', newCar);
        fetchCarsData(); // Refresh the car data
    } catch (error) {
        console.error('Error creating car:', error);
    }
}

async function updateCar(regNum, carData) {
    try {
        const response = await fetch(`/api/cars/${regNum}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carData)
        });

        if (!response.ok) {
            throw new Error('Failed to update car');
        }

        const data = await response.json();
        console.log('Updated successful:', data);
        fetchCarsData(); // Refresh the car data
    } catch (error) {
        console.error('Error updating car:', error);
    }
}

async function deleteCar(regNum) {
    try {
        const response = await fetch(`/api/cars/${regNum}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Delete successful:', data);
    } catch (error) {
        console.error('Failed to delete the car:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('carForm').addEventListener('submit', async (event) => {
        event.preventDefault(); 
        const carData = {
            Reg_Num: document.getElementById('licensePlate').value,
            classes: document.getElementById('type').value,
            godina: 0, 
            Marka: document.getElementById('brand').value,
            model: document.getElementById('model').value,
            prices: document.getElementById('dailyRate').value,
            Deposit: document.getElementById('depositRate').value,
            colors: document.getElementById('color').value,
            fuels: document.getElementById('fuelType').value,
            gears: document.getElementById('gearbox').value,
            Zabelejki: document.getElementById('description').value,
            Glass_Tires: document.getElementById('otherFeature1').value,
            VIP_Protection: document.getElementById('otherFeature2').value,
            Greece: document.getElementById('availability1').value,
            Romania: document.getElementById('availability2').value,
            Macedonia: document.getElementById('availability3').value,
            Serbia: document.getElementById('availability4').value,
            Grajdanska: document.getElementById('miscellaneous').value,
            Danak: document.getElementById('fees').value,
            Pregled: document.getElementById('inspection').value,
            Kasko: document.getElementById('additionalFees').value,
            Vinetka: document.getElementById('insurance').value,
            Serviz: 0,
            Serviz_Data: document.getElementById('serviz').value 
        };

        const operation = document.getElementById('crudOperations').value;

        try {
            if (operation === 'edit') {
                const selectedCar = getSelectedCar();
                if (selectedCar) {
                    await updateCar(selectedCar.Reg_Num); // Call delete function
                } else {
                    alert("Please select a car to edit.");
                }

            } else if (operation === 'add') {

                await createCar(carData); // Call create function
            } else if (operation === 'delete') {
                // Ensure selectedCar is retrieved correctly
                const selectedCar = getSelectedCar();
                if (selectedCar) {
                    await deleteCar(selectedCar.Reg_Num); // Call delete function
                } else {
                    alert("Please select a car to delete.");
                }
            }

            // Reset and hide the form
            document.getElementById('carForm').reset();
            document.getElementById('carForm').style.display = 'none'; // Hide the form
        } catch (error) {
            console.error('Error with car operation:', error);
        }
    });

    // Call the function when the page loads
    document.getElementById('carButton').addEventListener('click', async () => {
        const operationType = document.getElementById('crudOperations').value;
        const selectedCar = getSelectedCar(); // Retrieve the currently selected car

        // Gather car form data
        const carData = {
            Reg_Num: document.getElementById('licensePlate').value,
            classes: document.getElementById('type').value,
            godina: null, // Adjust as necessary
            Marka: document.getElementById('brand').value,
            model: document.getElementById('model').value,
            prices: document.getElementById('dailyRate').value,
            Deposit: document.getElementById('depositRate').value,
            colors: document.getElementById('color').value,
            fuels: document.getElementById('fuelType').value,
            gears: document.getElementById('gearbox').value,
            Zabelejki: document.getElementById('description').value,
            Glass_Tires: document.getElementById('otherFeature1').value,
            VIP_Protection: document.getElementById('otherFeature2').value,
            Greece: document.getElementById('availability1').value,
            Romania: document.getElementById('availability2').value,
            Macedonia: document.getElementById('availability3').value,
            Serbia: document.getElementById('availability4').value,
            Danak: document.getElementById('fees').value,
            Pregled: document.getElementById('inspection').value,
            Kasko: document.getElementById('additionalFees').value,
            Vinetka: document.getElementById('insurance').value,
            Grajdanska: document.getElementById('miscellaneous').value, // Adjust as necessary
            Serviz: 0, // Adjust as necessary
            Serviz_Data: document.getElementById('serviz').value // Adjust as necessary
        };

        if (operationType === 'add') {
            const confirmAdd = confirm(`Are you sure you want to add the car with registration number: ${carData.Reg_Num}?`);
    
            if (confirmAdd) {
                try {
                    await createCar(carData); // Make sure this function is defined properly
                    console.log('Car added successfully');
                    fetchCarsData(); // Refresh the car data
                } catch (error) {
                    console.error('Error adding car:', error);
                }
            } else {
                console.log('Car addition canceled.');
            }
        }  else if (operationType === 'edit') {
            const confirmUpdate = confirm(`Are you sure you want to edit the car with registration number: ${carData.Reg_Num}?`);
    
            if (confirmUpdate) {
                try {
                    await updateCar(carData.Reg_Num, carData);
                    console.log('Car updated successfully');
                    fetchCarsData();
                } catch (error) {
                    console.error('Error updating car:', error);
                }
            } else {
                console.log('Car update canceled.');
            }
        
        } else if (operationType === 'delete') {
            // Prepare to delete a car
            const confirmDelete = confirm(`Are you sure you want to delete the car with registration number: ${carData.Reg_Num}?`);
            if (confirmDelete) {
                await deleteCar(carData.Reg_Num); 
                fetchCarsData() 
            }
    
        }
    
            // Reset and hide the form
            document.getElementById('carForm').reset();
            document.getElementById('carForm').style.display = 'none'; // Hide the form

    });
});
// Function to retrieve the selected car's data
function getSelectedCar() {
    const selectedRow = document.querySelector('.car-row.selected'); // Ensure the correct row is selected
    if (selectedRow) {
        return {
            Reg_Num: selectedRow.dataset.regNum,
            classes: selectedRow.dataset.classes,
            Marka: selectedRow.dataset.marka,
            model: selectedRow.dataset.model,
            godina: selectedRow.dataset.model,
            fuels: selectedRow.dataset.fuels,
            gears: selectedRow.dataset.gears,
            colors: selectedRow.dataset.colors,
            prices: selectedRow.dataset.dailyRate,
            Deposit: selectedRow.dataset.depositRate,
            Glass_Tires: selectedRow.dataset.glassTires,
            VIP_Protection: selectedRow.dataset.vipProtection,
            Greece: selectedRow.dataset.greece,
            Romania: selectedRow.dataset.romania,
            Macedonia: selectedRow.dataset.macedonia,
            Serbia: selectedRow.dataset.serbia,
            Zabelejki: selectedRow.dataset.zabelejki,
            Kasko: selectedRow.dataset.kasko,
            Pregled: selectedRow.dataset.pregled,
            Vinetka: selectedRow.dataset.vinetka,
            Danak: selectedRow.dataset.danak,
            Serviz: selectedRow.dataset.serviz,
            Serviz_Data: selectedRow.dataset.servizData,
            Grajdanska: selectedRow.dataset.grajdanska
        };
    }
    return null; // No car selected
}

// Function to select a row and populate the form fields
function selectRow(car) {
    // Change the select option to "Редактирай автомобил"
    document.getElementById('crudOperations').value = 'edit';
    let carFormulqr = document.getElementById('carForm');
    carFormulqr.style.display = "block";
    // Fill out the form fields with the selected car data
    document.getElementById('licensePlate').value = car.Reg_Num;
    document.getElementById('type').value = car.classes;
    document.getElementById('brand').value = car.Marka;
    document.getElementById('model').value = car.model;
    document.getElementById('fuelType').value = car.fuels;
    document.getElementById('gearbox').value = car.gears;

    // Set values for the new fields
    document.getElementById('dailyRate').value = car.prices;
    document.getElementById('depositRate').value = car.Deposit;
    document.getElementById('color').value = car.colors;
    document.getElementById('description').value = car.Zabelejki;
    document.getElementById('otherFeature1').value = car.Glass_Tires;
    document.getElementById('otherFeature2').value = car.VIP_Protection;
    document.getElementById('availability1').value = car.Greece;
    document.getElementById('availability2').value = car.Romania;
    document.getElementById('availability3').value = car.Macedonia;
    document.getElementById('availability4').value = car.Serbia;

    // Date fields mapping for primary fields
    const dateFields = {
        fees: car.Danak,
        additionalFees: car.Kasko,
        miscellaneous: car.Grajdanska,
        serviz: car.Serviz_Data,
        insurance: car.Vinetka,
        inspection: car.Pregled
    };

    // Parsing and populating date fields with local timezone format
    Object.keys(dateFields).forEach(fieldId => {
        const dateValue = dateFields[fieldId];
        if (dateValue) {
            const localDate = new Date(dateValue).toLocaleDateString('en-CA'); // Format: YYYY-MM-DD
            document.getElementById(fieldId).value = localDate;
        }
    });

    // Duplicate fields if needed for another form instance
    document.getElementById('licensePlate1').value = car.Reg_Num;
    document.getElementById('type1').value = car.classes;
    document.getElementById('brand1').value = car.Marka;
    document.getElementById('model1').value = car.model;
    document.getElementById('fuelType1').value = car.fuels;
    document.getElementById('gearbox1').value = car.gears;

    // Set values for the duplicate fields
    document.getElementById('dailyRate1').value = car.prices;
    document.getElementById('depositRate1').value = car.Deposit;
    document.getElementById('color1').value = car.colors;
    document.getElementById('description1').value = car.Zabelejki;
    document.getElementById('otherFeature11').value = car.Glass_Tires;
    document.getElementById('otherFeature21').value = car.VIP_Protection;
    document.getElementById('availability11').value = car.Greece;
    document.getElementById('availability21').value = car.Romania;
    document.getElementById('availability31').value = car.Macedonia;
    document.getElementById('availability41').value = car.Serbia;

    // Date fields mapping for duplicate fields
    const duplicateDateFields = {
        miscellaneous1: car.Grajdanska,
        fees1: car.Danak,
        additionalFees1: car.Kasko,
        inspection1: car.Pregled,
        insurance1: car.Vinetka,
        serviz1: car.Serviz_Data
    };

    // Parsing and populating duplicate date fields with local timezone format
    Object.keys(duplicateDateFields).forEach(fieldId => {
        const dateValue = duplicateDateFields[fieldId];
        if (dateValue) {
            const localDate = new Date(dateValue).toLocaleDateString('en-CA'); // Format: YYYY-MM-DD
            document.getElementById(fieldId).value = localDate;
        }
    });

    // Show the form (if it's hidden)
    carFormulqr.style.display = "none";
}





// Example event listener for selecting a row
document.querySelectorAll('.car-row').forEach(row => {
    row.addEventListener('click', function() {
        const carData = getSelectedCar();
        if (carData) {
            selectRow(carData);
        }
    });
});

// Function to handle form population and submission
async function handleForm() {
    // Get the operation type
    const operationType = document.getElementById('crudOperations').value;

    // Extract values from the original form container
    const licensePlate = document.getElementById('licensePlate').value;
    console.log(licensePlate);
    console.log(document.getElementById('licensePlate').value);
    const type = document.getElementById('type').value;
    const brand = document.getElementById('brand').value;
    const model = document.getElementById('model').value;
    const dailyRate = document.getElementById('dailyRate').value;
    const depositRate = document.getElementById('depositRate').value;
    const color = document.getElementById('color').value;
    const fuelType = document.getElementById('fuelType').value;
    const gearbox = document.getElementById('gearbox').value;
    const description = document.getElementById('description').value;
    const otherFeature1 = document.getElementById('otherFeature1').value;
    const otherFeature2 = document.getElementById('otherFeature2').value;
    const availability1 = document.getElementById('availability1').value;
    const availability2 = document.getElementById('availability2').value;
    const availability3 = document.getElementById('availability3').value;
    const availability4 = document.getElementById('availability4').value;
    const miscellaneous = document.getElementById('miscellaneous').value;
    const additionalFees = document.getElementById('additionalFees').value;
    const insurance = document.getElementById('insurance').value;
    const fees = document.getElementById('fees').value;
    const inspection = document.getElementById('inspection').value;
    const serviz = document.getElementById('serviz').value;

    // Populate the new form with the extracted values
    const carForm = document.getElementById('carForm');
    carForm.style.display = 'block'; // Ensure this is the correct ID for your form

    console.log(licensePlate);
    licensePlate;
    console.log(licensePlate);

    carForm.type.value = type;
    carForm.brand.value = brand;
    carForm.model.value = model;
    carForm.dailyRate.value = dailyRate;
    carForm.depositRate.value = depositRate;
    carForm.color.value = color;
    carForm.fuelType.value = fuelType;
    carForm.gearbox.value = gearbox;
    carForm.description.value = description;
    carForm.otherFeature1.value = otherFeature1;
    carForm.otherFeature2.value = otherFeature2;
    carForm.availability1.value = availability1;
    carForm.availability2.value = availability2;
    carForm.availability3.value = availability3;
    carForm.availability4.value = availability4;
    carForm.miscellaneous.value = miscellaneous;
    carForm.additionalFees.value = additionalFees;
    carForm.insurance.value = insurance;
    carForm.fees.value = fees;
    carForm.inspection.value = inspection;
    carForm.serviz.value = serviz;

    carForm.style.display = 'none'; 

}

// Add an event listener to the button
document.getElementById('carButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission
    handleForm(); // Call the function to handle form values
});
