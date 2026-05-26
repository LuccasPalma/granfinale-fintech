package br.com.fiap.Via.Cartao.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_transacoes")
public class Transacao {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "SEQ_TRANSACAO"
    )

    @SequenceGenerator(
            name = "SEQ_TRANSACAO",
            sequenceName = "SEQ_TRANSACAO",
            allocationSize = 1
    )

    private Long id;

    @Column(length = 100, nullable = false)
    private String descricao;

    private double valor;

    @Column(length = 20)
    private String tipo;

    @Column(name = "data_transacao")
    private LocalDateTime dataTransacao;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public LocalDateTime getDataTransacao() {
        return dataTransacao;
    }

    public void setDataTransacao(LocalDateTime dataTransacao) {
        this.dataTransacao = dataTransacao;
    }
}
