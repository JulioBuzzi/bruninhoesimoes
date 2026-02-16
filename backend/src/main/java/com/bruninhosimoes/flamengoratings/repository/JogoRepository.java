package com.bruninhosimoes.flamengoratings.repository;

import com.bruninhosimoes.flamengoratings.entity.Jogo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JogoRepository extends JpaRepository<Jogo, Integer> {
    List<Jogo> findByCampeonato(String campeonato);
    
    @Query("SELECT DISTINCT j.campeonato FROM Jogo j ORDER BY j.campeonato")
    List<String> findAllCampeonatos();
}
