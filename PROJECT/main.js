
document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault(); 

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = {
        email: email,
        password: password
    };

    try {
        const button = document.activeElement; 

        if (button.id === "investorLogin") {
            const response = await fetch("http://localhost:8140/loginAsInvestor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log("investorLogin successfully logged in");
                window.location.href = "investorDashboard.html";
            } else {
                // Display error message
                document.getElementById("message").textContent = "Login failed. Please check your credentials.";
            }
        } else if (button.id === "managerLogin") {
            
            const response = await fetch("http://localhost:8140/loginAsPm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log("Manager successfully logged in");
                window.location.href = "fundManager.html"; 
            } else {
                // Display error message
                document.getElementById("message").textContent = "Login failed. Please check your credentials.";
            }
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("message").textContent = "An error occurred.";
    }
});


