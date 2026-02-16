export interface Jogador {
  numero_camisa: number;
  nome: string;
  data_nascimento: string;
  posicao: string;
  foto_url: string;
}

export interface Jogo {
  id_jogo: number;
  adversario: string;
  data_jogo: string;
  em_casa: boolean;
  campeonato: string;
  placar_flamengo: number;
  placar_adversario: number;
}

export interface Nota {
  id_nota: number;
  numero_jogador: number;
  id_jogo: number;
  id_avaliador: number;
  valor_nota: number;
}

export interface Avaliador {
  id_avaliador: number;
  nome: string;
}

export interface JogadorComNotas extends Jogador {
  media_notas: number;
  notas_jogo: Array<{
    jogo: Jogo;
    media_nota: number;
  }>;
}
