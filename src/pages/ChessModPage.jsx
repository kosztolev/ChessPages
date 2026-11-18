import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from 'axios';

export const ChessModPage = () => {
    const params = useParams();
    const id = params.chessId;
    const navigate = useNavigate();
    const [chess, setChess] = useState({
        name: '',
        birt_date: 0,
        world_ch_won: 0,
        profile_url: '',
        image_url: ''
    });
    useEffect(() => {
        const fetchChessData = async() =>{
            try{
                const response = await axios.get(`https://chess.sulla.hu/chess/${id}`);
                setChess(response.data);
            }
            catch (error){
                console.log("Hiba az adatok betöltésénél: ", error);
            }
        };
        fetchChessData();
    },[id]);
    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`https://chess.sulla.hu/chess/${id}`, chess)
        .then(() =>{
            navigate("/");
        })
        .catch(error => {
            console.log('Nem sikerült a küldés', error);
        });
    };
    const handleInputChange = event => {
        const {name, value} = event.target;
        setChess(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return(
        <div className="p-5 content bg-ivory text-center">
            <h2>Sakkozó módostása</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Sakkozó neve:</label>
                    <div className="col-sm-9">
                        <input type="text" name="name" className="form-control" defaultValue={chess.name} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Születési éve:</label>
                    <div className="col-sm-9">
                        <input type="date" name="birth_date" className="form-control" defaultValue={chess.birt_date} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Nyert világbajnokságai:</label>
                    <div className="col-sm-9">
                        <input type="number" name="world_ch_won" className="form-control" value={chess.world_ch_won.toString()} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Profil URL-je</label>
                    <div className="col-sm-9">
                        <input type="text" name="profile_url" className="form-control" defaultValue={chess.profile_url} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Kép URL-je:</label>
                    <div className="col-sm-9">
                        <input type="text" name="image_url" className="form-control" defaultValue={chess.image_url} onChange={handleInputChange}/>
                    </div>
                </div>
                <Link to = "/" className = "btn btn-warning"><i className="bi bi-arrow-return-left"></i>Vissza</Link>&nbsp;&nbsp;
                <button type="submit" className="btn btn-succes">Küldés</button>
            </form>
        </div>
    );
}
