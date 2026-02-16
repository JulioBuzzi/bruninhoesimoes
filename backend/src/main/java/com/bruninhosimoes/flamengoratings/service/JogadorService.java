package com.bruninhosimoes.flamengoratings.service;

import com.bruninhosimoes.flamengoratings.entity.Jogador;
import com.bruninhosimoes.flamengoratings.repository.JogadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JogadorService {
    
    @Autowired
    private JogadorRepository jogadorRepository;
    
    public List<Jogador> getAll() {
        return jogadorRepository.findAll();
    }
    
    public Optional<Jogador> getByNumero(Integer numero) {
        return jogadorRepository.findById(numero);
    }
    
    public Jogador save(Jogador jogador) {
        return jogadorRepository.save(jogador);
    }
    
    public void delete(Integer numero) {
        jogadorRepository.deleteById(numero);
    }
}
