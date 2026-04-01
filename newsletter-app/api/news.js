 
export default async function handler (req,res){
   
    const response =  await fetch(`https://content.guardianapis.com/search?api-key=${process.env.REACT_APP_NEWSLETTER_APIKEY}&page=${req.query.page}${req.query.section ? `&section=${req.query.section}` : ""}&show-fields=thumbnail,trailText,wordcount,lastModified`)
        const data = await response.json()
        return res.json(data)
}
//this is imp whenever you do fetch
//in back a server after the url the parameters begin after ?
//so it splits url from parameter cluster after ? and splits parameters by &
//if u have a function asking for req or parameters in req is just a var not necessarily to be req
//well as i was saying it will pass in the first param of the func
//its req object that will look like
// req = {
//     query : {parameters / page : x , category: x}
// } 
//so when u do req or x.query.page you get this page and if the call passed anything after ? 
//it returns it in the x here via as we discussed
//returns req obj and we here called req.query.page
//thats how it splits and stores whatever it gets in fetch call
//and if called like we did its used else just stored not used no issue
//we used to manipulate page numbers 
//note : never break a url in two lines inside a template lliteral for better readability
//else it will literally go to next line and divide the url into 2 cus its template literals
//emphasis of res here is this in my own words -
//its the same as how i would pass a function that 
// sets a state using its parameter and pass that func to child to update a parent state
//today i learnt that the env variable prefix REACT_APP is only needed inside react app
//as api is outside to access it we can ommit the REACT_APP prefix from env 