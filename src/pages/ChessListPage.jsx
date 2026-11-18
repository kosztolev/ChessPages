import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const ChessListPage = () => {
    const [chesses, setChesses] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);
    const [hiba, setHiba] = useState(null);

    useEffect(() => {
        setFetchPending(true);
        axios
            .get("https://chess.sulla.hu/chess")
            .then((res) => setChesses(res.data))
            .catch((error) => {
                setHiba(error);
                console.error("Hiba: ", error);
            })
            .finally(() => setFetchPending(false));
    }, []);

    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isFetchPending ? (
                <div className="spinner-border text-warning"></div>
            ) : (
                <div>
                    <h2>Sakkozók</h2>
                    {chesses.map((chess) => (
                        <div className="card col-sm-3 d-inline-block m-1 p-2" key={chess.id}>
                            <p className="text-dark">Sakkozó neve: {chess.name}</p>
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
                                <Link to={"/chess/" + chess.id}><i className="bi bi-eye fs-2"></i></Link>&nbsp;&nbsp;
                                <Link to={"/mod-chess/" + chess.id}><i className="bi bi-pencil fs-2"></i></Link>&nbsp;&nbsp;
                                <Link to={"/del-chess/" + chess.id}><i className="bi bi-trash3 fs-2"></i></Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
