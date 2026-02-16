package com.bruninhosimoes.flamengoratings.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "avaliadores")
public class Avaliador {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_avaliador")
    private Integer id_avaliador;
    
    @Column(name = "nome")
    private String nome;
}
