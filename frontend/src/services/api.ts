import axios, { AxiosInstance } from 'axios';
import { Jogador, Jogo, Nota, Avaliador } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// JOGADORES
export const jogadoresService = {
  getAll: async (): Promise<Jogador[]> => {
    const response = await api.get('/jogadores');
    return response.data;
  },
  getByNumero: async (numero: number): Promise<Jogador> => {
    const response = await api.get(`/jogadores/${numero}`);
    return response.data;
  },
  getComNotas: async (numero: number): Promise<any> => {
    const response = await api.get(`/jogadores/${numero}/com-notas`);
    return response.data;
  },
};

// JOGOS
export const jogosService = {
  getAll: async (): Promise<Jogo[]> => {
    const response = await api.get('/jogos');
    return response.data;
  },
  getByCampeonato: async (campeonato: string): Promise<Jogo[]> => {
    const response = await api.get(`/jogos/campeonato/${campeonato}`);
    return response.data;
  },
  getCampeonatos: async (): Promise<string[]> => {
    const response = await api.get('/jogos/campeonatos/lista');
    return response.data;
  },
};

// NOTAS
export const notasService = {
  getByJogador: async (numero_jogador: number): Promise<Nota[]> => {
    const response = await api.get(`/notas/jogador/${numero_jogador}`);
    return response.data;
  },
  getByJogo: async (id_jogo: number): Promise<Nota[]> => {
    const response = await api.get(`/notas/jogo/${id_jogo}`);
    return response.data;
  },
  getMediaJogador: async (numero_jogador: number): Promise<number> => {
    const response = await api.get(`/notas/jogador/${numero_jogador}/media`);
    return response.data;
  },
};

// AVALIADORES
export const avaliadorService = {
  getAll: async (): Promise<Avaliador[]> => {
    const response = await api.get('/avaliadores');
    return response.data;
  },
};
