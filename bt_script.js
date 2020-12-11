//function to retrieve info from the github boomtown endpoints
const fetchInfo = () => {
    const baseURL='https://api.github.com/orgs/boomtownroi'
    // default get request for the base endpoint
    axios.get(baseURL)
        .then(response => {
            const defaultResponse = response.data
            //verify that the updated value is later than the created date value
            if (defaultResponse.created_at < defaultResponse.updated_at){
                console.log('The updated date is later than the created at date')
            }
            else {
                console.log('Error, the created date is later than the updated date')
            }
            Object.values(defaultResponse).forEach(value => {
                //change value to string in order to check if it includes the URL
                if (value !== null){
                value = value.toString();
                }
                // if value includes correct url, make a get request and log the json response to the console or catch and log error message
                if (value.includes('https://api.github.com/orgs/BoomTownROI')){
                    // find the repos url, add in page and per page query to get the total amount to match at 41
                    if (value.includes('/repos')){
                        value = value + '?page=1&per_page=100'
                    }
                    axios.get(value)
                    .then(newResponse => {
                        console.log(`valid response, response from ${value} is:`, newResponse.data)
                        //verify that the initial repo count matches the response count, logs an error if not
                        if (value.includes('/repos')){
                            if (newResponse.data.length === defaultResponse.public_repos) {
                                console.log(`The public_repos count matches the total number of repositories pulled from the repos_url, equaling:  ${defaultResponse.public_repos}`)
                            }
                            else {
                                console.log(`Error, the counts do not match. The public_repos count is ${defaultResponse.public_repos} and the repos response count is ${newResponse.data.length}.`)
                            }
                        }
                    })
                    .catch(error => console.log(error));
                }                   
            })            
    })   
        .catch(error => console.log(error));   
};

fetchInfo();


// compare the 'public_repos' count against the repositories array returned from following the 'repos_url', verifying that the counts match