package com.bruninhosimoes.flamengoratings.controller;

import com.bruninhosimoes.flamengoratings.entity.Jogo;
import com.bruninhosimoes.flamengoratings.service.JogoService;
import com.bruninhosimoes.flamengoratings.repository.JogoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jogos")
@CrossOrigin(origins = "*")
public class JogoController {
    
    @Autowired
    private JogoService jogoService;
    
    @Autowired
    private JogoRepository jogoRepository;
    
    @GetMapping
    public ResponseEntity<List<Jogo>> getAll() {
        return ResponseEntity.ok(jogoService.getAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Jogo> getById(@PathVariable Integer id) {
        return jogoService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/campeonato/{campeonato}")
    public ResponseEntity<List<Jogo>> getByCampeonato(@PathVariable String campeonato) {
        return ResponseEntity.ok(jogoService.getByCampeonato(campeonato));
    }
    
    @GetMapping("/campeonatos/lista")
    public ResponseEntity<List<String>> getCampeonatos() {
        return ResponseEntity.ok(jogoRepository.findAllCampeonatos());
    }
    
    @PostMapping
    public ResponseEntity<Jogo> save(@RequestBody Jogo jogo) {
        return ResponseEntity.ok(jogoService.save(jogo));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        jogoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
