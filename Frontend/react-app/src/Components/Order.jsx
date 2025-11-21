import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';

async function fetchFlower(id, setFlower) {
    fetch(`http://localhost:3333/api/flower/${id}`)
    .then(async (res) => {
        const data = await res.json();
        setFlower( {...data[0], mennyiseg: data[0].keszlet > 0 ? 1 : 0} )
    })
    .catch(console.warn)
}

export default function Order(props) {
    const [flower, setFlower] = useState({});
    const id = +props?.flowerId
    let navigate = useNavigate();

    useEffect(() => {
        fetchFlower(id, setFlower)
    }, [])

    const handleQuantity = e => {
        const max = flower.keszlet;
        let quantity = Number(e.target.value);

        if (Number.isNaN(quantity) || quantity < 1) {
            quantity = 1;
        }

        if (quantity > max) {
            quantity = max;
        }

        setFlower({ ...flower, mennyiseg: quantity });
    }

    const handleOrder = e => {
        e.preventDefault();
        const formElement = e.target
        const quantity = Number(formElement.mennyiseg.value)
        const ujKeszlet = flower.keszlet - quantity
        const reqBody = JSON.stringify({ keszlet : ujKeszlet });

        fetch(`http://localhost:3333/api/flowers/${id}`, {
            method: 'PUT',
            headers: {'Content-Type' : 'application/json'},
            body: reqBody
        })
        .then( async (res) => {
            const result = await res.json()
            const status = res.status
            if (status === 200) toast.success(result.msg)
            if (status === 404) toast.warning(result.msg)
            if (status === 500) toast.error(result.error)
        })
        .catch((error) => {
            console.warn(error)
            toast.error('Hiba lépett fel az adatok elküldése során!')
        })
        .finally(() => {
            setTimeout(() => {
                navigate('/flowers')
            }, 1500)
        })
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
                   <h2>{flower.nev} ({flower.kategoria_nev})</h2>   
				    <div className="row">         
				    	<div className="col-md-6">
				    		<img src={flower.kepUrl} alt={flower.nev} className="img-thumbnail" />                    
				    	</div>
				    	<div className="col-md-6">
				    		<p>{flower.leiras}</p>
				    		<form method="POST" onSubmit={handleOrder}>
				    			<p className="text-center"><span id="ar">Ár: {flower.ar} Ft</span>
                                    {
                                        flower.keszlet > 0 
                                        ?
                                        <>
                                            <label htmlFor="mennyiseg">Mennyiség:</label>
				    				        <input type="number" name="mennyiseg" id="mennyiseg" min="1" max={flower.keszlet} value={flower.mennyiseg} onChange={handleQuantity} />
                                        </>
                                        :
                                        ''
                                    }
				    			</p>
                                {
                                    flower.keszlet > 0 
                                    ?
                                    <p className="text-center"><button type="submit" className="btn btn-warning btn-lg">Megrendelem</button></p>
                                    :
                                    <p>Jelenleg nincs a termékből készleten, keresse fel oldalunkat később!</p>
                                }
				    		</form>
				    	</div>
				    </div>
                </main>
            </div>
            <ToastContainer position="top-center"/>
        </>
    )
}