
export const addClientToDB = (client) => {
    const requestDB = indexedDB.open("ClientsDB")
    requestDB.onupgradeneeded = (e) => {
        openDB(e)
    }
  
    requestDB.onsuccess = (e) => {
      const db = e.target.result
      const data = db.transaction(["clients"], "readwrite")
      const object = data.objectStore("clients")
      const request = object.add(client)
  
      request.onsuccess = () => {
        console.log("Client succesfully added to database.")
      }
  
      request.onerror = () => {
        console.log("Error adding client to database.")
      } 
    }
  
    requestDB.onerror = (e) => {
      console.error(`Database error: ${e.target.errorCode}`)
    }
  }