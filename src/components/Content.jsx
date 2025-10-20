import { SelectGame } from "./SelectGame";
import { Game } from "./Game";
import { Route, Routes } from "react-router-dom";

export const Content = ({ controllerState, isPLaying, setIsPlaying, setIsGame, setIsPaused, isPaused, handleClick }) => {

    const routes = [
        { path: "/", element: <SelectGame controllerState={controllerState} setIsGame={setIsGame} /> },
        { path: "/game", element: <Game controllerState={controllerState} isPLaying={isPLaying} setIsPlaying={setIsPlaying} setIsGame={setIsGame} setIsPaused={setIsPaused} isPaused={isPaused} handleClick={handleClick} /> },
    ];

    return (
            <div className="content">
                <Routes>
                    {routes.map(({ path, element }) => (
                        <Route key={path} path={path} element={element} />
                    ))}
                </Routes>
            </div>
    )
}