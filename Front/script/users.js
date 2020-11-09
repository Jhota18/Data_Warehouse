let form = document.querySelectorAll("#userForm input,select");
let passwordMessage = document.querySelector("#passwordMessage");
let lackFields = document.querySelector("#lackFields");
let emailExist = document.querySelector(".emailExist");
let saveUser = document.querySelector("#saveUser");
let usersList = document.querySelector("#usersContainer");

//RENDER USERS
let renderUsers = () => {
  fetch("http://localhost:3000/users/list").then((userCard) => {
    userCard.json().then((userCard) => {
      userCard.forEach((userC) => {
        const { name, lastname, email, rol } = userC;
        limitFunctionPlus();
        let user = `
          <div class="user">
            <input type="checkbox" class="selectCont" />
            <h3 class="name">${name}</h3>
            <h3 class="lastName">${lastname}</h3>
            <h3 class="email">${email}</h3>
            <h3 class="profile">${rol}</h3>
            <i class="fas fa-edit" onclick="updateUser()"></i>
            <i class="far fa-trash-alt" onclick="deleteUser(this)"></i>
            <i
            class="far fa-trash-alt"
            data-target="#deleteConfirm${modalNumber}"
            data-toggle="modal"
            ></i>
          <div
            class="modal fade"
            id="deleteConfirm${modalNumber}"
            data-toggle="modal"
            tabindex="-1"
            aria-labelledby="deleteConfirmLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="deleteConfirmLabel">
                    ¿Está seguro que desea eliminar el usuario?
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-dismiss="modal"
                    onclick="deleteUser(this)"
                  >
                    SI
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-dismiss="modal"
                  >
                    NO
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>`;
        usersList.insertAdjacentHTML("beforeend", user);
      });
    });
  });
};

renderUsers();
//CLEAR FIELDS
let clear = () => {
  form.forEach((input) => {
    input.value = "";
  });
};

let getData = () => {
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

  if (formData.inputPassword !== formData.inputPasswordConf) {
    passwordMessage.innerHTML = "*Las contraseñas no coinciden";
  } else {
    let data2 = {
      name: formData.inputUserName,
      lastname: formData.inputUserLastName,
      email: formData.inputEmail,
      rol: formData.inputProfile,
      password: formData.inputPassword,
    };

    let data = JSON.stringify(data2);
    addUser(data);
  }
};

//PETICION PARA CREAR USURARIO
let modalNumber = 0;
let limitFunctionPlus = () => {
  modalNumber += 1;
};
let limitFunctionMinus = () => {
  modalNumber -= 1;
};

let addUser = (data) => {
  event.preventDefault;
  fetch("http://localhost:3000/users/signup", {
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
        const { name, lastname, email, rol } = info;
        limitFunctionPlus();
        let user = `
          <div class="user">
            <input type="checkbox" class="selectCont" />
            <h3 class="name">${name}</h3>
            <h3 class="lastName">${lastname}</h3>
            <h3 class="email">${email}</h3>
            <h3 class="profile">${rol}</h3>
            <i class="fas fa-edit" onclick="updateUser()"></i>
            <i
              class="far fa-trash-alt"
              data-target="#deleteConfirm${modalNumber}"
              
            ></i>
            <div
              class="modal fade"
              id="deleteConfirm${modalNumber}"
              data-toggle="modal"
              tabindex="-1"
              aria-labelledby="deleteConfirmLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="deleteConfirmLabel">
                      ¿Está seguro que desea eliminar el usuario?
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-dismiss="modal"
                      onclick="deleteUser(this)"
                    >
                      SI
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-dismiss="modal"
                    >
                      NO
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
        usersList.insertAdjacentHTML("beforeend", user);
        close();
        clear();
      });
    }
  });
};

//CLOSE MODAL
let close = () => {
  $("#addUser").modal("hide");
};

//OPEN MODAL
let open = () => {
  $("#addUser").modal("show");
};

//DELETE USER
let deleteUser = (value) => {
  let node1 = value.parentNode;
  let node2 = node1.closest(".user");
  let email = node2.childNodes[7].textContent;
  let objectEmail = { email: email };
  let jsonEmail = JSON.stringify(objectEmail);

  fetch("http://localhost:3000/users/delete", {
    method: "DELETE",
    body: jsonEmail,
    headers: {
      "Content-Type": "application/json",
      //   Authorization: "Bearer " + token,
    },
  }).then((user) => {
    console.log(user);
    limitFunctionMinus();
    location.reload();
  });
};

let updateUser = () => {
  open();
};
