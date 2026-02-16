package com.bruninhosimoes.flamengoratings.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "jogadores")
public class Jogador {
    
    @Id
    @Column(name = "numero_camisa")
    private Integer numero_camisa;
    
    @Column(name = "nome")
    private String nome;
    
    @Column(name = "data_nascimento")
    private String data_nascimento;
    
    @Column(name = "posicao")
    private String posicao;
    
    @Column(name = "foto_url")
    private String foto_url;
}
