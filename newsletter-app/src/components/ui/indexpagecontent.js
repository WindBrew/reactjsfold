import React, { Component } from "react";

export default class indexpagecontent extends Component {
  state = {
    titles: [],
  };
  async componentDidMount() {
    const apikey = process.env.REACT_APP_APIKEY;
    console.log(apikey);

    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apikey}`
    );
    const data = await res.json();
    const x = data.articles.map((item) => item.title);
    this.setState({ titles: x });
  }

  render() {
    return (
      <div className="w-screen">
        <div className="flex flex-col items-center">
          <div className="group max-h-[500px]  ml-2 mt-4 shadow-lg w-[40%] border-none rounded-md bg-gray-100 overflow-hidden">
            {" "}
            <div className="max-h-[40px]  transition-[max-height] duration-1000 ease-in-out group-hover:max-h-[500px]">
              <span className="block text-center text-3xl font-bold font-sans">
               WWN News
              </span>
              <span className="block font-serif opacity-0 scale-75 translate-y-[40px] transition-all duration-500  ease-in group-hover:opacity-100 group-hover:max-h-full group-hover:scale-100 group-hover:translate-y-[5px] group-hover:mb-4">
                <h4 className="text-center font-bold text-4xl">
                  Today's Headlines
                </h4>
                <ul className="mt-4">
                  {this.state.titles.slice(0,5).map((item, i , arr) => {
                    return (
                    <><li key={i} className="font-serif text-xl font-bold">{item}</li>
                    {
                    i !== arr.length - 1 ? <hr className="border-slate-400 border-0.5"/> : false
                    

                       
                    }
                   </>
                    )
                    
                  })}
                  
                </ul>
              </span>
            </div>
          </div>
          <div className=" group max-h-[500px] ml-2 mt-4 shadow-lg w-[40%] border-none rounded-md bg-gray-100 overflow-hidden">
            {" "}
            <div className="max-h-[40px] transition-[max-height] duration-1000 ease-in-out group-hover:max-h-[500px]">
              <span className="block text-center text-3xl font-bold font-sans">
                News X
              </span>
                <span className="block font-serif opacity-0 scale-75 translate-y-[40px] transition-all duration-500  ease-in group-hover:opacity-100 group-hover:max-h-full group-hover:scale-100 group-hover:translate-y-[5px] group-hover:mb-4">
               <h4 className="text-center font-bold font-serif text-4xl">
                  Today's Headlines
                </h4>
              <ul className="mt-4">
                {this.state.titles.slice(5,10).map((item,i,arr) =>{
                  return(<>
                  <li className="font-serif text-xl font-bold">{item}</li>
                  { i !== arr.length - 1 ?  <hr className="border-slate-400 border-0.5"/> : false
                    
                  }
                  </>)

                })

                }
                </ul>
                </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
