package com.bruninhosimoes.flamengoratings.repository;

import com.bruninhosimoes.flamengoratings.entity.Jogador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JogadorRepository extends JpaRepository<Jogador, Integer> {
}
