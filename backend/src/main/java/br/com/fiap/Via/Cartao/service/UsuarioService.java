package br.com.fiap.Via.Cartao.service;

import br.com.fiap.Via.Cartao.model.Usuario;
import br.com.fiap.Via.Cartao.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario salvar(Usuario usuario) {
        if (!StringUtils.hasText(usuario.getSenha())) {
            usuario.setSenha("123456");
        }

        return usuarioRepository.save(usuario);
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario nao encontrado."));
    }

    public List<Usuario> buscarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario autenticar(String email, String senha) {
        return usuarioRepository.findByEmail(email)
                .filter(usuario -> usuario.getSenha().equals(senha))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "E-mail ou senha invalidos."));
    }

    public void excluir(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario nao encontrado.");
        }

        usuarioRepository.deleteById(id);
    }

    public Usuario atualizar(Long id, Usuario usuario) {
        Usuario usuarioAtual = buscarPorId(id);

        usuario.setId(id);
        if (!StringUtils.hasText(usuario.getSenha())) {
            usuario.setSenha(usuarioAtual.getSenha());
        }

        return usuarioRepository.save(usuario);
    }
}
