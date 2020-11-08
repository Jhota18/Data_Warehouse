let form = document.querySelectorAll("#userForm input,select");
let passwordMessage = document.querySelector("#passwordMessage");
let lackFields = document.querySelector("#lackFields");
let saveUser = document.querySelector("#saveUser");
let usersList = document.querySelector("#usersList");

//RENDER USERS
let renderUsers = () => {
  fetch("http://localhost:3000/users/list").then((userCard) => {
    userCard.json().then((userCard) => {
      userCard.forEach((userC) => {
        const { name, lastname, email, rol } = userC;
        let user = `
                <div class="user">
                <input type="checkbox" class="selectCont" />
                <img src="" alt="" class="photo" />
                <h3 class="name">${name}</h3>
                <h3 class="lastName">${lastname}</h3>
                <h3 class="email">${email}</h3>
                <h3 class="profile">${rol}</h3>
                <i class="fas fa-edit"></i>
                <i class="far fa-trash-alt"></i>
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
  console.log(formData);

  for (const key in formData) {
    if (formData[key] === "") {
      lackFields.innerHTML = "*Por favor llene todos los campos";
    }
  }

  if (formData.inputPassword !== formData.inputPasswordConf) {
    passwordMessage.innerHTML = "*Las contraseñas no coinciden";
  } else {
    formData["name"] = formData["inputUserName"];
    formData["lastname"] = formData["inputUserLastName"];
    formData["email"] = formData["inputEmail"];
    formData["rol"] = formData["inputProfile"];
    formData["password"] = formData["inputPassword"];
    delete formData.inputUserName;
    delete formData.inputUserLastName;
    delete formData.inputEmail;
    delete formData.inputProfile;
    delete formData.inputPassword;
    delete formData.inputPasswordConf;
    let data = JSON.stringify(formData);
    addUser(data);
    close();
    clear();
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
  }).then((user) => {
    user.json().then((info) => {
      console.log(info);
      const { name, lastname, email, rol } = info;
      let user = `
          <div class="user">
          <input type="checkbox" class="selectCont" />
          <img src="" alt="" class="photo" />
          <h3 class="name">${name}</h3>
          <h3 class="lastName">${lastname}</h3>
          <h3 class="email">${email}</h3>
          <h3 class="profile">${rol}</h3>
          <i class="fas fa-edit"></i>
          <i class="far fa-trash-alt"></i>
          </div>`;
      usersList.insertAdjacentHTML("beforeend", user);
    });
  });
};

//CLOSE MODAL
let close = () => {
  saveUser.setAttribute("data-dismiss", "modal");
};

// //RENDER USER
// let renderUsers = (user) => {

// };
