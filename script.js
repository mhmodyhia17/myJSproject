document.addEventListener("DOMContentLoaded", () => {
  let contacts = [
    {
      name: "מחמוד יחיא",
      phone: "052-5723231",
      address: "חיפה",
      email: "mahmodyhia94@gmail.com",
      image: "img/img1.jpg",
      notes: "",
    },
    {
      name: "ראזי עומרי",
      phone: "050-5565852",
      address: "חיפה",
      email: "raziomari8@gmail.com",
      image: "img/img2.webp",
      notes: "",
    },
    {
      name: "אחמד ברקה",
      phone: "052-5845581",
      address: "שפרעם",
      email: "ahmadbarakeh@gmail.com",
      image: "img/img2.webp",
      notes: "",
    },
    {
      name: "אלסו",
      phone: "052-4567891",
      address: "חיפה",
      email: "also@gmail.com",
      image: "img/img2.webp",
      notes: "",
    },

    {
      name: "יוסי כהן",
      phone: "050-1234567",
      address: "תל אביב",
      email: "yossi@example.com",
      image: "img/img2.webp",
      notes: "",
    },
    {
      name: "רותי לוי",
      phone: "052-9876543",
      address: "ירושלים",
      email: "ruth@example.com",
      image: "img/img2.webp",
      notes: "",
    },
    {
      name: "דוד ישראלי",
      phone: "054-5555555",
      address: "חיפה",
      email: "david@example.com",
      image: "img/img2.webp",
      notes: "חבר ילדות",
    },
    {
      name: "אילנה כהן",
      phone: "058-6666666",
      address: "באר שבע",
      email: "ilana@example.com",
      image: "img/img2.webp",
      notes: "",
    },
  ];

  const contactsList = document.getElementById("contacts-list");
  const searchInput = document.getElementById("search-input");
  const addContactBtn = document.getElementById("add-contact-btn");
  const deleteAllBtn = document.getElementById("delete-all-btn");
  const contactPopup = document.getElementById("contact-popup");
  const contactForm = document.getElementById("contact-form");
  const closePopupBtn = document.getElementById("close-popup-btn");
  const toggleEffectBtn = document.getElementById("toggleEffectBtn");
  let editIndex = null;
  let effectOn = false;

  function renderContacts() {
    contactsList.innerHTML = "";
    const sortedContacts = contacts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    sortedContacts.forEach((contact, index) => {
      const li = document.createElement("li");
      li.className = "contact-item";
      li.innerHTML = `
                <img src="${contact.image}" alt="${contact.name}">
                ${contact.name} - ${contact.phone}
                <div class="actions">
                    <button class="edit-btn" data-index="${index}">עדכן</button>
                    <button class="delete-btn" data-index="${index}">מחק</button>
                </div>
            `;
      contactsList.appendChild(li);
    });
  }

  function showPopup(contact = {}) {
    contactForm["name"].value = contact.name || "";
    contactForm["phone"].value = contact.phone || "";
    contactForm["address"].value = contact.address || "";
    contactForm["email"].value = contact.email || "";
    contactForm["image"].value = contact.image || "";
    contactForm["notes"].value = contact.notes || "";
    contactPopup.classList.remove("hidden");
  }

  function hidePopup() {
    contactPopup.classList.add("hidden");
    contactForm.reset();
    editIndex = null;
  }

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(query)
    );
    contactsList.innerHTML = "";
    filteredContacts.forEach((contact, index) => {
      const li = document.createElement("li");
      li.className = "contact-item";
      li.innerHTML = `
                <img src="${contact.image}" alt="${contact.name}">
                ${contact.name} - ${contact.phone}
                <div class="actions">
                    <button class="edit-btn" data-index="${index}">עדכן</button>
                    <button class="delete-btn" data-index="${index}">מחק</button>
                </div>
            `;
      contactsList.appendChild(li);
    });
  });

  contactsList.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-btn")) {
      editIndex = event.target.dataset.index;
      showPopup(contacts[editIndex]);
    } else if (event.target.classList.contains("delete-btn")) {
      const index = event.target.dataset.index;
      contacts.splice(index, 1);
      renderContacts();
    }
  });

  contactsList.addEventListener("mouseover", (event) => {
    if (event.target.closest(".contact-item")) {
      event.target.closest(".contact-item").classList.add("hover");
    }
  });

  contactsList.addEventListener("mouseout", (event) => {
    if (event.target.closest(".contact-item")) {
      event.target.closest(".contact-item").classList.remove("hover");
    }
  });

  addContactBtn.addEventListener("click", () => {
    showPopup();
  });

  deleteAllBtn.addEventListener("click", () => {
    contacts = [];
    renderContacts();
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newContact = {
      name: contactForm["name"].value,
      phone: contactForm["phone"].value,
      address: contactForm["address"].value,
      email: contactForm["email"].value,
      image: contactForm["image"].value,
      notes: contactForm["notes"].value,
    };
    if (editIndex !== null) {
      contacts[editIndex] = newContact;
    } else {
      if (contacts.some((contact) => contact.name === newContact.name)) {
        alert("שם זה כבר קיים");
        return;
      }
      contacts.push(newContact);
    }
    hidePopup();
    renderContacts();
  });

  closePopupBtn.addEventListener("click", () => {
    hidePopup();
  });

  toggleEffectBtn.addEventListener("click", () => {
    effectOn = !effectOn;
    document.body.classList.toggle("effect", effectOn);
  });

  renderContacts();
});
