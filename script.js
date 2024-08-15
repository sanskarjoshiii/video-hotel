let total = 0;
let customerName = "";

// Item prices mapping
const itemPrices = {
    "MUTTON SUKKA": 110,
    "MUTTON FRY": 120,
    "MUTTON MASALA": 110,
    "MUTTON BUTTER": 150,
    "MUTTON MOGHLAI": 140,
    "MUTTON KOLHAPURI": 140,
    "MUTTON KADAI": 180,
    "MUTTON HANDI": 180,
    "MUTTON LIVER SUKKHA": 110,
    "MUTTON LIVER MASALA": 110,
    "MUTTON LIVER FRY": 120,
    "VAJARI MASALA": 90,
    "VAJARI FRY": 100,
    "Shahi Paneer": 220,
    "Paneer Malai Kofta": 220,
    "Paneer Kaju Masala": 220,
    "Kaju Curry": 180,
    "Shev Bhaji Black": 120,
    "Mutter Paneer": 150,
    "Shev Bhaji Red": 90,
    "Aloo Mutter": 100,
    "Dal Tadka": 120,
    "Dal Fry": 100,
    "Jeera Aloo": 100,
    "Veg Kolhapuri": 150,
    "Mix Veg": 120,
    "Baingan Masala": 100,
    "Lasooni Methi": 120,
    "Bhendi Fry": 100,
    "Matki Masala": 100,
    "Green Salad": 70,
    "Veg Kofta": 180,
    "Veg Lajawab": 160,
    "Paneer Kurmure": 220,
    "Paneer Sunana": 240,
    "Paneer Lajij": 170,
    "Paneer Pasanda": 220,
    "Veg Maharaja": 220,
    "Paneer Maharaja": 180,
    "Paneer Kofta": 170,
    "Paneer Angara": 180,
    "Paneer Mirch Masala": 180,
    "Paneer Amritsari": 180,
    "Paneer Tikka": 220,
    "Paneer Do Pyaja": 200,
    "Veg Maratha": 200,
    "Veg Harabhara": 180,
    "Chana Koliwada": 90,
    "Chana Roast": 100,
    "Veg Sik Kabab": 170,
    "Veg Bhoona": 220,
    "Paneer Angara": 180,
    "Soyabean Masala": 100,
    "Paneer Masala": 150,
    "Schezwan Noodles": 120,
    "Schezwan Fried Rice": 120,
    "Manchurian": 120,
    "Soyabean Chilli": 120,
    "Manchurian Noodles": 150,
    "Manchurian Rice": 150,
    "Paneer Chilli": 150,
    "Paneer Crispy": 150,
    "Paneer 65": 180,
    "Aloo 65": 150,
    "Paneer Manchurian": 170,
    "Chinese Triple Rice": 180,
    "Veg Manchow Soup": 120,
    "Hot & Sour Soup": 120,
    "Tomato Soup": 120,
    "Bread Butter": 120,
    "Sandwich": 70,
    "Veg Cheese Sandwich": 130,
    "Paneer Momos": 90,
    "Fry Papad": 20,
    "Masala Papad": 35,
    "Roasted Papad": 20,
    "Nagili Fry Papad": 30,
    "Misal Pav": 50,
    "Rassa Vada": 40,
    "Bhajiya": 25,
    "Vada Pav": 10,
    "Samosa": 15,
    "Masala Dosa": 70,
    "Idli Sambar": 40,
    "Paper Dosa": 90,
    "Cheese Dosa": 110,
    "Masoor Dosa": 100,
    "Onion Uttapam": 90,
    "Medu Vada": 50,
    "Onion Bhajiya": 50,
    "Puri Bhaji": 80,
    "Aloo Paratha": 70,
    "Paneer Paratha": 90,
    "Cheese Paratha": 110,
    "Kachori": 40,
    "Chole Bhature": 110,
    "Chole Samosa": 50,
    "Pani Puri": 25,
    "Batata Vada": 15,
    "Water bottle": 20,
    "Tea": 10,
    "Milk": 25,
    "Coffee": 20,
    "Butter Milk": 20,
    "Water": 20,
    "Cold Drinks": 20,
    "Ice Cream": 20,
    "Juice": 20
};

// Store the list of added items
let addedItems = [];

document.getElementById('new-bill-btn').addEventListener('click', () => {
    document.getElementById('bill-section').style.display = 'block';
});

document.getElementById('start-bill-btn').addEventListener('click', () => {
    customerName = document.getElementById('customer-name').value;
    if (customerName) {
        document.getElementById('customer-info').style.display = 'none';
        document.getElementById('item-selection').style.display = 'block';
        document.getElementById('finalize-bill-btn').style.display = 'block';
    } else {
        alert('Please enter the table no.');
    }
});

document.getElementById('add-non-veg-item-btn').addEventListener('click', () => {
    const selectedItem = document.getElementById('non-veg-items').value;
    addItemToBill(selectedItem);
});

document.getElementById('add-veg-item-btn').addEventListener('click', () => {
    const selectedItem = document.getElementById('veg-items').value;
    addItemToBill(selectedItem);
});

document.getElementById('add-drinks-item-btn').addEventListener('click', () => {
    const selectedItem = document.getElementById('drinks-items').value;
    addItemToBill(selectedItem);
});
function addItemToBill(itemName) {
    const price = itemPrices[itemName];

    // Create a div for the item
    const itemDiv = document.createElement('div');
    itemDiv.className = "item-row";

    // Add item name and price
    itemDiv.innerHTML = `<span class="item-name">${itemName}</span> <span class="item-price">$${price.toFixed(2)}</span>`;

    // Create a dropdown for quantity selection
    const quantitySelect = document.createElement('select');
    quantitySelect.className = 'quantity-select';
    for (let i = 1; i <= 10; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = i;
        quantitySelect.appendChild(option);
    }
    itemDiv.appendChild(quantitySelect);

    // Event listener for changing quantity
    quantitySelect.addEventListener('change', () => {
        updateItemTotal(itemName, parseInt(quantitySelect.value), price);
    });

    document.getElementById('items-list').appendChild(itemDiv);

    // Add item to the list with initial quantity 1
    addedItems.push({ name: itemName, price: price, quantity: 1 });
    updateTotal();
}

function updateItemTotal(itemName, quantity, price) {
    // Find the item in the addedItems list and update its quantity
    for (let item of addedItems) {
        if (item.name === itemName) {
            item.quantity = quantity;
            break;
        }
    }
    updateTotal();
}

function updateTotal() {
    total = addedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    document.getElementById('total').innerText = total.toFixed(2);
}

document.getElementById('finalize-bill-btn').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("HOTEL BITTO", 75, 10);
    doc.text("Annabhau Sathe, Near Kalash Lawns, Kopargaon, Pincode-423601", 25, 20);
    doc.text(`TABLE NO.: ${customerName}`, 10, 30);

    const tableData = addedItems.map((item, index) => [
        index + 1, item.name, `${item.quantity} x $${item.price.toFixed(2)}`, `$${(item.price * item.quantity).toFixed(2)}`
    ]);

    doc.autoTable({
        head: [['SR. NO.', 'ITEMS', 'QUANTITY', 'PRICE']],
        body: tableData,
        startY: 40,
    });
    
    doc.text(`TOTAL: $${total.toFixed(2)}`, 10, doc.autoTable.previous.finalY + 10);
    doc.text("Thank you! VISIT AGAIN..", 10, doc.autoTable.previous.finalY + 20);

    doc.save('bill.pdf');

    // Reset the page for a new bill
    location.reload();
});