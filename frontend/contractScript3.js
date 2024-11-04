document.addEventListener('DOMContentLoaded', function() {
    // Initialize all event listeners
    setupButtonListeners();
    setupModalListeners();
    fetchAllContracts(); // Fetch and display all contracts on page load
});

// Function to set up button listeners
function setupButtonListeners() {
    // Event listener for the "Запази" button
    document.getElementById('saveButton').addEventListener('click', handleSave);
    
    // Event listener for the "Редактирай" button
    document.getElementById('editButton').addEventListener('click', handleEdit);
    
    // Event listener for the "Изтрий" button
    document.getElementById('deleteButton').addEventListener('click', handleDelete);
    
    // Event listener for the "Продължи" button
    document.getElementById('continueButton').addEventListener('click', handleContinue);
    
    // Event listener for the "Търсене" button
    document.getElementById('searchButton').addEventListener('click', handleSearch);
    
    // Event listener for the "Принтирай" button
    document.getElementById('printButton').addEventListener('click', handlePrint);
}
// Function to fetch and display all contracts
function fetchAllContracts() {
    fetch('/api/contracts') // Fetch all contracts from the API
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Check if there are any contracts to display
            if (data.length === 0) {
                console.log('No contracts found');
                return;
            }

            // Get column names from the first contract object
            const columnNames = Object.keys(data[0]);
            console.log('Column Names:', columnNames); // Log the names of all columns

            const tbody = document.querySelector('#search-data tbody');
            tbody.innerHTML = ''; // Clear previous results

            // Populate the table with contract data
            data.forEach(contract => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${contract.ime_prez_familiq}</td>
                    <td>${contract.EGN_data}</td>
                    <td>${contract.telefoni}</td>
                    <td>${contract.rez_kod}</td>
                    <td>${contract.mqsto_davane}</td>
                    <td>${contract.data_davane}</td>
                    <td>${contract.mqsto_return}</td>
                    <td>${contract.data_return}</td>
                    <td>${contract.Reg_Num}</td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching contracts:', error);
            alert('Грешка при зареждане на договорите. Моля, опитайте отново.'); // Alert user on error
        });
}
async function createContract(contractData) {
    console.log('Data to be sent:', contractData);
    try {
        const response = await fetch('/api/contracts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contractData)
        });

        if (!response.ok) {
            throw new Error('Failed to create contract');
        }

        const newContract = await response.json();
        console.log('Contract created successfully:', newContract);
        alert('Data saved successfully!');
    } catch (error) {
        console.error('Error creating contract:', error);
        alert('Error saving data!');
    }
}

function handleSave(event) {
    event.preventDefault(); // Prevent default button action

    // Manually synchronize values
    document.getElementById("input1-rentee-form").value = document.getElementById("input1-rentee").value;
    document.getElementById("input2-rentee-form").value = document.getElementById("input2-rentee").value;
    document.getElementById("input3-rentee-form").value = document.getElementById("input3-rentee").value;
    document.getElementById("input4-rentee-form").value = document.getElementById("input4-rentee").value;
    document.getElementById("input5-rentee-form").value = document.getElementById("input5-rentee").value;
    document.getElementById("input6-rentee-form").value = document.getElementById("input6-rentee").value;
    document.getElementById("dateInput-rentee-form").value = document.getElementById("dateInput-rentee").value;


    document.getElementById("input1-driver-form").value = document.getElementById("input1-driver").value;
    document.getElementById("input2-driver-form").value = document.getElementById("input2-driver").value;
    document.getElementById("input3-driver-form").value = document.getElementById("input3-driver").value;
    document.getElementById("input4-driver-form").value = document.getElementById("input4-driver").value;
    document.getElementById("input5-driver-form").value = document.getElementById("input5-driver").value;
    document.getElementById("dateInput1-driver-form").value = document.getElementById("dateInput1-driver").value;
    document.getElementById("dateInput2-driver-form").value = document.getElementById("dateInput2-driver").value;


    document.getElementById("input1-driver2-form").value = document.getElementById("input1-driver2").value;
    document.getElementById("input2-driver2-form").value = document.getElementById("input2-driver2").value;
    document.getElementById("input3-driver2-form").value = document.getElementById("input3-driver2").value;
    document.getElementById("input4-driver2-form").value = document.getElementById("input4-driver2").value;
    document.getElementById("input5-driver2-form").value = document.getElementById("input5-driver2").value;
    document.getElementById("dateInput1-driver2-form").value = document.getElementById("dateInput1-driver2").value;
    document.getElementById("dateInput2-driver2-form").value = document.getElementById("dateInput2-driver2").value;

    document.getElementById("input1-firma-form").value = document.getElementById("input1-firma").value;
    document.getElementById("input2-firma-form").value = document.getElementById("input2-firma").value;
    document.getElementById("input3-firma-form").value = document.getElementById("input3-firma").value;
    document.getElementById("input4-firma-form").value = document.getElementById("input4-firma").value;
    document.getElementById("input5-firma-form").value = document.getElementById("input5-firma").value;

    document.getElementById("dropdown4-rent-form").value = document.getElementById("dropdown4-rent").value;
    document.getElementById("dropdown5-rent-form").value = document.getElementById("dropdown5-rent").value;

    document.getElementById("dateInput1-rent-form").value = document.getElementById("dateInput1-rent").value;
    document.getElementById("dateInput2-rent2-form").value = document.getElementById("dateInput2-rent2").value;
    document.getElementById("hoursInput1-rent-form").value = document.getElementById("hoursInput1-rent").value;
    document.getElementById("hoursInput2-rent2-form").value = document.getElementById("hoursInput2-rent2").value;
    document.getElementById("dropdown3-rent-form").value = document.getElementById("dropdown3-rent").value;
    document.getElementById("textfield-rent-form").value = document.getElementById("textfield-rent").value;

    document.getElementById("input1-vehicle-form").value = document.getElementById("input1-vehicle").value;
    document.getElementById("input2-vehicle-form").value = document.getElementById("input2-vehicle").value;
    document.getElementById("input3-vehicle-form").value = document.getElementById("input3-vehicle").value;
    document.getElementById("input4-vehicle-form").value = document.getElementById("input4-vehicle").value;
    document.getElementById("input5-vehicle-form").value = document.getElementById("input5-vehicle").value;
    document.getElementById("input6-vehicle-form").value = document.getElementById("input6-vehicle").value;

    document.getElementById("dropdown2-reservation-form").value = document.getElementById("dropdown2-reservation").value;
    document.getElementById("dropdown1-reservation-form").value = document.getElementById("dropdown1-reservation").value;
    document.getElementById("input1-reservation-form").value = document.getElementById("input1-reservation").value;

    document.getElementById("check1-form").checked = document.getElementById("check1").checked;
    document.getElementById("check2-form").checked = document.getElementById("check2").checked;
    document.getElementById("check3-form").checked = document.getElementById("check3").checked;
    document.getElementById("check4-form").checked = document.getElementById("check4").checked;
    document.getElementById("check5-form").checked = document.getElementById("check5").checked;
    document.getElementById("check6-form").checked = document.getElementById("check6").checked;
    document.getElementById("check7-form").checked = document.getElementById("check7").checked;
    document.getElementById("check8-form").checked = document.getElementById("check8").checked;
    document.getElementById("check9-form").checked = document.getElementById("check9").checked;
    document.getElementById("check10-form").checked = document.getElementById("check10").checked;
    document.getElementById("check11-form").checked = document.getElementById("check11").checked;
    document.getElementById("check12-form").checked = document.getElementById("check12").checked;

    document.getElementById("check3-input-form").value = document.getElementById("check3-input").value;
    document.getElementById("check4-input-form").value = document.getElementById("check4-input").value;
    document.getElementById("check5-input-form").value = document.getElementById("check5-input").value;
    document.getElementById("check6-input-form").value = document.getElementById("check6-input").value;

    document.getElementById("check1-price-form").value = document.getElementById("check1-price").value;
    document.getElementById("check2-price-form").value = document.getElementById("check2-price").value;
    document.getElementById("check3-price-form").value = document.getElementById("check3-price").value;
    document.getElementById("check4-price-form").value = document.getElementById("check4-price").value;
    document.getElementById("check5-price-form").value = document.getElementById("check5-price").value;
    document.getElementById("check6-price-form").value = document.getElementById("check6-price").value;
    document.getElementById("check7-price-form").value = document.getElementById("check7-price").value;
    document.getElementById("check8-price-form").value = document.getElementById("check8-price").value;
    document.getElementById("check9-price-form").value = document.getElementById("check9-price").value;
    document.getElementById("check10-price-form").value = document.getElementById("check10-price").value;
    document.getElementById("check11-price-form").value = document.getElementById("check11-price").value;
    document.getElementById("check12-price-form").value = document.getElementById("check12-price").value;

    document.getElementById("check7-deposit-form").value = document.getElementById("check7-deposit").value;
    document.getElementById("check8-deposit-form").value = document.getElementById("check8-deposit").value;
    document.getElementById("check9-deposit-form").value = document.getElementById("check9-deposit").value;
    document.getElementById("check10-deposit-form").value = document.getElementById("check10-deposit").value;
    document.getElementById("check11-deposit-form").value = document.getElementById("check11-deposit").value;
    document.getElementById("check12-deposit-form").value = document.getElementById("check12-deposit").value;

    document.getElementById("textarea-form").value = document.getElementById("textarea").value;

    document.getElementById("input2-payments-form").value = document.getElementById("input2-payments").value;
    document.getElementById("input3-payments-form").value = document.getElementById("input3-payments").value;
    document.getElementById("input4-payments-form").value = document.getElementById("input4-payments").value;
    document.getElementById("input5-payments-form").value = document.getElementById("input5-payments").value;
    document.getElementById("input6-payments-form").value = document.getElementById("input6-payments").value;
    document.getElementById("input7-payments-form").value = document.getElementById("input7-payments").value;
  
    
    // Set up contractData and call createContract
    const contractData = {
        EGN_data: null,
        ime: null,
        prez_familiq: null,
        lk_mqsto: null,
        lk_nomer: null,
        lk_data: null,
        knijka_mqsto:null,
        knijka_nomer:null,
        knijka_data1:null,
        ime_prez_familiq:null,
        Kefil_Ad_Soyad:null,
        Kefil_Adres:null,
        telefoni:null,
        Kir_Adres:null,
        Kefil_Tel:null,
        Reg_Num:null,
        Marka:null,
        model:null,
        colors:null,
        data_davane:null,
        chas_davane:null,
        data_return:null,
        chas_return:null,
        Cikis_Km:null,
        Donus_Km:null,
        vid_dogovor:null,
        belejki:null,
        Surucu_TC_Kimlik:null,
        mqsto_davane:null,
        mqsto_return:null,
        Cikis_Ben:null,
        Donus_Ben:null,
        Gunluk:null,
        Para_Birimi:null,
        Toplam:null,
        Kira_Tutari:null,
        Ek_Tutar:null,
        Genel_Toplam:null,
        Ek1:null,
        Ek2:null,
        Ek3:null,
        Ek4:null,
        Ek1_Aciklama:null,
        Ek2_Aciklama:null,
        Ek3_Aciklama:null,
        Ek4_Aciklama:null,
        Ek1_Gun_Sec:null,
        Ek2_Gun_Sec:null,
        Ek3_Gun_Sec:null,
        Ek4_Gun_Sec:null,
        Gun:null,
        Vergi_Oran:null,
        Ek5:null,
        Ek5_Aciklama:null,
        Ek5_Gun_Sec:null,
        knijka_data2:null,
        shof2_imena:null,
        shof2_kn_nomer:null,
        shof2_kn_mqsto:null,
        shof2_kn_data1:null,
        shof2_kn_data2:null,
        Sofor2_Dog_Yer:null,
        Sofor2_Dog_Tar:null,
        shof2_egn:null,
        Is_Adres:null,
        Is_Tel:null,
        Pasaport_No:null,
        Ulke:null,
        Arac_GRubu:null,
        extra_1:null,
        extra_1_price:null,
        extra_1_deposit:null,
        extra_2:null,
        extra_2_price:null,
        extra_2_deposit:null,
        extra_3:null,
        extra_3_price:null,
        extra_3_deposit:null,
        extra_3_count:null,
        extra_4:null,
        extra_4_price:null,
        extra_4_deposit:null,
        extra_4_count:null,
        extra_5:null,
        extra_5_price:null,
        extra_5_deposit:null,
        extra_5_count:null,
        extra_6:null,
        extra_6_price:null,
        extra_6_deposit:null,
        extra_6_count:null,

        extra_7:null,
        extra_7_price:null,
        extra_7_deposit:null,
        extra_8:null,
        extra_8_price:null,
        extra_8_deposit:null,
        extra_9:null,
        extra_9_price:null,
        extra_9_deposit:null,
        extra_10:null,
        extra_10_price:null,
        extra_10_deposit:null,
        extra_11:null,
        extra_11_price:null,
        extra_11_deposit:null,
        extra_12:null,
        extra_12_price:null,
        extra_12_deposit:null,
        rez_kod:null,
        sait:null,
        promo:null
    };
    
    // Call createContract without a callback
    createContract(contractData);
    

    alert('Данните са запазени!'); // Example alert
}

// Attach handleSave function to the "Запази" button
document.getElementById("saveButton").addEventListener("click", handleSave);

// Function to handle "Редактирай" button click
function handleEdit(event) {
    event.preventDefault(); // Prevent default anchor behavior
    console.log('Editing the data...');
    alert('Данните са редактирани!'); // Example alert
}

// Function to handle "Изтрий" button click
function handleDelete(event) {
    event.preventDefault(); // Prevent default anchor behavior
    console.log('Deleting the data...');
    alert('Данните са изтрити!'); // Example alert
}

// Function to handle "Продължи" button click
function handleContinue(event) {
    event.preventDefault(); // Prevent default anchor behavior
    console.log('Continuing...');
    alert('Продължаваме напред!'); // Example alert
}

// Function to handle "Търсене" button click
function handleSearch(event) {
    event.preventDefault(); // Prevent default anchor behavior
    console.log('Searching...');
    alert('Търсенето е изпълнено!'); // Example alert
}

// Function to handle "Принтирай" button click
function handlePrint(event) {
    event.preventDefault(); // Prevent default anchor behavior
    console.log('Printing...');
    alert('Документът ще бъде отпечатан!'); // Example alert
    window.print(); // Example print action
}

// Function to set up modal listeners
function setupModalListeners() {
    const searchModal = document.getElementById('searchModal');
    const searchButton = document.getElementById('searchButton');
    const closeSearchModal = document.getElementById('closeSearchModal');

    // When the user clicks the search button, open the modal
    searchButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        searchModal.style.display = "block"; // Show the modal
    });

    // When the user clicks on <span> (x), close the modal
    closeSearchModal.addEventListener('click', function() {
        searchModal.style.display = "none"; // Hide the modal
    });

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', function(event) {
        if (event.target == searchModal) {
            searchModal.style.display = "none"; // Hide the modal
        }
    });
}
