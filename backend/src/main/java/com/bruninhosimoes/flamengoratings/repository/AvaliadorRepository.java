package com.bruninhosimoes.flamengoratings.repository;

import com.bruninhosimoes.flamengoratings.entity.Avaliador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AvaliadorRepository extends JpaRepository<Avaliador, Integer> {
}
