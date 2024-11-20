// import Keycloak from "keycloak-js";

// export const keycloak = new Keycloak({
//     url: "http://localhost:8080",
//     realm: "Ashrey",
//     clientId: "ashrey-manager-client",
// });

// export const initKeycloak = (): Promise<void> => {
//     return keycloak
//         .init({ onLoad: "login-required" })
//         .then(() => console.log("Login initialized"))
//         .catch((err) => console.error("Keycloak login failed: ", err));
// };

// export const getToken = (): string | undefined => keycloak.token;

// export const logout = async (): Promise<void> => await keycloak.logout();

// export const isLoggedIn = (): boolean => !!keycloak.authenticated;
