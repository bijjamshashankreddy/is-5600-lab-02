// Lab 02 | Stock Portfolio Dashboard - Alternate Version
// Author: [Friend’s Name]
// Description: Interactive stock dashboard using DOM manipulation and event handling

document.addEventListener("DOMContentLoaded", () => {
  // Parse data from JSON variables defined in users.js and stocks-complete.js
  const allUsers = JSON.parse(userContent);
  const allStocks = JSON.parse(stockContent);

  const userList = document.querySelector(".user-list");
  const portfolioContainer = document.querySelector(".portfolio-list");
  const deleteBtn = document.querySelector("#btnDelete");
  const saveBtn = document.querySelector("#btnSave");

  // --- Step 1: Render User List ---
  function renderUsers(data) {
    userList.innerHTML = ""; // clear old list
    data.forEach(({ id, user }) => {
      const li = document.createElement("li");
      li.textContent = `${user.lastname}, ${user.firstname}`;
      li.dataset.id = id;
      li.classList.add("user-entry");
      userList.appendChild(li);
    });
  }

  // --- Step 2: Handle User Selection ---
  function onUserSelect(e) {
    if (e.target.tagName !== "LI") return;
    const selectedId = e.target.dataset.id;
    const selectedUser = allUsers.find(u => u.id == selectedId);

    if (selectedUser) {
      fillUserForm(selectedUser);
      displayPortfolio(selectedUser);
    }
  }

  // --- Step 3: Populate Form with Selected User Info ---
  function fillUserForm({ id, user }) {
    document.querySelector("#userID").value = id;
    document.querySelector("#firstname").value = user.firstname;
    document.querySelector("#lastname").value = user.lastname;
    document.querySelector("#address").value = user.address;
    document.querySelector("#city").value = user.city;
    document.querySelector("#email").value = user.email;
  }

  // --- Step 4: Display Portfolio ---
  function displayPortfolio(user) {
    portfolioContainer.innerHTML = `
      <h3>Symbol</h3>
      <h3># Shares</h3>
      <h3>Actions</h3>
    `;

    user.portfolio.forEach(({ symbol, owned }) => {
      const row = document.createElement("div");
      row.classList.add("portfolio-row");

      const symbolCell = document.createElement("p");
      symbolCell.textContent = symbol;

      const sharesCell = document.createElement("p");
      sharesCell.textContent = owned;

      const viewBtn = document.createElement("button");
      viewBtn.textContent = "View Stock";
      viewBtn.dataset.symbol = symbol;
      viewBtn.classList.add("view-btn");

      row.append(symbolCell, sharesCell, viewBtn);
      portfolioContainer.appendChild(row);
    });
  }

  // --- Step 5: View Stock Info ---
  function showStockDetails(symbol) {
    const stock = allStocks.find(s => s.symbol === symbol);
    if (!stock) return;

    document.querySelector("#stockName").textContent = stock.name;
    document.querySelector("#stockSector").textContent = stock.sector;
    document.querySelector("#stockIndustry").textContent = stock.subIndustry;
    document.querySelector("#stockAddress").textContent = stock.address;
    document.querySelector("#logo").src = `logos/${symbol}.svg`;
  }

  // --- Step 6: Handle Portfolio Clicks (View Buttons) ---
  portfolioContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("view-btn")) {
      const stockSymbol = e.target.dataset.symbol;
      showStockDetails(stockSymbol);
    }
  });

  // --- Step 7: Save User Changes ---
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const id = document.querySelector("#userID").value;
    const foundUser = allUsers.find(u => u.id == id);

    if (foundUser) {
      foundUser.user.firstname = document.querySelector("#firstname").value;
      foundUser.user.lastname = document.querySelector("#lastname").value;
      foundUser.user.address = document.querySelector("#address").value;
      foundUser.user.city = document.querySelector("#city").value;
      foundUser.user.email = document.querySelector("#email").value;

      renderUsers(allUsers);
      alert("User information saved successfully!");
    }
  });

  // --- Step 8: Delete User ---
  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const id = document.querySelector("#userID").value;
    const index = allUsers.findIndex(u => u.id == id);

    if (index !== -1) {
      allUsers.splice(index, 1);
      renderUsers(allUsers);
      document.querySelector(".userEntry").reset;
      portfolioContainer.innerHTML = "";
      alert("User deleted successfully!");
    }
  });

  // --- Initialize ---
  renderUsers(allUsers);
  userList.addEventListener("click", onUserSelect);
});
