window.addEventListener('load', function () {
    const input2 = document.querySelector(".cart-count");
    input2.innerHTML = window.sessionStorage.getItem('inputValue1');
    const input3 = document.querySelector(".total");
    input3.innerHTML = window.sessionStorage.getItem('inputValue2');
    listSelected();
});

const downloadButton = document.getElementById('orderCSV');
downloadButton.addEventListener('click', () => downloadCSV(cartData));

function updateList() {
    if (window.sessionStorage.getItem('cartDataTemp') != null) {

        const carttable = document.querySelector('.cart-itemlist');
        const rows = Array.from(carttable.querySelector('tbody').querySelectorAll('tr')); // Convert NodeList to array

        // Update the price property in the array from the table
        var totQ = 0;
        var totP = 0;
        rows.forEach((row, rowIndex) => {
            if (rowIndex < rows.length-1) {
                const cells = row.querySelectorAll('td');
                const inputElement = cells[2].querySelector('input'); // Get the input element
                cartData[rowIndex].quantity = inputElement.value; // Update the input value
                cells[4].textContent = parseInt(inputElement.value) * cells[3].textContent;
            }
        });
        // Remove rows from the array and table based on checkbox state, skipping the header
        for (let i = rows.length - 2; i >= 0; i--) {
            const row = rows[i];
            const cells = row.querySelectorAll('td');
            const checkbox = cells[5].querySelector('input[type="checkbox"]');
            if (checkbox && !checkbox.checked) {
                cartData.splice(i, 1);
                row.remove();
            }
            else {
                const inputElement = cells[2].querySelector('input');
                totP = totP + parseInt(cells[4].textContent);
                totQ = totQ + parseInt(inputElement.value);
            }
        }
        rows[rows.length - 1].children[2].innerHTML = totQ;
        rows[rows.length - 1].children[4].innerHTML = totP;

        document.getElementsByClassName('t_price')[0].innerHTML = totP.toLocaleString();
        document.getElementsByClassName('t_items')[0].innerHTML = totQ;
        document.getElementsByClassName('t_wgtper')[0].innerHTML = 10;
        document.getElementsByClassName('t_wgt')[0].innerHTML = totQ * 10;
        document.getElementsByClassName('t_del')[0].innerHTML = totQ * 10 * 5;
        document.getElementsByClassName('t_all')[0].innerHTML = (totP + totQ * 10 * 5).toLocaleString();
        document.querySelector(".cart-count").innerHTML = "Items: " + totQ;
        document.querySelector(".total").innerHTML = "Total: R " + totP.toLocaleString();

        let cartJSON = JSON.stringify(cartData)
        window.sessionStorage.setItem('cartDataTemp', cartJSON);

        window.sessionStorage.setItem('inputValue1', "Items: " + totQ);
        window.sessionStorage.setItem('inputValue2', "Total: R " + totP.toLocaleString());
    }
}


function listSelected() {
    if (window.sessionStorage.getItem('cartDataTemp') != null) {
        retJSON = window.sessionStorage.getItem('cartDataTemp')
        cartData = JSON.parse(retJSON);
        const tableBody = document.getElementById('table-body');
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
        }
        var totQ = 0;
        var totP = 0;
        cartData.forEach(item => {
            const newRow = document.createElement('tr');

            const newCell1 = document.createElement('td');
            newCell1.classList.add("zoom");
            var img = document.createElement('img');
            img.src = "ïmages" + item.fileNm;
            img.width = "30";
            newCell1.appendChild(img)
            newRow.appendChild(newCell1);

            const newCell2 = document.createElement('td');
            newCell2.textContent = item.name;
            newRow.appendChild(newCell2);

            const newCell3 = document.createElement('td');
            newInput = document.createElement('input');
            newInput.classList.add('cart-qty');
            newInput.setAttribute('type', 'number');
            newInput.setAttribute('value', item.quantity);
            newInput.setAttribute('min', '0');
            newInput.setAttribute('max', '999');
            newInput.setAttribute('id', item.description);
            newCell3.appendChild(newInput);
            newRow.appendChild(newCell3);

            const newCell4 = document.createElement('td');
            newCell4.textContent = item.price;
            newRow.appendChild(newCell4);

            const newCell5 = document.createElement('td');
            newCell5.textContent = item.quantity * item.price;
            newRow.appendChild(newCell5);

            const newCell6 = document.createElement('td');
            newInput = document.createElement('input');
            newInput.setAttribute('type', 'checkbox');
            newInput.setAttribute('checked', 'checked');
            newInput.setAttribute('id', item.description);
            newCell6.appendChild(newInput);
            newRow.appendChild(newCell6);

            totQ = totQ + parseInt(item.quantity);
            totP = totP + parseInt(item.quantity * item.price);
            tableBody.appendChild(newRow);
        });
        const totRow = document.createElement('tr');
        totRow.classList.add("total-row")
        totCol = document.createElement('td');
        totCol.textContent = "Total";
        totRow.appendChild(totCol);
        totCol = document.createElement('td');
        totRow.appendChild(totCol);
        totCol = document.createElement('td');
        totCol.textContent = totQ;
        totRow.appendChild(totCol);
        totCol = document.createElement('td');
        totRow.appendChild(totCol);
        totCol = document.createElement('td');
        totCol.textContent = totP.toLocaleString();
        totRow.appendChild(totCol);
        totCol = document.createElement('td');
        totRow.appendChild(totCol);

        tableBody.appendChild(totRow);

        document.getElementsByClassName('t_price')[0].innerHTML = totP.toLocaleString();
        document.getElementsByClassName('t_items')[0].innerHTML = totQ;
        document.getElementsByClassName('t_wgtper')[0].innerHTML = 10;
        document.getElementsByClassName('t_wgt')[0].innerHTML = totQ * 10;
        document.getElementsByClassName('t_del')[0].innerHTML = totQ * 10 * 5;
        document.getElementsByClassName('t_all')[0].innerHTML = (totP + totQ * 10 * 5).toLocaleString();
    }
}

function downloadCSV(data) {

    const csv = data.map(row => {
        // Extract values from the object:
        const name = row.name;
        const price = row.price;
        const quantity = row.quantity;
        const fileNm = row.fileNm;
        // Join the values into a CSV row:
        return [name, price, quantity, fileNm].join(',');
    }).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'my_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}