export async function get(url: string, auth: boolean = true) {

  const headers = commonHeaders(auth);

  const response = await fetch(url, {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  })

  if (!response.ok) {
    throw await response.json()
  }

  return await response.json()
}

export async function post(url: string, data: object = {}, auth: boolean = true) {

  const headers = commonHeaders(auth);

  var raw = JSON.stringify(data);

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: raw,
    redirect: 'follow'
  })

  if (!response.ok) {
    throw await response.json()
  }

  return await response.json()
}

export async function destroy(url: string, auth: boolean = true) {
  
    const headers = commonHeaders(auth);
  
    const response = await fetch(url, {
      method: 'DELETE',
      headers: headers,
      redirect: 'follow'
    })

    if (!response.ok) {
      throw await response.json()
    }
  
    return await response.json()
}

export async function put(url: string, data: object, auth: boolean = true) {

  const headers = commonHeaders(auth);

  var raw = JSON.stringify(data);

  const response = await fetch(url, {
    method: 'PUT',
    headers: headers,
    body: raw,
    redirect: 'follow'
  })

  if (!response.ok) {
    throw await response.json()
  }

  return await response.json()
}

export async function postMultipart(url: string, data: FormData, auth: boolean = true) {

  const headers = new Headers();
  
  headers.append("Authorization", localStorage.token);
  headers.append("Accept", "application/json");

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: data,
    redirect: 'follow'
  })

  if (!response.ok) {
    throw await response.json()
  }

  return await response.json()
}

function commonHeaders(auth: boolean) {
  const headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");

  if (auth) {
    headers.append("Authorization", localStorage.token);
  }

  return headers
}
