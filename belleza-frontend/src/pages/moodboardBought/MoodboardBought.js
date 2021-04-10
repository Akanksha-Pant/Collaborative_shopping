import {useEffect, useState} from 'react';
import {Card, Button} from 'antd';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import "./moodBoard.css";

function ViewerCard(data){
    return <Link to = {{ pathname: `/details/${data.product._id}` }}>
    <Card
            style={{ width: 250 }}
            cover={
              <img
                src={data.product.image}
              />
            }
        ><div>{data.product.name}</div>
        <div>{data.product.description}</div>
        </Card>
    </Link>
}



function BoughtList(){
    const params = useParams();

    const[boughtlist, setBoughtList] = useState([]);
    const getBoughtList = async() => {
        const res = await axios.get(`http://localhost:5000/boughtlist/${params.id}`,{withCredentials: true})
        console.log(res)
        setBoughtList(res.data)
    }
    useEffect(() => {
        getBoughtList();
    },[])
    console.log(params.id)
    return <div>
           <div style={{marginBottom: "20px"}}  className="background-purple">
                <h2 className="text-style">Brought items</h2>
            </div>
            <div style={{padding: "0 200px 0 200px"}}  className = "buyList BoughtList">{boughtlist.map(ViewerCard)}</div>
    </div> 
}

export default BoughtList;
