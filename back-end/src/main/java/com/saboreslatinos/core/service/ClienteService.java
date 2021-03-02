package com.saboreslatinos.core.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.saboreslatinos.core.entity.Cliente;
import com.saboreslatinos.core.repository.ClienteRepository;


@Service("cliente_servicio")
public class ClienteService {

	
	@Autowired
	@Qualifier("cliente_repository")
	private ClienteRepository clienteRepositorio;
	
	
	public Optional<Cliente> obtenerClientePorId(long idCliente) {
		
		return clienteRepositorio.findById(idCliente);
		
	}
	
	
	public boolean  agregar(Cliente cliente) {
		
		try {
			clienteRepositorio.save(cliente);
			return true;
		} catch (Exception e) {
			return false;
		}
		
	}
	
	
	
	
}
