import { getRequests } from "./dataAccess.js"

export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul>
            ${
                requests.map(request => {
                    return `<li>Request#${request.id}</li>
                    <li>Description: ${request.description}</li>
                    <li>Address: ${request.address}</li>
                    <li>Customer Budget: ${request.budget}</li>
                    <li>Requested Completion Date${request.neededBy}</li>
                    `
                })
            }
        </ul>
    `

    return html
}