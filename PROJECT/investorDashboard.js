  
  /*Logics to write here
      1. if mutual fund already owned by investor buy button will be sell.
      2. if he tries to input more unit then owned then textbox will become red.
      3. we need to fetch user details like Name User ID in this page to make a POST method and save his purchases
       since we have only one invester so this can be skipped.    

  */

       
fetch('mfListingData.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(fund=>{
      const row = document.createElement("tr");
      row.innerHTML = `
            <th scope="row" class = "mfId">${fund.mfId}</th>
            <td scope = "row">${fund.mfName}</td>
            <td scope = "row">${fund.nav}</td>
            <td>  <input type="text" class="mfUnit">    </td>
            <td scope="row" onclick="buySellButton(this)"> <button>Buy</button>  </td>
        `;
        tableBody.appendChild(row);
    })


  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });



function buySellButton(inputElement) {
    const row = inputElement.parentElement;
    const mfUnitValue = row.querySelector(".mfUnit").value;
    
    if (mfUnitValue !== "" && !isNaN(parseFloat(mfUnitValue))) {
      const data = {
        mfId: row.querySelector(".mfId").textContent,
        mfUnit: row.querySelector(".mfUnit").value,
        
      };
      console.log("sending data..." +data);
      // POST METHOD HERE TO SAVE BOUGHT MUTUAL FUND BUY THIS USER

    }
    else{
      alert("Enter valid data!");
    }
  }





