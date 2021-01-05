package com.saboreslatinos.core.repository;

import java.io.Serializable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.saboreslatinos.core.entity.Anuncio;


@Repository("anuncio_repository")
public interface AnuncioRepository extends JpaRepository<Anuncio, Serializable> {

}
