package com.bruninhosimoes.flamengoratings.repository;

import com.bruninhosimoes.flamengoratings.entity.Nota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotaRepository extends JpaRepository<Nota, Integer> {
    
    List<Nota> findByNumero_jogador(Integer numero_jogador);
    
    List<Nota> findByIdJogo(Integer id_jogo);
    
    @Query("SELECT AVG(n.valor_nota) FROM Nota n WHERE n.numero_jogador = :numero_jogador")
    Double findMediaNotaJogador(@Param("numero_jogador") Integer numero_jogador);
}
