let regionContainer = document.getElementById("regionsContainer");
let regionName = document.getElementById("regionName");
let regionMessage = document.getElementById("regionMessage");
let modalConfirm = document.getElementById("confirmDelete");

//CLOSE MODALS
let close = () => {
  $("#addRegion").modal("hide");
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
        <i class="fas fa-edit"></i>
        <i class="far fa-trash-alt" onclick="deleteRegion(${id})"></i>
        <i class="fas fa-plus"></i>
        <div class="row">
            <div class="col">
                <div class="collapse multi-collapse" id="regionCollapse${id}">
                    <div class="card card-bodyCo">
                        <div class="countryContainer">
                            <h2 class="coTitle">
                                <a class="regionTree" data-toggle="collapse" href="#cityCollapse" role="button"
                                    aria-expanded="false" aria-controls="multiCollapseExample1">Colombia</a>
                            </h2>
                            <i class="fas fa-edit"></i>
                            <i class="far fa-trash-alt"></i>
                            <i class="fas fa-plus"></i>
                        </div>
                        <div class="col cityContainer">
                            <div class="collapse multi-collapse" id="cityCollapse">
                                <div class="card card-bodyCi">
                                    <h6>Medellín</h6>
                                    <i class="fas fa-edit"></i>
                                    <i class="far fa-trash-alt"></i>
                                </div>
                                <div class="card card-bodyCi">
                                    <h6>Bogotá</h6>
                                    <i class="fas fa-edit"></i>
                                    <i class="far fa-trash-alt"></i>
                                </div>
                            </div>
                        </div>
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
    console.log(data);
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
        <i class="fas fa-edit"></i>
        <i class="far fa-trash-alt" onclick="deleteRegion(${id})"></i>
        <i class="fas fa-plus"></i>
        <div class="row">
            <div class="col">
                <div class="collapse multi-collapse" id="regionCollapse${id}">
                    <div class="card card-bodyCo">
                        <div class="countryContainer">
                            <h2 class="coTitle">
                                <a class="regionTree" data-toggle="collapse" href="#cityCollapse" role="button"
                                    aria-expanded="false" aria-controls="multiCollapseExample1">Colombia</a>
                            </h2>
                            <i class="fas fa-edit"></i>
                            <i class="far fa-trash-alt"></i>
                            <i class="fas fa-plus"></i>
                        </div>
                        <div class="col cityContainer">
                            <div class="collapse multi-collapse" id="cityCollapse">
                                <div class="card card-bodyCi">
                                    <h6>Medellín</h6>
                                    <i class="fas fa-edit"></i>
                                    <i class="far fa-trash-alt"></i>
                                </div>
                                <div class="card card-bodyCi">
                                    <h6>Bogotá</h6>
                                    <i class="fas fa-edit"></i>
                                    <i class="far fa-trash-alt"></i>
                                </div>
                            </div>
                        </div>
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
