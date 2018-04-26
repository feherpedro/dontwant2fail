package hu.mik.pte.bpnh16.repository;

import hu.mik.pte.bpnh16.domain.ProductStorage;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ProductStorage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductStorageRepository extends JpaRepository<ProductStorage, Long> {

}
