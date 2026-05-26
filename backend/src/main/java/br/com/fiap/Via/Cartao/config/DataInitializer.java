package br.com.fiap.Via.Cartao.config;

import br.com.fiap.Via.Cartao.model.Usuario;
import br.com.fiap.Via.Cartao.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDatabase(UsuarioRepository usuarioRepository) {
        return args -> {
            String defaultEmail = "admin@viacartao.com";
            if (usuarioRepository.findByEmail(defaultEmail).isEmpty()) {
                Usuario usuario = new Usuario();
                usuario.setNome("Administrador");
                usuario.setEmail(defaultEmail);
                usuario.setSenha("123456");
                usuarioRepository.save(usuario);
            }
        };
    }
}
