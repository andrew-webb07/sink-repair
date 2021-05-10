import { getRequests } from "./dataAccess.js"

export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul>
            ${
                requests.map(request => {
                    return `
                    <li>Description : ${request.description}</li>
                    `
                }).join("")
            }
        </ul>
    `

    return html
}