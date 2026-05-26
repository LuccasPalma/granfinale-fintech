package br.com.fiap.Via.Cartao.service;

import br.com.fiap.Via.Cartao.model.Transacao;
import br.com.fiap.Via.Cartao.repository.TransacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransacaoService {

    @Autowired
    private TransacaoRepository transacaoRepository;

    public Transacao salvar(Transacao transacao) {
        return transacaoRepository.save(transacao);
    }

    public Transacao buscarPorId(Long id) {
        Optional<Transacao> transacaoOptional = transacaoRepository.findById(id);

        if (transacaoOptional.isPresent()) {
            return transacaoOptional.get();
        } else {
            throw new RuntimeException("Transacao nao encontrada!");
        }
    }

    public List<Transacao> buscarTodos() {
        return transacaoRepository.findAll();
    }

    public void excluir(Long id) {
        Optional<Transacao> transacao = transacaoRepository.findById(id);
        if (transacao.isPresent()) {
            transacaoRepository.deleteById(id);
        } else {
            throw new RuntimeException("Transacao nao encontrada!");
        }
    }

    public Transacao atualizar(Long id, Transacao transacao) {
        Optional<Transacao> transacaoAtual =
                transacaoRepository.findById(id);
        if (transacaoAtual.isPresent()) {
            transacao.setId(id);
            return transacaoRepository.save(transacao);
        } else {
            throw new RuntimeException("Transacao nao encontrada!");
        }
    }

}
