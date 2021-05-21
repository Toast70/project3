import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Display() {
    // state variables, set variables modify the real ones
    const [listings, setDisplayListings] = useState([]);
    const [displayConsole, setDisplayConsole] = useState(0);
    const DNE = 'Domain does not exist or cannot be reached';
    // retrieve data and put it into displayconsole
    useEffect(() => 
    {
        axios.get("http://csc225.mockable.io/consoles").then((response) => 
        {
            setDisplayListings(response.data);
        })
            .catch((error) => 
            {
                console.log(DNE);
            });
    }, []);

    // when displayConsole has a value that isn't false, display this. Calls the single display function
    if (displayConsole) 
    {
        return <div>
            <div className="d-flex bg-white">
                <div className="col-md-3 d-none d-md-block"></div>
                <SingleDisplay id={displayConsole} />
            </div>
            <button className=" btn btn-info mt-3" style={{ width: '200px', marginLeft: '40%' }} onClick={() => setDisplayConsole(false)}>Return</button>
        </div>
    }
    // only displays while we get all 4 consoles into our variable, hides itself
    while (listings.length !== 4) 
    {
        return <div>
            <div className="d-flex justify-content-center">Loading site ඞ</div>
            <div  className="d-flex justify-content-center"><img src="https://media1.tenor.com/images/e8b37aa3bee66e219a10398244734017/tenor.gif"></img></div>
        </div>
    }
    // display consoles
    return <div className="flex-column  m-0">
        <h1 className = "text-center pb-3">Popular Consoles to Play TERRARIA!</h1>
        {/* for each console, insert this html code */}
        {listings.map(console => 
        {
            return (
                <div className="  mb-3 d-flex flex-column " style={{ background: 'url(https://art.pixilart.com/40f3f542c7205ec.gif)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', paddingTop: '40%' }} key={console.id}>
                    <div className="p-0">
                        <img src={console.image} className="img-fluid rounded" style={{ width: 'auto', }} alt="console" />
                    </div>
                    <a className="mt-2"
                        onClick={() => setDisplayConsole(console.id)}>
                        {console.name}
                    </a>
                </div>
            );
        })}
    </div>
}

function SingleDisplay(consoleID) 
{
    const [consoleData, setConsoleData] = useState(false);
    const {id} = consoleID; //for some reason this only works when the var is assigned with {}
    // after some testing, it's linked to the params id meta, so this only works with {id}.
    const DNE = 'Domain does not exist or cannot be reached';
    useEffect(() => 
    {
        axios.get('http://csc225.mockable.io/consoles/' + id).then((response) => 
        {
            setConsoleData(response.data);
        })
            .catch((error) => 
            {
                console.log(DNE);//if the above fails, log this error code
            });
    });
    //loading screen of panda, once the useState changes, this no longer displays
    while (consoleData === false) 
    {
        return <div className="">
        <h2 className="text-center">We getting that info, just chill with this</h2>
        <img src="https://i0.wp.com/kmshea.com/wp-content/uploads/2014/10/sad-panda-strikes-back.jpg?resize=300%2C227&ssl=1" className="card-img-top" alt="console" />
        </div>
    }
    //once the above is finished, insert this html where the function is called, normal card template
    return  <div className="card" style={{ width: '500px' }}>
                <div className="d-flex no-gutters">
                    <div className=" align-self-center"><img className="card-img-top" src={consoleData.image}/></div>
                    <div className="">
                        <div className="card-body">
                            <h4 className="card-title">{consoleData.name}</h4>
                            <p className="card-text">Cost ${consoleData.price}</p>
                            <p className="card-text">Designed in {consoleData.country}</p>
                            <p className="card-text">Available since {consoleData.releaseYear}</p>
                        </div>
                    </div>
                </div>
            </div>
}

export default Display;