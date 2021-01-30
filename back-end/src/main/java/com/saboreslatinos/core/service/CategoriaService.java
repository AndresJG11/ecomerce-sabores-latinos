package com.saboreslatinos.core.service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import com.saboreslatinos.core.converter.Converter;
import com.saboreslatinos.core.dto.CategoriaDto;
import com.saboreslatinos.core.entity.Categoria;
import com.saboreslatinos.core.entity.Imagen;
import com.saboreslatinos.core.repository.CategoriaRepository;

@Service("categoria_servicio")
public class CategoriaService {
	
	@Autowired
	@Qualifier("categoria_repository")
	private CategoriaRepository categoriaRepositorio;
	
	@Autowired
	@Qualifier("converter")
	private Converter convertidor;
	
	@PersistenceContext
	EntityManager entityManager;
	
	
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
	
	public List<CategoriaDto> obtenerCategoriasPaginadas(int pageSize, int actualPage){
		
		TypedQuery<Categoria> query = entityManager.createNamedQuery(Categoria.GET_CATEGORIAS_PAGINADAS, Categoria.class);
		query.setFirstResult((actualPage-1)*pageSize);
		query.setMaxResults(pageSize);
		List<Categoria> categorias = query.getResultList();
		return convertidor.convertirListaCategorias(categorias);
	}
	
	
	
	


}
