//REGION DOM ELEMENTS
let regionContainer = document.getElementById("regionsContainer");
let regionName = document.getElementById("regionName");
let regionMessage = document.getElementById("regionMessage");
let modalConfirm = document.getElementById("confirmDelete");
let addRegionBtn = document.getElementById("addRegionBtn");
let ModalLabelRegion = document.getElementById("ModalLabelRegion");

//COUNTRY DOM ELEMENTS
let countryName = document.getElementById("countryName");
let countryMessage = document.getElementById("countryMessage");
let addCountryBtn = document.getElementById("addCountryBtn");
let modalCountryConfirm = document.getElementById("confirmDeleteCountry");
let ModalLabelCountry = document.getElementById("ModalLabelCountry");

//CITY DOM ELEMENTS
let cityName = document.getElementById("cityName");
let cityMessage = document.getElementById("cityMessage");
let addCityBtn = document.getElementById("addCityBtn");
let ModalLabelCity = document.getElementById("ModalLabelCity");
let modalCityConfirm = document.getElementById("confirmDeleteCity");

//OPEN MODALS
let open = () => {
  $("#addRegion").modal("show");
};

let openCountry = () => {
  $("#addCountry").modal("show");
};

let openCity = () => {
  $("#addCity").modal("show");
};
//CLOSE MODALS
let close = () => {
  $("#addRegion").modal("hide");
};

let closeCountry = () => {
  $("#addCountry").modal("hide");
};

let closeCity = () => {
  $("#addCity").modal("hide");
};
//CLEAR MODAL FIELDS
let clear = () => {
  regionName.value = "";
};

let renderRegions = () => {
  fetch("http://localhost:3000/region/list").then((regionCard) => {
    console.log(regionCard);
    regionCard.json().then((regionCard) => {
      regionCard.forEach((regionC) => {
        const { id, name } = regionC;
        let region = `<section class="region" id=regionId${id}>
        <h2 class="regionTittle">
            <b><a class="regionTree" data-toggle="collapse" href="#regionCollapse${id}" role="button" aria-expanded="false"
                aria-controls="multiCollapseExample1">${name}</a></b>
        </h2>
        <i class="fas fa-edit" onclick="getRegionInfo(${id}, '${name}')"></i>
        <i class="far fa-trash-alt" onclick="deleteRegion(${id})"></i>
        <i class="fas fa-plus" onclick="getCountryData(${id})"></i>
        <div class="row">
            <div class="col">
                <div class="collapse multi-collapse" id="regionCollapse${id}">
                    <div class="card card-bodyCo" id="countryCard${id}">
                        
                    </div>
                </div>
            </div>
        </div>
    </section>`;
        regionContainer.insertAdjacentHTML("beforeend", region);
        renderCountries(id);
      });
    });
  });
};
renderRegions();

let getData = () => {
  let regionData = regionName.value;
  console.log(regionData);

  if (regionData === "") {
    regionMessage.innerHTML =
      "*Por favor ingrese el nombre de la región a agregar";
  } else {
    let dataObject = {
      name: regionData,
    };
    let data = JSON.stringify(dataObject);
    addRegion(data);
  }
};

//ADD REGION
let addRegion = (data) => {
  event.preventDefault;
  fetch("http://localhost:3000/region/create", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      //   Authorization: "Bearer " + token,
    },
  }).then((res) => {
    if (res.status === 400) {
      regionMessage.innerHTML = "*Ya existe una región con este nombre";
    } else {
      res.json().then((info) => {
        console.log(info);
        const { id, name } = info;
        let regionCard = `<section class="region" id=regionId${id}>
        <h2 class="regionTittle">
          <b><a class="regionTree" data-toggle="collapse" href="#regionCollapse${id}" role="button" aria-expanded="false"
                aria-controls="multiCollapseExample1">${name}</a></b>
        </h2>
        <i class="fas fa-edit" onclick="getRegionInfo(${id}, '${name}')"></i>
        <i class="far fa-trash-alt" onclick="deleteRegion(${id})"></i>
        <i class="fas fa-plus" onclick="getCountryData(${id})"></i>
        <div class="row">
            <div class="col">
                <div class="collapse multi-collapse" id="regionCollapse${id}">
                    <div class="card card-bodyCo" id="countryCard${id}">
                        
                    </div>
                </div>
            </div>
        </div>
    </section>`;
        regionContainer.insertAdjacentHTML("beforeend", regionCard);
        close();
        clear();
      });
    }
  });
};

//DELETE REGION
let regionOpenDelete = () => {
  $("#regionDeleteConfirm").modal("show");
};

let deleteRegion = (id) => {
  regionOpenDelete();
  modalConfirm.addEventListener("click", () => {
    fetch(`http://localhost:3000/region/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        //   Authorization: "Bearer " + token,
      },
    }).then((response) => {
      location.reload();
    });
  });
};

//UPDATE REGION
let getRegionInfo = (id, name) => {
  fetch(`http://localhost:3000/region/${id}`).then((region) => {
    region.json().then((regionInfo) => {
      regionName.value = name;
      open();
      ModalLabelRegion.innerHTML = "Editar Región";
      addRegionBtn.onclick = "";
      addRegionBtn.addEventListener("click", () => {
        let newData = regionName.value;
        let dataObject = {
          name: newData,
        };
        let data = JSON.stringify(dataObject);
        updateRegion(id, data);
        close();
      });
    });
  });
};

let updateRegion = (id, data) => {
  fetch(`http://localhost:3000/region/update/${id}`, {
    method: "PATCH",
    body: data,
    headers: {
      "Content-Type": "application/json",
      //   Authorization: "Bearer " + token,
    },
  }).then((updatedRegion) => {
    updatedRegion.json().then((regionUpd) => {
      console.log(regionUpd);
      location.reload();
    });
  });
};

//ADD COUNTRY
let getCountryData = (regionId) => {
  openCountry();

  addCountryBtn.addEventListener("click", () => {
    let countryData = countryName.value;

    if (countryData === "") {
      countryMessage.innerHTML =
        "*Por favor ingrese el nombre del país a agregar";
    } else {
      let dataObject = {
        name: countryData,
        regionId: regionId,
      };
      let data = JSON.stringify(dataObject);
      console.log(data);
      addCountry(data);
    }
  });
};

let addCountry = (data) => {
  event.preventDefault;
  fetch("http://localhost:3000/country/create", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      //   Authorization: "Bearer " + token,
    },
  }).then((res) => {
    if (res.status === 400) {
      countryMessage.innerHTML = "*Ya existe un país con este nombre";
    } else {
      res.json().then((info) => {
        console.log(info);
        const { id, name, regionId } = info;
        let regionCard = document.querySelector(`#countryCard${regionId}`);
        console.log(regionCard);
        let countryCard = `<div class="countryContainer" id="countryC${id}">
        <h4 class="coTitle">
          <a
            class="regionTree"
            data-toggle="collapse"
            href="#cityCollapse${id}"
            role="button"
            aria-expanded="false"
            aria-controls="multiCollapseExample1"
          >${name}</a>
        </h4>
        <i class="fas fa-edit" onclick="getCountryInfo(${id}, '${name}')"></i>
        <i class="far fa-trash-alt" onclick="deleteCountry(${id})"></i>
        <i class="fas fa-plus" onclick="getCityData(${id})"></i>
      </div>
      <div class="col cityContainer">
        <div class="collapse multi-collapse" id="cityCollapse${id}">

        </div>
      </div>`;
        regionCard.insertAdjacentHTML("beforeend", countryCard);
        closeCountry();
        // clear();
      });
    }
  });
};

let renderCountries = (regionId) => {
  fetch(`http://localhost:3000/country/${regionId}/countryList`).then(
    (countryCard) => {
      countryCard.json().then((countryCard) => {
        countryCard.forEach((country) => {
          const { id, name, regionId } = country;
          let regionCard = document.querySelector(`#countryCard${regionId}`);
          let countryCard = `<div class="countryContainer" id="countryC${id}">
        <h4 class="coTitle">
          <a
            class="regionTree"
            data-toggle="collapse"
            href="#cityCollapse${id}"
            role="button"
            aria-expanded="false"
            aria-controls="multiCollapseExample1"
          >${name}</a>
        </h4>
        <i class="fas fa-edit" onclick="getCountryInfo(${id}, '${name}')"></i>
        <i class="far fa-trash-alt" onclick="deleteCountry(${id})"></i>
        <i class="fas fa-plus" onclick="getCityData(${id})"></i>
      </div>
      <div class="col cityContainer">
        <div class="collapse multi-collapse" id="cityCollapse${id}">
        
        </div>
      </div>`;
          regionCard.insertAdjacentHTML("beforeend", countryCard);
          renderCities(id);
        });
      });
    }
  );
};

//UPDATE COUNTRY
let getCountryInfo = (id, name) => {
  fetch(`http://localhost:3000/country/${id}`).then((country) => {
    country.json().then((countryInfo) => {
      countryName.value = name;
      openCountry();
      ModalLabelCountry.innerHTML = "Editar país";
      addCountryBtn.addEventListener("click", () => {
        let newData = countryName.value;
        let dataObject = {
          name: newData,
        };
        let data = JSON.stringify(dataObject);
        updateCountry(id, data);
        closeCountry();
      });
    });
  });
};

let updateCountry = (id, data) => {
  fetch(`http://localhost:3000/country/update/${id}`, {
    method: "PATCH",
    body: data,
    headers: {
      "Content-Type": "application/json",
      //   Authorization: "Bearer " + token,
    },
  }).then((updatedCountry) => {
    updatedCountry.json().then((countryUpd) => {
      location.reload();
    });
  });
};

//DELETE COUNTRY
let countryOpenDelete = () => {
  $("#countryDeleteConfirm").modal("show");
};

let deleteCountry = (id) => {
  countryOpenDelete();
  modalCountryConfirm.addEventListener("click", () => {
    fetch(`http://localhost:3000/country/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        //   Authorization: "Bearer " + token,
      },
    }).then((response) => {
      location.reload();
    });
  });
};

//ADD CITY
let getCityData = (countryId) => {
  openCity();

  addCityBtn.addEventListener("click", () => {
    let cityData = cityName.value;

    if (cityData === "") {
      cityMessage.innerHTML =
        "*Por favor ingrese el nombre de la ciudad a agregar";
    } else {
      let dataObject = {
        name: cityData,
        countryId: countryId,
      };
      let data = JSON.stringify(dataObject);
      console.log(data);
      addCity(data);
    }
  });
};

let addCity = (data) => {
  event.preventDefault;
  fetch("http://localhost:3000/city/create", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      //   Authorization: "Bearer " + token,
    },
  }).then((res) => {
    if (res.status === 400) {
      cityMessage.innerHTML = "*Ya existe una ciudad con este nombre";
    } else {
      res.json().then((info) => {
        console.log(info);
        const { id, name, countryId } = info;
        let countryCard = document.querySelector(`#cityCollapse${countryId}`);
        console.log(countryCard);
        let cityCard = `
        <div class="card card-bodyCi" id="cityCard${id}">
          <h6>${name}</h6>
          <i class="fas fa-edit" onclick="getCityInfo(${id}, '${name}')"></i>
          <i class="far fa-trash-alt" onclick="deleteCity(${id})"></i>
        </div>`;
        countryCard.insertAdjacentHTML("beforeend", cityCard);
        closeCity();
        // clear();
      });
    }
  });
};

let renderCities = (countryId) => {
  fetch(`http://localhost:3000/city/${countryId}/cityList`).then((cityCard) => {
    cityCard.json().then((cityCard) => {
      cityCard.forEach((city) => {
        const { id, name, countryId } = city;
        let regionCard = document.querySelector(`#cityCollapse${countryId}`);
        let cityCard = `
        <div class="card card-bodyCi" id="cityCard${id}">
          <h6>${name}</h6>
          <i class="fas fa-edit" onclick="getCityInfo(${id}, '${name}')"></i>
          <i class="far fa-trash-alt" onclick="deleteCity(${id})"></i>
        </div>`;
        regionCard.insertAdjacentHTML("beforeend", cityCard);
      });
    });
  });
};

//UPDATE CITY
let getCityInfo = (id, name) => {
  fetch(`http://localhost:3000/city/${id}`).then((city) => {
    city.json().then((cityInfo) => {
      cityName.value = name;
      openCity();
      ModalLabelCity.innerHTML = "Editar ciudad";
      addCityBtn.addEventListener("click", () => {
        let newData = cityName.value;
        let dataObject = {
          name: newData,
        };
        let data = JSON.stringify(dataObject);
        updateCity(id, data);
        closeCountry();
      });
    });
  });
};

let updateCity = (id, data) => {
  fetch(`http://localhost:3000/city/update/${id}`, {
    method: "PATCH",
    body: data,
    headers: {
      "Content-Type": "application/json",
      //   Authorization: "Bearer " + token,
    },
  }).then((updatedCity) => {
    updatedCity.json().then((updatedCity) => {
      location.reload();
    });
  });
};

//DELETE CITY
let cityOpenDelete = () => {
  $("#cityDeleteConfirm").modal("show");
};

let deleteCity = (id) => {
  cityOpenDelete();
  modalCityConfirm.addEventListener("click", () => {
    fetch(`http://localhost:3000/city/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        //   Authorization: "Bearer " + token,
      },
    }).then((response) => {
      location.reload();
    });
  });
};
