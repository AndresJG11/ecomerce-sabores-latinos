package com.saboreslatinos.core.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.saboreslatinos.core.entity.Categoria;
import com.saboreslatinos.core.entity.Imagen;
import com.saboreslatinos.core.repository.ImagenRepository;

@Service("imagen_servicio")
public class ImagenService {

	
	@Autowired
	@Qualifier("imagen_repository")
	private ImagenRepository imagenRepositorio;
	
	
	
	public boolean agregar(Imagen imagen) {
		try {
			
			imagenRepositorio.save(imagen);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public boolean eliminar(long id) {
		try {
			imagenRepositorio.deleteById(id);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public Optional<Imagen> obtenerImagenPorId(long idImagen) {
		return imagenRepositorio.findById(idImagen);
	}
	
	
	
}
