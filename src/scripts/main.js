import { fetchCompletions, fetchPlumbers, fetchRequests } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"


const mainContainer = document.querySelector("#container")

const render = () => {
    fetchCompletions()
    .then(fetchRequests)
    .then(fetchPlumbers
        .then(
        () => {
            mainContainer.innerHTML = SinkRepair()
        }
        )
    )
}

render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)

