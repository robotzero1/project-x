import { navigate } from "gatsby";

export const isBrowser = () => typeof window !== "undefined";

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {};

const setUser = (user) =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user));

const updateUser = (user) =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user));  



export const handleLogin = ({ inputuser, inputpass }) => {
  console.log("handleLogin: " + inputuser + " " + inputpass );
  const myRequest = new Request(
    "https://f.co.uk/member/account.php",
    {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        inputuser: inputuser,
        inputpass: inputpass,
      }),
    }
  );

  fetch(myRequest)
    .then(handleErrors)
    .then((response) => response.json())
    .then((data) => {
      if (data.hasOwnProperty("error")) {
        showFailedMessage(data.error);
      } else {
        handleLoginSuccess(data);
      }
      console.log(data);
    })
    .catch((error) => console.log(error));

  return false;
};


export const handleAccountUpdate = ({ inputmemberemail, inputmembername }) => {
  console.log("handleUpdate: " + inputmemberemail + " " + inputmembername );
  const myRequest = new Request(
    "https://f.co.uk/member/account-edit.php",
    {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        inputuser: inputmemberemail,
        inputname: inputmembername,
        userid: getUser().idx
      }),
    }
  );

  fetch(myRequest)
    .then(handleErrors)
    .then((response) => response.json())
    .then((data) => {
      if (data.hasOwnProperty("error")) {
        showFailedMessage(data.error);
      } else {
        handleAccountUpdateSuccess(data);
      }
      console.log(data);
    })
    .catch((error) => console.log(error));

  return false;
};



function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

const showFailedMessage = (message) => {
  const messageArea = document.querySelector("#messagebox");
  messageArea.style.display = "block";
  messageArea.style.backgroundColor = "pink";
  messageArea.textContent = message;
};

const handleLoginSuccess = (data) => {
  setUser({
    id: data.member_no,
    idx: data.idx,
    card_number: data.cardno,
    card_code: data.cardcode,        
    name: data.name,
    email: data.email,    
    expiry: data.expiry,
  });
  navigate("/app/login"); // member will be logged in so another redirect from login to the user homepage  
};

const handleAccountUpdateSuccess = (data) => {
  updateUser({
    idx: getUser().idx,
    name: data.name,
    email: data.email,
    expiry: getUser().expiry,
  });
};

export const isLoggedIn = () => {
  const user = getUser();

  return !!user.name;
};

export const logout = (callback) => {
  setUser({});
  callback();
};
