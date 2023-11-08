// SELECTORS.
const clientListTable = document.querySelector("#listado-clientes")

// FUNCTIONS.
const openDB = (e) => {
  const db = e.target.result
  const objectStore = db.createObjectStore("clients", {keyPath: 'id', autoIncrement: true})
  objectStore.createIndex("name", "name", { unique: false })
  objectStore.createIndex("email", "email", { unique: true })
  objectStore.createIndex("phone", "phone", { unique: true })
  objectStore.createIndex("companyName", "companyName", { unique: false })
}

const getClients = () => {
  const requestDB = indexedDB.open("ClientsDB")
  requestDB.onupgradeneeded = (e) => {
      openDB(e)
  }

  requestDB.onsuccess = (e) => {
    const db = e.target.result
    const data = db.transaction(["clients"], "readonly")
    const object = data.objectStore("clients")
    const request = object.getAll()

    request.onsuccess = () => {
      const clients = request.result
      loadClients(clients)
    }
  }
}

const deleteClientFromDB = (clientID) => {
  const requestDB = indexedDB.open("ClientsDB")
  requestDB.onupgradeneeded = (e) => {
      openDB(e)
  }

  requestDB.onsuccess = (e) => {
    const db = e.target.result
    const data = db.transaction(["clients"], "readwrite")
    const object = data.objectStore("clients")
    const request = object.delete(Number(clientID))

    request.onsuccess = () => {
      console.log("Client succesfully delete from database.")
    }

    request.onerror = () => {
      console.log("Error to delete client from database.")
    } 
  }

  requestDB.onerror = (e) => {
    console.error(`Database error: ${e.target.errorCode}`)
  }
}



const loadClients = (clients) => {
    clients.forEach(client => {
      const row = clientListTable.insertRow()
      row.innerHTML= `
      <td class="px-6 py-3">${client.name}</td>
      <td class="px-6 py-3">${client.phone}</td>
      <td class="px-6 py-3">${client.companyName}</td>
      <td class="px-6 py-3">
        <button class="delete-button bg-red-500 hover:bg-red-600 font-bold px-2 rounded" client-id="${client.id}">X</button>
        <button class="edit-button bg-gray-500 hover:bg-gray-600 font-bold px-2 rounded" client-id="${client.id}" onclick="window.location.href='./editar-cliente.html'">Edit</button>
      </td>
      `
    })
  }
  

// LISTENERS.
if(clientListTable) document.addEventListener("DOMContentLoaded", getClients)
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-button")) {
    e.target.parentElement.parentElement.remove()
    const clientId = e.target.getAttribute("client-id")
    deleteClientFromDB(clientId)
  }
})
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-button")) {
    const clientId = e.target.getAttribute("client-id")
    localStorage.setItem("clientToEditId", clientId)
  }
})