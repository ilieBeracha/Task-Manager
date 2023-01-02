import jwtDecode from "jwt-decode";

export async function getIdJwt() {
    let token: any = window.localStorage.getItem('token');
    token = jwtDecode(token)
    return token.sub
}

export async function getFirstAndLastNameJwt() {
    let token: any = window.localStorage.getItem('token');
    token = jwtDecode(token)
    return token.firstName
}