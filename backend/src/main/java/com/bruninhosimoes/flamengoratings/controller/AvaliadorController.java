package com.bruninhosimoes.flamengoratings.controller;

import com.bruninhosimoes.flamengoratings.entity.Avaliador;
import com.bruninhosimoes.flamengoratings.service.AvaliadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/avaliadores")
@CrossOrigin(origins = "*")
public class AvaliadorController {
    
    @Autowired
    private AvaliadorService avaliadorService;
    
    @GetMapping
    public ResponseEntity<List<Avaliador>> getAll() {
        return ResponseEntity.ok(avaliadorService.getAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Avaliador> getById(@PathVariable Integer id) {
        return avaliadorService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Avaliador> save(@RequestBody Avaliador avaliador) {
        return ResponseEntity.ok(avaliadorService.save(avaliador));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        avaliadorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
