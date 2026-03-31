 
export default async function handler (req,res){
   
    const response =  await fetch(`https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=${process.env.REACT_APP_NEWSLETTER_APIKEY}&page=${req.query.page}`)
        const data = await response.json()
        return res.json(data)
}