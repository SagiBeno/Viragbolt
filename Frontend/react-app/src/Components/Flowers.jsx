import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

async function fetchFlowers(setFlowers) {
    fetch('http://localhost:3333/api/flowers')
    .then( async (res) => {
        const data = await res.json()
        //console.log(data)
        setFlowers(data)
    })
    .catch(console.warn)
}

export default function Flowers(props) {
    const [ flowers, setFlowers ] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        fetchFlowers(setFlowers);
    }, [])

    const handleOnClick = id => {
        props.handleFlowerId(id)
        navigate('/rendeles')
    }

    return (
        <>
            <div>
                <header>
			        <img src="./sunflower.jpg" alt="fa" id="logo" onClick={() => navigate('/')}/>
			        <h1>Nevenincs Bt.</h1>
			        <h2>Vetőmagok - Mindenféle, minden mennyiségben</h2>
		        </header>
                <main className="container">
                    <div className="row">
                        {
                            flowers.map( (element) => (
                                <div className="col-lg-4 mt-4 arukep" key={element.id}>
                                    <h4>{element.nev}</h4>
                                    <img src={element.kepUrl} alt={element.nev} className="img-fluid" onClick={() => handleOnClick(element.id)}/>
                                </div>
                            ) )
                        }
                    </div>
                </main>
                <footer>
			        <div className="row">
			        	<div className="col-md-4 col-lg-2">
			        		<h3>Nyitvatartás:</h3>
			        	</div>
			        	<div className="col-md-8 col-lg-4">
			        		<ul>
			        			<li>Hétfő-Péntek: 8-17 óráig</li>
			        			<li>Szombat: 8-13 óráig</li>
			        			<li>Vasárnap: 9-12 óráig</li>
			        		</ul>
			        	</div>
			        	<div className="col-md-4 col-lg-2">
			        		<h3>Kapcsolat:</h3>
			        	</div>
			        	<div className="col-md-8 col-lg-4">
			        		<ul>
			        			<li>06-30/111-1111</li>
			        			<li>06-70/111-1111</li>
			        			<li>nevenincsbt@gmail.com</li>
			        		</ul>
			        	</div>
			        </div>
		        </footer>
            </div>
        </>
    )
}