package br.com.fiap.Via.Cartao.controller;

import br.com.fiap.Via.Cartao.model.Cartao;
import br.com.fiap.Via.Cartao.service.CartaoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/cartoes")
public class CartaoController {

    @Autowired
    private CartaoService cartaoService;

    @GetMapping
    public List<Cartao> listar() {
        return cartaoService.buscarTodos();
    }

    @GetMapping("/{id}")
    public Cartao buscarPorId(@PathVariable Long id) {
        return cartaoService.buscarPorId(id);
    }

    @PostMapping
    public Cartao salvar(@RequestBody Cartao cartao) {
        return cartaoService.salvar(cartao);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        cartaoService.excluir(id);
    }

    @PutMapping("/{id}")
    public Cartao atualizar(@PathVariable Long id,
                            @RequestBody Cartao cartao) {

        return cartaoService.atualizar(id, cartao);
    }
}
