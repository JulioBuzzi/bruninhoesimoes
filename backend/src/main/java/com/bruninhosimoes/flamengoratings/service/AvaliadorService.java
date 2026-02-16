package com.bruninhosimoes.flamengoratings.service;

import com.bruninhosimoes.flamengoratings.entity.Avaliador;
import com.bruninhosimoes.flamengoratings.repository.AvaliadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AvaliadorService {
    
    @Autowired
    private AvaliadorRepository avaliadorRepository;
    
    public List<Avaliador> getAll() {
        return avaliadorRepository.findAll();
    }
    
    public Optional<Avaliador> getById(Integer id) {
        return avaliadorRepository.findById(id);
    }
    
    public Avaliador save(Avaliador avaliador) {
        return avaliadorRepository.save(avaliador);
    }
    
    public void delete(Integer id) {
        avaliadorRepository.deleteById(id);
    }
}
