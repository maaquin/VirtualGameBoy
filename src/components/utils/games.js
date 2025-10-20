import batman_img from '../../assets/images/batman.jpg';
import batman_rom from '../../assets/games/gbc/batman.gbc';

import tetris_img from '../../assets/images/tetris.jpg';
import tetris_rom from '../../assets/games/gb/tetris.gb';

import kirby_img from '../../assets/images/kirby.jpg';
import kirby_rom from '../../assets/games/gb/kirby.gb';

import mickey_img from '../../assets/images/mickey.jpg';
import mickey_rom from '../../assets/games/gbc/mickey.gbc';

import pokemon_pinball_img from '../../assets/images/pokemon_pinball.jpg';
import pokemon_pinball_rom from '../../assets/games/gbc/pokemon_pinball.gbc';

import grimace_img from '../../assets/images/grimace.png';
import grimace_rom from '../../assets/games/gbc/grimace.gb';

import megaman_img from '../../assets/images/megaman.jpg';
import megaman_rom from '../../assets/games/gb/megaman.gb';

import pokemon_img from '../../assets/images/pokemon.jpg';
import pokemon_rom from '../../assets/games/gbc/pokemon.gbc';

import zelda_img from '../../assets/images/zelda.jpg';
import zelda_rom from '../../assets/games/gbc/zelda.gbc';


const batman = {
    name: 'The New Batman Adventures : Chaos in Gotham',
    img: batman_img,
    rom: batman_rom
}

const tetris = {
    name: 'Tetris',
    img: tetris_img,
    rom: tetris_rom
}

const kirby = {
    name: "Kirby's Dream Land",
    img: kirby_img,
    rom: kirby_rom
}

const mickey = {
    name: "Mickey's Racing Adventure",
    img: mickey_img,
    rom: mickey_rom
}

const pokemon_pinball = {
    name: 'Pokemon Pinball',
    img: pokemon_pinball_img,
    rom: pokemon_pinball_rom
}

const grimace = {
    name: "Grimace's Birthday",
    img: grimace_img,
    rom: grimace_rom
}

const megaman = {
    name: 'Mega Man II',
    img: megaman_img,
    rom: megaman_rom
}

const pokemon = {
    name: 'Pokemon Silver Version',
    img: pokemon_img,
    rom: pokemon_rom
}

const zelda = {
    name: "The Legend of Zelda Link's Awakening DX",
    img: zelda_img,
    rom: zelda_rom
}

export const games = [
    kirby,
    zelda,
    megaman,
    pokemon,
    grimace
]