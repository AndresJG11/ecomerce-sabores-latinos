package com.saboreslatinos.core.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.saboreslatinos.core.entity.Pais;
import com.saboreslatinos.core.repository.PaisRepository;


@Service("pais_servicio")
public class PaisService {
	
	
	@Autowired
	@Qualifier("pais_repository")
	private PaisRepository paisRepositorio;
	
	
	public Optional<Pais> obtenerPaisPorId(long idPais) {
		return paisRepositorio.findById(idPais);
	}

}
