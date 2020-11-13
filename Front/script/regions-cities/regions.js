//REGION DOM ELEMENTS
let regionContainer = document.getElementById("regionsContainer");
let regionName = document.getElementById("regionName");
let regionMessage = document.getElementById("regionMessage");
let modalConfirm = document.getElementById("confirmDelete");
let addRegionBtn = document.getElementById("addRegionBtn");

//COUNTRY DOM ELEMENTS
let countryName = document.getElementById("countryName");
let countryMessage = document.getElementById("countryMessage");
let addCountryBtn = document.getElementById("addCountryBtn");

//OPEN MODALS
let open = () => {
  $("#addRegion").modal("show");
};

let openCountry = () => {
  $("#addCountry").modal("show");
};
//CLOSE MODALS
let close = () => {
  $("#addRegion").modal("hide");
};

let closeCountry = () => {
  $("#addCountry").modal("hide");
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
        <h1 class="regionTittle">
            <a class="regionTree" data-toggle="collapse" href="#regionCollapse${id}" role="button" aria-expanded="false"
                aria-controls="multiCollapseExample1">${name}</a>
        </h1>
        <i class="fas fa-edit" onclick="getRegionInfo(${id}, '${name}')"></i>
        <i class="far fa-trash-alt" onclick="deleteRegion(${id})"></i>
        <i class="fas fa-plus" onclick="getCountryData(${id})"></i>
        <div class="row">
            <div class="col">
                <div class="collapse multi-collapse" id="regionCollapse${id}">
                    <div class="card card-bodyCo${id}">
                        
                    </div>
                </div>
            </div>
        </div>
    </section>`;
        regionContainer.insertAdjacentHTML("beforeend", region);
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
        <h1 class="regionTittle">
            <a class="regionTree" data-toggle="collapse" href="#regionCollapse${id}" role="button" aria-expanded="false"
                aria-controls="multiCollapseExample1">${name}</a>
        </h1>
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
  let countryData = countryName.value;
  console.log(countryData);

  if (countryData === "") {
    countryMessage.innerHTML =
      "*Por favor ingrese el nombre del país a agregar";
  } else {
    let dataObject = {
      name: countryData,
      regionId: regionId,
    };
    let data = JSON.stringify(dataObject);
    addCountryBtn.addEventListener("click", () => {
      addCountry(data);
    });
  }
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
        let regionCard = document.getElementById(`countryCard${regionId}`);
        let countryCard = `<div class="countryContainer" id="countryCard${regionId}">
        <h2 class="coTitle">
          <a
            class="regionTree"
            data-toggle="collapse"
            href="#cityCollapse${regionId}"
            role="button"
            aria-expanded="false"
            aria-controls="multiCollapseExample1"
            >${name}</a
          >
        </h2>
        <i class="fas fa-edit"></i>
        <i class="far fa-trash-alt"></i>
        <i class="fas fa-plus"></i>
      </div>`;
        regionCard.insertAdjacentHTML("beforeend", countryCard);
        close();
        clear();
      });
    }
  });
};
