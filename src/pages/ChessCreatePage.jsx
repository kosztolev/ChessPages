import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";
import { profile } from "node:console";

export const ChessCreatePage = () => {
const navigate = useNavigate();

const handleSubmit = async(event) => {
    event.preventDefault();
    try{
        await axios.post("http://chess.sulla.hu/chess", {
            name: event.target.elements.name.value,
            birth_date: event.target.elements.birth_date.value,
            world_ch_won: event.target.elements.world_ch_won.value,
            profile_url: event.target.elements.profile_url.value,
            image_url: event.target.elements.image_url.value
        });
        navigate("/");
    }
    catch (error) {
        console.log(error);
    }
}

    return (
        <div className="p-5 content bg-ivory text-center">
            <h2>Új sakkozó felvitele</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Sakkozó neve:</label>
                    <div className="col-sm-9">
                        <input type="text" name="name" className="form-control" />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Születési éve:</label>
                    <div className="col-sm-9">
                        <input type="number" name="birth_date" className="form-control" />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Nyert világbajnokságai:</label>
                    <div className="col-sm-9">
                        <input type="number" name="world_ch_won" className="form-control" />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Profil URL-je</label>
                    <div className="col-sm-9">
                        <input type="text" name="profile_url" className="form-control" />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Kép URL-je:</label>
                    <div className="col-sm-9">
                        <input type=""text name="image_url" className="form-control" />
                    </div>
                </div>
                <Link to = "/" className = "btn btn-warning"><i className="bi bi-arrow-return-left"></i>Vissza</Link>&nbsp;&nbsp;
                <button type="submit" className="btn btn-succes">Küldés</button>
            </form>
        </div>
    );
}