const urlParams = new URLSearchParams(window.location.search);
const ShareId = urlParams.get('shareId');

let shareHeader = document.getElementById("shareHeader");
var content = {};

function fetchDetails() {
    fetch('http://localhost:8140/addMF')
        .then(response => response.json())
        .then(data => {
            data.forEach((item) => {
                if (item.shareId == ShareId) {
                    sessionStorage.setItem('content', JSON.stringify(item));
                    content = item;
                }
            });
        })
        .catch(error => {
            console.log(error);
        });
}

fetchDetails();

const storedContent = JSON.parse(sessionStorage.getItem('content'));


document.querySelector("h1").innerHTML = storedContent.shareName
document.createElement
document.getElementById("btn-closingPrice").innerHTML = `Closing Price: ${storedContent.closingPrice}`


function filDetails() {
    const row = document.createElement("tr");
    row.innerHTML = `
        <th scope="row">${storedContent.shareId}</th>
        <td><a href="shareDetails.html?shareId=${storedContent.shareId}" class="detail-link">${storedContent.shareName}</a></td>
        <td   class =shareClosingPrice  >${storedContent.closingPrice}</td>
        <td>${storedContent.businessCategory}</td>
        <td>  Excepteur sint occaecat cupidat </td>
      
    `

    tableBody.appendChild(row);
}
filDetails() 


function getLastNDates(n) {
    const today = new Date();
    const datesArray = [];
  
    for (let i = n - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
  
      const formattedDate = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short'
      });
  
      datesArray.push(formattedDate.toUpperCase());
    }
  
    return datesArray;
  }
  
        const xArray = getLastNDates(10);
        const yArray = storedContent.prevPriceDetails;
        
        const data = [{
          x:xArray,
          y:yArray,
          type:"bar",
          orientation:"v",
          marker: {color:"#03396c"}
        }];
        
        const layout = {title:`Last 10 days ${storedContent.shareName}'s closing price`};
        
Plotly.newPlot("myPlot", data, layout);
