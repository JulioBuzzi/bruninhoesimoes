package com.bruninhosimoes.flamengoratings.service;

import com.bruninhosimoes.flamengoratings.entity.Jogo;
import com.bruninhosimoes.flamengoratings.repository.JogoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JogoService {
    
    @Autowired
    private JogoRepository jogoRepository;
    
    public List<Jogo> getAll() {
        return jogoRepository.findAll();
    }
    
    public Optional<Jogo> getById(Integer id) {
        return jogoRepository.findById(id);
    }
    
    public List<Jogo> getByCampeonato(String campeonato) {
        return jogoRepository.findByCampeonato(campeonato);
    }
    
    public List<String> getCampeonatos() {
        return jogoRepository.findAllCampeonatos();
    }
    
    public Jogo save(Jogo jogo) {
        return jogoRepository.save(jogo);
    }
    
    public void delete(Integer id) {
        jogoRepository.deleteById(id);
    }
}
