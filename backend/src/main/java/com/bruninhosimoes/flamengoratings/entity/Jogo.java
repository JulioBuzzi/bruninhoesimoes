package com.bruninhosimoes.flamengoratings.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "jogos")
public class Jogo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_jogo")
    private Integer id_jogo;
    
    @Column(name = "adversario")
    private String adversario;
    
    @Column(name = "data_jogo")
    private String data_jogo;
    
    @Column(name = "em_casa")
    private Boolean em_casa;
    
    @Column(name = "campeonato")
    private String campeonato;
    
    @Column(name = "placar_flamengo")
    private Integer placar_flamengo;
    
    @Column(name = "placar_adversario")
    private Integer placar_adversario;
}
