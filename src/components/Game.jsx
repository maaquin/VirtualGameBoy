import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WasmBoy } from "wasmboy";

export const Game = ({ controllerState, isPLaying, setIsPlaying, setIsGame, setIsPaused, isPaused, handleClick }) => {
    const [game, setGame] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const canvasRef = useRef(null);
    const navigate = useNavigate();

    const selectedGame = localStorage.getItem('game');

    useEffect(() => {
        if (!selectedGame) {
            navigate('/');
        } else {
            setGame(JSON.parse(selectedGame));
        }


        setIsGame(true);
    }, []);

    useEffect(() => {
        if (isPLaying) {
            const setUp = async () => {
                const WasmBoyOptions = {
                    headless: 0,
                    useGbcWhenOptional: 1,
                    audioEnabled: 1,
                    frameSkip: 1,
                    enableBootRom: 0,
                    preferGbc: 0,
                    audioBatchProcessing: 1,
                    graphicsBatchProcessing: 1,
                    timersBatchProcessing: 1,
                    graphicsDisableScanlineRendering: 1,
                    audioAccumulateSamples: 0,
                    tileRendering: 1,
                    tileCaching: 1,
                    gameboyFPSCap: 30,
                    updateGraphicsCallback: 0,
                    updateAudioCallback: 0,
                    saveStateCallback: 0
                };

                await WasmBoy.config(WasmBoyOptions, canvasRef.current);
                await WasmBoy.enableDefaultJoypad();
                await WasmBoy.loadROM(game.rom);
                await WasmBoy.play();
                await WasmBoy.isGBC();
                setIsPlaying(true);
            }

            setUp();
        }
    }, [isPLaying])

    useEffect(() => {
        let mounted = true;
        if (!isPLaying) return;

        (async () => {
            setIsProcessing(true);

            try {
                if (WasmBoy.isPlaying()) {
                    await WasmBoy.pause();
                    setIsPaused(true);
                    if (!mounted) return;
                } else {
                    await WasmBoy.play();
                    setIsPaused(false);
                    if (!mounted) return;
                }
            } catch (err) {
                console.error('Error al cambiar estado de WasmBoy:', err);
            } finally {
                if (mounted) setIsProcessing(false);
            }
        })();

        return () => { mounted = false; };
    }, [handleClick]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setIsPaused(true);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);


    const updateJoypadState = async () => {
        await WasmBoy.setJoypadState(controllerState, canvasRef.current);
    };

    useEffect(() => {
        if (isPLaying) {
            const interval = setInterval(() => {
                updateJoypadState();
            }, 1);

            return () => clearInterval(interval);
        }
    }, [controllerState]);

    return (
        <div className="game-container">
            <div className="gb-image" style={{ display: `${isPLaying ? 'none' : 'visible'}` }}>
                PRESS START
            </div>
            <canvas ref={canvasRef} className="gb-screen" style={{ display: `${isPLaying ? 'visible' : 'none'}` }}></canvas>
        </div>
    )
}