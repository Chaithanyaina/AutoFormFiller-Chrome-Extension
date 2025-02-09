chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "fillForm") {
        chrome.storage.sync.get("userData", function(data) {
            if (data.userData) {
                const { name, first_name, last_name, middle_name, email, phone, alt_phone, postal_code,
                        address, city, state, country, dob, gender, username, password } = data.userData;

                const inputs = document.querySelectorAll("input, select, textarea");

                inputs.forEach(input => {
                    const fieldName = input.getAttribute("name")?.toLowerCase() || "";
                    const fieldId = input.getAttribute("id")?.toLowerCase() || "";

                    const fieldMapping = {
                        "name": name, "first name": first_name, "last name": last_name, "middle name": middle_name,
                        "email": email, "phone": phone, "alt phone": alt_phone, "postal code": postal_code,
                        "address": address, "city": city, "state": state, "country": country,
                        "dob": dob, "date of birth": dob, "birthdate": dob,
                        "gender": gender, "sex": gender, "username": username, "password": password
                    };

                    if (fieldMapping[fieldName] || fieldMapping[fieldId]) {
                        input.value = fieldMapping[fieldName] || fieldMapping[fieldId];
                    }

                    // Handle dropdowns
                    if (input.tagName === "SELECT") {
                        if (["gender", "sex"].includes(fieldName) || ["gender", "sex"].includes(fieldId)) {
                            selectDropdownOption(input, gender);
                        }
                        if (["state", "province"].includes(fieldName) || ["state", "province"].includes(fieldId)) {
                            selectDropdownOption(input, state);
                        }
                    }
                });
            }
        });
    }
});

// Function to select dropdown options
function selectDropdownOption(selectElement, value) {
    Array.from(selectElement.options).forEach(option => {
        if (option.value.toLowerCase() === value.toLowerCase()) {
            selectElement.value = option.value;
        }
    });
}
