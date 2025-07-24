/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Cliente } from "../types/Cliente";

const UrlAPI = "https://boasorte.teddybackoffice.com.br"

export async function postClient (data: Cliente) {
  const response = await fetch(`${UrlAPI}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "accept": "*/*"
    },
    body: JSON.stringify(data),
  })
  return await response.json();
}

export async function getClients (page: number, limit: number) {
  const response = await fetch(`${UrlAPI}/users/?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: {
      "accept": "*/*",
    },
  })
  return await response.json();
}