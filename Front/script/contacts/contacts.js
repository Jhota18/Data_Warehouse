let data = parseJwt(window.localStorage.getItem("token"));
let token = JSON.parse(window.localStorage.getItem("token"));
let users = document.getElementById("usersTab");

if (!data) {
  window.location = "/login.html";
} else {
  if (data.rol !== "Administrador") {
    users.style.display = "none";
  }
}

//DOM ELEMENTS
let form = document.querySelectorAll("#contactForm input,select");
let lackFields = document.querySelector("#lackFields");
let emailExist = document.querySelector(".emailExist");
let saveContact = document.querySelector("#saveContact");
let contactList = document.querySelector("#contactsContainer");
let modalYes = document.getElementById("confirmDelete");
let inputRegion = document.getElementById("inputRegion");
let inputCountry = document.getElementById("inputCountry");
let inputCity = document.getElementById("inputCity");
let exampleModalLabel = document.getElementById("exampleModalLabel");
let contactModal = document.getElementById("openContact");
// let updateBtn = document.querySelector(".modal-footer");

//RENDER USERS
let renderContacts = () => {
  fetch("http://localhost:3000/contact/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((contactCard) => {
    contactCard.json().then((contactCard) => {
      contactCard.forEach((contactC) => {
        const {
          id,
          name,
          lastname,
          role,
          email,
          company,
          region,
          country,
          city,
          address,
          interest,
        } = contactC;
        var color;
        if (interest >= 50) {
          color = "success";
        } else {
          color = "danger";
        }
        let contact = `
        <div class="contact" id="contact${id}">
          <input type="checkbox" class="selectCont" />
          <h3 class="name">${name + " " + lastname}</h3>
          <p class="email">${email}</p>
          <h3 class="country">${country}</h3>
          <p class="region">${region}</p>
          <h3 class="company">${company}</h3>
          <h3 class="role">${role}</h3>
          <div class="progress">
            <div
              class="progress-bar bg-${color}"
              role="progressbar"
              style="width: ${interest}%"
              aria-valuenow="${interest}"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <i class="fas fa-edit" onclick="getContactInfo(${id})"></i>
          <i class="far fa-trash-alt" onclick="deleteUser('${email}')"></i>
        </div>`;
        contactList.insertAdjacentHTML("beforeend", contact);
      });
    });
  });
};

renderContacts();

//CLEAR FIELDS
let clear = () => {
  form.forEach((input) => {
    input.value = "";
  });
};

contactModal.addEventListener("click", () => {
  clear();
});

let getContactData = () => {
  let formData = Array.from(form).reduce(
    (acc, input) => ({
      ...acc,
      [input.id]: input.value,
    }),
    {}
  );
  for (const key in formData) {
    if (formData[key] === "") {
      lackFields.innerHTML = "*Por favor llene todos los campos";
      return;
    }
  }

  let data2 = {
    name: formData.inputName,
    lastname: formData.inputLastName,
    role: formData.inputRole,
    email: formData.inputEmail,
    company: formData.inputCompany,
    region: formData.inputRegion,
    country: formData.inputCountry,
    city: formData.inputCity,
    address: formData.inputAddress,
    interest: formData.inputRangeN,
  };

  let data = JSON.stringify(data2);
  console.log(data);
  addContact(data);
};

//PETICION PARA CREAR USURARIO

let addContact = (data) => {
  event.preventDefault;
  fetch("http://localhost:3000/contact/create", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((res) => {
    if (res.status === 400) {
      emailExist.innerHTML = "*El email ya se encuentra registrado";
    } else if (res.status === 500) {
      lackFields.innerHTML =
        "*Tenemos problemas en el servidor, por favor intente mas tarde";
    } else {
      res.json().then((info) => {
        console.log(info);
        const {
          id,
          name,
          lastname,
          role,
          email,
          company,
          region,
          country,
          city,
          address,
          interest,
        } = info;
        var color;
        if (interest >= 50) {
          color = "success";
        } else {
          color = "danger";
        }
        let contact = `
        <div class="contact" id="contact${id}">
          <input type="checkbox" class="selectCont" />
          <h3 class="name">${name + " " + lastname}</h3>
          <p class="email">${email}</p>
          <h3 class="country">${country}</h3>
          <p class="region">${region}</p>
          <h3 class="company">${company}</h3>
          <h3 class="role">${role}</h3>
          <div class="progress">
            <div
              class="progress-bar bg-${color}"
              role="progressbar"
              style="width: ${interest}%"
              aria-valuenow="${interest}"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <i class="fas fa-edit" onclick="getContactInfo(${id})"></i>
          <i class="far fa-trash-alt" onclick="deleteUser('${email}')"></i>
        </div>`;
        contactList.insertAdjacentHTML("beforeend", contact);
        close();
        clear();
      });
    }
  });
};

//CLOSE MODAL
let close = () => {
  $("#addContact").modal("hide");
};

//OPEN MODALS
let open = () => {
  $("#addContact").modal("show");
};

let openDelete = () => {
  $("#deleteContactConfirm").modal("show");
};

//DELETE USER

let deleteUser = (email) => {
  let objectEmail = { email: email };
  let jsonEmail = JSON.stringify(objectEmail);
  openDelete();
  modalYes.addEventListener("click", () => {
    fetch("http://localhost:3000/contact/delete", {
      method: "DELETE",
      body: jsonEmail,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((user) => {
      location.reload();
    });
  });
};

//UPDATE USERS
let getContactInfo = (id) => {
  fetch(`http://localhost:3000/contact/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((contact) => {
    contact.json().then((contactData) => {
      const {
        id,
        name,
        lastname,
        role,
        email,
        company,
        region,
        country,
        city,
        address,
        interest,
      } = contactData;
      exampleModalLabel.innerHTML = "Editar contacto";
      form[0].value = name;
      form[1].value = lastname;
      form[2].value = role;
      form[3].value = email;
      form[4].value = company;
      form[5].value = region;
      form[6].innerHTML = `<option selected>${country}</option>`;
      form[7].innerHTML = `<option selected>${city}</option>`;
      form[8].value = address;
      form[9].value = interest;
      open();
      saveContact.onclick = "";
      saveContact.addEventListener("click", () => {
        let formData = Array.from(form).reduce(
          (acc, input) => ({
            ...acc,
            [input.id]: input.value,
          }),
          {}
        );
        for (const key in formData) {
          if (formData[key] === "") {
            delete formData[key];
          }
        }
        let data2 = {
          name: formData.inputName,
          lastname: formData.inputLastName,
          role: formData.inputRole,
          email: formData.inputEmail,
          company: formData.inputCompany,
          region: formData.inputRegion,
          country: formData.inputCountry,
          city: formData.inputCity,
          address: formData.inputAddress,
          interest: formData.inputRangeN,
        };

        let data = JSON.stringify(data2);
        updateContact(id, data);
        close();
        clear();
      });
    });
  });
};

let updateContact = (id, data) => {
  fetch(`http://localhost:3000/contact/update/${id}`, {
    method: "PATCH",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((updatedContact) => {
    updatedContact.json().then((contactUpd) => {
      location.reload();
      console.log(contactUpd);
    });
  });
};

let renderRegions = () => {
  fetch("http://localhost:3000/region/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((regionCard) => {
    regionCard.json().then((regionCard) => {
      regionCard.forEach((regionC) => {
        const { id, name } = regionC;
        let region = `<option data-id="${id}">${name}</option>`;
        inputRegion.insertAdjacentHTML("beforeend", region);
      });
    });
  });
};

let renderCountries = (regionId) => {
  fetch(`http://localhost:3000/country/${regionId}/countryList`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((allCountries) => {
    allCountries.json().then((countries) => {
      countries.forEach((country) => {
        const { id, name } = country;
        let countrySelect = `<option data-id="${id}">${name}</option>`;
        inputCountry.insertAdjacentHTML("beforeend", countrySelect);
      });
    });
  });
};

let showCountries = () => {
  inputCountry.innerHTML = "";
  let option = `<option selected></option>`;
  inputCountry.insertAdjacentHTML("afterbegin", option);
  let id = getSelectedOption(inputRegion);
  renderCountries(id.dataset.id);
};

let showCities = () => {
  inputCity.innerHTML = "";
  let option = `<option selected></option>`;
  inputCity.insertAdjacentHTML("afterbegin", option);
  let id = getSelectedOption(inputCountry);
  renderCities(id.dataset.id);
};

let getSelectedOption = (sel) => {
  var opt;
  for (var i = 0, len = sel.options.length; i < len; i++) {
    opt = sel.options[i];
    if (opt.selected === true) {
      break;
    }
  }
  return opt;
};

let renderCities = (countryId) => {
  fetch(`http://localhost:3000/city/${countryId}/cityList`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((cityCard) => {
    cityCard.json().then((cityCard) => {
      cityCard.forEach((city) => {
        const { id, name } = city;
        let citySelect = `<option>${name}</option>`;
        inputCity.insertAdjacentHTML("beforeend", citySelect);
      });
    });
  });
};

renderRegions();
