const applicationState = {
    requests: [],
    plumbers: [],
    completions: []
}

const API = "http://localhost:8088"

const mainContainer = document.querySelector("#container")

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (plumbersOnOrder) => {
                applicationState.plumbers = plumbersOnOrder
            }
        )
}

export const getPlumbers = () => {
    return [...applicationState.plumbers]
}

export const getCompletions = () => {
    return [...applicationState.completions]
}

export const getRequests = () => {
    const copyRequestArray = [...applicationState.requests]

    const completedRequests = copyRequestArray.map(request => {
        request.completed = !!applicationState.completions.find(completedOrder => completedOrder.requestId === request.id)
        return request
    }).sort((current, next) => {return current.completed - next.completed})

    console.log(completedRequests)

  return completedRequests

}

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const saveCompletion = (completionObject) => {
    return fetch(`${API}/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completionObject)
    })
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
    .then(response => response.json())
    .then(
        (completedOrders) => {
            applicationState.completions = completedOrders
        }
    )
}

export const requestIsComplete = (requestId) => {
    return fetch(`${API}/requests/${requestId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({isComplete: true})
    })
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}
