package com.bruninhosimoes.flamengoratings.controller;

import com.bruninhosimoes.flamengoratings.entity.Nota;
import com.bruninhosimoes.flamengoratings.service.NotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notas")
@CrossOrigin(origins = "*")
public class NotaController {
    
    @Autowired
    private NotaService notaService;
    
    @GetMapping
    public ResponseEntity<List<Nota>> getAll() {
        return ResponseEntity.ok(notaService.getAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Nota> getById(@PathVariable Integer id) {
        return notaService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/jogador/{numero}")
    public ResponseEntity<List<Nota>> getByJogador(@PathVariable Integer numero) {
        return ResponseEntity.ok(notaService.getByJogador(numero));
    }
    
    @GetMapping("/jogo/{idJogo}")
    public ResponseEntity<List<Nota>> getByJogo(@PathVariable Integer idJogo) {
        return ResponseEntity.ok(notaService.getByJogo(idJogo));
    }
    
    @GetMapping("/jogador/{numero}/media")
    public ResponseEntity<Double> getMediaJogador(@PathVariable Integer numero) {
        return ResponseEntity.ok(notaService.getMediaJogador(numero));
    }
    
    @PostMapping
    public ResponseEntity<Nota> save(@RequestBody Nota nota) {
        return ResponseEntity.ok(notaService.save(nota));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        notaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
