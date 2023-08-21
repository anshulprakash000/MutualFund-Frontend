document.addEventListener("DOMContentLoaded", function() {
    const detailLinks = document.querySelectorAll(".detail-link");
    
    detailLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const itemId = this.getAttribute("data-id");
            window.location.href = "detail.html?id=" + itemId;     
        });
    });
});


function fetchData() {
    fetch('http://localhost:8140/addMF') 
            .then(response => response.json())
            .then(data => {

                data.forEach(share => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <th scope="row">${share.shareId}</th>
                        <td><a href="shareDetails.html?shareId=${share.shareId}" class="detail-link">${share.shareName}</a></td>
                        <td   class =shareClosingPrice  >${share.closingPrice}</td>
                        <td>${share.businessCategory}</td>
                        <td>     <input type="text" class="percentage"  oninput="updateUnit(this)">    </td>
                        <td>     <input type="text" class="numberOfUnit" >     </td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error fetching share data:', error);
            });
}
fetchData();



function calculateTotalPercentage() {

    const percentageInput = document.querySelectorAll(".percentage")
    let sum = 0;
    percentageInput.forEach(input => {

        const value = parseFloat(input.value);
        if (!isNaN(value)) {
            sum += value;
        }

    })
    if (sum !== 100) {
        alert("Total percentage must be equal to 100.");
        return false
    }
    return true
 
}


function updateUnit(inputElement){
    const row = inputElement.parentElement.parentElement

    const POS = row.querySelector(".percentage")
    const NOU = row.querySelector(".numberOfUnit")
    
    let SCP =(inputElement.parentElement.parentElement.querySelector(".shareClosingPrice").innerHTML);

    const valuePOS  = parseFloat(POS.value)
    NOU.value =    parseInt ((10000000000/valuePOS)/SCP)
}


function sendPostRequest() {
    const tableRows = document.querySelectorAll("#tableId tbody tr");
    const data = {
        mfName: document.getElementById("newFundName").value,
        includedShares: []
    };
    

    tableRows.forEach(row => {
        const shareId = parseInt(row.querySelector("th").textContent);
        const units = parseInt(row.querySelector(".numberOfUnit").value);
        const percentage = parseFloat(row.querySelector(".percentage").value);

        if (!isNaN(shareId) && !isNaN(units)) {
            data.includedShares.push({
                shareId: shareId,
                units: units,
                percentage:percentage
                
            });
        }
    });
    
    console.log((JSON.stringify(data)));

    if (data.includedShares.length === 0){
        alert("No valid data to send.")
        return
    }
    if (data.mfName.length === 0){
        alert("Enter Mutual Fund Name")
        return
    }
    
    console.log("Sending data");
    window.location.href = "/pmMutualFunds.html"

    const url = "http://localhost:8140/addAFund";

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            console.log("Fund added successfully!");
            // window.location.href = "/pmMutualFund.html"
        } else {
            console.error("Error adding fund");
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });

    
}

function createMutualFundButton() {
    if (calculateTotalPercentage()){
       if ( sendPostRequest())
        {
            window.location.href = "/pmMutualFund.html"
        }        
    }    
    
}


