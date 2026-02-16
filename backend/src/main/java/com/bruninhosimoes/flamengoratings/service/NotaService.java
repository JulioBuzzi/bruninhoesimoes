package com.bruninhosimoes.flamengoratings.service;

import com.bruninhosimoes.flamengoratings.entity.Nota;
import com.bruninhosimoes.flamengoratings.repository.NotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotaService {
    
    @Autowired
    private NotaRepository notaRepository;
    
    public List<Nota> getAll() {
        return notaRepository.findAll();
    }
    
    public Optional<Nota> getById(Integer id) {
        return notaRepository.findById(id);
    }
    
    public List<Nota> getByJogador(Integer numero_jogador) {
        return notaRepository.findByNumero_jogador(numero_jogador);
    }
    
    public List<Nota> getByJogo(Integer id_jogo) {
        return notaRepository.findByIdJogo(id_jogo);
    }
    
    public Double getMediaJogador(Integer numero_jogador) {
        Double media = notaRepository.findMediaNotaJogador(numero_jogador);
        return media != null ? media : 0.0;
    }
    
    public Nota save(Nota nota) {
        return notaRepository.save(nota);
    }
    
    public void delete(Integer id) {
        notaRepository.deleteById(id);
    }
}
