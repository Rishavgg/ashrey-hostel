// import Keycloak from "keycloak-js";
//
// const initKeycloak = () => {
//     const keycloak = new Keycloak({
//         url: "http://localhost:8080",  // Your Keycloak URL
//         realm: "my-realm",            // Your Keycloak realm
//         clientId: "my-client-id",     // Your Keycloak client ID
//     });
//
//     return new Promise<Keycloak>(resolve => {
//         keycloak.init({ onLoad: "login-required" }).then(() => {
//             resolve(keycloak);
//         });
//     });
// };
