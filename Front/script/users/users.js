let form = document.querySelectorAll("#userForm input,select");
let passwordMessage = document.querySelector("#passwordMessage");
let lackFields = document.querySelector("#lackFields");
let emailExist = document.querySelector(".emailExist");
let saveUser = document.querySelector("#saveUser");
let usersList = document.querySelector("#usersContainer");
let modalYes = document.getElementById("confirmDelete");
let updateBtn = document.querySelector(".modal-footer");

//RENDER USERS
let renderUsers = () => {
  fetch("http://localhost:3000/users/list").then((userCard) => {
    console.log(userCard);
    userCard.json().then((userCard) => {
      userCard.forEach((userC) => {
        const { name, lastname, email, rol } = userC;
        let user = `
          <div class="user">
            <input type="checkbox" class="selectCont" />
            <h3 class="name">${name}</h3>
            <h3 class="lastName">${lastname}</h3>
            <h3 class="email">${email}</h3>
            <h3 class="profile">${rol}</h3>
            <i class="fas fa-edit" onclick="getUserInfo('${email}')"></i>
            <i class="far fa-trash-alt" onclick="deleteUser('${email}')"></i>
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
    console.log(data);
    addUser(data);
  }
};

//PETICION PARA CREAR USURARIO

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
        let user = `
          <div class="user">
            <input type="checkbox" class="selectCont" />
            <h3 class="name">${name}</h3>
            <h3 class="lastName">${lastname}</h3>
            <h3 class="email">${email}</h3>
            <h3 class="profile">${rol}</h3>
            <i class="fas fa-edit" onclick="getUserInfo('${email}')"></i>
            <i class="far fa-trash-alt" onclick="deleteUser('${email}')"></i>
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
let getUserInfo = (emailValue) => {
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
        updateUser(id, data);
        close();
        clear();
      });
    });
  });
};

let updateUser = (id, data) => {
  fetch(`http://localhost:3000/users/update/${id}`, {
    method: "PATCH",
    body: data,
    headers: {
      "Content-Type": "application/json",
      //   Authorization: "Bearer " + token,
    },
  }).then((updatedUser) => {
    updatedUser.json().then((userUpd) => {
      console.log(userUpd);
    });
  });
};
