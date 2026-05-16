import { GameResponseDTO } from "../dto/response/GameResponseDTO.js"
import { GameRequestDTO } from "../dto/request/GameRequestDTO.js"

export interface IGameController {
    getAllGames(): Promise<GameResponseDTO[]>
    getGameById(id: number): Promise<GameResponseDTO | null>
    addGame(request: GameRequestDTO): Promise<string>
    updateGame(id: number, request: GameRequestDTO): Promise<string>
}