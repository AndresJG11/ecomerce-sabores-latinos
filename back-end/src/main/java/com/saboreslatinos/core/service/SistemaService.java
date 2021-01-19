package com.saboreslatinos.core.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import com.saboreslatinos.core.entity.Sistema;
import com.saboreslatinos.core.repository.SistemaRepository;

@Service("sistema_servicio")
public class SistemaService {

	
	@Autowired
	@Qualifier("sistema_repository")
	private SistemaRepository sistemaRepositorio;
	
	
	public boolean actualizar(Sistema sistema) {
		try {
			sistemaRepositorio.save(sistema);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	

	public boolean eliminar(long id) {
		try {
			sistemaRepositorio.deleteById(id);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
}
