import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';

export const ChessSinglePage = () => {
    const params = useParams();
    const id = params.chessId;
    const [chess, setChess] = useState({});
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        axios
            .get(`https://chess.sulla.hu/chess/${id}`)
            .then((res) => setChess(res.data))
            .catch((error) => {
                console.error("Hiba: ", error);
            })
            .finally(() => setPending(false));
    }, [id]);

    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isPending ? (
                <div className="spinner-border text-warning"></div>
            ) : (
                <div>
                    <h2>Sakkozó adatai</h2>
                    <div className="card col-sm-3 d-inline-block m-1 p-2">
                        <h5 className="text-dark">Sakkozó neve: {chess.name}</h5>
                        <p className="text-danger">Születési éve: {chess.birth_date}</p>
                        <p className="text-danger">Nyert világbajnokságai: {chess.world_ch_won}</p>
                        <div className="card-body">
                            <a href={chess.profile_url} target="_blank" rel="noreferrer">
                                Profile link
                            </a> <br />
                            <Link to={"/chess/" + chess.id}>
                                <img
                                    alt={chess.name}
                                    className="img-fluid"
                                    style={{ maxHeight: 200 }}
                                    src={chess.image_url || "https://placehold.co/400x800"}
                                />
                            </Link> <br />
                            <Link to={"/"}><i className="bi bi-arrow-left fs-2"></i></Link>&nbsp;&nbsp;
                            <Link to={"/mod-chess/" + chess.id}><i className="bi bi-pencil fs-2"></i></Link>&nbsp;&nbsp;
                            <Link to={"/del-chess/" + chess.id}><i className="bi bi-trash3 fs-2"></i></Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
