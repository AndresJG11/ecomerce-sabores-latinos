package com.saboreslatinos.core.controller;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.saboreslatinos.core.entity.Sistema;
import com.saboreslatinos.core.repository.SistemaRepository;
import com.saboreslatinos.core.service.SistemaService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1")
public class SistemaController {

	@Autowired
	@Qualifier("sistema_servicio")
	private SistemaService sistemaService;
	
	@Autowired
	@Qualifier("sistema_repository")
	private SistemaRepository sistemaRepository;
	
	
	@PostMapping("/sistema")
	public ResponseEntity<String>  actualizarSistema(@RequestBody Sistema sistema) {
		
		Optional<Sistema> sistemaData = sistemaRepository.findById(sistema.getId());
		if(sistemaData.isPresent()) {
			Sistema sistemaActualizado = sistemaData.get();
			sistemaActualizado.setCorreo(sistema.getCorreo());
			sistemaActualizado.setDireccion(sistemaActualizado.getDireccion());
			sistemaActualizado.setFacebook(sistema.getFacebook());
			sistemaActualizado.setInstagram(sistema.getInstagram());
			sistemaActualizado.setTelefono(sistema.getTelefono());
			sistemaActualizado.setWhatsapp(sistema.getWhatsapp());
			sistemaService.actualizar(sistemaActualizado);
			return new ResponseEntity<>("Parametros actualizados correctamente", HttpStatus.OK);
		}else {
			return new ResponseEntity<>("No se encontraron parametros", HttpStatus.NOT_FOUND);
		}
		
		
	}
	
	
	
}
