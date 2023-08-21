fetch('mfListingData.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(fund=>{
      const row = document.createElement("tr");
      row.innerHTML = `
            <th scope="row" class = "mfId">${fund.mfId}</th>
            <td scope = "row">${fund.mfName}</td>
            <td scope = "row">${fund.nav}</td>
            <td scope="row" onclick="buySellButton(this)"> <button>Redeem</button>  </td>
        `;
        tableBody.appendChild(row);
    })


  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
