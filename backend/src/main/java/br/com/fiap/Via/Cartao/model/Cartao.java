package br.com.fiap.Via.Cartao.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_cartoes")
public class Cartao {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "SEQ_CARTAO"
    )

    @SequenceGenerator(
            name = "SEQ_CARTAO",
            sequenceName = "SEQ_CARTAO",
            allocationSize = 1
    )

    private Long id;

    @Column(length = 20, nullable = false)
    private String numero;

    private double limite;

    @Column(length = 30)
    private String bandeira;

    @Column(length = 10)
    private String validade;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public double getLimite() {
        return limite;
    }

    public void setLimite(double limite) {
        this.limite = limite;
    }

    public String getBandeira() {
        return bandeira;
    }

    public void setBandeira(String bandeira) {
        this.bandeira = bandeira;
    }

    public String getValidade() {
        return validade;
    }

    public void setValidade(String validade) {
        this.validade = validade;
    }
}