package com.bruninhosimoes.flamengoratings.repository;

import com.bruninhosimoes.flamengoratings.entity.Jogo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JogoRepository extends JpaRepository<Jogo, Integer> {
}
