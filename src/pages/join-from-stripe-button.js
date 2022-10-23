import React from "react";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Checkout from "../components/stripe-button"
import Layout from "../components/layout";

// const Join = () => {
//   const [state, setState] = React.useState({
//     inputcardnumber: "",
//     inputcardcode: "",
//     inputmembername: "",
//     inputmemberemail: "",
//     inputmemberpass: "",
//   });


//   const handleJoinFromCard = () => {
//     const myRequest = new Request(
//       "https://f.co.uk/member/join-from-card.php",
//       {
//         method: "POST",
//         mode: "cors",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           inputcardnumber: state["inputcardnumber"],
//           inputcardcode: state["inputcardcode"],
//           inputmembername: state["inputmembername"],
//           inputmemberemail: state["inputmemberemail"],
//           inputmemberpass: state["inputmemberpass"],          
//         }),
//       }
//     );

//     fetch(myRequest)
//       .then(handleErrors)
//       .then((response) => response.text())
//       .then((text) => {
//         console.log(text);
//         if (text.substring(0, 7) == "failed:") {
//           showFailedMessage(text.substring(7));
//         } else {
//           handleJoinSuccess(text);
//         }
//       })
//       .catch((error) => console.log(error));

//     return false;
//   };

//   function handleErrors(response) {
//     if (!response.ok) {
//       throw Error(response.statusText);
//     }
//     return response;
//   }

//   const showFailedMessage = (message) => {
//     const messageArea = document.querySelector("#messagebox");
//     messageArea.style.display = "block";
//     messageArea.style.backgroundColor = "pink";       
//     messageArea.textContent = message;
//   };

//   const handleJoinSuccess = (message) => {
//     const messageArea = document.querySelector("#messagebox");  
//     messageArea.style.display = "block";
//     messageArea.style.backgroundColor = "green";   
//     messageArea.textContent = message;
//   };

//   const handleUpdate = (event) => {
//     setState({
//       ...state,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     handleJoinFromCard();
//   };


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51IxVtkEsNAJdMMmsH80HVQ9eUtF1ft8ieGiGHUIYxcvC1yRWkjHtaT3Unl0mqXgXNDhrZp1htWifs5MrwmDszhvB00BFzQaHxx');

const Join = () => {
  return (
    <Layout>
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
    </Layout>
  );
};

//   return (
//     <Layout pageTitle="Join from Card">
//       <div>
//         <form
//           method="post"
//           onSubmit={(event) => {
//             handleSubmit(event);
//           }}
//         >
//           <label>
//             Card Number
//             <input
//               type="number"
//               required
//               name="inputcardnumber"
//               onChange={handleUpdate}
//             />
//           </label>
//           <label>
//             Card Code
//             <input
//               type="number"
//               required
//               name="inputcardcode"
//               onChange={handleUpdate}
//             />
//           </label>
//           <label>
//             Full Name
//             <input
//               type="text"
//               required
//               name="inputmembername"
//               onChange={handleUpdate}
//             />
//           </label>
//           <label>
//             Email
//             <input
//               type="email"
//               required
//               name="inputmemberemail"
//               onChange={handleUpdate}
//             />
//           </label>
//           <label>
//             Create Password
//             <input
//               type="text"
//               required
//               name="inputmemberpass"
//               onChange={handleUpdate}
//             />
//           </label>
//           <input type="submit" value="Join" />
//         </form>
//         <div id="messagebox"></div>
//       </div>
//     </Layout>
//   );
// };

// export default Join;


export default Join