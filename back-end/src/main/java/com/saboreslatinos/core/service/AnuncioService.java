package com.saboreslatinos.core.service;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.saboreslatinos.core.entity.Anuncio;
import com.saboreslatinos.core.entity.Categoria;
import com.saboreslatinos.core.repository.AnuncioRepository;

@Service("anuncio_servicio")
public class AnuncioService {

	
	@Autowired
	@Qualifier("anuncio_repository")
	private AnuncioRepository anuncioRepositorio;
	
	
	public boolean agregar(Anuncio anuncio) {
		try {
			anuncioRepositorio.save(anuncio);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public Optional<Anuncio> obtenerAnuncioPorId(long idAnuncio){
		return anuncioRepositorio.findById(idAnuncio);
	}
	
	public boolean actualizar(Anuncio anuncio) {
		try {
			anuncioRepositorio.save(anuncio);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public boolean eliminar(long id) {
		try {
			anuncioRepositorio.deleteById(id);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	
	
}
