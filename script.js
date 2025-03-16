document.addEventListener("DOMContentLoaded", function () {
    const formData = JSON.parse(localStorage.getItem("formData")) || {
        name: "",
        dob: "",
        gender: "",
        email: "",
        phone: "",
        address: "",
        zip: ""
    };
    
    let currentStep = 1;

    // Restrict date input field to prevent future dates
    const dobInput = document.getElementById("dob");
    const todayDate = new Date().toISOString().split("T")[0];
    dobInput.setAttribute("max", todayDate);  // This prevents selecting future dates

    updateForm();

    document.getElementById("next1").addEventListener("click", function () {
        if (validateStep1()) {
            currentStep = 2;
            updateForm();
        }
    });

    document.getElementById("next2").addEventListener("click", function () {
        if (validateStep2()) {
            currentStep = 3;
            updateForm();
        }
    });

    document.getElementById("back2").addEventListener("click", function () {
        currentStep = 1;
        updateForm();
    });

    document.getElementById("back3").addEventListener("click", function () {
        currentStep = 2;
        updateForm();
    });

    document.getElementById("submit").addEventListener("click", function () {
        alert("Form submitted successfully!");
        localStorage.removeItem("formData");
        location.reload();
    });

    function updateForm() {
        document.querySelectorAll(".step").forEach(step => step.style.display = "none");
        document.getElementById("step" + currentStep).style.display = "block";

        document.getElementById("summaryName").textContent = formData.name;
        document.getElementById("summaryDob").textContent = formData.dob;
        document.getElementById("summaryGender").textContent = formData.gender;
        document.getElementById("summaryEmail").textContent = formData.email;
        document.getElementById("summaryPhone").textContent = formData.phone;
        document.getElementById("summaryAddress").textContent = formData.address;
        document.getElementById("summaryZip").textContent = formData.zip;
    }

    function validateStep1() {
        formData.name = document.getElementById("name").value;
        formData.dob = document.getElementById("dob").value;
        formData.gender = document.getElementById("gender").value;

        // Check if the entered DOB is in the future
        const enteredDate = new Date(formData.dob);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Remove time for accurate date comparison

        if (enteredDate > today) {
            alert("Date of Birth cannot be in the future.");
            return false;
        }

        localStorage.setItem("formData", JSON.stringify(formData));
        return formData.name && formData.dob && formData.gender;
    }

    function validateStep2() {
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;

        if (!emailRegex.test(email)) {
            alert("Invalid email format");
            return false;
        }

        if (!phoneRegex.test(phone)) {
            alert("Phone number must be 10 digits");
            return false;
        }

        formData.email = email;
        formData.phone = phone;
        formData.address = document.getElementById("address").value;
        formData.zip = document.getElementById("zip").value;
        localStorage.setItem("formData", JSON.stringify(formData));
        return true;
    }
});
