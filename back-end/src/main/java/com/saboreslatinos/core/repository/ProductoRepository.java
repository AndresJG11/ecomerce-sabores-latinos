package com.saboreslatinos.core.repository;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.saboreslatinos.core.entity.Producto;

@Repository("producto_repository")
public interface ProductoRepository extends JpaRepository<Producto, Serializable> {
	
	

	

}
