package com.bruninhosimoes.flamengoratings.controller;

import com.bruninhosimoes.flamengoratings.entity.Jogador;
import com.bruninhosimoes.flamengoratings.service.JogadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jogadores")
@CrossOrigin(origins = "*")
public class JogadorController {
    
    @Autowired
    private JogadorService jogadorService;
    
    @GetMapping
    public ResponseEntity<List<Jogador>> getAll() {
        return ResponseEntity.ok(jogadorService.getAll());
    }
    
    @GetMapping("/{numero}")
    public ResponseEntity<Jogador> getByNumero(@PathVariable Integer numero) {
        return jogadorService.getByNumero(numero)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Jogador> save(@RequestBody Jogador jogador) {
        return ResponseEntity.ok(jogadorService.save(jogador));
    }
    
    @DeleteMapping("/{numero}")
    public ResponseEntity<Void> delete(@PathVariable Integer numero) {
        jogadorService.delete(numero);
        return ResponseEntity.noContent().build();
    }
}
