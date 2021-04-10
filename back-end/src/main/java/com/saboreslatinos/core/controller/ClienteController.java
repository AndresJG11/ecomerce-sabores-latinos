package com.saboreslatinos.core.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saboreslatinos.core.dto.ClienteDto;
import com.saboreslatinos.core.entity.Anuncio;
import com.saboreslatinos.core.entity.Cliente;
import com.saboreslatinos.core.service.ClienteService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1")
public class ClienteController {
	
	@Autowired
	@Qualifier("cliente_servicio")
	private ClienteService clienteService;
	
	@PostMapping("/cliente/{id}")
	public ResponseEntity<ClienteDto> obtenerClientePorId(@PathVariable("id") long  id){
		
		Optional<Cliente> clienteEntidad = clienteService.obtenerClientePorId(id);
		
		if(clienteEntidad.isPresent()) {
			Cliente cliente = clienteEntidad.get();
			
			ClienteDto clienteDto = new ClienteDto(cliente);
			return new ResponseEntity<>(clienteDto,HttpStatus.OK);
			
			
		}else {
			ClienteDto clienteDto = new ClienteDto(0,"","","","");
			return new ResponseEntity<>(clienteDto,HttpStatus.OK);
		}
		
		
	} 

}
