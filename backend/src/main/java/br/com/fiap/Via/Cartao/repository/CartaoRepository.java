package br.com.fiap.Via.Cartao.repository;

import br.com.fiap.Via.Cartao.model.Cartao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartaoRepository extends JpaRepository<Cartao, Long> {

}