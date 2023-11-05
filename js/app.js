const tableHTML = document.querySelector("table.min-w-full")

  const createDB = (client) => {
    const requestDB = indexedDB.open("ClientsDB", 2)
    requestDB.onupgradeneeded = (e) => {
        const db = e.target.result
        const objectStore = db.createObjectStore("clients", {keyPath: 'id'})
        objectStore.createIndex("name", "name", { unique: false })
        objectStore.createIndex("email", "email", { unique: true })
        objectStore.createIndex("phone", "phone", { unique: true })
        objectStore.createIndex("companyName", "companyName", { unique: false })
    }

    requestDB.onsuccess = () => {
      addClient(client)
      //loadContent()
    }

    requestDB.onerror = (e) => {
      console.error(`Database error: ${e.target.errorCode}`)
  }

    requestDB.oncomplete = () => {
      db.close()
    }
}

const addClient = (client) => {
  console.log(client)
  const requestDB = indexedDB.open("ClientsDB", 2)
  requestDB.onsuccess = (e) => {
    const db = e.target.result
    const data = db.transaction("clients", "readwrite")
    const object = data.objectStore("clients")
    const request = object.put(client)

    request.onsuccess = () => {
      console.log('Object successfully added')
    }

    request.onerror = () => {
        alert(`${request.error.name}: ${request.error.message}`)
    }
    
    data.oncomplete = () => {  
      db.close() 
    } 

  }

  requestDB.onerror = () => {
    console.error('Error opening database for adding a client')
  }

}


/*const loadContent = () => {
    let active = requestDB.result;
    const data = active.transaction(["clients"], "readonly");
    const unitData = data.objectStore("clients")
    let allClients = []
    unitData.openCursor().onsuccess = (e) => {

      var result = e.target.result

      if (result === null) {
          return
      }

      allClients.push(result.value)
      result.continue()
    }

    data.oncomplete = () => {
      for(let client in allClients){
        console.log(allClients[client].name)
      }
    }

}*/
