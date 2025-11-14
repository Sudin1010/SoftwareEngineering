// Generate parking slots A1 – A24
let parkingSlots = [];
for (let i = 1; i <= 24; i++) {
    parkingSlots.push({
        id: "A" + i,
        status: "available",
        vehicle: null
    });
}

function loadGrid() {
    let grid = document.getElementById("parkingGrid");
    grid.innerHTML = "";

    parkingSlots.forEach(slot => {
        let div = document.createElement("div");
        div.className = `slot ${slot.status}`;
        div.innerHTML = `${slot.id}<br>${slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}`;

        if (slot.status === "occupied") {
            div.style.cursor = "pointer";
            div.onclick = () => checkout(slot.id);
        }

        grid.appendChild(div);
    });
}

// Open Add Vehicle form
function openForm() {
    document.getElementById("formModal").style.display = "flex";
}
function closeForm() {
    document.getElementById("formModal").style.display = "none";
}

// Add vehicle
document.getElementById("vehicleForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let owner = document.getElementById("ownerName").value;
    let number = document.getElementById("vehicleNumber").value;
    let type = document.getElementById("vehicleType").value;
    let hours = document.getElementById("parkingHours").value;

    let freeSlot = parkingSlots.find(s => s.status === "available");

    if (!freeSlot) {
        alert("No available parking slots!");
        return;
    }

    freeSlot.status = "occupied";
    freeSlot.vehicle = { owner, number, type, hours };

    closeForm();
    loadGrid();
});

// Checkout
function checkout(slotId) {
    let slot = parkingSlots.find(s => s.id === slotId);

    let price = slot.vehicle.hours * 5;

    document.getElementById("checkoutDetails").innerHTML = `
        <strong>Owner:</strong> ${slot.vehicle.owner}<br>
        <strong>Vehicle:</strong> ${slot.vehicle.number}<br>
        <strong>Hours:</strong> ${slot.vehicle.hours}<br>
        <strong>Total Price:</strong> $${price}
    `;

    document.getElementById("checkoutModal").style.display = "flex";

    // make slot available again
    slot.status = "available";
    slot.vehicle = null;

    loadGrid();
}

function closeCheckout() {
    document.getElementById("checkoutModal").style.display = "none";
}

loadGrid();
