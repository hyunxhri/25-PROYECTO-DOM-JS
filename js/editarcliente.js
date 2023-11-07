const clientId = parseInt(localStorage.getItem("clientToEditId"))

export const editClientFromDB = (updatedClient) => {
    const requestDB = indexedDB.open("ClientsDB")

    requestDB.onupgradeneeded = (e) => {
      openDB(e)
    }

    requestDB.onsuccess = (e) => {
        const db = e.target.result
        const transaction = db.transaction(["clients"], "readwrite")
        const objectStore = transaction.objectStore("clients")
        const getRequest = objectStore.get(clientId)

        getRequest.onsuccess = (e) => {
            const existingClient = e.target.result
            if (existingClient) {
                existingClient.name = updatedClient.name
                existingClient.phone = updatedClient.phone
                existingClient.email = updatedClient.email
                existingClient.companyName = updatedClient.companyName

                const updateRequest = objectStore.put(existingClient)
                updateRequest.onsuccess = () => {
                    console.log("The client has been updated.")
                }

                updateRequest.onerror = () => {
                    console.error("Error updating the client.")
                }
            }
        }
    }

    requestDB.onerror = (e) => {
        console.error(`Database error: ${e.target.errorCode}`)
    }
}