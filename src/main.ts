import { TerminalController } from "./controllers/TerminalController.js";
import { PokeApiService } from "./services/PokeApiService.js";
import { BoxService } from "./services/BoxService.js";

const pokeApiService = new PokeApiService();
const boxService = new BoxService();

const terminalController = new TerminalController(
    pokeApiService,
    boxService
);

await terminalController.executar();