package br.com.fiap.Via.Cartao.repository;

import br.com.fiap.Via.Cartao.model.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransacaoRepository extends JpaRepository<Transacao, Long> {

}