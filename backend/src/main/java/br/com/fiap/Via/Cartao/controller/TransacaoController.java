package br.com.fiap.Via.Cartao.controller;

import br.com.fiap.Via.Cartao.model.Transacao;
import br.com.fiap.Via.Cartao.service.TransacaoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transacoes")
@CrossOrigin(origins = "*")
public class TransacaoController {

    @Autowired
    private TransacaoService transacaoService;

    @GetMapping
    public List<Transacao> listar() {
        return transacaoService.buscarTodos();
    }

    @GetMapping("/{id}")
    public Transacao buscarPorId(@PathVariable Long id) {
        return transacaoService.buscarPorId(id);
    }

    @PostMapping
    public Transacao salvar(@RequestBody Transacao transacao) {
        return transacaoService.salvar(transacao);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        transacaoService.excluir(id);
    }

    @PutMapping("/{id}")
    public Transacao atualizar(@PathVariable Long id,
                               @RequestBody Transacao transacao) {

        return transacaoService.atualizar(id, transacao);
    }
}
