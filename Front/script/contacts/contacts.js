let form = document.querySelectorAll("#contactForm input,select");
let lackFields = document.querySelector("#lackFields");
let emailExist = document.querySelector(".emailExist");
let saveContact = document.querySelector("#saveContact");
let contactList = document.querySelector("#contactsContainer");
let modalYes = document.getElementById("confirmDelete");
let inputRegion = document.getElementById("inputRegion");
let inputCountry = document.getElementById("inputCountry");
let inputCity = document.getElementById("inputCity");
// let updateBtn = document.querySelector(".modal-footer");

//RENDER USERS
let renderContacts = () => {
  fetch("http://localhost:3000/contact/list").then((contactCard) => {
    console.log(contactCard);
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
        let contact = `
        <div class="contact">
          <input type="checkbox" class="selectCont" />
          <h3 class="name">${name + "" + lastname}</h3>
          <p class="email">${email}</p>
          <h3 class="country">${country}</h3>
          <p class="region">${region}</p>
          <h3 class="company">${company}</h3>
          <h3 class="role">${role}</h3>
          <div class="progress">
            <div
              class="progress-bar bg-danger"
              role="progressbar"
              style="width: ${interest}%"
              aria-valuenow="${interest}"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <i class="fas fa-edit"></i>
          <i class="far fa-trash-alt"></i>
        </div>`;
        contactList.insertAdjacentHTML("beforeend", contact);
      });
    });
  });
};

// renderContacts();
//CLEAR FIELDS
let clear = () => {
  form.forEach((input) => {
    input.value = "";
  });
};

let getContactData = () => {
  let formData = Array.from(form).reduce(
    (acc, input) => ({
      ...acc,
      [input.id]: input.value,
    }),
    {}
  );
  console.log(formData);
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
      //   Authorization: "Bearer " + token,
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
        let contact = `
        <div class="contact">
          <input type="checkbox" class="selectCont" />
          <h3 class="name">${name + "" + lastname}</h3>
          <p class="email">${email}</p>
          <h3 class="country">${country}</h3>
          <p class="region">${region}</p>
          <h3 class="company">${company}</h3>
          <h3 class="role">${role}</h3>
          <div class="progress">
            <div
              class="progress-bar bg-danger"
              role="progressbar"
              style="width: ${interest}%"
              aria-valuenow="${interest}"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <i class="fas fa-edit"></i>
          <i class="far fa-trash-alt"></i>
        </div>`;
        contactList.insertAdjacentHTML("beforeend", contact);
        // close();
        // clear();
      });
    }
  });
};

//CLOSE MODAL
let close = () => {
  $("#addUser").modal("hide");
};

//OPEN MODALS
let open = () => {
  $("#addUser").modal("show");
};

let openDelete = () => {
  $("#deleteConfirm").modal("show");
};

//DELETE USER

let deleteUser = (email) => {
  let objectEmail = { email: email };
  let jsonEmail = JSON.stringify(objectEmail);
  openDelete();
  modalYes.addEventListener("click", () => {
    fetch("http://localhost:3000/users/delete", {
      method: "DELETE",
      body: jsonEmail,
      headers: {
        "Content-Type": "application/json",
        //   Authorization: "Bearer " + token,
      },
    }).then((user) => {
      location.reload();
    });
  });
};

//UPDATE USERS
let getContactInfo = (emailValue) => {
  fetch(`http://localhost:3000/users/user/${emailValue}`).then((user) => {
    user.json().then((userData) => {
      const { id, name, lastname, email, rol } = userData;
      form[0].value = name;
      form[1].value = lastname;
      form[2].value = email;
      form[3].value = rol;
      open();
      saveUser.onclick = "";
      saveUser.addEventListener("click", () => {
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
          name: formData.inputUserName,
          lastname: formData.inputUserLastName,
          email: formData.inputEmail,
          rol: formData.inputProfile,
          password: formData.inputPassword,
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
  fetch(`http://localhost:3000/users/update/${id}`, {
    method: "PATCH",
    body: data,
    headers: {
      "Content-Type": "application/json",
      //   Authorization: "Bearer " + token,
    },
  }).then((updatedUser) => {
    updatedUser.json().then((userUpd) => {
      location.reload();
      console.log(userUpd);
    });
  });
};

let renderRegions = () => {
  fetch("http://localhost:3000/region/list").then((regionCard) => {
    console.log(regionCard);
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
  fetch(`http://localhost:3000/country/${regionId}/countryList`).then(
    (allCountries) => {
      allCountries.json().then((countries) => {
        console.log(countries);
        countries.forEach((country) => {
          const { id, name } = country;
          let countrySelect = `<option data-id="${id}">${name}</option>`;
          inputCountry.insertAdjacentHTML("beforeend", countrySelect);
        });
      });
    }
  );
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
  fetch(`http://localhost:3000/city/${countryId}/cityList`).then((cityCard) => {
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
