package com.saboreslatinos.core.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import com.saboreslatinos.core.converter.Converter;
import com.saboreslatinos.core.dto.CategoriaDto;
import com.saboreslatinos.core.entity.Categoria;
import com.saboreslatinos.core.repository.CategoriaRepository;

@Service("categoria_servicio")
public class CategoriaService {
	
	@Autowired
	@Qualifier("categoria_repository")
	private CategoriaRepository categoriaRepositorio;
	
	@Autowired
	@Qualifier("converter")
	private Converter convertidor;
	
	
	public Optional<Categoria> obtenerCategoriaPorId(long idCategoria) {
		return categoriaRepositorio.findById(idCategoria);
	}
	
	public boolean agregar(Categoria categoria) {
		try {
			
			categoriaRepositorio.save(categoria);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public boolean actualizar(Categoria categoria) {
		try {
			categoriaRepositorio.save(categoria);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public boolean eliminar(long id) {
		try {
			categoriaRepositorio.deleteById(id);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public List<CategoriaDto> obtener(){
		return convertidor.convertirListaCategorias(categoriaRepositorio.findAll());
	}
	
	
	
	


}