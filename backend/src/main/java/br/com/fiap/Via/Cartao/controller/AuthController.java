package br.com.fiap.Via.Cartao.controller;

import br.com.fiap.Via.Cartao.model.Usuario;
import br.com.fiap.Via.Cartao.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginRequest loginRequest) {
        Usuario usuario = usuarioService.autenticar(loginRequest.email(), loginRequest.senha());

        return Map.of(
                "token", "via-cartao-" + usuario.getId(),
                "user", usuario
        );
    }

    public record LoginRequest(String email, String senha) {
    }
}
