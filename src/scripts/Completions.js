import { getRequests, getPlumbers, getCompletions } from "./dataAccess.js";

const findPlumber = (requestObject) => {

    const plumbers = getPlumbers();
    const completions = getCompletions();

    for (const completion of completions) {
        if(completion.requestId === requestObject.id) {
            for (const plumber of plumbers) {
                if(completion.plumberId === plumber.id) {
                    return `${plumber.name}`
                }
        }
        }
    }
}

export const Completions = () => {
    const requests = getRequests();
    

    // get plumbers name
    // const plumbers = getPlumbers();
    // const completions = getCompletions();
    
    const completedRequests = requests.filter(request => request.isComplete === true)

    


    let html = `
          <ul class="request">
              ${completedRequests.map((request) => {
                  return `
                      <li class="request__list-items">${request.description}
                      
                      ${findPlumber(request)}
                    
                      <button class="request__delete" id="request--${request.id}">Delete</button>
                      </li>
                      `}).join("")}
          </ul>`;
  
    return html;
  };


  