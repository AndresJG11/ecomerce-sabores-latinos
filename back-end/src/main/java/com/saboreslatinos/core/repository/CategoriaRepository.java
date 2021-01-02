package com.saboreslatinos.core.repository;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.saboreslatinos.core.entity.Categoria;
import com.saboreslatinos.core.entity.Producto;



@Repository("categoria_repository")
public interface CategoriaRepository extends JpaRepository<Categoria, Serializable> {


	
}
