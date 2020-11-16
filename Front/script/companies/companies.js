let form = document.querySelectorAll("#companyForm input,select");
let lackFields = document.querySelector("#lackFields");
let emailExist = document.querySelector("#emailExist");
let saveCompany = document.querySelector("#saveCompany");
let companyList = document.querySelector("#companyContainer");
let modalYes = document.getElementById("confirmDelete");
let ModalLabel = document.getElementById("ModalLabel");
let companyCountry = document.getElementById("companyCountry");
let companyCity = document.getElementById("companyCity");

//RENDER COMPANIES
let renderCompanies = () => {
  fetch("http://localhost:3000/company/list").then((companyCard) => {
    companyCard.json().then((companyCard) => {
      companyCard.forEach((companyC) => {
        const { id, name, country, city, address, email, phone } = companyC;
        let company = `
        <div class="company" id="company${id}">
        <input type="checkbox" class="selectComp" />
        <h4 class="companyN">${name}</h4>
        <h4 class="companyCo">${country}</h4>
        <h4 class="companyCi">${city}</h4>
        <h4 class="companyA">${address}</h4>
        <h4 class="companyE">${email}</h4>
        <h4 class="companyP">${phone}</h4>
        <i class="fas fa-edit" onclick="getCompanyInfo(${id})"></i>
        <i class="far fa-trash-alt" onclick="deleteCompany(${id})"></i>
      </div>`;
        companyList.insertAdjacentHTML("beforeend", company);
      });
    });
  });
};

renderCompanies();

//CLEAR FIELDS
let clear = () => {
  form.forEach((input) => {
    input.value = "";
  });
};

let getCompanyData = () => {
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
    name: formData.CompanyName,
    country: formData.companyCountry,
    city: formData.companyCity,
    address: formData.companyAddress,
    email: formData.companyEmail,
    phone: formData.companyPhone,
  };

  let data = JSON.stringify(data2);
  addCompany(data);
};

//ADD COMPANY

let addCompany = (data) => {
  event.preventDefault;
  fetch("http://localhost:3000/company/create", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      //   Authorization: "Bearer " + token,
    },
  }).then((res) => {
    if (res.status === 400) {
      emailExist.innerHTML =
        "*El email ya se encuentra registrado en otra compañia";
    } else if (res.status === 500) {
      lackFields.innerHTML =
        "*Tenemos problemas en el servidor, por favor intente mas tarde";
    } else {
      res.json().then((info) => {
        const { id, name, country, city, address, email, phone } = info;
        let company = `
        <div class="company" id="company${id}">
        <input type="checkbox" class="selectComp" />
        <h4 class="companyN">${name}</h4>
        <h4 class="companyCo">${country}</h4>
        <h4 class="companyCi">${city}</h4>
        <h4 class="companyA">${address}</h4>
        <h4 class="companyE">${email}</h4>
        <h4 class="companyP">${phone}</h4>
        <i class="fas fa-edit" onclick="getCompanyInfo(${id})"></i>
        <i class="far fa-trash-alt" onclick="deleteCompany(${id})"></i>
      </div>`;
        companyList.insertAdjacentHTML("beforeend", company);
        close();
        clear();
      });
    }
  });
};

//CLOSE MODAL
let close = () => {
  $("#addCompany").modal("hide");
};

//OPEN MODALS
let open = () => {
  $("#addCompany").modal("show");
};

let openDelete = () => {
  $("#deleteCompanyConfirm").modal("show");
};

//DELETE USER

let deleteCompany = (id) => {
  let objectId = { id: id };
  let jsonId = JSON.stringify(objectId);
  openDelete();
  modalYes.addEventListener("click", () => {
    fetch("http://localhost:3000/company/delete", {
      method: "DELETE",
      body: jsonId,
      headers: {
        "Content-Type": "application/json",
        //   Authorization: "Bearer " + token,
      },
    }).then((company) => {
      location.reload();
    });
  });
};

//UPDATE USERS
let getCompanyInfo = (id) => {
  fetch(`http://localhost:3000/company/${id}`).then((company) => {
    company.json().then((companyData) => {
      const { id, name, country, city, address, email, phone } = companyData;
      ModalLabel.innerHTML = "Editar compañia";
      form[0].value = name;
      form[1].value = country;
      form[2].value = city;
      form[3].value = address;
      form[4].value = email;
      form[5].value = phone;
      open();
      saveCompany.onclick = "";
      saveCompany.addEventListener("click", () => {
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
          name: formData.CompanyName,
          country: formData.companyCountry,
          city: formData.companyCity,
          address: formData.companyAddress,
          email: formData.companyEmail,
          phone: formData.companyPhone,
        };

        let data = JSON.stringify(data2);
        updateCompany(id, data);
        close();
        clear();
      });
    });
  });
};

let updateCompany = (id, data) => {
  fetch(`http://localhost:3000/company/update/${id}`, {
    method: "PATCH",
    body: data,
    headers: {
      "Content-Type": "application/json",
      //   Authorization: "Bearer " + token,
    },
  }).then((updatedCompany) => {
    updatedCompany.json().then((companyUpd) => {
      location.reload();
    });
  });
};

let renderCountries = () => {
  fetch(`http://localhost:3000/country/list`).then((allCountries) => {
    allCountries.json().then((countries) => {
      console.log(countries);
      countries.forEach((country) => {
        const { id, name } = country;
        let countrySelect = `<option data-id="${id}">${name}</option>`;
        companyCountry.insertAdjacentHTML("beforeend", countrySelect);
      });
    });
  });
};

let showCities = () => {
  companyCity.innerHTML = "";
  let option = `<option selected></option>`;
  companyCity.insertAdjacentHTML("afterbegin", option);
  let id = getSelectedOption(companyCountry);
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
        companyCity.insertAdjacentHTML("beforeend", citySelect);
      });
    });
  });
};

renderCountries();
