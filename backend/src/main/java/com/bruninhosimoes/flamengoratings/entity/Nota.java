package com.bruninhosimoes.flamengoratings.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "notas")
public class Nota {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_nota;
    
    @Column(name = "numero_jogador")
    private Integer numero_jogador;
    
    @Column(name = "id_jogo")
    private Integer id_jogo;
    
    @Column(name = "id_avaliador")
    private Integer id_avaliador;
    
    @Column(name = "valor_nota")
    private Double valor_nota;
}
