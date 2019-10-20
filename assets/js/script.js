// ======================
// VARIABLES
// ======================

// 1st: pull initial budgetItems/lastID from localStorage to set initial variables
let budgetItems = JSON.parse(localStorage.getItem("budgetItems")) || [];
let = lastID = localStorage.getItem("lastID") || 0;



// ======================
// FUNCTIONS
// ======================

// 4th: function to update localStorage with latest budgetItems and latest lastID
const updateStorage = () => {
    localStorage.setItem("budgetItems", JSON.stringify(budgetItems));
    localStorage.setItem("lastID", lastID);
}

// 5th: function to render budgetItems on table; each item should be rendered in this format:
// <tr data-id="2"><td>Oct 14, 2019 5:08 PM</td><td>November Rent</td><td>Rent/Mortgage</td><td>1300</td><td>Fill out lease renewal form!</td><td class="delete"><span>x</span></td></tr>
// also, update total amount spent on page (based on selected category):
const renderItems = items => {
    if (!items) items = budgetItems;
    const tbody = $("#budgetItems tbody");
    //clear previous rows
    tbody.empty(); // can also use a .remove

    items.forEach(item => {
        const row = `<tr data-id=${item.id}><td>${item.date}</td><td>${item.name}</td><td>${item.category}</td><td>1300</td><td>$${parseFloat(item.amount).toFixed(2)}</td><td class="delete"><span>x</span></td></tr>`
        tbody.append(row);
    });
    const total = items.reduce((accum, item) => accum + parseFloat(item.amount), 0); // .reduce takes an array and reduces it down to a single val based on the logic you specify
    $("#total").text(`$${total.toFixed(2)}`);
    // create a tbody variable
    //loop through items array, amke one row per item
}


// ======================
// MAIN PROCESS
// ======================
renderItems();
// 2nd: wire up click event on 'Enter New Budget Item' button to toggle display of form
$("#toggleFormButton, #hideForm").on("click", function () {
    const button = $("#toggleFormButton");
    const form = $("#addItemForm");

    form.toggle("slow", function () {
        if ($(this).is(":visible")) {
            button.text("Hide Form")
        } else {
            button.text("Add New Budget Item");
        }
    });
})

// 3rd: wire up click event on 'Add Budget Item' button, gather user input and add item to budgetItems array
// (each item's object should include: id / date / name / category / amount / notes)... then clear the form
// fields and trigger localStorage update/budgetItems rerender functions, once created
$("#addItem").on("click", function (event) {
    event.preventDefault();
    const newItem = {
        id: ++lastID, // increment lastID and stores it in object in same step
        date: moment().format("lll"),
        name: $("#name").val().trim(),
        category: $("#category").val().trim(),
        amount: $("#amount").val().trim(),
        notes: $("#notes").val().trim(),
    }
    console.log(newItem)
    $('input, select').val("");
    budgetItems.push(newItem);
    // update localStorage
    updateStorage();
    //rerender HTML
    renderItems();
});

// 6th: wire up change event on the category select menu, show filtered budgetItems based on selection
$("#categoryFilter").on("change", function () {
    const category = $(this).val();
    if (category) {
        const filteredItems = budgetItems.filter(item => item.category === category);
        renderItems(filteredItems);
    } else {
        renderItems();
    }
});


// 7th: wire up click event on the delete button of a given row; on click delete that budgetItem
$("#budgetItems").on("click", ".delete", function (event) {
    const id = parseInt($(this).parent("tr").data("id"));
    const remainingItems = budgetItems.filter(item => item.id !== id);
    budgetItems = remainingItems;
    updateStorage();
    renderItems();
    $("categoryFilter").val("");
});





