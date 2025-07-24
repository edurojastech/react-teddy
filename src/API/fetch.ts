/* eslint-disable @typescript-eslint/no-explicit-any */
export async function CallFecth (data:any) {
  const response = await fetch("URL-API", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return await response.json();
}