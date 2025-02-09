document.addEventListener("DOMContentLoaded", function () {
    chrome.storage.sync.get("userData", function (data) {
        if (data.userData) {
            Object.keys(data.userData).forEach(key => {
                let inputField = document.getElementById(key);
                if (inputField) {
                    inputField.value = data.userData[key];
                }
            });
        }
    });

    // Attach event listeners to buttons
    document.querySelectorAll("#save").forEach(button => button.addEventListener("click", saveData));
    document.querySelectorAll("#fill").forEach(button => button.addEventListener("click", fillForm));
    document.querySelectorAll("#delete").forEach(button => button.addEventListener("click", deleteData));
});

// Save user data
function saveData() {
    const userData = getUserInput();
    chrome.storage.sync.set({ userData }, function () {
        alert("Details saved!");
    });
}

// Fill form fields on the current page
function fillForm() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length > 0) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "fillForm" });
        } else {
            alert("No active tab found.");
        }
    });
}

// Delete all saved data
function deleteData() {
    chrome.storage.sync.remove("userData", function () {
        alert("All saved data deleted!");
        location.reload();
    });
}

// Get user input values
function getUserInput() {
    return {
        name: document.getElementById("name")?.value || "",
        first_name: document.getElementById("first_name")?.value || "",
        last_name: document.getElementById("last_name")?.value || "",
        middle_name: document.getElementById("middle_name")?.value || "",
        email: document.getElementById("email")?.value || "",
        phone: document.getElementById("phone")?.value || "",
        alt_phone: document.getElementById("alt_phone")?.value || "",
        postal_code: document.getElementById("postal_code")?.value || "",
        address: document.getElementById("address")?.value || "",
        city: document.getElementById("city")?.value || "",
        state: document.getElementById("state")?.value || "",
        country: document.getElementById("country")?.value || "",
        dob: formatDateToYYYYMMDD(document.getElementById("dob")?.value) || "",
        gender: document.getElementById("gender")?.value || "",
        username: document.getElementById("username")?.value || "",
        password: document.getElementById("password")?.value || ""
    };
}

// Convert DOB format to YYYY-MM-DD (needed for date inputs)
function formatDateToYYYYMMDD(dateString) {
    if (!dateString) return "";
    let parts = dateString.split("-");
    if (parts.length === 3) {
        let [year, month, day] = parts;
        return `${year}-${month}-${day}`;
    }
    return dateString;
}
