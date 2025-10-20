import { useEffect, useRef, useState } from "react";
import { Content } from "../../components/Content";
import './style.css'

export const Dashboard = () => {
    const [isPLaying, setIsPlaying] = useState(false);
    const [isGame, setIsGame] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [handleClick, setHandleClick] = useState(false);
    const debounceTimeouts = useRef({});
    const DEBOUNCE_TIME = 200;
    const [controllerState, setControllerState] = useState({
        UP: 0,
        DOWN: 0,
        LEFT: 0,
        RIGHT: 0,
        A: 0,
        B: 0,
        SELECT: 0,
        START: 0
    });

    const handleButtonPress = (button) => {
        setControllerState((prev) => ({ ...prev, [button]: 1 }));

        if (button === 'UP' || button === 'DOWN') {
            if (debounceTimeouts.current[button]) {
                return;
            }

            if (controllerState[button] === 1) {
                return;
            }

            const timeoutId = setTimeout(() => {
                delete debounceTimeouts.current[button];
            }, DEBOUNCE_TIME);

            debounceTimeouts.current[button] = timeoutId;
        }
    };

    const handleButtonRelease = (button) => {
        setControllerState((prev) => ({ ...prev, [button]: 0 }));
        clearTimeout(debounceTimeouts.current[button]);
        delete debounceTimeouts.current[button];
    };

    return (
        <div className="dashboard">
            <div className="game-boy">
                <div className="screen-container">
                    <div className="line-h" />
                    <div className="line-v1" />
                    <div className="line-v2" />
                    <div className="border-screen">
                        <div className="screen">
                            <Content controllerState={controllerState} isPLaying={isPLaying} setIsPlaying={setIsPlaying} setIsGame={setIsGame} setIsPaused={setIsPaused} isPaused={isPaused} handleClick={handleClick} />
                        </div>
                        <div className="shadow-screen" style={{ backgroundColor: isPaused ? '#0000007e' : '' }}>
                            {isPaused ? <div className="message-paused">PRESS THE GREEN BUTTON TO CONTINUE</div> : ''}
                        </div>
                        <div className="in-game" style={{ backgroundColor: isPLaying ? '#ca1818' : '#000' }} />
                        <button
                            className="in-game-button"
                            style={{ display: isGame ? 'block' : 'none', backgroundColor: !isPaused ? '#615e5eff' : '#2d9139' }}
                            onClick={() => handleClick ? setHandleClick(false) : setHandleClick(true)}
                        />

                    </div>
                </div>
                <div className="buttons-container">
                    <div className="gameboy-name">
                        <span>Nintendo</span>
                        GAME BOY
                    </div>
                    <div className="buttons-top">
                        <div className="d-pad-container">
                            <div className="d-pad-vertical">
                                <button
                                    className="btn-pad"
                                    onMouseDown={() => handleButtonPress('UP')}
                                    onMouseUp={() => handleButtonRelease('UP')}
                                    onTouchStart={() => handleButtonPress('UP')}
                                    onTouchEnd={() => handleButtonRelease('UP')}
                                />
                                <button
                                    className="btn-pad"
                                    onMouseDown={() => handleButtonPress('DOWN')}
                                    onMouseUp={() => handleButtonRelease('DOWN')}
                                    onTouchStart={() => handleButtonPress('DOWN')}
                                    onTouchEnd={() => handleButtonRelease('DOWN')}
                                />
                            </div>
                            <div className="d-pad-horizontal">
                                <button
                                    className="btn-pad"
                                    onMouseDown={() => handleButtonPress('LEFT')}
                                    onMouseUp={() => handleButtonRelease('LEFT')}
                                    onTouchStart={() => handleButtonPress('LEFT')}
                                    onTouchEnd={() => handleButtonRelease('LEFT')}
                                />
                                <button
                                    className="btn-pad"
                                    onMouseDown={() => handleButtonPress('RIGHT')}
                                    onMouseUp={() => handleButtonRelease('RIGHT')}
                                    onTouchStart={() => handleButtonPress('RIGHT')}
                                    onTouchEnd={() => handleButtonRelease('RIGHT')}
                                />
                            </div>
                        </div>

                        <div className="action-buttons">
                            <div className="button-b">
                                <button
                                    className="btn"
                                    onMouseDown={() => handleButtonPress('B')}
                                    onMouseUp={() => handleButtonRelease('B')}
                                    onTouchStart={() => handleButtonPress('B')}
                                    onTouchEnd={() => handleButtonRelease('B')}
                                />
                                B
                            </div>
                            <div className="button-a">
                                <button
                                    className="btn"
                                    onMouseDown={() => handleButtonPress('A')}
                                    onMouseUp={() => handleButtonRelease('A')}
                                    onTouchStart={() => handleButtonPress('A')}
                                    onTouchEnd={() => handleButtonRelease('A')}
                                />
                                A
                            </div>
                        </div>
                    </div>

                    <div className="start-select-buttons">
                        <div className="button-select">
                            <button
                                className="btn2"
                                onMouseDown={() => handleButtonPress('SELECT')}
                                onMouseUp={() => handleButtonRelease('SELECT')}
                                onTouchStart={() => handleButtonPress('SELECT')}
                                onTouchEnd={() => handleButtonRelease('SELECT')}
                            />
                            SELECT
                        </div>
                        <div className="button-start">
                            {isPLaying ?
                                <button
                                    className="btn2"
                                    onMouseDown={() => handleButtonPress('START')}
                                    onMouseUp={() => handleButtonRelease('START')}
                                    onTouchStart={() => handleButtonPress('START')}
                                    onTouchEnd={() => handleButtonRelease('START')}
                                />
                                :
                                <button
                                    className="btn2"
                                    onMouseDown={() => setIsPlaying(true)}
                                    onMouseUp={() => setIsPlaying(true)}
                                    onTouchStart={() => setIsPlaying(true)}
                                    onTouchEnd={() => setIsPlaying(true)}
                                />
                            }

                            START
                        </div>
                    </div>

                    <div className="botom-lines">
                        <div className="line" />
                        <div className="line" />
                        <div className="line" />
                        <div className="line" />
                        <div className="line" />
                        <div className="line" />
                    </div>
                </div>
            </div>
        </div >
    )
}