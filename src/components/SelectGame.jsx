import { games } from "./utils/games";
import { useNavigate } from "react-router-dom";
import './styles.css';
import { useEffect, useRef, useState } from "react";

export const SelectGame = ({ controllerState, setIsGame }) => {
    const [gameSelected, setGameSelected] = useState(0);
    const navigate = useNavigate();
    const itemRefs = useRef([]);
    setIsGame(false);

    const handleClick = (game) => {
        navigate("/game", { state: { game } });
        localStorage.setItem('game', JSON.stringify(game));
    };

    useEffect(() => {
        if (controllerState.DOWN === 1 && gameSelected !== games.length - 1) {
            setGameSelected(prevGameSelected => prevGameSelected + 1);
        } else if (controllerState.UP === 1 && gameSelected !== 0) {
            setGameSelected(prevGameSelected => prevGameSelected - 1);
        } else if (controllerState.A === 1) {
            let game = games[gameSelected];
            navigate("/game", { state: { game } });
            localStorage.setItem('game', JSON.stringify(game));
        }
    }, [controllerState])

    useEffect(() => {
        const selectedElement = itemRefs.current[gameSelected];
        if (selectedElement) {
            selectedElement.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [gameSelected]);

    return (
        <div className="select-game-container">
            <h1 className="select-game-title">Select Game</h1>
            <div className="games-grid">
                {games.map((game, i) => (
                    <div
                        key={i}
                        ref={(el) => (itemRefs.current[i] = el)}
                        className={i === gameSelected ? 'list-item item-selected' : 'list-item'}
                        onClick={() => handleClick(game)}
                    >
                        <img src={game.img} alt={game.name} className="game-img" />
                        <h2 className="game-name">{game.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};