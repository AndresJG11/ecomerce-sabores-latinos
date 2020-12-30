package com.saboreslatinos.core.repository;

import java.io.Serializable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.saboreslatinos.core.entity.Categoria;


@Repository("categoria_repository")
public interface CategoriaRepository extends JpaRepository<Categoria, Serializable> {

	
}
