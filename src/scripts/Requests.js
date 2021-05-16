import { getRequests, deleteRequest, getPlumbers, saveCompletion, requestIsComplete } from "./dataAccess.js";

const mainContainer = document.querySelector("#container");

mainContainer.addEventListener("click", (click) => {
  if (click.target.id.startsWith("request--")) {
    const [, requestId] = click.target.id.split("--");
    deleteRequest(parseInt(requestId));
  }
});



mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
        

            const newDate = new Date()
            const completion = { 
                requestId : parseInt(requestId),
                plumberId : parseInt(plumberId),
                date_created : newDate.toLocaleDateString()
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(completion)

            requestIsComplete(parseInt(requestId))

        }
    }
)

export const Requests = () => {

    const requests = getRequests();
    const plumbers = getPlumbers();

    const incompleteRequests = requests.filter(request => request.isComplete === false)

  let html = `
        <ul class="request">
            ${incompleteRequests.map((request) => {
                return `
                    <li class="request__list-items">${request.description}

                    <select class="plumbers" id="plumbers">
                    <option value="">Choose</option>
                    ${plumbers.map((plumber) => {
                    return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`;
                    }).join("")}
                    </select>
                    
                    <button class="request__delete" id="request--${request.id}">Delete</button>
                    </li>
                    `}).join("")}
        </ul>`;

  return html;
};
