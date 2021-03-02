package com.saboreslatinos.core.repository;

import java.io.Serializable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.saboreslatinos.core.entity.Cliente;

@Repository("cliente_repository")
public interface ClienteRepository extends JpaRepository<Cliente, Serializable>{

	
	
}
