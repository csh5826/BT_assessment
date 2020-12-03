//function to retrieve info from the github boomtown endpoints
const fetchInfo = () => {
    const baseURL='https://api.github.com/orgs/boomtownroi'
    // default get request for the base endpoint and the repos endpoint
    axios.all([axios.get(baseURL),
               axios.get(baseURL + '/repos')])
        .then(axios.spread((defaultResponse, reposResponse) => {
            const boomTownInfo = defaultResponse.data
            const reposInfo = reposResponse.data
            const publicReposCount = defaultResponse.data.public_repos
            const reposResponseCount = reposResponse.data.length  
            console.log('BoomTown default route info:', boomTownInfo);
            console.log('BoomTown repos info:', reposInfo)
            //verify that the updated value is later than the created date value
            if (boomTownInfo.created_at < boomTownInfo.updated_at){
                console.log('The updated date is later than the created at date')
            }
            else {
                console.log('Error, the created date is later than the updated date')
            }
            //verify that the initial repo count matches the response count, logs an error if not
            if (publicReposCount == reposResponseCount) {
                console.log(`The two counts match, equaling ${publicReposCount}`)
            }
            else {
                console.log(`Error, the counts do not match. The public_repos count is ${publicReposCount} and the repos response count is ${reposResponseCount}.`)
            }
        }))
        .catch(error => console.log(error));   
    // request for the events endpoint
    axios.get(baseURL + '/events')
        .then(eventsResponse => {
            const eventsInfo = eventsResponse.data
            console.log('BoomTown events info:', eventsInfo);
        })
        .catch(error => console.error(error))
    //request for the hooks endpoint
    axios.get(baseURL + '/hooks')
        .then(hooksResponse => {
            const hooksInfo = hooksResponse.data
            console.log('BoomTown hooks info:', hooksInfo);
        })
        .catch(error => console.error(error))
    // request for the issues endpoint
    axios.get(baseURL + '/issues')
        .then(issuesResponse => {
            const issuesInfo = issuesResponse.data
            console.log('BoomTown issues info:', issuesInfo);
        })
        .catch(error => console.error(error))
    //request for the members endpoint
    axios.get(baseURL + '/members')
        .then(membersResponse => {
            const membersInfo = membersResponse.data
            console.log('BoomTown members info:', membersInfo);
        })
        .catch(error => console.error(error))
    //request for the public members endpoint
    axios.get(baseURL + '/public_members')
        .then(publicMembersResponse => {
            const publicMembersInfo = publicMembersResponse.data
            console.log('BoomTown public members info:', publicMembersInfo);
        })
        .catch(error => console.error(error))
};

fetchInfo();




