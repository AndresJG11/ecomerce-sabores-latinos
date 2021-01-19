package com.saboreslatinos.core.repository;

import java.io.Serializable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.saboreslatinos.core.entity.Sistema;

@Repository("sistema_repository")
public interface SistemaRepository  extends JpaRepository<Sistema, Serializable>{
	
	

}
