package br.com.fiap.Via.Cartao.service;

import br.com.fiap.Via.Cartao.model.Cartao;
import br.com.fiap.Via.Cartao.repository.CartaoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartaoService {

    @Autowired
    private CartaoRepository cartaoRepository;

    public Cartao salvar(Cartao cartao) {
        return cartaoRepository.save(cartao);
    }

    public Cartao buscarPorId(Long id) {

        Optional<Cartao> cartaoOptional =
                cartaoRepository.findById(id);

        if (cartaoOptional.isPresent()) {
            return cartaoOptional.get();
        } else {
            throw new RuntimeException("Cartao nao encontrado!");
        }
    }

    public List<Cartao> buscarTodos() {
        return cartaoRepository.findAll();
    }

    public void excluir(Long id) {

        Optional<Cartao> cartao =
                cartaoRepository.findById(id);

        if (cartao.isPresent()) {
            cartaoRepository.deleteById(id);
        } else {
            throw new RuntimeException("Cartao nao encontrado!");
        }
    }

    public Cartao atualizar(Long id, Cartao cartao) {

        Optional<Cartao> cartaoAtual =
                cartaoRepository.findById(id);

        if (cartaoAtual.isPresent()) {

            cartao.setId(id);

            return cartaoRepository.save(cartao);

        } else {
            throw new RuntimeException("Cartao nao encontrado!");
        }
    }
}
