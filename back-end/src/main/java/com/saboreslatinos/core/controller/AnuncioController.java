package com.saboreslatinos.core.controller;


import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.saboreslatinos.core.dto.AnuncioDto;
import com.saboreslatinos.core.entity.Anuncio;
import com.saboreslatinos.core.service.AnuncioService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1")
public class AnuncioController {
	
	@Autowired
	@Qualifier("anuncio_servicio")
	private AnuncioService anuncioService;
	
	
	
	@PostMapping("/anuncio")
	
	public ResponseEntity<String>  agregarAnuncio(@RequestBody @Validated Anuncio anuncio ) {
		
	
		if(!anuncio.getImagen().isEmpty()) {
			
			
			anuncioService.agregar(anuncio);
			return new ResponseEntity<>("Anuncio creado con exito", HttpStatus.OK);
				
		}else {
			return new ResponseEntity<>("No hay contenido en la imagen", HttpStatus.PARTIAL_CONTENT);
		}
		
	}
	
	@PutMapping("/anuncio/{id}")
	public ResponseEntity<String>  actualizarAnuncio(@RequestBody @Validated Anuncio anuncio ) {
		
		
		Optional<Anuncio> anuncioEntidad = anuncioService.obtenerAnuncioPorId(anuncio.getId());
		
		if (anuncioEntidad.isPresent()) {
			Anuncio anuncioActualizado = anuncioEntidad.get();
			anuncioActualizado.setEnlace(anuncio.getEnlace());
			anuncioActualizado.setTitulo(anuncio.getTitulo());
			anuncioActualizado.setImagen(anuncio.getImagen());
			anuncioService.actualizar(anuncioActualizado);
			return new ResponseEntity<>("Anuncio actualizado con exito", HttpStatus.OK);
		}
		return new ResponseEntity<>("No existe una anunucio con el id: "+anuncio.getId(), HttpStatus.NOT_FOUND);
		
	}
	
	@DeleteMapping("/anuncio/{id}")
	public ResponseEntity<String>   eliminarAnuncio(@PathVariable("id") long  id) {

		if (anuncioService.eliminar(id)) {
			return new ResponseEntity<>("Anuncio eliminado con exito", HttpStatus.OK);
		}else {
			return new ResponseEntity<>("No se pudo eliminar el anuncio", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	
	@GetMapping("/anuncio")
	public ResponseEntity<List<AnuncioDto>> obtenerAnuncios() {
		
		return  new ResponseEntity<List<AnuncioDto>>(anuncioService.obtener(), HttpStatus.OK);
	}

}
