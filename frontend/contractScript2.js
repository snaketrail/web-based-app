
function setupFeeCalculator() {
    const dropdown4 = document.getElementById('dropdown4-rent');
    const dropdown5 = document.getElementById('dropdown5-rent');
    const startDateInput = document.getElementById('dateInput1-rent');
    const startTimeInput = document.getElementById('hoursInput1-rent');
    const endDateInput = document.getElementById('dateInput2-rent2');
    const endTimeInput = document.getElementById('hoursInput2-rent2');

    // Define the delivery fees mapping based on the dropdown values
    const deliveryFees = {
        "Офис Пловдив, Константин Величков 6": 0,
        "Офис Пловдив, Панаира": 0,
        "Офис Пловдив, Летище": 0,
        "Офис Пловдив, доставка на адрес": 15,
        "Офис София, Източна Тангента 161": 0,
        "Офис София, Летище Терминал 1": 0,
        "Офис София, Летище Терминал 2": 0,
        "Офис София, доставка на адрес": 35,
        "Бургас, Летище": 100,
        "Бургас, доставка на адрес": 100,
        "Асеновград": 15,
        "Пазарджик": 30,
        "Хисаря": 30,
        "Велинград": 45,
        "Стара Загора": 45,
        "Смолян": 45,
        "Пампорово": 45
    };

    // Define specific holiday dates
    const specificDates = [
        '2024-12-25', // Christmas
        '2025-01-01', // New Year's Day
        '2024-11-01', // Day of the National Revival Leaders
        // Add more holidays as needed
    ];

    // Mock distance fees structure
    const fees = {
        "Офис Пловдив, Константин Величков 6": {
            "Офис Пловдив, Константин Величков 6": 0,
            "Офис Пловдив, Панаира": 0,
            "Офис Пловдив, Летище": 0,
            "Офис Пловдив, доставка на адрес": 0,
            "Офис София, Източна Тангента 161": 80,
            "Офис София, Летище Т1": 80,
            "Офис София, Летище Т2": 80,
            "Офис София, доставка на адрес": 80,
            "Бургас, доставка на адрес": 160,
            "Бургас, Летище": 160,
            "Асеновград": 20,
            "Пазарджик": 30,
            "Пампорово": 60,
            "Смолян": 60,
            "Велинград": 60,
            "Стара Загора": 60,
            "Хисаря": 30,
            "Боровец": 80
        },
        "Офис Пловдив, Панаира": {
            "Офис Пловдив, Константин Величков 6": 0,
            "Офис Пловдив, Панаира": 0,
            "Офис Пловдив, Летище": 0,
            "Офис Пловдив, доставка на адрес": 0,
            "Офис София, Източна Тангента 161": 80,
            "Офис София, Летище Т1": 80,
            "Офис София, Летище Т2": 80,
            "Офис София, доставка на адрес": 80,
            "Бургас, доставка на адрес": 160,
            "Бургас, Летище": 160,
            "Асеновград": 20,
            "Пазарджик": 30,
            "Пампорово": 60,
            "Смолян": 60,
            "Велинград": 60,
            "Стара Загора": 60,
            "Хисаря": 30,
            "Боровец": 80
        },
        "Офис Пловдив, Летище": {
            "Офис Пловдив, Константин Величков 6": 0,
            "Офис Пловдив, Панаира": 0,
            "Офис Пловдив, Летище": 0,
            "Офис Пловдив, доставка на адрес": 0,
            "Офис София, Източна Тангента 161": 80,
            "Офис София, Летище Т1": 80,
            "Офис София, Летище Т2": 80,
            "Офис София, доставка на адрес": 80,
            "Бургас, доставка на адрес": 160,
            "Бургас, Летище": 160,
            "Асеновград": 20,
            "Пазарджик": 30,
            "Пампорово": 60,
            "Смолян": 60,
            "Велинград": 60,
            "Стара Загора": 60,
            "Хисаря": 30,
            "Боровец": 80
        },
        "Офис Пловдив, доставка на адрес": {
            "Офис Пловдив, Константин Величков 6": 0,
            "Офис Пловдив, Панаира": 0,
            "Офис Пловдив, Летище": 0,
            "Офис Пловдив, доставка на адрес": 0,
            "Офис София, Източна Тангента 161": 80,
            "Офис София, Летище Т1": 80,
            "Офис София, Летище Т2": 80,
            "Офис София, доставка на адрес": 80,
            "Бургас, доставка на адрес": 160,
            "Бургас, Летище": 160,
            "Асеновград": 20,
            "Пазарджик": 30,
            "Пампорово": 60,
            "Смолян": 60,
            "Велинград": 60,
            "Стара Загора": 60,
            "Хисаря": 30,
            "Боровец": 80
        },
        "Офис София, Източна Тангента 161": {
            "Офис Пловдив, Константин Величков 6": 80,
            "Офис Пловдив, Панаира": 80,
            "Офис Пловдив, Летище": 80,
            "Офис Пловдив, доставка на адрес": 80,
            "Офис София, Източна Тангента 161": 0,
            "Офис София, Летище Т1": 0,
            "Офис София, Летище Т2": 0,
            "Офис София, доставка на адрес": 0,
            "Бургас, доставка на адрес": 240,
            "Бургас, Летище": 240,
            "Асеновград": 80,
            "Пазарджик": 60,
            "Пампорово": 160,
            "Смолян": 160,
            "Велинград": 80,
            "Стара Загора": 140,
            "Хисаря": 100,
            "Боровец": 60
        },
        "Офис София, Летище Т1": {
            "Офис Пловдив, Константин Величков 6": 80,
            "Офис Пловдив, Панаира": 80,
            "Офис Пловдив, Летище": 80,
            "Офис Пловдив, доставка на адрес": 80,
            "Офис София, Източна Тангента 161": 0,
            "Офис София, Летище Т1": 0,
            "Офис София, Летище Т2": 0,
            "Офис София, доставка на адрес": 0,
            "Бургас, доставка на адрес": 240,
            "Бургас, Летище": 240,
            "Асеновград": 80,
            "Пазарджик": 60,
            "Пампорово": 160,
            "Смолян": 160,
            "Велинград": 80,
            "Стара Загора": 140,
            "Хисаря": 100,
            "Боровец": 60
        },
        "Офис София, Летище Т2": {
            "Офис Пловдив, Константин Величков 6": 80,
            "Офис Пловдив, Панаира": 80,
            "Офис Пловдив, Летище": 80,
            "Офис Пловдив, доставка на адрес": 80,
            "Офис София, Източна Тангента 161": 0,
            "Офис София, Летище Т1": 0,
            "Офис София, Летище Т2": 0,
            "Офис София, доставка на адрес": 0,
            "Бургас, доставка на адрес": 240,
            "Бургас, Летище": 240,
            "Асеновград": 80,
            "Пазарджик": 60,
            "Пампорово": 160,
            "Смолян": 160,
            "Велинград": 80,
            "Стара Загора": 140,
            "Хисаря": 100,
            "Боровец": 60
        },
        "Офис София, доставка на адрес": {
            "Офис Пловдив, Константин Величков 6": 80,
            "Офис Пловдив, Панаира": 80,
            "Офис Пловдив, Летище": 80,
            "Офис Пловдив, доставка на адрес": 80,
            "Офис София, Източна Тангента 161": 0,
            "Офис София, Летище Т1": 0,
            "Офис София, Летище Т2": 0,
            "Офис София, доставка на адрес": 0,
            "Бургас, доставка на адрес": 240,
            "Бургас, Летище": 240,
            "Асеновград": 80,
            "Пазарджик": 60,
            "Пампорово": 160,
            "Смолян": 160,
            "Велинград": 80,
            "Стара Загора": 140,
            "Хисаря": 100,
            "Боровец": 60
        },
        "Бургас, доставка на адрес": {
            "Офис Пловдив, Константин Величков 6": 160,
            "Офис Пловдив, Панаира": 160,
            "Офис Пловдив, Летище": 160,
            "Офис Пловдив, доставка на адрес": 160,
            "Офис София, Източна Тангента 161": 240,
            "Офис София, Летище Т1": 240,
            "Офис София, Летище Т2": 240,
            "Офис София, доставка на адрес": 240,
            "Бургас, доставка на адрес": 0,
            "Бургас, Летище": 0,
            "Асеновград": 160,
            "Пазарджик": 160,
            "Пампорово": 200,
            "Смолян": 200,
            "Велинград": 200,
            "Стара Загора": 200,
            "Хисаря": 160,
            "Боровец": 160
        },
        "Бургас, Летище": {
            "Офис Пловдив, Константин Величков 6": 160,
            "Офис Пловдив, Панаира": 160,
            "Офис Пловдив, Летище": 160,
            "Офис Пловдив, доставка на адрес": 160,
            "Офис София, Източна Тангента 161": 240,
            "Офис София, Летище Т1": 240,
            "Офис София, Летище Т2": 240,
            "Офис София, доставка на адрес": 240,
            "Бургас, доставка на адрес": 0,
            "Бургас, Летище": 0,
            "Асеновград": 160,
            "Пазарджик": 160,
            "Пампорово": 200,
            "Смолян": 200,
            "Велинград": 200,
            "Стара Загора": 200,
            "Хисаря": 160,
            "Боровец": 160
        },
        "Асеновград": {
            "Офис Пловдив, Константин Величков 6": 20,
            "Офис Пловдив, Панаира": 20,
            "Офис Пловдив, Летище": 20,
            "Офис Пловдив, доставка на адрес": 20,
            "Офис София, Източна Тангента 161": 80,
            "Офис София, Летище Т1": 80,
            "Офис София, Летище Т2": 80,
            "Офис София, доставка на адрес": 80,
            "Бургас, доставка на адрес": 160,
            "Бургас, Летище": 160,
            "Асеновград": 0,
            "Пазарджик": 30,
            "Пампорово": 60,
            "Смолян": 60,
            "Велинград": 60,
            "Стара Загора": 60,
            "Хисаря": 30,
            "Боровец": 80
        },
        "Пазарджик": {
            "Офис Пловдив, Константин Величков 6": 30,
            "Офис Пловдив, Панаира": 30,
            "Офис Пловдив, Летище": 30,
            "Офис Пловдив, доставка на адрес": 30,
            "Офис София, Източна Тангента 161": 60,
            "Офис София, Летище Т1": 60,
            "Офис София, Летище Т2": 60,
            "Офис София, доставка на адрес": 60,
            "Бургас, доставка на адрес": 160,
            "Бургас, Летище": 160,
            "Асеновград": 30,
            "Пазарджик": 0,
            "Пампорово": 90,
            "Смолян": 90,
            "Велинград": 60,
            "Стара Загора": 90,
            "Хисаря": 30,
            "Боровец": 60
        },
        "Пампорово": {
            "Офис Пловдив, Константин Величков 6": 60,
            "Офис Пловдив, Панаира": 60,
            "Офис Пловдив, Летище": 60,
            "Офис Пловдив, доставка на адрес": 60,
            "Офис София, Източна Тангента 161": 160,
            "Офис София, Летище Т1": 160,
            "Офис София, Летище Т2": 160,
            "Офис София, доставка на адрес": 160,
            "Бургас, доставка на адрес": 200,
            "Бургас, Летище": 200,
            "Асеновград": 60,
            "Пазарджик": 90,
            "Пампорово": 0,
            "Смолян": 30,
            "Велинград": 90,
            "Стара Загора": 160,
            "Хисаря": 60,
            "Боровец": 90
        },
        "Смолян": {
            "Офис Пловдив, Константин Величков 6": 60,
            "Офис Пловдив, Панаира": 60,
            "Офис Пловдив, Летище": 60,
            "Офис Пловдив, доставка на адрес": 60,
            "Офис София, Източна Тангента 161": 160,
            "Офис София, Летище Т1": 160,
            "Офис София, Летище Т2": 160,
            "Офис София, доставка на адрес": 160,
            "Бургас, доставка на адрес": 200,
            "Бургас, Летище": 200,
            "Асеновград": 60,
            "Пазарджик": 90,
            "Пампорово": 30,
            "Смолян": 0,
            "Велинград": 60,
            "Стара Загора": 160,
            "Хисаря": 60,
            "Боровец": 90
        },
        "Велинград": {
            "Офис Пловдив, Константин Величков 6": 60,
            "Офис Пловдив, Панаира": 60,
            "Офис Пловдив, Летище": 60,
            "Офис Пловдив, доставка на адрес": 60,
            "Офис София, Източна Тангента 161": 80,
            "Офис София, Летище Т1": 80,
            "Офис София, Летище Т2": 80,
            "Офис София, доставка на адрес": 80,
            "Бургас, доставка на адрес": 200,
            "Бургас, Летище": 200,
            "Асеновград": 60,
            "Пазарджик": 60,
            "Пампорово": 90,
            "Смолян": 60,
            "Велинград": 0,
            "Стара Загора": 80,
            "Хисаря": 30,
            "Боровец": 80
        },
        "Стара Загора": {
            "Офис Пловдив, Константин Величков 6": 60,
            "Офис Пловдив, Панаира": 60,
            "Офис Пловдив, Летище": 60,
            "Офис Пловдив, доставка на адрес": 60,
            "Офис София, Източна Тангента 161": 140,
            "Офис София, Летище Т1": 140,
            "Офис София, Летище Т2": 140,
            "Офис София, доставка на адрес": 140,
            "Бургас, доставка на адрес": 200,
            "Бургас, Летище": 200,
            "Асеновград": 60,
            "Пазарджик": 90,
            "Пампорово": 160,
            "Смолян": 160,
            "Велинград": 80,
            "Стара Загора": 0,
            "Хисаря": 60,
            "Боровец": 100
        },
        "Хисаря": {
            "Офис Пловдив, Константин Величков 6": 30,
            "Офис Пловдив, Панаира": 30,
            "Офис Пловдив, Летище": 30,
            "Офис Пловдив, доставка на адрес": 30,
            "Офис София, Източна Тангента 161": 80,
            "Офис София, Летище Т1": 80,
            "Офис София, Летище Т2": 80,
            "Офис София, доставка на адрес": 80,
            "Бургас, доставка на адрес": 160,
            "Бургас, Летище": 160,
            "Асеновград": 30,
            "Пазарджик": 30,
            "Пампорово": 60,
            "Смолян": 60,
            "Велинград": 30,
            "Стара Загора": 60,
            "Хисаря": 0,
            "Боровец": 60
        },
        "Боровец": {
            "Офис Пловдив, Константин Величков 6": 80,
            "Офис Пловдив, Панаира": 80,
            "Офис Пловдив, Летище": 80,
            "Офис Пловдив, доставка на адрес": 80,
            "Офис София, Източна Тангента 161": 160,
            "Офис София, Летище Т1": 160,
            "Офис София, Летище Т2": 160,
            "Офис София, доставка на адрес": 160,
            "Бургас, доставка на адрес": 200,
            "Бургас, Летище": 200,
            "Асеновград": 80,
            "Пазарджик": 60,
            "Пампорово": 90,
            "Смолян": 90,
            "Велинград": 80,
            "Стара Загора": 100,
            "Хисаря": 60,
            "Боровец": 0
        }
    };

    function getDistanceFee(origin, destination) {
        const distanceFee = fees[origin] ? fees[origin][destination] : null;
        console.log(`Distance Fee from "${origin}" to "${destination}":`, distanceFee !== null ? `${distanceFee} units` : "No fee found");
        return distanceFee;
    }

    function calculateTotalFee() {
        let totalDeliveryFee = 0;
        let totalAdditionalFees = 0;

        // Calculate Delivery Fees
        const pickupLocation = dropdown4.value;
        const returnLocation = dropdown5.value;

        const locationFeePickup = deliveryFees[pickupLocation] || 0;
        const locationFeeReturn = deliveryFees[returnLocation] || 0;
        totalDeliveryFee = locationFeePickup + locationFeeReturn;

        // Calculate and log the distance fee
        const distanceFee = getDistanceFee(pickupLocation, returnLocation) || 0;
        totalDeliveryFee += distanceFee;

        // Check the start date for Sunday and holidays
        if (startDateInput.value) {
            const startDate = new Date(startDateInput.value);
            if (startDate.getDay() === 0) { // 0 is Sunday
                totalAdditionalFees += 25;
            }
            // Check if the start date is a holiday
            if (specificDates.includes(startDate.toISOString().split('T')[0])) {
                totalAdditionalFees += 25;
            }
        }

        // Check the end date for Sunday and holidays
        if (endDateInput.value) {
            const endDate = new Date(endDateInput.value);
            if (endDate.getDay() === 0) { // 0 is Sunday
                totalAdditionalFees += 25;
            }
            // Check if the end date is a holiday
            if (specificDates.includes(endDate.toISOString().split('T')[0])) {
                totalAdditionalFees += 25;
            }
        }

        // Check start time
        if (startTimeInput.value) {
            const startTime = new Date(`1970-01-01T${startTimeInput.value}:00`);
            const startHour = startTime.getHours();
            if (startHour < 9 || startHour >= 18) {
                totalAdditionalFees += 25;
            }
        }

        // Check end time
        if (endTimeInput.value) {
            const endTime = new Date(`1970-01-01T${endTimeInput.value}:00`);
            const endHour = endTime.getHours();
            if (endHour < 9 || endHour >= 18) {
                totalAdditionalFees += 25;
            }
        }

        // Total fee calculation
        const totalFee = totalDeliveryFee + totalAdditionalFees;
        console.log(`Total Delivery Fee: ${totalDeliveryFee} units`);
        console.log(`Total Additional Fees: ${totalAdditionalFees} units`);
        console.log(`Total Fee: ${totalFee} units`);
        document.getElementById('input5-payments').value = totalFee;
        return totalFee;
    }

    function logTotalFee() {
        calculateTotalFee();
    }

    // Set up event listeners for inputs
    dropdown4.addEventListener('change', logTotalFee);
    dropdown5.addEventListener('change', logTotalFee);
    startDateInput.addEventListener('change', logTotalFee);
    startTimeInput.addEventListener('change', logTotalFee);
    endDateInput.addEventListener('change', logTotalFee);
    endTimeInput.addEventListener('change', logTotalFee);
}

// Example usage
setupFeeCalculator();
function getSelectedExtrasData() {
    // Define the base IDs for the checkboxes
    const baseIds = [
        'check1', 'check2', 'check3', 'check4', 'check5', 
        'check6', 'check7', 'check8', 'check9', 'check10', 
        'check11', 'check12'
    ];

    // Prepare arrays to hold the selected inputs and their corresponding data
    const selectedData = {
        checkedIds: [],
        quantityInputs: [],
        priceInputs: [],
        depositInputs: [],
        dayCounter: null  // To hold the value of the dayCounter
    };

    // Get the value of the dayCounter input
    const dayCounterInput = document.getElementById('textfield-rent');
    selectedData.dayCounter = dayCounterInput ? parseInt(dayCounterInput.value) || 0 : 0; // Default to 0 if not available

    // Loop through each checkbox to see if it is checked
    baseIds.forEach((baseId, index) => {
        const checkbox = document.getElementById(baseId);
        if (checkbox && checkbox.checked) {
            // If the checkbox is checked, add the IDs to the respective arrays
            selectedData.checkedIds.push(baseId);
            selectedData.quantityInputs.push(`check${index + 1}-input`); // Correctly map to corresponding quantity input ID
            selectedData.priceInputs.push(`${baseId}-price`);   // Corresponding price input ID
            selectedData.depositInputs.push(`${baseId}-deposit`); // Corresponding deposit input ID
        }
    });

    // Log the collected data including dayCounter
    console.log('Checked IDs:', selectedData.checkedIds);
    console.log('Quantity Inputs:', selectedData.quantityInputs);
    console.log('Price Inputs:', selectedData.priceInputs);
    console.log('Deposit Inputs:', selectedData.depositInputs);
    console.log('Day Counter:', selectedData.dayCounter);

    // Perform calculations for each checkbox group
    check1and2(selectedData);
    check3to6(selectedData);
    check7and8(selectedData);
    check9to12(selectedData);
    
    // Calculate and log the final extra values
    finalExtraValueToSend(selectedData);

    return selectedData; // Return the collected data
}

// Function to set up event listeners for checkboxes and the dayCounter input
function setupCheckboxListeners() {
    const baseIds = [
        'check1', 'check2', 'check3', 'check4', 'check5', 
        'check6', 'check7', 'check8', 'check9', 'check10', 
        'check11', 'check12'
    ];

    // Add change event listeners to each checkbox
    baseIds.forEach(baseId => {
        const checkbox = document.getElementById(baseId);
        if (checkbox) {
            checkbox.addEventListener('change', function() {
                getSelectedExtrasData(); // Call function to get updated data on change
            });
        }
    });

    // Add an event listener for the dayCounter input
    const dayCounterInput = document.getElementById('textfield-rent');
    if (dayCounterInput) {
        dayCounterInput.addEventListener('input', function() {
            getSelectedExtrasData(); // Call function to get updated data when dayCounter changes
        });
    }
}

// Function for handling checkboxes 1 and 2
function check1and2(selectedData) {
    let total = 0;
    selectedData.checkedIds.forEach(id => {
        if (id === 'check1' || id === 'check2') {
            const priceInputId = `${id}-price`;
            const price = parseFloat(document.getElementById(priceInputId).value) || 0;
            total += price * selectedData.dayCounter;
        }
    });
    console.log('Total for Check 1 and 2 (price x days):', total);
}

// Function for handling checkboxes 3 to 6
function check3to6(selectedData) {
    let total = 0;
    selectedData.checkedIds.forEach(id => {
        if (['check3', 'check4', 'check5', 'check6'].includes(id)) {
            const quantityInputId = `check${selectedData.checkedIds.indexOf(id) + 3}-input`; // Correctly reference quantity input ID
            const priceInputId = `${id}-price`;
            const quantityInput = document.getElementById(quantityInputId);
            const priceInput = document.getElementById(priceInputId);

            if (quantityInput) {
                const quantity = parseInt(quantityInput.value) || 0; // Default to 0 if invalid
                console.log(`Quantity for ${id}:`, quantity);

                if (priceInput) {
                    const price = parseFloat(priceInput.value) || 0; // Default to 0 if invalid
                    total += quantity * price * selectedData.dayCounter;
                    console.log(`Price for ${id}:`, price);
                } else {
                    console.warn(`Price input not found for ${id}`);
                }
            } else {
                console.warn(`Quantity input not found for ${quantityInputId}`);
            }
        }
    });
    console.log('Total for Check 3 to 6 (quantity x price x days):', total);
}

// Function for handling checkboxes 7 and 8
function check7and8(selectedData) {
    let totalPrice = 0;
    let totalDeposit = 0;
    selectedData.checkedIds.forEach(id => {
        if (id === 'check7' || id === 'check8') {
            const priceInputId = `${id}-price`;
            const depositInputId = `${id}-deposit`;
            const price = parseFloat(document.getElementById(priceInputId).value) || 0;
            const deposit = parseFloat(document.getElementById(depositInputId).value) || 0;
            totalPrice += price * selectedData.dayCounter;
            totalDeposit += deposit;
        }
    });
    console.log('Total for Check 7 and 8 (price x days):', totalPrice);
    console.log('Total Deposit for Check 7 and 8:', totalDeposit);
}

// Function for handling checkboxes 9 to 12
function check9to12(selectedData) {
    let totalPrice = 0;
    let totalDeposit = 0;
    selectedData.checkedIds.forEach(id => {
        if (id === 'check9' || id === 'check10' || id === 'check11' || id === 'check12') {
            const priceInputId = `${id}-price`;
            const depositInputId = `${id}-deposit`;
            const price = parseFloat(document.getElementById(priceInputId).value) || 0;
            const deposit = parseFloat(document.getElementById(depositInputId).value) || 0;
            totalPrice += price;
            totalDeposit += deposit;
        }
    });
    console.log('Total for Check 9 to 12 (price only):', totalPrice);
    console.log('Total Deposit for Check 9 to 12:', totalDeposit);
}

// Final function to compute and log the total extras value and total deposits
function finalExtraValueToSend(selectedData) {
    let totalExtras = 0;
    let totalDeposit = 0;

    // Calculate total extras from each group
    selectedData.checkedIds.forEach(id => {
        const priceInputId = `${id}-price`;
        const depositInputId = `${id}-deposit`;

        const priceInput = document.getElementById(priceInputId);
        const depositInput = document.getElementById(depositInputId);

        // Check if price input is found
        if (priceInput) {
            const price = parseFloat(priceInput.value) || 0;

            if (['check1', 'check2'].includes(id)) {
                totalExtras += price * selectedData.dayCounter;
            } else if (['check3', 'check4', 'check5', 'check6'].includes(id)) {
                const quantityInputId = `check${selectedData.checkedIds.indexOf(id) + 3}-input`;
                const quantityInput = document.getElementById(quantityInputId);
                const quantity = quantityInput ? parseInt(quantityInput.value) || 0 : 0; // Safe check for quantity
                totalExtras += quantity * price * selectedData.dayCounter;
            } else if (['check7', 'check8'].includes(id)) {
                totalExtras += price * selectedData.dayCounter;
                if (depositInput) totalDeposit += parseFloat(depositInput.value) || 0; // Include deposit
            } else if (['check9', 'check10', 'check11', 'check12'].includes(id)) {
                totalExtras += price;
                if (depositInput) totalDeposit += parseFloat(depositInput.value) || 0; // Include deposit
            }
        } else {
            console.warn(`Price input not found for ${id}`);
        }
    });

    console.log('Total Extras Value:', totalExtras);
    document.getElementById('input4-payments').value = totalExtras;
    console.log('Total Deposits Value:', totalDeposit);
    document.getElementById('input6-vehicle').value = totalDeposit;
}


// Example usage
setupCheckboxListeners();
function calculateRent() {
    // Get values from the relevant inputs
    const vehicleInput = document.getElementById('input5-vehicle');
    const rentInput = document.getElementById('textfield-rent');
    const paymentsInput = document.getElementById('input3-payments');

    // Parse the values to floats
    const vehicleValue = parseFloat(vehicleInput.value) || 0; // Default to 0 if not valid
    const rentValue = parseFloat(rentInput.value) || 0; // Default to 0 if not valid

    // Calculate the total payments for rent
    const totalPayments = vehicleValue * rentValue;

    // Update the payments input with the calculated value
    if (paymentsInput) {
        paymentsInput.value = totalPayments.toFixed(2); // Format to 2 decimal places
    } else {
        console.warn('Element with ID "input3-payments" not found.');
    }

    console.log('Total Payments for Rent:', totalPayments);
}

// Set up event listeners to trigger the calculation when inputs change
function setupRentListeners() {
    const vehicleInput = document.getElementById('input5-vehicle');
    const rentInput = document.getElementById('textfield-rent');

    if (vehicleInput) {
        vehicleInput.addEventListener('input', calculateRent); // Recalculate on vehicle input change
    }

    if (rentInput) {
        rentInput.addEventListener('input', calculateRent); // Recalculate on rent input change
    }
}

// Call the setup function when your script loads
setupRentListeners();
function calculate24HourPeriods() {
    // Get the input values for the first date and time
    const date1 = document.getElementById('dateInput1-rent').value;
    const time1 = document.getElementById('hoursInput1-rent').value;

    // Get the input values for the second date and time
    const date2 = document.getElementById('dateInput2-rent2').value;
    const time2 = document.getElementById('hoursInput2-rent2').value;

    // Check if all inputs are filled
    if (!date1 || !time1 || !date2 || !time2) {
        console.warn('Please fill all date and time inputs.');
        return;
    }

    // Create Date objects from the input values
    const datetime1 = new Date(`${date1}T${time1}`);
    const datetime2 = new Date(`${date2}T${time2}`);

    // Check if the second date is later than the first date
    if (datetime2 <= datetime1) {
        console.warn('The second date must be later than the first date.');
        return;
    }

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = datetime2 - datetime1;

    // Convert milliseconds to hours
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

    // Calculate the number of complete 24-hour periods
    const complete24HourPeriods = Math.floor(differenceInHours / 24);

    // Log the number of complete 24-hour periods
    console.log('Complete 24-hour periods:', complete24HourPeriods);
    document.getElementById('textfield-rent').value =  complete24HourPeriods;

    // Also calculate the value for input2-payments based on input5-vehicle
    calculatePayments();
}

function calculatePayments() {
    const vehicleCount = parseFloat(document.getElementById('input5-vehicle').value) || 0;
    const rentPeriod = parseFloat(document.getElementById('textfield-rent').value) || 0;

    // Calculate input2-payments based on vehicle count and rent period
    const totalPayments = vehicleCount * rentPeriod;

    // Update input2-payments with the calculated total
    document.getElementById('input2-payments').value = totalPayments;
}

// Example usage: Set up event listeners for the inputs
function setupEventListeners() {
    const dateTimeInputs = [
        'dateInput1-rent',
        'hoursInput1-rent',
        'dateInput2-rent2',
        'hoursInput2-rent2'
    ];

    dateTimeInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('change', calculate24HourPeriods); // Recalculate on change
        }
    });

    // Set up listeners for textfield-rent and input5-vehicle
    document.getElementById('textfield-rent').addEventListener('input', calculatePayments);
    document.getElementById('input5-vehicle').addEventListener('input', calculatePayments);
}

// Call the setup function when your script loads
setupEventListeners();